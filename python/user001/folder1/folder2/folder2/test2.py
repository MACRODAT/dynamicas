import pyvista as pv
import numpy as np

# NACA airfoil coordinates for the upper and lower surface
naca_airfoil = np.array([
    (1.000000, 0.001890),
    (0.950000, 0.012100),
    (0.900000, 0.021720),
    (0.800000, 0.039350),
    (0.700000, 0.054960),
    (0.600000, 0.068450),
    (0.500000, 0.079410),
    (0.400000, 0.087050),
    (0.300000, 0.090030),
    (0.250000, 0.089120),
    (0.200000, 0.086060),
    (0.150000, 0.080180),
    (0.100000, 0.070240),
    (0.075000, 0.063000),
    (0.050000, 0.053320),
    (0.025000, 0.039220),
    (0.012500, 0.028410),
    (0.000000, 0.000000),  # Trailing edge
    (0.012500, -0.028410), # Lower surface
    (0.025000, -0.039220),
    (0.050000, -0.053320),
    (0.075000, -0.063000),
    (0.100000, -0.070240),
    (0.150000, -0.080180),
    (0.200000, -0.086060),
    (0.250000, -0.089120),
    (0.300000, -0.090030),
    (0.400000, -0.087050),
    (0.500000, -0.079410),
    (0.600000, -0.068450),
    (0.700000, -0.054960),
    (0.800000, -0.039350),
    (0.900000, -0.021720),
    (0.950000, -0.012100),
    (1.000000, -0.001890)   # Leading edge point
])

# Create a PolyData object for the 2D airfoil
points = np.hstack((naca_airfoil, np.zeros((naca_airfoil.shape[0], 1))))  # Add Z=0 for 2D
lines = np.arange(0, len(naca_airfoil)).reshape(-1, 2)
lines = np.append(lines, [[len(naca_airfoil)-1, 0]], axis=0)  # Close the loop

# Create polyline
airfoil_2d = pv.PolyData(points, np.hstack(([2] * lines.shape[0], lines.flatten())))

# Extrude the 2D airfoil to create a 3D wing with a wingspan of 4 meters
wingspan = 4.0  # meters
airfoil_3d = airfoil_2d.extrude([0, 0, wingspan])

# Visualize the 3D airfoil
plotter = pv.Plotter()
plotter.add_mesh(airfoil_3d, color="lightblue", show_edges=True)
plotter.show()

# Optionally, you can save the airfoil as an STL file for further use
airfoil_3d.save('naca_airfoil_3d_wing.stl')
