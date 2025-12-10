import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function useUserRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      setRole(snap.data()?.role || "provider");
    });

    return () => unsub();
  }, []);

  return role;
}
