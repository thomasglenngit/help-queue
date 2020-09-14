import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import { connect } from 'react-redux';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      formVisibleOnPage: false,
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
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    })
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket; //passes the values directly into our action.
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

  handleClick = () => {
    if (this.state.currentPage === 'list') {
      this.setState({currentPage: 'newTicketForm', currentTicketId: null });
    } else {
      this.setState({currentPage: 'list', currentTicketId: null});
    }
  }

  handleUpdateClick = (key) => {
    this.setState({currentPage: 'updateTicketForm', currentTicketId: key });
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id,
    }
    dispatch(action);
    this.setState({selectedTicket: null
    
    });
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
                                ticketList={this.state.masterTicketList} 
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

TicketControl = connect() (TicketControl);

export default TicketControl;