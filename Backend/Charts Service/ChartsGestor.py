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

@app.route('/GraficoOcorrenciasPorSetor', methods=['POST'])
def GraficoOcorrenciasPorSetor():
    data = request.json # dados que serão usados para construir os gráficos. 
    
    df = pd.DataFrame(data)
    
    # Define uma lista de cores para as barras
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c']
    
    fig = px.bar(df, x="setor", y="Ocorrências", 
                #  title="Ocorrências por Setor", 
                 labels={},
                 color="setor",
                 color_discrete_sequence=colors)
    
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

@app.route('/GraficoOcorrenciasPorColaborador', methods=['POST'])
def GraficoOcorrenciasPorColaborador():
    data = request.json # dados que serão usados para construir os gráficos.
    
    df = pd.DataFrame(data)
    fig = px.bar(df, x="quantidade", y="_id", orientation='h', title="Ocorrências por Colaborador", labels={"quantidade": "Quantidade de Ocorrências", "_id": "Colaborador"})
    graphJSON = plotly.io.to_json(fig, pretty=False)
    return graphJSON