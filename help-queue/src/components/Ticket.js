import React from "react";
import PropTypes from "prop-types";

function Ticket(props) {
  function handleUpdateClick() {
    props.onUpdateClick(props.ticketId);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.ticketId);
  }

  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <button onClick={handleUpdateClick}>Update</button>
      <button onClick={handleDeleteClick}>Delete</button>
      <hr/>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string.isRequired,
  onUpdateClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default Ticket;