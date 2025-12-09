import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../useAuth";
import { useChildren } from "../useChildren";
import "./DailyRoutinesScreen.css";

export default function DailyRoutinesScreen() {
  const { user } = useAuth();
  const { activeChild } = useChildren();
  const [childname, setChildName] = useState("");
  const [routine, setRoutine] = useState("");
  const [description, setDescription] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [dayoftheweek, setDayOfTheWeek] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState("");
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    if (!user || !activeChild) {
      setRoutines([]);
      return;
    }

    const q = query(
      collection(db, "routines"),
      where("userId", "==", user.uid),
      where("childId", "==", activeChild.id),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoutines(docs);
    });

    return () => unsub();
  }, [user, activeChild]);

  const addRoutine = async () => {
    if (!routine.trim() || !user || !activeChild) return;
    await addDoc(collection(db, "routines"), {
      userId: user.uid,
      childId: activeChild.id,
      childname: childname.trim(),
      routine: routine.trim(),
      description: description.trim(),
      starttime: starttime.trim(),
      endtime: endtime.trim(),
      dayoftheweek: dayoftheweek.trim(),
      status: status.trim(),
      provider: provider.trim(),
      createdAt: serverTimestamp()
    });
    setChildName("");
    setRoutine("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setDayOfTheWeek("");
    setStatus("");
    setProvider("");
  };

  return (
    <div className="screen-container">
      <h1 className="title">Daily Routines</h1>
      <p className="child">
        {activeChild ? `For: ${activeChild.name}` : "No child selected"}
      </p>

      <div className="form">
        <input
          placeholder="Child name (e.g., Name Of Child)"
          value={childname}
          onChange={(e) => setChildName(e.target.value)}
          className="input"
        />
        <input
          placeholder="Routine name (e.g., Morning, Bedtime)"
          value={routine}
          onChange={(e) => setRoutine(e.target.value)}
          className="input"
        />
        <input
          placeholder="Description (List Action)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <input
          placeholder="Start Time (optional, e.g., 7:30 AM)"
          value={starttime}
          onChange={(e) => setStartTime(e.target.value)}
          className="input"
        />
        <input
          placeholder="End Time (optional, e.g., 7:30 PM)"
          value={endtime}
          onChange={(e) => setEndTime(e.target.value)}
          className="input"
        />
        <input
          placeholder="Day (Mon,Tues,Wedns,Thurs,Fri,Sat,Sun)"
          value={dayoftheweek}
          onChange={(e) => setDayOfTheWeek(e.target.value)}
          className="input"
        />
        <input
          placeholder="Status (Completed, skipped, partial)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input"
        />
        <input
          placeholder="Provider (Mom, Dad, GrandMa, GrandPa, Therapist, Teacher)"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="input"
        />
        <button className="button" onClick={addRoutine}>
          <p className="button-text">Add Routine</p>
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {routines.length > 0 ? (
          routines.map((item) => (
            <div key={item.id} className="item">
              <p className="item-label">{item.routine}</p>
              {item.starttime ? <p className="item-time">{item.starttime}</p> : null}
            </div>
          ))
        ) : (
          <p className="empty">No routines yet. Add one above.</p>
        )}
      </div>
    </div>
  );
}
