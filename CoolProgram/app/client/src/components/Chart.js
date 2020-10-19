import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';

/* React ChartJS */
export const Chart = (props) => {
  const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);

  let tweetRange = [];

  useEffect(() => {
    for (let i = 0; i < props.data.length; i++) {
      tweetRange.push(i + 1);
    }
    setChartLabel(tweetRange);
    setChartData(props.data);
  }, [props.data]);

  Chart.defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    title: props.name,
  };
  // console.log('this is chart' + chartData);

  // ChartJS
  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: 'Sentiment Scores',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(255, 0, 0, 0.3)',
        borderWidth: 5,
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: chartData,
      },
    ],
  };

  return (
    <div className="chart">
      <Line
        data={data}
        options={{
          title: {
            display: props.displayTitle,
            text: 'Topic: ' + props.title,
            fontSize: 25,
          },
          legend: {
            display: props.displayLegend,
            position: props.legendPosition,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Tweets',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Scores',
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
