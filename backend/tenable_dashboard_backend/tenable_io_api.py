from flask import Flask, request, Response
import json

app = Flask(__name__)


@app.route('/get_plugin_info', methods=['GET'])
def get_plugin_info():
    xyz = request.args.get('xyz')
    yyy = request.args.get('yyy')
    zzz = request.args.get('zzz')

    # Perform your desired logic here, e.g., fetching plugin info based on XYZ, YYY, and ZZZ.
    # Replace this dummy data with your actual logic to get the desired JSON data.
    plugin_info = {
        "xyz": xyz,
        "yyy": yyy,
        "zzz": zzz,
        "data": {
            "key1": "value1",
            "key2": "value2"
        }
    }

    # Convert the plugin_info dictionary to JSON format
    json_data = json.dumps(plugin_info)

    # Set the Content-Disposition header to force download as "PluginInfo.json"
    response = Response(json_data, content_type='application/json')
    response.headers['Content-Disposition'] = 'attachment; filename=PluginInfo.json'

    return response


if __name__ == '__main__':
    app.run()
