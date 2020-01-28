import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import uuidv4 from "uuid/v4";
import { RootContext } from "../store";
// Import actions
import { addNewRequest } from "../store/actions/requestsList";
// Validation
import formValidation from "./formValidation";
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
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
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

const initialState = {
  fullName: "",
  title: "medical",
  startDate: new Date(),
  endDate: new Date(),
  extraInfo: "",
  status: "open",
  loading: false,
  errors: {}
};

function AddRequest(props) {
  const { state, dispatch } = useContext(RootContext);
  const classes = useStyles();
  const [currState, setCurrState] = useState(initialState);

  const handleChange = e => {
    setCurrState({ ...currState, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, field) => {
    setCurrState({ ...currState, [field]: date });
  };

  const handleCancel = () => {
    props.history.push("/");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCurrState({ ...currState, loading: true });
    const newItem = {
      id: uuidv4(),
      fullName: currState.fullName,
      title: currState.title,
      start: currState.startDate,
      end: currState.endDate,
      extraInfo: currState.extraInfo,
      status: currState.status
    };
    const { isValid, errors } = formValidation(newItem);
    setCurrState({
      ...currState,
      loading: false,
      errors: errors
    });
    if (!isValid) {
      return;
    }
    try {
      await addNewRequest(dispatch, newItem, props.history, handleClickVariant);
    } catch (err) {
      setCurrState({
        ...currState,
        loading: false
      });
      console.log(err);
    }
  };

  // add multiple actions to one snackbar
  const snackAction = key => (
    <React.Fragment>
      <IconButton
        key="close"
        aria-label="Close"
        //className={props.classes.closeIcon}
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
    // variant could be success, error, warning or info
    props.enqueueSnackbar("New request added !", {
      variant,
      action: snackAction,
      autoHideDuration: 2500
    });
  };

  const {
    fullName,
    title,
    startDate,
    endDate,
    extraInfo,
    status,
    loading,
    errors
  } = currState;

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      alignItems="center"
      className={classes.registerGrid}
    >
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
            <TextField
              variant="outlined"
              error={errors.fullName ? true : false}
              helperText={errors.fullName}
              value={fullName}
              name="fullName"
              required
              label="Full name"
              onChange={handleChange}
              margin="dense"
              className={classes.textField}
              fullWidth
            />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Kind of care :</FormLabel>
              <RadioGroup
                aria-label="kindOfCare"
                name="title"
                value={title}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="household"
                  control={<Radio color="primary" />}
                  label="Household"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="medical"
                  control={<Radio color="primary" />}
                  label="Medical"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between" spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    margin="dense"
                    inputVariant="outlined"
                    //disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Start date"
                    views={["year", "month", "date"]}
                    value={startDate}
                    onChange={date => handleDateChange(date, "startDate")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    margin="dense"
                    inputVariant="outlined"
                    //disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="End date"
                    views={["year", "month", "date"]}
                    value={endDate}
                    onChange={date => handleDateChange(date, "endDate")}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>

            <TextField
              variant="outlined"
              error={errors.extraInfo ? true : false}
              helperText={errors.extraInfo}
              value={extraInfo}
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
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Status :</FormLabel>
              <RadioGroup
                aria-label="status"
                name="status"
                value={status}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="open"
                  control={<Radio color="primary" />}
                  label="Open"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="close"
                  control={<Radio color="secondary" />}
                  label="Close"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
            {!loading ? (
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
                  disabled={loading}
                >
                  Save
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

const registerWithRouter = withRouter(AddRequest);

const RegPage = withSnackbar(registerWithRouter);

function RegisterWithSnack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <RegPage />
    </SnackbarProvider>
  );
}

export default RegisterWithSnack;
