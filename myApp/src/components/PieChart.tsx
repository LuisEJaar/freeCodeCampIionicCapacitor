import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {CategoryScale} from 'chart.js'; 
ChartJS.register(CategoryScale);

function PieChart({ chartData }) {
  return <Pie data={chartData} />;
}

export default PieChart;