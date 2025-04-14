import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/Auth';
import './DisplayEvents.css';

const DisplayEvents = () => {
  const { events } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuys = (eventId) => {
    navigate('/buy_events_ticket', { state: { id: eventId } });
  };

  return (
    <div className="events-container">
      <h2 className="events-heading">Upcoming Events</h2>
      <div className="events-scroll-wrapper">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <div><strong>ID:</strong> {event.id}</div>
              <div><strong>Organizer:</strong> <span className="organizer-text">{event.organizer}</span></div>
              <div><strong>Name:</strong> {event.name}</div>
              <div><strong>Date:</strong> {event.date}</div>
              <div><strong>Price:</strong> {event.price} ETH</div>
              <div><strong>Tickets Remaining:</strong> {event.ticketRemaining}</div>
              <div><strong>Total Tickets:</strong> {event.ticketCount}</div>
              <button className="buy-button" onClick={() => handleBuys(event.id)}>Buy Ticket</button>
            </div>
          ))
        ) : (
          <p className="no-events">No events available</p>
        )}
      </div>
    </div>
  );
};

export default DisplayEvents;
