import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const Routines = () => {

  const {user } = useAuth();
  const {activeChild } = useChildren();
  const [childname, setChildName] = useState("");
  const [routine, setRoutine] = useState("");
  const [description, setDescription] = useState("");
  const [starttime, setstartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [dayoftheweek, setDayoOfTheWeek] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState("");
  const [routines, setRoutines] = useState([]);

  const addRoutine = async () => {
    if (!label.trim() || !user || !activeChild) return;
    await addDoc(collection(db, "routines"), {
      userId: user.uid,
      childId: activeChild.id,
      childname: childname.trim(),
      routine: routine.trim(),
      description: description.trim(),
      starttime: time.trim(),
      endtime: time.trim(),
      dayoftheweek: time.trim(),
      status: status.trim(),
      provider: provider(),
      createdAt: serverTimestamp()
    });
    setChildName("");
    setRoutine("");
    setDescription("");
    setstartTime("");
    setEndTime("");
    setDayoOfTheWeek("");
    setStatus("");
    setProvider("");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={addRoutine}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Routines;
