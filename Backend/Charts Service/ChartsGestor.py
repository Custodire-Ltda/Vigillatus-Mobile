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
        {"setor": "Caldeira", "Ocorrências": 140},
        {"setor": "Elétrica", "Ocorrências": 16},
        {"setor": "Mecânica", "Ocorrências": 200}
    ]
    
    df = pd.DataFrame(data)
    
    # Define uma lista de cores para as barras
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c']
    
    fig = px.bar(df, x="setor", y="Ocorrências", 
                #  title="Ocorrências por Setor", 
                 labels={},
                 color="setor",  # Usar a coluna 'setor' para as cores
                 color_discrete_sequence=colors)  # Define a sequência de cores
    
    fig.update_layout(
        paper_bgcolor='rgba(0,0,0,0)',  # Define fundo transparente
        autosize=True,
        # width=400,
        # height=None,
        font=dict(size=24),
        xaxis_title="",
        yaxis_title="",
        # xaxis_tickvals=[],  # Remove os rótulos do eixo X
        # yaxis_tickvals=[],
        showlegend=False,  # Mostra a legenda
        legend_title_text='Setores',  # Título da legenda
        dragmode=False  # Remove os botões de zoom e seleção
    )
    
    # fig.update_traces(
    #     text=df['setor'],  # Define o texto a ser exibido
    #     textposition='inside',  # Coloca o texto dentro das barras
    #     textangle=-45,  # Inclina o texto em 45 graus
    #     textfont=dict(color='white')  # Define a cor do texto
    # )
    
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
        paper_bgcolor='rgba(0,0,0,0)',  # Define fundo transparente
        autosize=True,
        # width=400,
        # height=None,
        font=dict(size=24),
        xaxis_title="",
        yaxis_title="",
        # xaxis_tickvals=[],  # Remove os rótulos do eixo X
        # yaxis_tickvals=[],
        showlegend=False,  # Mostra a legenda
        # legend_title_text='Setores',  # Título da legenda
        dragmode=False  # Remove os botões de zoom e seleção
    )
    
    graphJSON = plotly.io.to_json(fig, pretty=False)
    return graphJSON