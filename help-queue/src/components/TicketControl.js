import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: "list",
      masterTicketList: [],
      currentTicketId: null
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

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({
      masterTicketList: newMasterTicketList, 
      currentPage: "list"
    });
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
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      currentPage: "list"
    });
  }
  // We recommend experimenting with adding counters, booleans, and other states that need updating to your applications to get more practice with this slightly more complex implementation of setState(). (What the hell?)

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
  }

}

export default TicketControl;