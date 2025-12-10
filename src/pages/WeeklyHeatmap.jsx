import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Box } from "@mui/material";

const hours = Array.from({ length: 24 }, (_, i) => i);
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const WeeklyHeatmap = () => {
  const [matrix, setMatrix] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "dailyroutines"), (snap) => {
      const grid = {};

      days.forEach((d) => {
        grid[d] = {};
        hours.forEach((h) => (grid[d][h] = 0));
      });

      snap.forEach((doc) => {
        const data = doc.data();
        const day = data.dayoftheweek;
        const hour = parseInt(data.starttime?.split(":")[0] || 0);
        if (grid[day]) grid[day][hour] += 1;
      });

      setMatrix(grid);
    });

    return () => unsub();
  }, []);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(25, 1fr)", gap: .5 }}>
      <Box></Box>
      {hours.map((h) => <Box key={h}>{h}</Box>)}

      {days.map((day) => (
        <>
          <Box>{day}</Box>
          {hours.map((h) => {
            const v = matrix[day]?.[h] || 0;
            const color = v === 0 
              ? "#eee"
              : v < 3 ? "#90caf9"
              : v < 6 ? "#42a5f5"
              : "#1e88e5";

            return (
              <Box
                key={day + h}
                sx={{
                  width: "100%",
                  height: 22,
                  background: color,
                  borderRadius: 1,
                }}
              />
            );
          })}
        </>
      ))}
    </Box>
  );
};

export default WeeklyHeatmap;

