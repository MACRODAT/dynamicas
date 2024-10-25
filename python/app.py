from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from create_io import list_files_by_folder, list_files_recursively
from utils import list_airfoils, get_airfoil_stl, get_airfoil_dat, get_airfoil_step, get_airfoil_screenshot, create_geometry, create_mesh, create_screenshot, get_airfoil_description
from airfoilGen.generator import naca as nacaFunction
import os

import io


app = Flask(__name__)

# Enable CORS for all origins
CORS(app)

@app.route('/', methods=['GET'])
def home():
    """Home for all airfoils."""
    return jsonify("Home for all airfoils")

@app.route('/airfoils', methods=['GET'])
def get_airfoils():
    """List all airfoils."""
    airfoils = list_airfoils()
    return jsonify(airfoils)

@app.route('/airfoil/<string:airfoil>/stl', methods=['GET'])
def get_stl(airfoil):
    """Get the STL file content for a specific airfoil."""
    try:
        stl_content = get_airfoil_stl(airfoil)
        return send_file(
            io.BytesIO(stl_content),  # Use BytesIO to wrap the bytes
            mimetype='application/sla',
            as_attachment=True,
            download_name=f'{airfoil}.stl'
        )
    except FileNotFoundError:
        return jsonify({"error": "STL file not found"}), 404

@app.route('/airfoil/<string:airfoil>/dat', methods=['GET'])
def get_dat(airfoil):
    """Get the DAT file content for a specific airfoil."""
    try:
        dat_content = get_airfoil_dat(airfoil)
        return send_file(
            io.BytesIO(dat_content),  # Use BytesIO to wrap the bytes
            mimetype='application/text',
            as_attachment=True,
            download_name=f'{airfoil}.dat'
        )
    except FileNotFoundError:
        return jsonify({"error": "STL file not found"}), 404

@app.route('/airfoil/<string:airfoil>/step', methods=['GET'])
def get_step(airfoil):
    """Get the STEP file content for a specific airfoil."""
    try:
        step_content = get_airfoil_step(airfoil)
        return send_file(
            io.BytesIO(step_content),  # Use BytesIO to wrap the bytes
            mimetype='application/sla',
            as_attachment=True,
            download_name=f'{airfoil}.step'
        )
    except FileNotFoundError:
        return jsonify({"error": "STEP file not found"}), 404

@app.route('/airfoil/<string:airfoil>/screenshot', methods=['GET'])
def get_screenshot(airfoil):
    """Get the screenshot for a specific airfoil."""
    try:
        screenshot = get_airfoil_screenshot(airfoil)
        return send_file(
            io.BytesIO(screenshot),
            mimetype='image/png',
            as_attachment=True,
            download_name=f'{airfoil}.png'
        )
    except FileNotFoundError:
        return jsonify({"error": "Screenshot not found"}), 404

@app.route('/airfoil/<string:airfoil>/description', methods=['GET'])
def get_description(airfoil):
    """Get the description for a specific airfoil."""
    try:
        return jsonify({"description": get_airfoil_description(airfoil)})
    except Exception as e:
        return jsonify({"error": "Desc not found", "description": ""}), 404


@app.route('/airfoil/<string:airfoil>/geometry', methods=['POST'])
def create_geo(airfoil):
    """Create geometry for a specific airfoil."""
    method = request.json.get('method')
    wingspan = request.json.get('wingspan')
    params = request.json.get('params')

    if not method or not wingspan or not params:
        return jsonify({"error": "Invalid parameters"}), 400

    try:
        geometry = create_geometry(airfoil, method, wingspan, params)
        return jsonify({"message": "Geometry created"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/airfoil/<string:airfoil>/mesh', methods=['POST'])
def create_airfoil_mesh(airfoil):
    """Create mesh for a specific airfoil."""
    try:
        mesh_success = create_mesh(airfoil)
        return jsonify({"message": "Mesh created", "success": mesh_success}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/airfoil/<string:airfoil>/screenshot/create', methods=['POST'])
def take_screenshot(airfoil):
    """Get the screenshot for a specific airfoil."""
    try:
        screenshot = get_airfoil_screenshot(airfoil)
        return send_file(
            io.BytesIO(screenshot),  # Use BytesIO to wrap the bytes
            mimetype='image/png',
            as_attachment=True,
            download_name=f'{airfoil}.png'
        )
    except FileNotFoundError:
        return jsonify({"error": "Screenshot not found"}), 404

@app.route('/user/<string:username>/dir', methods=['GET'])
def get_dir(username):
    """Will display dir of the user"""
    try:
        return jsonify(list_files_recursively(username))
    except Exception as e:
        return jsonify({"error": "Error in dir", "description": e}), 404 

@app.route('/naca/<string:naca>/<int:n>/txt', methods=['GET'])
def getNacaAirfoilTxt(naca, n):
    """
        Will generate and fetch the NACA dat file
    """
    try:
        try:
            dat = nacaFunction(naca, n, save=False)
        except Exception as e:
            return jsonify({"success": False, "message": "No naca function."})
        return jsonify({"success": True, "data": dat})
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

@app.route('/naca/<string:naca>/<int:n>/dat', methods=['GET'])
def getNacaAirfoilDat(naca, n):
    """
        Will generate and fetch the NACA dat file
    """
    try:
        try:
            dat = nacaFunction(naca, n, save=False)
        except Exception as e:
            return jsonify({"success": False, "message": "No naca function."})
        dat_content = '\n'.join(f"{x}   {y}" for x, y in zip(dat[0],dat[1]))
        
        dat_io = io.BytesIO()
        dat_io.write(dat_content.encode('utf-8'))
        dat_io.seek(0)

        return send_file(
            dat_io,
            mimetype='application/txt',
            as_attachment=True,
            download_name=f'NACA_{naca}_{n}.dat'
        )
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

@app.route('/naca/<string:naca>/<int:n>/png', methods=['GET'])
def getNacaAirfoilImage(naca, n):
    """
        Will generate and fetch the NACA dat file
    """
    try:
        try:
            dat = nacaFunction(naca, n, save=False, uploadImage=True)
        except Exception as e:
            return jsonify({"success": False, "message": "No naca function."})
        dat.seek(0)
        return send_file(
            dat,
            mimetype='image/png',
            as_attachment=True,
            download_name=f'NACA_{naca}_{n}.png'
        )
    except Exception as e:
        return jsonify({"success": False, "message": e.args[0]})

if __name__ == '__main__':
    app.run(debug=True)
