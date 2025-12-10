// src/components/BehaviorSummary.jsx
import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const SummaryCard = ({ title, value }) => (
  <Card elevation={3}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const BehaviorSummary = ({ counts }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} md={4}>
        <SummaryCard title="Total Behaviors" value={counts.total} />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard title="Completed" value={counts.completed} />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard title="Pending" value={counts.pending} />
      </Grid>
    </Grid>
  );
};

export default BehaviorSummary;
