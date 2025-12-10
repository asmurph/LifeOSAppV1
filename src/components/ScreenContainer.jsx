import React from "react";
// Import Box from MUI to serve as a versatile container (replaces View)
import { Box } from "@mui/material"; 
// No need for StyleSheet.

export default function ScreenContainer({ children }) {
  return (
    <Box 
      // The sx prop is used for custom styling in MUI
      sx={{
        // Mimics the 'safe' style (flex: 1, background)
        minHeight: '100vh', 
        backgroundColor: "#F3F4F6",
        
        // Mimics the 'container' style (flex: 1, padding)
        padding: 2, // MUI typically uses 8px increments, so 2 = 16px
      }}
    >
      {children}
    </Box>
  );
}