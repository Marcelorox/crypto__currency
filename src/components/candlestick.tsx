import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { UserContext } from "../context/assetsContext";

interface CandleData {
  x: Date;
  y: [number, number, number, number];
}

interface SailProps {}

export const Sail: React.FC<SailProps> = () => {
  const userContext = useContext(UserContext);
  const { dataCandle } = userContext || {};
  console.log(dataCandle)
  const [mappedData, setMappedData] = useState<CandleData[]>([]);

  useEffect(() => {
    if (dataCandle) {
      const mappedData: CandleData[] = dataCandle.map((data: any) => ({
        x: new Date(parseInt(data[0])),
        y: [parseFloat(data[1]), parseFloat(data[3]), parseFloat(data[4]), parseFloat(data[2])],
      }));
      setMappedData(mappedData);
    }
  }, [dataCandle]);

  const series = [
    {
      data: mappedData,
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 150,
    },
    title: {
      text: "Graphic",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
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
