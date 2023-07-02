import React from "react";
import ReactApexChart from "react-apexcharts";

interface CandleProps {}

export const Sail: React.FC<CandleProps> = () => {
  const series = [
    {
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33]
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11]
        },
        {
          x: new Date(1538782200000),
          y: [6630.71, 6648.95, 6623.34, 6635.65]
        }
      ]
    }
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 150,
    },
    title: {
      text: "Graphic",
      align: "left"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <div id="chart" className="w-full h-6">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={200}
      />
    </div>
  );
};
