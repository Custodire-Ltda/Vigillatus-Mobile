import time, json
from flask import Flask, request
from flask_cors import CORS
import plotly
import plotly.express as px
import pandas as pd

app = Flask(__name__)

CORS(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/plot', methods=['GET', 'POST'])
def plot_test():
    df = pd.DataFrame({
        "Fruit": ["Apples", "Oranges", "Bananas", "Apples", "Oranges", "Bananas"],
        "Amount": [4, 1, 2, 2, 4, 9],
        "City": ["SF", "SF", "SF", "Montreal", "Montreal", "Montreal"]
    })
    fig = px.bar(df, x="Fruit", y="Amount", color="City", barmode="group")
    graphJSON = plotly.io.to_json(fig, pretty=False, remove_uids=False)
    graphJSONData = json.loads(graphJSON)
    return graphJSONData

@app.route('/GraficoOcorrenciasPorSetor', methods=['GET', 'POST'])
def GraficoOcorrenciasPorSetor():
    # data = request.json
    data = [
        {"setor": "Caldeira", "Occurences": 1},
        {"setor": "Elétrica", "Occurences": 16},
        {"setor": "Mecânica", "Occurences": 10}
    ]
    
    df = pd.DataFrame(data)
    
    fig = px.bar(df, x="setor", y="Occurences")
    
    fig.update_layout(
        paper_bgcolor='rgba(0,0,0,0)',
        autosize=True,
        font=dict(size=24),
        xaxis_title="",
        yaxis_title="",
        showlegend=False,
        legend_title_text='Setores',
        dragmode=False  
    )
    
    graphJSON = plotly.io.to_json(fig)
    return graphJSON

@app.route('/GraficoOcorrenciasPorColaborador', methods=['GET', 'POST'])
def GraficoOcorrenciasPorColaborador():
    data = [
        {"_id": "João Fonseca", "quantidade": 15},
        {"_id": "Kim Wexler", "quantidade": 10},
        {"_id": "Jimmy McGill", "quantidade": 5},
        {"_id": "Howard Hamlin", "quantidade": 3},
        {"_id": "Walter White", "quantidade": 4}
    ]
    
    df = pd.DataFrame(data)
    fig = px.bar(df, x="quantidade", y="_id", orientation='h', title="Ocorrências por Colaborador", labels={"quantidade": "Quantidade de Ocorrências", "_id": "Colaborador"})
    
    fig.update_layout(
        paper_bgcolor='rgba(0,0,0,0)',
        autosize=True,
        font=dict(size=24),
        xaxis_title="",
        yaxis_title="",
        showlegend=False,
        dragmode=False 
    )
    
    graphJSON = plotly.io.to_json(fig, pretty=False)
    return graphJSON

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)