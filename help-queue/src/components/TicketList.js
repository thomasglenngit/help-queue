import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";


function TicketList(props) {
  return (
    <React.Fragment>
      <hr />
      {props.ticketList.map((ticket) =>
        <Ticket 
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          ticketId = {ticket.id}
          key={ticket.id} 
          onUpdateClick={props.onUpdateClick} />
      )}
      <button onClick={props.onClick}>Add Ticket</button>
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onClick: PropTypes.func,
  onUpdateClick: PropTypes.func
};

export default TicketList;