from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace these values with your Tenable API access keys
ACCESS_KEY = ""
SECRET_KEY = ""

# SecurityCenter API base URL
API_BASE_URL = "https://your-tenable-sc-api-url/rest"


@app.route('/get_plugin_info', methods=['GET'])
def get_plugin_info():
    plugin_id = request.args.get('plugin_id')

    if not plugin_id:
        return jsonify({"error": "Plugin ID not provided."}), 400

    # Set up headers with authentication
    headers = {
        'X-ApiKeys': f"accessKey={ACCESS_KEY}; secretKey={SECRET_KEY}",
        'Content-Type': 'application/json'
    }

    # Make the API request to fetch plugin information
    url = f"{API_BASE_URL}/plugin/{plugin_id}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        plugin_info = response.json()
        return jsonify(plugin_info), 200
    elif response.status_code == 404:
        return jsonify({"error": "Plugin not found."}), 404
    else:
        return jsonify({"error": "Failed to fetch plugin information."}), 500


if __name__ == '__main__':
    app.run(debug=True)
