import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const MonthlyChart = ({ data }) => {
    console.log(data);
  const chartRef = useRef(null);

  useEffect(() => {
    const destroyChart = () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };

    destroyChart();

    const createChart = () => {
      const ctx = document.getElementById('monthly-chart');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: Object.values(data).map(monthData => monthData?.credit || 0),
            },
            {
              label: 'Expense',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: Object.values(data).map(monthData => monthData?.debit || 0),
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              beginAtZero: true,
            },
            y: {
              type: 'linear',
              beginAtZero: true,
            },
          },
        },
      });
    };

    createChart();

    return destroyChart;
  }, [data]);

  return (
    <div className="bg-white p-4 rounded shadow">
      {data ? <canvas id="monthly-chart" /> : <h2 className='text-center text-black'>No Data</h2>}
    </div>
  );
};

export default MonthlyChart;
