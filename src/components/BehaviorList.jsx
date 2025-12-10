import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent, Typography, Container } from "@mui/material";

const BehaviorList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
   // const providerUid = localStorage.getItem("uid"); // Or from auth state

    const q = query(
      collection(db, "dailyroutines"),
      //where("providerUid", "==", providerUid),
 
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Behavior Routines</Typography>

      {items.map((item) => (
        <Card key={item.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.childname}</Typography>
            <Typography>{item.description}</Typography>
            <Typography>Start: {item.starttime}</Typography>
            <Typography>End: {item.endtime}</Typography>
            <Typography>Day: {item.dayoftheweek}</Typography>
            <Typography>Status: {item.status}</Typography>
            <Typography variant="caption">
              Provider: {item.provider}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default BehaviorList;