import subprocess
import numpy as np
from matplotlib import pyplot as plt
# import pyxfoil

from os import path, environ
path_ = path.dirname(path.realpath(__file__))

def run_xfoil(airfoil="DATA ClarkY.dat", userFolder="users/user001", 
                reynolds=2000000, alpha_start=0, alpha_end=10, alpha_step=1):
    res = f"{path_}/users/{userFolder}/res.txt"
    err = f"{path_}/users/{userFolder}/err.txt"
    # Prepare the commands to input to XFOIL
    commands = f"""
    {airfoil}
    PLOP
    G
    
    OPER
    VISC {reynolds}
    PACC
    {res}
    {err}
    ASEQ {alpha_start} {alpha_end} {alpha_step}
    QUIT
    """

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

if __name__ == "__main__":
    # Example usage
    alpha, cl, cd, ld_ratio = run_xfoil('2212', 3000000, 0, 10, 1)
    for a, cl_val, cd_val, ld in zip(alpha, cl, cd, ld_ratio):
        print(f"Alpha: {a}, Cl: {cl_val}, Cd: {cd_val}, L/D: {ld}")
    plt.plot(alpha, cl)