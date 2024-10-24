from base import point, airfoilFile
from typing import List
import cadquery as cq
import numpy as np

def create_geometry_from_file(points_: airfoilFile, wingspan: float, profiling_method: str, params: List[float], output: str = "airfoil_extruded"):
    # points_geo = [pt.to_point() for pt in points]
    points : List[tuple] = points_.arr

    # Create a wire (outline) from the 2D points
    airfoil_wire = cq.Workplane("XY").spline(points).close()

    if profiling_method == "simple_extrusion":
        # Extrude the 2D wire along the z-axis to create a 3D shape
        airfoil_3d = airfoil_wire.extrude(wingspan)
    
    elif profiling_method == "polynomial_sweep":
        # Define a polynomial path for sweeping the airfoil along
        # Example: y = ax^2 + bx + c
        # a, b, c = params  # Polynomial coefficients passed in 'params'
        # num_points = 100  # Number of points on the sweep path
        # path_points = [(x, a*x**(1/2)) for x in np.linspace(0, wingspan, num_points)]
        
        # Create the path from the calculated polynomial points
        # path_wire = cq.Workplane("XZ").spline(path_points)

        # Sweep the 2D airfoil wire along the polynomial path
        # airfoil_3d = airfoil_wire.sweep(path_wire)
        
        points_.scale(0.7)
        path_wire_far = cq.Workplane("XZ").spline(points).close() \
                            .workplane(offset=wingspan).spline(points_.arr).close() \
                            .loft(combine=True)
    elif profiling_method == "tappered_leading_straight_trailing":
        points_.scaleAndRecenterAtTrailingEdge(0.7)
        path_wire_far = cq.Workplane("XZ").spline(points).close() \
                            .workplane(offset=wingspan).spline(points_.arr).close() \
                            .loft(combine=True)
    elif profiling_method == "straight_leading_tappered_trailing":
        points_.scaleAndRecenterAtLeadingEdge(0.7)
        path_wire_far = cq.Workplane("XZ").spline(points).close() \
                            .workplane(offset=wingspan).spline(points_.arr).close() \
                            .loft(combine=True)
    elif profiling_method == "tappered_leading_tappered_trailing":
        points_.scaleAndRecenterAtBothEdge(0.7)
        path_wire_far = cq.Workplane("XZ").spline(points).close() \
                            .workplane(offset=wingspan).spline(points_.arr).close() \
                            .loft(combine=True)



    # Export the 3D model to an STL file
    path_wire_far.val().exportStl(output + ".stl")
    path_wire_far.val().exportStep(output + ".step")

    print("STL file created: airfoil_extruded.stl")

    return path_wire_far


if __name__ == "__main__":
    from airfoil_shape import vectors
    from base import airfoilFile
    a = airfoilFile("naca2412.dat")
    a.recenterX(-0.5)
    a.scale(1000)

    # create_geometry_from_file(a, 1000, "simple_extrusion", [])
    a_ = 100
    b = 0.02
    c = 0.01
    #res = create_geometry_from_file(a, 10000, "polynomial_sweep", [])
    # res = create_geometry_from_file(a, 5000, "tappered_leading_tappered_trailing", [])
