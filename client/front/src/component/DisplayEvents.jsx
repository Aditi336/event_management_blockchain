import React, { useState, useEffect } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { contractAddress, contractAbi } from '../constant/constant';

const DisplayEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        const eventCount = await contract.nextId(); // Assuming nextId is the count of events
        let eventList = [];

        for (let i = 0; i < eventCount; i++) {
          const event = await contract.events(i);
          eventList.push({
            id: i,
            organizer: event.organizer,
            name: event.name,
            date: new Date(Number(event.date) * 1000).toLocaleDateString(),
            price: ethers.formatEther(event.price), // Convert from wei to ether
            ticketRemaining: Number(event.ticketRemaining),
            ticketCount: Number(event.ticketCounter),
          });
        }

        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Event List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Organizer</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Price (ETH)</th>
            <th className="border p-2">Tickets Remaining</th>
            <th className="border p-2">Total Tickets</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map(event => (
              <tr key={event.id} className="text-center">
                <td className="border p-2">{event.id}</td>
                <td className="border p-2">{event.organizer}</td>
                <td className="border p-2">{event.name}</td>
                <td className="border p-2">{event.date}</td>
                <td className="border p-2">{event.price}</td>
                <td className="border p-2">{event.ticketRemaining}</td>
                <td className="border p-2">{event.ticketCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border p-2 text-center">
                No events available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayEvents;
