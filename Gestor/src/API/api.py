from flask import Flask, request, jsonify
from flask_cors import CORS
import plotly
import plotly.express as px
import pandas as pd
import random
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/GraficoOcorrenciasPorSetor', methods=['POST'])
def GraficoOcorrenciasPorSetor():
    setores = ['Setor A', 'Setor B', 'Setor C', 'Setor D', 'Setor E']
    ocorrencias = [random.randint(10, 100) for _ in setores]  
    
    # Criando dataframe simulado
    data = {
        'setor': setores,
        'Ocorrências': ocorrencias
    }
    df = pd.DataFrame(data)
    
    # Cor das Barras
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
    
    # Criando gráfico de barras com Plotly
    fig = px.bar(df, x="setor", y="Ocorrências", 
                 title="Ocorrências por Setor", 
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
    return jsonify(graphJSON)

if __name__ == '__main__':
    app.run(debug=True)
