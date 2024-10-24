import gmsh

def generate_mesh_from_step(step_file: str, mesh_file: str):
    gmsh.initialize()
    gmsh.open(step_file)

    # Set mesh options
    gmsh.option.setNumber("Mesh.CharacteristicLengthMin", 0.01)
    gmsh.option.setNumber("Mesh.CharacteristicLengthMax", 0.1)

    # Generate 3D mesh
    gmsh.model.mesh.generate(3)

    # Export to STL or MSH format
    gmsh.write(mesh_file)

    gmsh.finalize()

# Usage
if __name__ == "__main__":
    generate_mesh_from_step('airfoil_extruded.stl', 'airfoil_mesh.msh')
