// src/services/BehaviorService.jsx
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function getBehaviorCounts() {
  const routinesRef = collection(db, "dailyroutines");

  const totalSnap = await getCountFromServer(routinesRef);
  
  const completedSnap = await getCountFromServer(
    query(routinesRef, where("status", "==", "Completed"))
  );
  const pendingSnap = await getCountFromServer(
    query(routinesRef, where("status", "==", "Pending"))
  );

  return {
    total: totalSnap.data().count,
    completed: completedSnap.data().count,
    pending: pendingSnap.data().count,
  };
}
