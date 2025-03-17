import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';  
import { fetchGraphData } from '../../API/api';  

const screenWidth = Dimensions.get('window').width;

const GraphComponent = () => {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGraphData = async () => {
      try {
        const data = await fetchGraphData();  
        setGraphData(data);  
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      } finally {
        setLoading(false); 
      }
    };

    getGraphData();  
  }, []);  

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  
  if (graphData && graphData.data && graphData.layout) {
    const chartData = {
      labels: graphData.data.setor, 
      datasets: [
        {
          data: graphData.data.ocorrencias,  
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,  
        },
      ],
    };

    const chartConfig = {
      backgroundColor: '#fff',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 0,  
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    };

    return (
      <View style={{ flex: 1 }}>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>
    );
  }

  return <Text>Erro ao carregar o gráfico</Text>;
};

export default GraphComponent;
