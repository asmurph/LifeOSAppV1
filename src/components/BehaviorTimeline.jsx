import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { Typography } from "@mui/material";

const BehaviorTimeline = ({ childName }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!childName) return;

    const q = query(
      collection(db, "dailyroutines"),
      where("childname", "==", childName),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setEvents(arr);
    });

    return () => unsub();
  }, [childName]);

  return (
    <Timeline>
      {events.map((evt, i) => (
        <TimelineItem key={evt.id}>
          <TimelineSeparator>
            <TimelineDot color={evt.status === "completed" ? "primary" : "grey"} />
            {i < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle1">{evt.description}</Typography>
            <Typography variant="caption">
              {evt.starttime} → {evt.endtime}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default BehaviorTimeline;
