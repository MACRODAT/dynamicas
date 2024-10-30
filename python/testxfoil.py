import subprocess
import numpy as np
# import pyxfoil

from os import path, environ
path_ = path.dirname(path.realpath(__file__))


# pyxfoil.set_workdir(path_)
# x = pyxfoil.Xfoil('NACA 1112')
# x.points_from_dat('./airfoils/AG35.dat')
# x.set_ppar(300)

# al = [-2.0, 0.0, 4.0, 6.0]
# mach = 0.1
# re = 100000.0
# ax1 = x.plot_profile(ls='-')
# for ali in al:
#     rescase = x.run_result(ali, mach=mach, re=re)

def run_xfoil(airfoil, reynolds, alpha_start, alpha_end, alpha_step):
    res = path_ + "/res.txt"
    err = path_ + "/err.txt"
    # Prepare the commands to input to XFOIL
    commands = f"""
    NACA {airfoil}
    OPER
    VISC {reynolds}
    PACC
    {res}
    {err}
    ASEQ {alpha_start} {alpha_end} {alpha_step}
    QUIT
    """
    # Run XFOIL as a subprocess
    environ["DISPLAY"] = ":0"
    # Specify the path to the .exe application
    windows_exe_path = "c://xfoil//xfoil.exe"  # Adjust as needed

    # Launch the .exe using subprocess
    subprocess.run(["/mnt/c/Windows/System32/cmd.exe", "/c", windows_exe_path])
    # Launch the .exe using Popen
    process = subprocess.Popen(
        ["/mnt/c/Windows/System32/cmd.exe", "/c", windows_exe_path],
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE,
        text=True  # Ensures output is in string format (Python 3.7+)
    )
    
    output, error = process.communicate(commands)

    # Capture output and error streams in real-time
    for line in process.stdout:
        print(line.strip())  # Print output as it appears

    # Wait for process to complete
    process.wait()
    

    process = subprocess.Popen(['xfoil'], stdin=subprocess.PIPE, \
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    output, error = process.communicate(commands)

    with open("results.txt", 'w') as f:
        f.write(output)
    with open("errors.txt", 'w') as f:
        f.write(error)

    # Load the results from the output file
    try:
        data = np.loadtxt(res, skiprows=13)  # Skip XFOIL header rows
        alpha, cl, cd, cm = data[:, 0], data[:, 1], data[:, 2], data[:, 4]
        ld_ratio = cl / cd
        return alpha, cl, cd, ld_ratio
    except Exception as e:
        print(f"Error loading results: {e}")
        return None

# Example usage
alpha, cl, cd, ld_ratio = run_xfoil('2212', 3000000, 0, 10, 1)
for a, cl_val, cd_val, ld in zip(alpha, cl, cd, ld_ratio):
    print(f"Alpha: {a}, Cl: {cl_val}, Cd: {cd_val}, L/D: {ld}")
