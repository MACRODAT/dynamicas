import pyvista as pv
import numpy as np



def create_screenshot(stl_file: str):
    # Load your STL or STEP file
    mesh = pv.read(stl_file)  # Replace with your STL or STEP file


    # Set up the plotter
    plotter = pv.Plotter(off_screen=True)
    plotter.add_mesh(mesh, color="lightblue", show_edges=False)



    plotter.view_xz()  # This sets the view to the XY plane (front view)

    # Rotate the camera 45 degrees around the X-axis
    # Get the current camera position
    # camera_position = plotter.camera.position

    # Set the new camera position
    # plotter.camera.position = new_camera_position
        
    # Optional: Adjust the camera zoom (if needed)
    plotter.camera.zoom(5)  # Adjust the zoom level as necessary

    # Render and save the view as an image
    # png = plotter.show(screenshot=True)
    plotter.screenshot(stl_file + ".png")