from werkzeug.security import generate_password_hash, check_password_hash
from configs import db
import numpy as np
from airfoilGen import generator
from sqlalchemy import MetaData, ForeignKey
import sqlalchemy as sa
from sqlalchemy.orm import mapped_column, Mapped, relationship
from datetime import datetime
# from flask_login import current_user

from configs import db
from math import pow
from typing import List

from testxfoil import run_xfoil

DENSITY_AIR = 1.225
VISCOSITY_AIR = 1.81 * pow(10, -5)
GRAVITY = 9.81

COST_MANOEUVRABILITY_ON_SPEED = 0.12
COST_PAYLOAD_ON_SPEED = 0.2
COST_SPEED_ON_SPEED = 0.4

ASPECT_RATIO_LOW = 5
ASPECT_RATIO_HIGH = 50

# cur folder
from os import path, mkdir
my_root = path.dirname(path.realpath(__file__)) 

def abs(n):
    if n < 0:
        return -n
    return n
# db = app.db

def kmh_ms(_speed_):
    return _speed_ / 3.6
def ms_kmh(_speed_):
    return _speed_ * 3.6
def format_large_number(number):
    # Format the number with commas
    return (f"{number:,}")

class AircraftPriorities(db.Model):
    __tablename__ = "aircraft_priorities"
    
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    maneuverability: Mapped[int] = mapped_column(db.Integer, nullable=False)
    stability: Mapped[int] = mapped_column(db.Integer, nullable=False)
    payload: Mapped[int] = mapped_column(db.Integer, nullable=False)
    speed: Mapped[int] = mapped_column(db.Integer, nullable=False)
    endurance: Mapped[int] = mapped_column(db.Integer, nullable=False)
    stall_behavior: Mapped[int] = mapped_column(db.Integer, nullable=False)
    manufacturability: Mapped[int] = mapped_column(db.Integer, nullable=False)

    project_id: Mapped[int]= mapped_column(ForeignKey("projects.id"))

    def __init__(self) -> None:
        super().__init__()
        self.maneuverability = 3
        self.stability = 3
        self.payload = 3
        self.speed = 3
        self.endurance = 3
        self.stall_behavior = 3
        self.manufacturability = 3

class interval:
    def __init__(self, a, b, minMaxFlag=False) -> None:
        if not minMaxFlag:
            self.val = a
            self.margins = b
        else:
            self.val = a + abs(b - a) / 2
            self.margins = abs(b - a) / 2
    def max(self):
        return self.val + self.margins
    def min(self):
        if self.val == 0:
            return 0
        if (self.margins > self.val):
            return 0
        mar_ = self.margins
        val_ = self.val - mar_
        while val_ <= 0:
            mar_ /= 1.2
            val_ = self.val - mar_
        return val_
    def __repr__(self) -> str:
        return f'min: {format_large_number(self.min())} -- max: {format_large_number(self.max())}'

class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    last_name: Mapped[str] = mapped_column(nullable=False)
    first_name: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str]  = mapped_column(nullable=False, default="example@email.com")
    pass_hash: Mapped[str]  = mapped_column(nullable=False)
    avatar: Mapped[str]  = mapped_column(nullable=False)
    
    projects: Mapped[List["Project"]] = relationship()

    def is_authenticated(self):
        return True

    def set_password(self, password):
        self.pass_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.pass_hash, password)
    
    def __repr__(self):
        return f'<User {self.avatar}>'

# Define Project model
class Project(db.Model):
    # __tablename__ = 'projects'
    # metadata = MetaData()

    # if not metadata.tables.get('projects'):
    __tablename__ = "projects"
    
    id: Mapped[int]= mapped_column(primary_key=True)
    name: Mapped[int]= mapped_column(nullable=False, unique=True)
    description: Mapped[int]= mapped_column()
    foldername: Mapped[int]= mapped_column()    

    # Foreign key linking to the User model
    user_id: Mapped[int]= mapped_column(ForeignKey("users.id"))
    user: Mapped[User]= relationship("User", back_populates="projects")

    flightTime: Mapped[int]= mapped_column(server_default='0', nullable=False) 
    weightExpected: Mapped[int]= mapped_column(server_default='0', nullable=False) 
    weightMargins: Mapped[int]= mapped_column(server_default='0', nullable=False)
    payloadWeight: Mapped[int]= mapped_column(server_default='0', nullable=False)
    speedExpected: Mapped[int]= mapped_column(server_default='0', nullable=False) 
    speedMargins: Mapped[int]= mapped_column(server_default='0', nullable=False)
    fuselageLengthMax: Mapped[int]= mapped_column(server_default='0', nullable=False) 
    AirfoilLengthMax: Mapped[int]= mapped_column(server_default='0', nullable=False)
    streamVelocityX: Mapped[int]= mapped_column(server_default='0', nullable=False) 
    AOA: Mapped[int]= mapped_column(server_default='0', nullable=False)
    simulationType: Mapped[int]= mapped_column(server_default='0', nullable=False)
    material: Mapped[int]= mapped_column(server_default='0', nullable=False) 
    density: Mapped[int]= mapped_column(server_default='0', nullable=False)
    selectedAirfoil: Mapped[str]= mapped_column(server_default='', nullable=False)
    meshQuality: Mapped[int]= mapped_column(server_default='0', nullable=False)
    chordLength: Mapped[int]= mapped_column(server_default='0', nullable=False) # in mm

    flightPriorities: Mapped[AircraftPriorities]= relationship()

    airfoilData: Mapped[str] = mapped_column(nullable=True)

    initialized: bool = False

    def __init__(self) -> None:
        super().__init__()
        self.intialize()

    def intialize(self):
        if self.initialized:
            return
        self.foldername = f'{my_root}/users/user_sample'

        self.flightTime = self.flightTime if self.flightTime is not None else 0  
        self.weightExpected = self.weightExpected if self.weightExpected is not None else 0  
        self.weightMargins = self.weightMargins if self.weightMargins is not None else 0 
        self.payloadWeight = self.payloadWeight if self.payloadWeight is not None else 0 
        self.speedExpected = self.speedExpected if self.speedExpected is not None else 0  
        self.speedMargins = self.speedMargins if self.speedMargins is not None else 0 
        self.fuselageLengthMax = self.fuselageLengthMax if self.fuselageLengthMax is not None else 0  
        self.AirfoilLengthMax = self.AirfoilLengthMax if self.AirfoilLengthMax is not None else 0 
        self.streamVelocityX = self.streamVelocityX if self.streamVelocityX is not None else 0  
        self.AOA = self.AOA if self.AOA is not None else 0 
        self.simulationType = self.simulationType if self.simulationType is not None else 0 
        self.material = self.material if self.material is not None else 0  
        self.density = self.density if self.density is not None else 0 
        self.selectedAirfoil = self.selectedAirfoil if self.selectedAirfoil is not None else ""
        self.meshQuality = self.meshQuality if self.meshQuality is not None else 0 
        self.chordLength = self.chordLength if self.chordLength is not None else 1 # mm 

        if not path.exists(f"{my_root}/users/{self.user.avatar}"):
            mkdir(f"{my_root}/users/{self.user.avatar}")

        if not path.exists(f"{my_root}/users/{self.user.avatar}/{self.name}"):
            mkdir(f"{my_root}/users/{self.user.avatar}/{self.name}")

        if self.flightPriorities == None:
            f = AircraftPriorities()
            self.flightPriorities = f
            db.session.add(f)
            db.session.commit()
        self.refresh()
        self.initialized = True

    def refresh(self):
        # refresh parameters
        if self.speedExpected > 0:
            a = self.flightPriorities.maneuverability * COST_MANOEUVRABILITY_ON_SPEED \
                 + self.flightPriorities.speed * COST_SPEED_ON_SPEED
            b = self.flightPriorities.payload * COST_PAYLOAD_ON_SPEED
            self.speed = interval(
                    kmh_ms(self.speedExpected - b * self.speedExpected / 5), 
                    kmh_ms(self.speedExpected + a * self.speedExpected / 10),
                    True
                )
        else:
            self.speed = interval(kmh_ms(self.speedExpected), kmh_ms(self.speedMargins))
        self.weight = interval(self.weightExpected, self.weightMargins)
        self.updateCritical()

    def computeReynoldsUnitArea(self):
        # return pow(self.streamVelocityX, 2) * DENSITY_AIR * self.chordLength / VISCOSITY_AIR
        return  interval(
                pow(self.speed.min(), 2) * DENSITY_AIR * (self._chordLength.min() / 100) / VISCOSITY_AIR
                ,
                pow(self.speed.max(), 2) * DENSITY_AIR * (self._chordLength.max() / 100) / VISCOSITY_AIR
                ,
                True
        )

    def computeDetails(self):
        return f"""
        -------------| AIRFOIL INFORMATION  | ------------
        User information:
        Folder: {self.foldername}
        Last updated: {datetime.now().ctime()}

        [GEOMETRY - FIXED WING] 
        - Max wingspan: {self.AirfoilLengthMax}
        - Max fuselage length: {self.fuselageLengthMax}
        - Suggested airfoil: {self.selectedAirfoil}
        - Suggested chord length: {self.chordLength}

        [FLIGHT PARAMETERS]
        - Weight: min ({self.weight.min()}) Kg; max ({self.weight.max()}) Kg
        - Payload weight (max): {self.payloadWeight} Kg
        - Endurance: about ({self.flightTime}) minutes
        - Speed: min ({ms_kmh(self.speed.min())}) km/h; max ({ms_kmh(self.speed.max())}) km/h

        [CONSTRUCTION]
        - Material: {self.material}
        - Density: {self.density}

        [PRIORITIES]
        - maneuverability: {self.flightPriorities.maneuverability} pts
        - stability: {self.flightPriorities.stability} pts
        - payload: {self.flightPriorities.payload} pts
        - speed: {self.flightPriorities.speed} pts
        - endurance: {self.flightPriorities.endurance} pts
        - stall_behavior: {self.flightPriorities.stall_behavior} pts
        - manufacturability: {self.flightPriorities.manufacturability} pts

        --------------------------------------------------

        [COMPUTED]
        - Reynolds Number: {self._reynolds}
        - Required lift force: {self._liftForceRequired} Newtons
        - CL Required per area: {self._CLRequiredForWeightPerArea}
        - Aspect Ratio (AR): {self._aspectRatio}
        - Chord length : {self._chordLength} cm
        """

    def updateCritical(self):
        self._reynolds = -1
        self._liftForceRequired = interval(-1, -1)
        self._CLRequiredForWeightPerArea = interval(-1, -1)
        self._aspectRatio = interval(-1, -1)
        self._chordLength = interval(-1, -1)

        if self.speed.min() == 0:
            return
        # update the critical parameters
        self._liftForceRequired = interval(self.weight.min() * GRAVITY, self.weight.max() * GRAVITY, True)
        self._CLRequiredForWeightPerArea = interval( \
                                                    self._liftForceRequired.min() / (0.5 * pow(self.speed.max() , 2) * DENSITY_AIR), \
                                                    self._liftForceRequired.max() / (0.5 * pow(self.speed.min() , 2) * DENSITY_AIR),
                                                    True
                                                )
        # aspect ratio calculations


        
        a = self.flightPriorities.endurance - self.flightPriorities.maneuverability
        self._aspectRatio = \
                interval( \
                ASPECT_RATIO_LOW + (ASPECT_RATIO_HIGH - ASPECT_RATIO_LOW) * (a + 5) * 0.8 / 10 \
                ,
                ASPECT_RATIO_LOW + (ASPECT_RATIO_HIGH - ASPECT_RATIO_LOW) * (a + 5) * 1.25 / 10, True)
        # For a constant-chord wing of chord c and span b, the aspect ratio is given by b/c
        self._chordLength = interval(
            self.AirfoilLengthMax / self._aspectRatio.max(),
            self.AirfoilLengthMax / self._aspectRatio.min(), True
        )
        self._reynolds = self.computeReynoldsUnitArea()

        # self._forceProduce

    def writeAirfoilToDat(self):
        with open(f"{my_root}/users/{self.user.avatar}/{self.name}/{self.selectedAirfoil}.dat", 'w') as f:
            f.writelines(self.airfoilData.split('$'))

    def runxFoilAseq(self):
        # with open(f"")
        run_xfoil("")

    def computeAirfoilInfo(self):

        return f"""
            -------------| AIRFOIL INFORMATION  | ------------
        * User information:
        * Folder: {self.foldername}
        * Last updated: {datetime.now().ctime()}
        ------------------------------------------------------
        
        """