import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Store {
  id: number;
  name: string;
  dt: string; // 날짜
  // gu: string
  h8: string; // 키
  w8: string; // 몸무게
  userId: number;
  rmk: string;
}

interface Props {
  dataList: Store[];
  birthA: number;
  birthB: number;
  gu: string;
}

const LineChart: React.FC<Props> = ({ dataList, birthA, birthB, gu }) => {
  // 사용자 A와 B 데이터 분리
  const userA = dataList.filter((d) => d.userId === 0);
  const userB = dataList.filter((d) => d.userId === 1);

  //   const chartData = {
  //     labels: dataList.map(
  //       (d) =>
  //         (new Date(d.dt).getTime() - (d.userId == 0 ? birth[0] : birth[1])) /
  //         (1000 * 24 * 60 * 60)
  //     ), // 날짜를 X축으로
  //     datasets: [
  //       {
  //         label: "사람 A 키",
  //         data: userA.map((d) => Number(d.h8)),
  //         borderColor: "rgba(75, 192, 192, 1)",
  //         backgroundColor: "rgba(75, 192, 192, 0.2)",
  //         tension: 0.3,
  //       },
  //       {
  //         label: "사람 A 몸무게",
  //         data: userA.map((d) => Number(d.w8)),
  //         borderColor: "rgba(255, 99, 132, 1)",
  //         backgroundColor: "rgba(255, 99, 132, 0.2)",
  //         tension: 0.3,
  //       },
  //       {
  //         label: "사람 B 키",
  //         data: userB.map((d) => Number(d.h8)),
  //         borderColor: "rgba(54, 162, 235, 1)",
  //         backgroundColor: "rgba(54, 162, 235, 0.2)",
  //         tension: 0.3,
  //       },
  //       {
  //         label: "사람 B 몸무게",
  //         data: userB.map((d) => Number(d.w8)),
  //         borderColor: "rgba(255, 206, 86, 1)",
  //         backgroundColor: "rgba(255, 206, 86, 0.2)",
  //         tension: 0.3,
  //       },
  //     ],
  //   };

  //   const options = {
  //     responsive: true,
  //     plugins: {
  //       legend: { position: "top" as const },
  //       title: { display: true, text: "사람 A와 B의 키/몸무게 변화" },
  //     },
  //   };
  const chartData = {
    datasets: [
      {
        label: "1호 " + (gu == "h8" ? "키" : "몸무게"),
        data: userA.map((d) => ({
          x: (new Date(d.dt).getTime() - birthA) / (1000 * 60 * 60 * 24), // 출생 후 일수
          y:
            gu == "h8"
              ? d.h8
                ? Number(d.h8)
                : null
              : d.w8
              ? Number(d.w8)
              : null, // 키
        })),
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
      },
      // {
      //   label: "사람 A 몸무게",
      //   data: userA.map((d) => ({
      //     x: (new Date(d.dt).getTime() - birthA) / (1000 * 60 * 60 * 24),
      //     y: d.eight ? Number(d.eight) : null, // 몸무게
      //   })),
      //   borderColor: "rgba(255, 99, 132, 1)",
      //   tension: 0.3,
      // },
      {
        label: "2호 " + (gu == "h8" ? "키" : "몸무게"),
        data: userB.map((d) => ({
          x: (new Date(d.dt).getTime() - birthB) / (1000 * 60 * 60 * 24),
          y:
            gu == "h8"
              ? d.h8
                ? Number(d.h8)
                : null
              : d.w8
              ? Number(d.w8)
              : null, // 키
        })),
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.3,
      },
      // {
      //   label: "사람 B 몸무게",
      //   data: userB.map((d) => ({
      //     x: (new Date(d.dt).getTime() - birthB) / (1000 * 60 * 60 * 24),
      //     y: d.eight ? Number(d.eight) : null,
      //   })),
      //   borderColor: "rgba(255, 206, 86, 1)",
      //   tension: 0.3,
      // },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "출생 후 경과 일수별 " + (gu == "h8" ? "키" : "몸무게") + " 변화",
      },
    },
    scales: {
      x: {
        type: "linear", // x축을 숫자(일수)로
        title: { display: true, text: "출생 후 일수" },
      },
      y: {
        title: { display: true, text: "값 (cm / kg)" },
      },
    },
    spanGaps: true,
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
