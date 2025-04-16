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
    data = request.json
    
    # data = [
    #     {"setor": "Caldeira", "Ocorrências": 1},
    #     {"setor": "Elétrica", "Ocorrências": 16},
    #     {"setor": "Mecânica", "Ocorrências": 10},
    #     {"setor": "Caldeiraa", "Ocorrências": 2},
    #     {"setor": "Elétricaa", "Ocorrências": 17},
    #     {"setor": "Mecânicaa", "Ocorrências": 11},
    # ]
    
    df = pd.DataFrame(data)
    
    fig = px.bar(df, x="setor", y="Ocorrências")
    
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
    data = request.json

    # data = [
    #     {"setor": "Caldeira", "Ocorrências": 1},
    #     {"setor": "Elétrica", "Ocorrências": 16},
    #     {"setor": "Mecânica", "Ocorrências": 10},
    #     {"setor": "Caldeiraa", "Ocorrências": 2},
    #     {"setor": "Elétricaa", "Ocorrências": 17},
    #     {"setor": "Mecânicaa", "Ocorrências": 11},
    # ]
    
    df = pd.DataFrame(data)
    
    fig = px.bar(df, x="_id", y="quantidade")
    
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)