from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/GraficoOcorrenciasPorSetor', methods=['GET'])
def GraficoOcorrenciasPorSetor():
    setores = ['Setor A', 'Setor B', 'Setor C', 'Setor D', 'Setor E']
    ocorrencias = [random.randint(10, 100) for _ in setores]  
    
    # Estruturando os dados para o frontend
    data = {
        'labels': setores,
        'values': ocorrencias
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
