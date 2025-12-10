
import { ref, set } from "firebase/database";
import { db } from "./firebase";

export const logActivity = (userId, activity) => {
  const logRef = ref(db, `logs/${userId}/${Date.now()}`);
  set(logRef, {
    activity,
    timestamp: new Date().toISOString(),
  });
};
