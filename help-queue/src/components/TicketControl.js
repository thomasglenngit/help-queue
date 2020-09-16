import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Ticket from './Ticket';
import * as a from './../actions';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
      };
    }
  

  handleUpdateTicket = (updateTicket) => {
    const newMasterTicketList = this.state.masterTicketList.map((tickets) => {
      if (tickets.id === updateTicket.id) {
        return updateTicket;
      } else {
        return tickets;
      }
    });
    this.setState({currentPage: "list", masterTicketList: newMasterTicketList });
  }

  handleEditingTicket = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm;
    dispatch(action2);
    // this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null, 
        editing: false });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
      // this.setState({currentPage: 'list', currentTicketId: null});
    }
  }

  handleUpdateClick = (key) => {
    this.setState({currentPage: 'updateTicketForm', currentTicketId: key });
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }


  render(){
    let currentlyVisibleState = null;
    if (this.state.currentPage === 'newTicketForm') {
      currentlyVisibleState = <NewTicketForm 
                                onNewTicketCreation={this.handleAddingNewTicketToList}
                                onClick = {this.handleClick}
                                update = {false} />
    } else if (this.state.currentPage === 'list') {
      currentlyVisibleState = <TicketList 
                                ticketList={this.props.masterTicketList} 
                                onTicketSelection={this.handleChangingSelectedTicket}
                                onClick={this.handleClick} 
                                onUpdateClick={this.handleUpdateClick}
                                onDeleteClick={this.handleDeletingTicket} />
    } else if (this.state.currentPage === 'updateTicketForm') {
      currentlyVisibleState = <NewTicketForm
                                onUpdateTicket={this.handleUpdateTicket}
                                onClick = {this.handleClick}
                                update = {true}
                                ticketId = {this.state.currentTicketId} />
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
      </React.Fragment>
    );
  };

}

function TicketList(props){
  return (
    <React.Fragment>
      <hr />
      {/* We now need to map over the values of an object, not an array. */}
      {Object.values(props.ticketList).map((ticket) => {
        // Make sure to explicitly return the Ticket object this time! We will explain why below.
        return <Ticket
          whenTicketClicked={props.onTicketSelection}
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id} />
      })}
      
    </React.Fragment>
  );
}

TicketControl.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage

  }
}

TicketControl = connect(mapStateToProps) (TicketControl);

export default TicketControl;