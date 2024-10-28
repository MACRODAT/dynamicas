from werkzeug.security import generate_password_hash, check_password_hash
from configs import db
import numpy as np
from airfoilGen import generator
from sqlalchemy import MetaData, ForeignKey
import sqlalchemy as sa
from sqlalchemy.orm import mapped_column, Mapped, relationship
# from flask_login import current_user

from configs import db
from math import pow
from typing import List

DENSITY_AIR = 1.225
VISCOSITY_AIR = 1.81 * pow(10, -5)
GRAVITY = 9.81

# cur folder
from os import path
my_root = path.dirname(path.realpath(__file__)) 

def abs(n):
    if n < 0:
        return -n
    return n
# db = app.db

class interval:
    def __init__(self, a, b, minMaxFlag=False) -> None:
        if not minMaxFlag:
            self.val = a
            self.margins = b
        else:
            self.val = a + abs(b - a) / 2
            self.margins = abs(b - a)
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

class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    last_name: Mapped[str] = mapped_column(nullable=False)
    # first_name = db.Column(db.String(120), nullable=False)
    # email = db.Column(db.String(120), nullable=False, default="example@email.com")
    # pass_hash = db.Column(db.String(120), nullable=False)
    # avatar = db.Column(db.String(120), unique=True, nullable=False)
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
    name: Mapped[int]= mapped_column(nullable=False)
    description: Mapped[int]= mapped_column()
    foldername: Mapped[int]= mapped_column()    

    # Foreign key linking to the User model
    user_id: Mapped[int]= mapped_column(ForeignKey("users.id"))

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
    selectedAirfoil: Mapped[int]= mapped_column(server_default='0', nullable=False)
    meshQuality: Mapped[int]= mapped_column(server_default='0', nullable=False)
    chordLength: Mapped[int]= mapped_column(server_default='0', nullable=False)


    def __init__(self) -> None:
        super().__init__()

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
        self.selectedAirfoil = self.selectedAirfoil if self.selectedAirfoil is not None else 0 
        self.meshQuality = self.meshQuality if self.meshQuality is not None else 0 
        self.chordLength = self.chordLength if self.chordLength is not None else 0 

        self.speed = interval(self.speedExpected, self.speedMargins)
        self.weight = interval(self.weightExpected, self.weightMargins)
        self.updateCritical()

    def computeReynoldsUnitArea(self):
        return pow(self.streamVelocityX, 2) * DENSITY_AIR * self.chordLength / VISCOSITY_AIR

    def updateCritical(self):
        if self.weight.min() == 0:
            return
        # update the critical parameters
        self._reynolds = self.computeReynoldsUnitArea()
        self._liftForceRequired = interval(self.weight.min() * GRAVITY, self.weight.max() * GRAVITY, True)
        self._CLRequiredForWeightPerArea = interval( \
                                                    self._liftForceRequired.min() / (0.5 * pow(self.speed.max() , 2) * DENSITY_AIR), \
                                                    self._liftForceRequired.max() / (0.5 * pow(self.speed.min() , 2) * DENSITY_AIR)
                                                )
        # self._forceProduce
