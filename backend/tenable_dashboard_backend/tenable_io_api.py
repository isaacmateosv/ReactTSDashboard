from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app


@app.route('/get_plugin_info', methods=['GET'])
def get_plugin_info():
    xyz = request.args.get('xyz')
    yyy = request.args.get('yyy')
    zzz = request.args.get('zzz')

    if not xyz or not yyy or not zzz:
        return jsonify({'error': 'Missing parameters'}), 400

    try:
        headers = {
            'X-ApiKeys': f'accessKey={yyy};secretKey={zzz}',
            'accept': 'application/json'
        }
        url = f'https://cloud.tenable.com/was/v2/plugins/{xyz}'

        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for non-2xx responses

        response_json = response.json()

        return jsonify(response_json)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run()
