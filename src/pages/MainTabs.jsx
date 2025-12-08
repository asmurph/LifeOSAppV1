import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const MainTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Dashboard" component={Link} to="/dashboard" />
        <Tab label="Routines" component={Link} to="/routines" />
        <Tab label="Behavior" component={Link} to="/behavior" />
        <Tab label="Mood" component={Link} to="/mood" />
        <Tab label="Sensory" component={Link} to="/sensory" />
        <Tab label="Safety" component={Link} to="/safety" />
        <Tab label="Notes" component={Link} to="/notes" />
        <Tab label="Tasks" component={Link} to="/tasks" />
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default MainTabs;
