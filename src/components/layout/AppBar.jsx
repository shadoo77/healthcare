import React from "react";
// Material UI
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            flexWrap="nowrap"
          >
            <Box flexGrow={1} textAlign="left">
              <Typography variant="h6">Todos app</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
