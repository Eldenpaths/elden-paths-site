
from flask import Flask, jsonify
import subprocess
import datetime
import os

app = Flask(__name__)

@app.route('/run_bundler', methods=['GET'])
def run_bundler():
    try:
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        result = subprocess.run(['python3', 'world_bundler.py'], capture_output=True, text=True)

        return jsonify({
            'status': 'success',
            'message': f'World bundler triggered at {timestamp}.',
            'output': result.stdout
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
