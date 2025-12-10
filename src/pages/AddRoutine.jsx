import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../useAuth";
import { useChildren } from "../useChildren";
import "./AddRoutine.css";

export default function AddRoutine() {
  const { user } = useAuth();
  const { activeChild } = useChildren();
  const [label, setLabel] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");

  const addRoutine = async () => {
    if (!label.trim() || !user || !activeChild) return;
    await addDoc(collection(db, "dailyroutines"), {
      userId: user.uid,
      childId: activeChild.id,
      label: label.trim(),
      starttime: starttime.trim(),
      endtime: endtime.trim(),
      createdAt: serverTimestamp()
    });
    setLabel("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="add-routine-container">
      <h1 className="title">Add a New Daily Routine</h1>
      <p className="child">
        {activeChild ? `For: ${activeChild.name}` : "No child selected"}
      </p>

      <div className="form">
        <input
          placeholder="Routine name (e.g., Morning, Bedtime)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="input"
        />
        <input
          placeholder="Start Time (e.g., 7:30 AM)"
          value={starttime}
          onChange={(e) => setStartTime(e.target.value)}
          className="input"
        />
        <input
          placeholder="End Time (e.g., 8:00 AM)"
          value={endtime}
          onChange={(e) => setEndTime(e.target.value)}
          className="input"
        />
        <button className="button" onClick={addRoutine}>
          <p className="button-text">Add Routine</p>
        </button>
      </div>
    </div>
  );
}
