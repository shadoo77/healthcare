import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { RootContext } from "../store";
// Import actions
import { closeRequest } from "../store/actions/requestsList";
// Material UI
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Grid,
  Fab,
  Divider,
  LinearProgress,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Avatar
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { SnackbarProvider, withSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  registerForm: {
    maxWidth: "500px"
  },
  registerGrid: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  textField: {
    marginTop: "35px"
  },
  radioGroup: {
    paddingLeft: "3em"
  },
  divider: {
    margin: "20px 0px"
  },
  radioItem: {
    padding: "0px 20px"
  },
  closeIcon: {
    color: "#fff",
    padding: theme.spacing(0.5)
  },
  formControl: { margin: theme.spacing(2, 0) }
}));

function RequestDetails(props) {
  const { state, dispatch } = useContext(RootContext);
  const currentReaquest = state.requests.data.find(
    el => el.id === props.match.params.reqId
  );
  const classes = useStyles();
  const [currState, setCurrState] = useState({
    takenDate: new Date(),
    extraInfo: "",
    loading: false,
    error: ""
  });

  const handleChange = e => {
    setCurrState({ ...currState, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, field) => {
    setCurrState({ ...currState, [field]: date });
  };

  const handleCancel = () => {
    props.history.push("/");
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCurrState({ ...currState, loading: true });
    const regex = /^[^%]{3,}$/g;
    const isValid = currState.extraInfo.match(regex);
    if (!isValid) {
      setCurrState({
        ...currState,
        loading: false,
        error: "The string should be more than 3 letters !"
      });
      return;
    }
    closeRequest(
      dispatch,
      currentReaquest.id,
      props.history,
      handleClickVariant
    );
  };

  // add multiple actions to one snackbar
  const snackAction = key => (
    <React.Fragment>
      <IconButton
        key="close"
        aria-label="Close"
        onClick={() => {
          props.closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );

  /////// Snackbar functions /////////
  const handleClickVariant = variant => {
    props.enqueueSnackbar("The request is closed !", {
      variant,
      action: snackAction,
      autoHideDuration: 2500
    });
  };

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      alignItems="center"
      className={classes.registerGrid}
    >
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <AccountCircleIcon />
              </Avatar>
            }
            title={
              <Typography component="h5" variant="h5">
                {currentReaquest.fullName}
              </Typography>
            }
            subheader="here is subtitle"
          />
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {currentReaquest.fullName}
            </Typography>

            <Typography className={classes.textSecondary}>
              Kind of care needed :
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentReaquest.title}
            </Typography>

            <Typography className={classes.textSecondary}>
              Start date :
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentReaquest.start}
            </Typography>

            <Typography className={classes.textSecondary}>
              End date :
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentReaquest.end}
            </Typography>

            <Typography className={classes.textSecondary}>
              Extral informations :
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentReaquest.extraInfo}
            </Typography>
            <Typography className={classes.textSecondary}>
              Status :{" "}
              <span
                style={{
                  color: currentReaquest.status === "open" ? "green" : "red"
                }}
              >
                {currentReaquest.status}
              </span>
            </Typography>

            <Typography className={classes.textSecondary}>Ratings :</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={2} />
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        sm={8}
      >
        <Grid>
          <Typography variant="h4">Create a new request</Typography>
        </Grid>
        <Grid>
          <form
            onSubmit={handleSubmit}
            className={classes.registerForm}
            noValidate
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between" spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    margin="dense"
                    inputVariant="outlined"
                    disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Taken date"
                    views={["year", "month", "date"]}
                    value={currState.takenDate}
                    onChange={date => handleDateChange(date, "takenDate")}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>

            <TextField
              variant="outlined"
              error={currState.error ? true : false}
              helperText={currState.error}
              value={currState.extraInfo}
              name="extraInfo"
              required
              label="Extra informations"
              onChange={handleChange}
              margin="dense"
              className={classes.textField}
              multiline
              rows="8"
              fullWidth
            />

            {!currState.loading ? (
              <Divider className={classes.divider} />
            ) : (
              <LinearProgress className={classes.divider} />
            )}
            <Grid container direction="row">
              <Grid container justify="center" alignItems="center" item xs={6}>
                <Fab
                  type="submit"
                  variant="extended"
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={currState.loading}
                >
                  Take the request
                </Fab>
              </Grid>
              <Grid container justify="center" alignItems="center" item xs={6}>
                <Fab
                  variant="extended"
                  color="secondary"
                  size="large"
                  onClick={handleCancel}
                >
                  Cancel
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item sm={2} />
    </Grid>
  );
}

const registerWithRouter = withRouter(RequestDetails);

const RegPage = withSnackbar(registerWithRouter);

function RegisterWithSnack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <RegPage />
    </SnackbarProvider>
  );
}

export default RegisterWithSnack;
