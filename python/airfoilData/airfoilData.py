import numpy as np
from airfoilGen import generator
from flask_login import current_user

DENSITY_AIR = 1.225
VISCOSITY_AIR = 1.81 * 10 ^ (-5)

# cur folder
from os import path
__my_root = path.pardir(path.realpath(__file__)) 

class interval:
    def __init__(self, val, margins) -> None:
        self.val = val
        self.margins = margins

# Fixed wing project
class FWProject:

    def __init__(self,
                 _flightTime, 
                 _weightExpected, _weightMargins,
                 _payloadWeight,
                 _speedExpected, _speedMargins,
                 _fuselageLengthMax, _AirfoilLengthMax,
                 _streamVelocityX, _AOA,
                 _simulationType,
                 _material, _density,
                 _selectedAirfoil,
                 _meshQuality,
                 _chordLength
                 ) -> None:
        self.flightTime = _flightTime
        self.weight: interval = interval(_weightExpected, _weightMargins)
        self.speed: interval = interval(_speedExpected, _speedMargins)
        self.fuselageMaxLength = _fuselageLengthMax
        self.streamVelocityX = _streamVelocityX
        self.material = _material
        self.density = _density
        self.meshQuality = _meshQuality
        self.selectedAirfoil = _selectedAirfoil
        self.simulationType = _simulationType
        self.payloadWeight = _payloadWeight
        self.chordLength = _chordLength

        self._reynolds = self.computeReynoldsUnitArea()

    def computeReynoldsUnitArea(self):
        return self.streamVelocityX ^ 2 * DENSITY_AIR * self.chordLength / VISCOSITY_AIR


class airfoil_data:
    
    def __init__(self, source="", naca="", pts=[], n_points=200) -> bool: #success?
        self.source = source
        self.n_points = n_points
        if source == "naca":
            self.naca = naca
        elif source == "data":
            self.pts = np.array(pts)
        else:
            return False
        # what about scaling for a chordlength

        return True

    def initializePtsFromNACA(self) -> bool:
        # will take a naca and generate some points
        if self.naca == "" or len(self.naca) not in [4,5]:
            return False
        naca = generator.naca(self.naca, self.n_points)
        with open(f'{__my_root}\{current_user.avatar}', 'w') as f:
            f.write(naca)
        self.pts = np.array(naca)