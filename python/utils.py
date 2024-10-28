import os
from create_geo_airfoil import create_geometry_from_file
from create_mesh import generate_mesh_from_step
from create_view import create_screenshot as cs
from typing import List

# Specify the folder path
from os import path
folder_path = path.dirname(path.realpath(__file__)) + '/airfoils/'

def list_airfoils() -> List[str]:
    # List all .dat files in the folder
    dat_files = [f.split('.')[0] for f in os.listdir(folder_path) if f.endswith('.dat')]
    return dat_files

def get_airfoil_stl(airfoil: str) -> bytes:
    path_ = folder_path + airfoil + ".dat.stl"
    with open(path_, "rb") as f:
        return f.read()

def get_airfoil_dat(airfoil: str) -> bytes:
    path_ = folder_path + airfoil + ".dat"
    with open(path_, "rb") as f:
        return f.read()

def get_airfoil_step(airfoil: str) -> bytes:
    path_ = folder_path + airfoil + ".dat.step"
    with open(path_, "rb") as f:
        return f.read()

def get_airfoil_screenshot(airfoil: str) -> bytes:
    path_ = folder_path + airfoil + ".dat.stl.png"
    with open(path_, "rb") as f:
        return f.read()
     

def create_geometry(airfoil: str, method: str, wingspan: float, params: List[float]):
    from base import airfoilFile
    a = airfoilFile("airfoils/" + airfoil + ".dat")
    a.recenterX(-0.5)
    a.scale(1000)
    return create_geometry_from_file(a, wingspan, method, [], airfoil)

def create_mesh(airfoil_file: str):
    # def generate_mesh_from_step(step_file: str, mesh_file: str):
    generate_mesh_from_step(airfoil_file, airfoil_file + ".mesh")
    return True

def create_screenshot(airfoil_file: str):
    cs(airfoil_file)
    return True

def get_airfoil_description(airfoil: str) -> str:
    descriptions = {
        "NACA_23012": (
            "The NACA 23012 is a symmetrical airfoil with a maximum camber of 2% located at 30% of the chord length. "
            "It is commonly used in general aviation applications, particularly in aircraft wings where moderate lift "
            "and drag characteristics are needed. Its performance is suitable for aerobatic aircraft, providing good "
            "control and maneuverability."
        ),
        "ClarkY": (
            "The Clark Y airfoil is a popular cambered airfoil known for its simplicity and effectiveness in providing lift. "
            "It is frequently used in light aircraft and gliders due to its favorable lift-to-drag ratio and stall "
            "characteristics. It is also often employed in model aircraft due to its forgiving nature and ease of construction."
        ),
        "test": (
            "The term 'test' likely refers to an experimental or specific test airfoil with unique characteristics, "
            "often used in research and development settings. Such airfoils are typically used in wind tunnel testing "
            "or computational fluid dynamics (CFD) simulations to analyze various performance characteristics, allowing "
            "engineers to refine designs for efficiency or performance."
        ),
        "AG35": (
            "The AG35 airfoil is designed for agricultural aircraft, offering a good balance of lift and drag. This airfoil "
            "is commonly used in agricultural applications, such as crop dusters, where low-speed performance and stability "
            "are crucial for effective spraying and maneuverability in tight spaces."
        ),
        "MH32": (
            "The MH32 airfoil is known for its good lift-to-drag ratio and efficient performance at various angles of attack. "
            "It is used in sailplanes and other gliders for its excellent aerodynamic characteristics, allowing for long "
            "gliding distances and stable flight at low speeds. It can also be found in some UAV designs where efficiency is paramount."
        ),
        "E387": (
            "The E387 airfoil is a modified version of the Eppler airfoils, designed for low drag and high lift at low Reynolds numbers. "
            "This airfoil is often utilized in small UAVs, model aircraft, and slow-flying vehicles, where low-speed performance is critical. "
            "Its design helps improve lift during slow flight conditions, making it suitable for applications like aerial photography and surveillance."
        ),
        "RG15": (
            "The RG15 airfoil has a moderate camber and is known for its efficient lift characteristics at low to moderate speeds. "
            "It is commonly used in general aviation and UAV applications where stability and control are essential. "
            "The RG15 provides good performance in gliders, offering a good lift-to-drag ratio during slow flight."
        ),
        "NACA_2412": (
            "The NACA 2412 is a cambered airfoil with a maximum camber of 2% located at 40% of the chord length, designed for improved lift characteristics. "
            "This airfoil is widely used in general aviation aircraft, particularly in trainers and light aircraft. Its design offers good stall "
            "characteristics and predictable performance, making it ideal for flight training and recreational flying."
        ),
        "SELIG_S1223": (
            "The SELIG S1223 is a modern airfoil developed for high lift and low drag, featuring a supercritical design. "
            "This airfoil is commonly found in sailplanes and high-performance gliders, where maximizing lift at low speeds is essential. "
            "Its aerodynamic efficiency makes it ideal for long-distance gliding and competition flying."
        ),
    }
    
    return descriptions.get(airfoil, "Description not available for the given airfoil.")
