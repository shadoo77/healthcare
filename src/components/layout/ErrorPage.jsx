import React from "react";
// Material UI
import { Paper, Typography, Box } from "@material-ui/core/";

export default ({ errorMessage }) => {
  return (
    <Box mt={3}>
      <Paper
        style={{ backgroundColor: "#ffe5ee", border: "dotted 1px #e91e63" }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" m={3}>
          <Typography
            component="p"
            style={{
              padding: 16,
              fontSize: 14,
              color: "#e91e63"
            }}
          >
            {errorMessage}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
