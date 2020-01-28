import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  paperStyle: {
    padding: theme.spacing(2, 2),
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
      padding: theme.spacing(1)
    }
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paperStyle}>{props.children}</Paper>
    </div>
  );
};
