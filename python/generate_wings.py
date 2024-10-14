

if __name__ == "__main__":
    import os

    # Specify the folder path
    folder_path = 'airfoils'

    # List all .dat files in the folder
    dat_files = [f for f in os.listdir(folder_path) if f.endswith('.dat')]

    # Print the list of .dat files
    from airfoil_shape import vectors
    from base import airfoilFile
    from create_geo_airfoil import create_geometry_from_file
    from create_view import create_screenshot

    print("DAT files in the folder:")
    for file_ in dat_files:
        file = "airfoils/" + file_
        print(file)
        # a = airfoilFile(file)
        # a.recenterX(-0.5)
        # a.scale(1000)
        # res = create_geometry_from_file(a, 5000, "straight_leading_tappered_trailing", [], file)
        create_screenshot(file + ".stl")
