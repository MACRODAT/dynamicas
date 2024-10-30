import pyfoil
airfoil=pyfoil.Airfoil.compute_naca(3315).normalized()
airfoil2=pyfoil.Airfoil.import_from_dat("ClarkY.dat")
Result = airfoil2._repr_svg_()
with open("airfoil2.svg", 'w') as f:
    f.write(Result)
res = airfoil.xfoil_aoa(5, degree=True)
print(res.reynolds)
print(airfoil.xfoil_aoa(5, degree=True))
print(airfoil2.xfoil_aoa(5, degree=True))
