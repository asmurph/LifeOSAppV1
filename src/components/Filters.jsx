// Filters.js
import { Box, TextField, MenuItem } from "@mui/material";

const Filters = ({ childrenList, providerList, filters, setFilters }) => {
  return (
    <Box sx={{ p: 2, display: "flex", gap: 2 }}>
      <TextField
        label="Child"
        select
        value={filters.child}
        onChange={(e) => setFilters({ ...filters, child: e.target.value })}
        sx={{ width: 200 }}
      >
        <MenuItem value="">All</MenuItem>
        {childrenList.map((c) => (
          <MenuItem key={c} value={c}>{c}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Provider"
        select
        value={filters.provider}
        onChange={(e) => setFilters({ ...filters, provider: e.target.value })}
        sx={{ width: 200 }}
      >
        <MenuItem value="">All</MenuItem>
        {providerList.map((p) => (
          <MenuItem key={p} value={p}>{p}</MenuItem>
        ))}
      </TextField>

      <TextField
        type="date"
        label="Start"
        InputLabelProps={{ shrink: true }}
        value={filters.start}
        onChange={(e) => setFilters({ ...filters, start: e.target.value })}
      />

      <TextField
        type="date"
        label="End"
        InputLabelProps={{ shrink: true }}
        value={filters.end}
        onChange={(e) => setFilters({ ...filters, end: e.target.value })}
      />
    </Box>
  );
};

export default Filters;
