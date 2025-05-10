import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Dimensions, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { fetchOccurrencesData, fetchGraphData } from '../../API/api';
import base64js from 'base64-js';
import Gestor from '../../API/Gestor';

const decodeBData = (bdata, dtype) => { // Transforma o base64 do JSON para array de inteiros.
  const bytes = base64js.toByteArray(bdata);
  
  // Converter Uint8Array para array de números
  const numbers = Array.from(bytes);

  switch (dtype) {
    case 'i1':
      return numbers.map(b => b << 24 >> 24); // Trata sinal
    case 'u1':
      return numbers;
    default:
      return numbers;
  }
};

const screenHeight = Dimensions.get('window').height;
const graphHeight = screenHeight * 0.4;

const GraphComponent = () => {
  const [plotOccurences, setPlotOccurences] = useState(null);
  const [plotOccurencesColaborador, setPlotOccurencesColaborador] = useState(null);
  const [loading, setLoading] = useState(true);

  const convertPlotlyData = (plotData) => {
    return plotData.map(trace => {
      const newTrace = { ...trace };

      // Processa o eixo X
      if (trace.x && trace.x.bdata) {
        newTrace.x = decodeBData(trace.x.bdata, trace.x.dtype);
      } else if (!Array.isArray(trace.x)) {
        newTrace.x = Object.values(trace.x);
      }

      // Processa o eixo Y
      if (trace.y && trace.y.bdata) {
        newTrace.y = decodeBData(trace.y.bdata, trace.y.dtype);
      } else if (!Array.isArray(trace.y)) {
        newTrace.y = Object.values(trace.y);
      }

      return newTrace;
    });
  };
  
  const gestorService = new Gestor();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gestorInfo = await gestorService.getLoggedGestor();
        const gestorToken = await gestorService.getToken();

        const responseOcurrences = await fetchOccurrencesData(gestorInfo._id, gestorToken);
        const responseOccurencesColaborador = await fetchGraphData(gestorInfo._id, gestorToken);

        responseOcurrences.data = convertPlotlyData(responseOcurrences.data);
        responseOccurencesColaborador.data = convertPlotlyData(responseOccurencesColaborador.data);
  
        setPlotOccurences(responseOcurrences);
        setPlotOccurencesColaborador(responseOccurencesColaborador);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  const renderGraph = (data, layout, divId) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            #${divId} {
              width: 100%;
              height: 100%;
            }
            html, body {
              width: 100%;
              height: 100%;
              overflow: hidden;
              background-color: #E5E5E5;
            }
          </style>
        </head>
        <body>
          <div id="${divId}"></div>
          <script>
            Plotly.newPlot('${divId}', ${JSON.stringify(data)}, ${JSON.stringify(layout)}, {
              responsive: true
            });
            
            // Redimensionar ao girar a tela
            window.addEventListener('resize', () => {
              Plotly.Plots.resize('${divId}');
            });
          </script>
        </body>
      </html>
    `;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!plotOccurences || !plotOccurencesColaborador) {
    return <Text>Erro ao carregar os gráficos.</Text>;
  }

  return (
    <ScrollView>
      <Text style={{ margin: 10 }}>Ocorrências por Setor</Text>
      <WebView
        originWhitelist={['*']}
        style={{ 
          height: graphHeight,
          width: '100%' 
        }}
        source={{ html: renderGraph(plotOccurences.data, plotOccurences.layout, 'ocorrenciasPorSetor') }}
      />

      <Text style={{ margin: 10 }}>Ocorrências por Colaborador</Text>
      <WebView
        originWhitelist={['*']}
        style={{ 
          height: graphHeight,
          width: '100%' 
        }}
        source={{ html: renderGraph(plotOccurencesColaborador.data, plotOccurencesColaborador.layout, 'ocorrenciasPorColaborador') }}
      />
    </ScrollView>
  );
};

export default GraphComponent;
