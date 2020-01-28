import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { RootContext } from "../store";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// Material UI
import { Grid, Box, useMediaQuery, useTheme, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

export default props => {
  const localizer = momentLocalizer(moment);
  const { state } = React.useContext(RootContext);

  const handleSelectEvent = e => {
    props.history.push(`/req-details/req/${e.id}`);
  };

  const filteredData = state.requests.data.filter(el => el.status === "open");

  return (
    <div>
      <Box m={3}>
        <Button
          variant="contained"
          color="primary"
          component={LinkBehavior}
          to="/add-request"
        >
          Add new request
        </Button>
      </Box>
      <div>
        <Calendar
          localizer={localizer}
          events={filteredData}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          style={{ height: "70vh" }}
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </div>
  );
};
