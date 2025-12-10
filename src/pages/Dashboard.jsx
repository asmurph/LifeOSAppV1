// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import BehaviorSummary from "../services/BehaviorSummary";
import BehaviorChart from "../components/BehaviorChart";
import { getBehaviorCounts } from "../services/BehaviorService";

const Dashboard = () => {
  const [counts, setCounts] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    async function loadCounts() {
      const data = await getBehaviorCounts();
      setCounts(data);
    }
    loadCounts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Widgets */}
      <BehaviorSummary counts={counts} />

      {/* Chart */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Weekly Behavior Distribution
        </Typography>
        <BehaviorChart />
      </Box>
    </Container>
  );
};

export default Dashboard;