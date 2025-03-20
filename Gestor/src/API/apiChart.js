import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, processColor } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';

const GraficoOcorrencias = () => {
  const [dados, setDados] = useState({
    labels: [],
    values: [],
  });

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/GraficoOcorrenciasPorSetor');
        if (!response.ok) {
          throw new Error(`Erro na requisição do gráfico: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setDados({
          labels: data.labels,
          values: data.values,
        });
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchGraphData();
  }, []);

  const chartData = {
    dataSets: [
      {
        values: dados.values.map(value => ({ y: value })),
        label: 'Ocorrências',
        config: {
          color: processColor('#1f77b4'),
        },
      },
    ],
  };

  const chartConfig = {
    xAxis: {
      valueFormatter: dados.labels,
      position: 'BOTTOM',
    },
    yAxis: {
      left: {
        axisMinimum: 0,
      },
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorrências por Setor</Text>
      <BarChart
        style={styles.chart}
        data={chartData}
        chartDescription={{ text: '' }}
        legend={{ enabled: false }}
        xAxis={chartConfig.xAxis}
        yAxis={chartConfig.yAxis}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  chart: {
    width: '100%',
    height: 300,
  },
});

export default GraficoOcorrencias;
