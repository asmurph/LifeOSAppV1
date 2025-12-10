import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";

import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";

// Components
import BehaviorSummary from "../components/BehaviorSummary";
import WeeklyHeatmap from "../components/WeeklyHeatmap";
import BehaviorTimeline from "../components/BehaviorTimeline";
import Filters from "../components/Filters";

// Hooks
import useUserRole from "../hooks/useUserRole";

// Services
import { getBehaviorCounts } from "../services/BehaviorService";

// Export utils
import { exportBehaviorsPDF } from "../utils/exportPDF";
import { exportBehaviorsCSV } from "../utils/exportCSV";


// ------------------------
// Dashboard Component
// ------------------------
const Dashboardvv2 = () => {
  const role = useUserRole();
  const [counts, setCounts] = useState({ total: 0, completed: 0, pending: 0 });

  const [behaviors, setBehaviors] = useState([]);
  const [childrenList, setChildrenList] = useState([]);
  const [providerList, setProviderList] = useState([]);

  const [filters, setFilters] = useState({
    child: "",
    provider: "",
    start: "",
    end: "",
  });

  // ------------------------------
  // Load Summary Counts (Admin only)
  // ------------------------------
  useEffect(() => {
    if (role === "admin") {
      loadCounts();
    }
  }, [role]);

  async function loadCounts() {
    const c = await getBehaviorCounts();
    setCounts(c);
  }

  // ------------------------------
  // Load Behaviors (with filters)
  // ------------------------------
  useEffect(() => {
    if (!role) return;

    let q = query(collection(db, "dailyroutines"), orderBy("createdAt", "desc"));

    // Providers only see their own data
    if (role === "provider") {
      q = query(
        collection(db, "dailyroutines"),
        where("provider", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );
    }

    // Filters
    if (filters.child)
      q = query(q, where("childname", "==", filters.child));

    if (filters.provider && role === "admin")
      q = query(q, where("provider", "==", filters.provider));

    if (filters.start)
      q = query(q, where("createdAt", ">=", new Date(filters.start)));

    if (filters.end)
      q = query(q, where("createdAt", "<=", new Date(filters.end)));

    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      const childrenSet = new Set();
      const providerSet = new Set();

      snap.forEach((d) => {
        const data = { id: d.id, ...d.data() };
        arr.push(data);

        // Collect dynamic filter values
        if (data.childname) childrenSet.add(data.childname);
        if (data.provider) providerSet.add(data.provider);
      });

      setBehaviors(arr);
      setChildrenList([...childrenSet]);
      setProviderList([...providerSet]);
    });

    return () => unsub();
  }, [role, filters]);


  // ------------------------------
  // Render
  // ------------------------------
  if (!role) return <p>Loading dashboard…</p>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      {/* HEADER */}
      <Typography variant="h4" gutterBottom>
        Dashboard ({role})
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* FILTERS */}
      <Filters
        childrenList={childrenList}
        providerList={providerList}
        filters={filters}
        setFilters={setFilters}
      />

      {/* EXPORT BUTTONS */}
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => exportBehaviorsPDF(behaviors)}
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Export PDF
        </Button>

        <Button
          onClick={() => exportBehaviorsCSV(behaviors)}
          variant="outlined"
        >
          Export CSV
        </Button>
      </Box>


      {/* ADMIN DASHBOARD */}
      {role === "admin" && (
        <>
          {/* SUMMARY WIDGETS */}
          <Box sx={{ mt: 4 }}>
            <BehaviorSummary counts={counts} />
          </Box>

          {/* WEEKLY HEATMAP */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>
              Weekly Behavior Heatmap
            </Typography>
            <WeeklyHeatmap />
          </Box>
        </>
      )}


      {/* PROVIDER DASHBOARD */}
      {role === "provider" && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Your Behaviors Overview
          </Typography>

          <WeeklyHeatmap />
        </>
      )}


      {/* CHILD TIMELINE */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5">Behavior Timeline</Typography>
        <Typography variant="body2" color="text.secondary">
          Select a child in filters to display their timeline.
        </Typography>

        {filters.child ? (
          <BehaviorTimeline childName={filters.child} />
        ) : (
          <Typography sx={{ mt: 2 }} color="text.secondary">
            No child selected.
          </Typography>
        )}
      </Box>

    </Container>
  );
};

export default Dashboardv2;
