// src/components/BehaviorChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const BehaviorChart = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const q = query(collection(db, "dailyroutines"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const dayCounts = { Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0, Sun:0 };

      snapshot.forEach((doc) => {
        const day = doc.data().dayoftheweek;
        if (dayCounts[day] !== undefined) dayCounts[day] += 1;
      });

      setCounts(dayCounts);
    });

    return () => unsub();
  }, []);

  const chartData = {
    labels: weekdays,
    datasets: [
      {
        label: "Behaviors per day",
        data: weekdays.map((d) => counts[d] || 0),
        backgroundColor: "rgba(33, 150, 243, 0.7)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BehaviorChart;
