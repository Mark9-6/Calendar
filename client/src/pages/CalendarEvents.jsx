import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

function CalendarEvents({user}) {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const navigate =useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/auth/calendar/events`, { withCredentials: true });
        setEvents(response.data.events);
        setFilteredEvents(response.data.events);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching events");
      }
    };
 fetchEvents();
  }, []);


  const filterEventsByDate = ()=>{
    if(filterDate){
      const filtered = events.filter((event)=>{
        const eventData = new Date(event.start.dateTime || event.start.date);
        return eventData.toLocaleDateString() === new Date(filterDate).toLocaleDateString();
      })
      setFilteredEvents(filtered);
      
    }
    else {
      setFilteredEvents(events); 
    }
  }

  const clearFilter = ()=>{
     setFilteredEvents(events);
     setFilterDate("")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 className="text-center text-2xl font-bold mb-4 text-gray-800">Google Calendar Events</h1>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
     
       {/* filter functionality */}

     <div className="mb-4">       
        <label htmlFor="filterDate" className="block text-gray-700 font-semibold mb-2">Filter by Date:</label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="space-x-2">
        <button
          onClick={filterEventsByDate}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Filter
        </button>
         <button onClick={clearFilter} className="mt-2 bg-gray-400 hover:bg-gray-500  text-white py-2 px-4 rounded-md transition-all duration-300">Clear Filter</button>
        </div>
      </div>


      {/* event listings */}
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Event</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{event.summary}</td>
                <td className="border px-4 py-2">{new Date(event.start.dateTime || event.start.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}</td>
                <td className="border px-4 py-2">{event.location || "NA"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan="3">{user? "No upcoming events found.":"Login to show events"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>


    {/* return to home */}
    <div>
        <button onClick={()=>navigate('/')} className="py-4 hover:font-semibold"><span className="underline">Return to Home</span></button>
    </div>
  </div>
  
  );
}

export default CalendarEvents;
