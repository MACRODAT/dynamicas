# import numpy as np
# from airfoilGen import generator
# from sqlalchemy import MetaData
# # from flask_login import current_user

# from configs import db
# from math import pow

# from python.models import User

# DENSITY_AIR = 1.225
# VISCOSITY_AIR = 1.81 * pow(10, -5)
# GRAVITY = 9.81

# # cur folder
# from os import path
# __my_root = path.dirname(path.realpath(__file__)) 

# def abs(n):
#     if n < 0:
#         return -n
#     return n
# # db = app.db

# class interval:
#     def __init__(self, a, b, minMaxFlag) -> None:
#         if not minMaxFlag:
#             self.val = a
#             self.margins = b
#         else:
#             self.val = a + abs(b - a) / 2
#             self.margins = abs(b - a)
#     def max(self):
#         self.val + self.margins
#     def min(self):
#         self.val - self.margins

# # Define Project model
# class Project(db.Model):
#     # __tablename__ = 'projects'
#     metadata = MetaData()

#     if not metadata.tables.get('projects'):
#         __tablename__ = "projects"
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.String(500))
#     foldername = db.Column(db.String(100))    
#     # Foreign key linking to the User model
#     user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

#     flightTime = db.Column(db.Integer) 
#     weightExpected = db.Column(db.Integer) 
#     weightMargins = db.Column(db.Integer)
#     payloadWeight = db.Column(db.Integer)
#     speedExpected = db.Column(db.Integer) 
#     speedMargins = db.Column(db.Integer)
#     fuselageLengthMax = db.Column(db.Integer) 
#     AirfoilLengthMax = db.Column(db.Integer)
#     streamVelocityX = db.Column(db.Integer) 
#     AOA = db.Column(db.Integer)
#     simulationType = db.Column(db.Integer)
#     material = db.Column(db.Integer) 
#     density = db.Column(db.Integer)
#     selectedAirfoil = db.Column(db.Integer)
#     meshQuality = db.Column(db.Integer)
#     chordLength = db.Column(db.Integer)


#     def __init__(self) -> None:
#         super().__init__()
#         self.speed = interval(self.speedExpected, self.speedMargins)
#         self.weight = interval(self.weightExpected, self.weightMargins)
#         self.updateCritical()

#     def computeReynoldsUnitArea(self):
#         return self.streamVelocityX ^ 2 * DENSITY_AIR * self.chordLength / VISCOSITY_AIR

#     def updateCritical(self):
#         # update the critical parameters
#         self._reynolds = self.computeReynoldsUnitArea()
#         self._liftForceRequired = interval(self.weight.min() * GRAVITY, self.weight.max() * GRAVITY, True)
#         self._CLRequiredForWeightPerArea = interval( \
#                                                     self._liftForce.min() / (0.5 * (self.speed.max() ^ 2) * DENSITY_AIR), \
#                                                     self._liftForce.max() / (0.5 * (self.speed.min() ^ 2) * DENSITY_AIR)
#                                                 )
#         self._forceProduce


# current_user = ""

# class airfoil_data:
    
#     def __init__(self, source="", naca="", pts=[], n_points=200) -> bool: #success?
#         self.source = source
#         self.n_points = n_points
#         if source == "naca":
#             self.naca = naca
#         elif source == "data":
#             self.pts = np.array(pts)
#         else:
#             return False
#         # what about scaling for a chordlength

#         return True

#     def initializePtsFromNACA(self) -> bool:
#         # will take a naca and generate some points
#         if self.naca == "" or len(self.naca) not in [4,5]:
#             return False
#         naca = generator.naca(self.naca, self.n_points)
#         with open(f'{__my_root}\{current_user}', 'w') as f:
#             f.write(naca)
#         self.pts = np.array(naca)

# # Fixed wing project
# # class FWProject:

# #     def __init__(self,
# #                  _flightTime, 
# #                  _weightExpected, _weightMargins,
# #                  _payloadWeight,
# #                  _speedExpected, _speedMargins,
# #                  _fuselageLengthMax, _AirfoilLengthMax,
# #                  _streamVelocityX, _AOA,
# #                  _simulationType,
# #                  _material, _density,
# #                  _selectedAirfoil,
# #                  _meshQuality,
# #                  _chordLength
# #                  ) -> None:
# #         self.flightTime = _flightTime
# #         self.weight: interval = interval(_weightExpected, _weightMargins)
# #         self.speed: interval = interval(_speedExpected, _speedMargins)
# #         self.fuselageMaxLength = _fuselageLengthMax
# #         self.streamVelocityX = _streamVelocityX
# #         self.material = _material
# #         self.density = _density
# #         self.meshQuality = _meshQuality
# #         self.selectedAirfoil = _selectedAirfoil
# #         self.simulationType = _simulationType
# #         self.payloadWeight = _payloadWeight
# #         self.chordLength = _chordLength

# #         self._reynolds = self.computeReynoldsUnitArea()

# #     def computeReynoldsUnitArea(self):
# #         return self.streamVelocityX ^ 2 * DENSITY_AIR * self.chordLength / VISCOSITY_AIR

