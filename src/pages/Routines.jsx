import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const Routines = () => {
  const [childname, setChildName] = useState('');
  const [description, setDescription] = useState('');
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [dayoftheweek, setDayOfTheWeek] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState("");
  
  const navigate = useNavigate();

  const addRoutines = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "dailyroutines"), {
        childname: childname.trim(),
        description: description.trim(),
        starttime: starttime.trim(),
        endtime: endtime.trim(),
        status: status.trim(),
        provider: provider.trim(),
        dayoftheweek: dayoftheweek.trim(),
        createdAt: serverTimestamp()
      });

      console.log("Document written with ID: ", docRef.id);

      // reset form
      setChildName("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setDayOfTheWeek("");
      setStatus("");
      setProvider("");

     navigate('/dashboard');
    } catch (error) {
      console.error('Error adding behavioral routine:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Behaviors
      </Typography>

      <form onSubmit={addRoutines}>
        
        <TextField
          label="Child Name"
          fullWidth
          margin="normal"
          value={childname}
          onChange={(e) => setChildName(e.target.value)}
        />

        <TextField
          label="Description"
          multiline
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Start Time"
          type="time"
          fullWidth
          margin="normal"
          value={starttime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <TextField
          label="End Time"
          type="time"
          fullWidth
          margin="normal"
          value={endtime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <TextField
          label="Day of the Week"
          fullWidth
          margin="normal"
          value={dayoftheweek}
          onChange={(e) => setDayOfTheWeek(e.target.value)}
        />

        <TextField
          label="Status"
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <TextField
          label="Provider"
          fullWidth
          margin="normal"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>

      </form>
    </Container>
  );
};

export default Routines;
