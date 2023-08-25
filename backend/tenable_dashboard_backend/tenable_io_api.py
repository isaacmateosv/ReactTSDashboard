from flask import Flask, request, jsonify, Response
import requests
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# MongoDB Atlas connection setup
uri = "mongodb+srv://isaac_sarzosa:ynEOum1xSVLlUcgO@gr.b81h7hu.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['Tenable_io']
collection = db['WASTool']


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


@app.route('/download-collection', methods=['GET'])
def download_collection():
    try:
        # Download MongoDB collection and serve as JSON
        mongo_data = list(collection.find())
        serialized_data = json_util.dumps(
            mongo_data)  # Serialize using json_util
        response = Response(serialized_data, content_type='application/json')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run()
