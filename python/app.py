from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from utils import list_airfoils, get_airfoil_stl, get_airfoil_step, get_airfoil_screenshot, create_geometry, create_mesh, create_screenshot, get_airfoil_description
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
    except e:
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

if __name__ == '__main__':
    app.run(debug=True)
