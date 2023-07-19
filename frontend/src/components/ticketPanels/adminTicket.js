import React, { useEffect, useState } from "react";
import axios from 'axios';

const AdminTicket = () => {


  const [subject, setTicket] = useState([])

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('priority');


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };


  const sortedData = [...subject].sort((a, b) => {
    if (sortOption === 'priority') {
      if (a.Priority === 'high' && b.Priority !== 'high') return -1;
      if (a.Priority !== 'high' && b.Priority === 'high') return 1;
      if (a.Priority === 'high' && b.Priority === 'high') return 0;
      if (a.Priority === 'medium' && b.Priority === 'low') return -1;
      if (a.Priority === 'low' && b.Priority === 'medium') return 1;
    }
    return 0;
  });


  const filteredData = sortedData.filter((data) =>
    data.TICKET_SUBJECT.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    axios.get('http://localhost:3001/adminTickets')
      .then(res => setTicket(res.data))
      .catch(err => console.log(err));
  })

  return (

    <div id="adminTicketDiv">

      <header id='adminHeader'>
        <h1>All Tickets</h1>
      </header>
      <br></br>

      <div class="container-adminTicket">
    <div className="searchField">
      <label for="search-input" class="search-label">Search by heading:</label>
      <input type="text" id="search-input" class="search-input"         placeholder="Search by subject..."
        value={searchTerm}
        onChange={handleSearch}/>
    </div>
    
    <div className="searchBased">
      <label for="sort-select" className="sort-label">Sort by:</label>
      <select   id="sort-select"
          className="sort-select"
          value={sortOption}
          onChange={handleSort}>
        <option value="priority">Priority</option>
      </select>
    </div>
    </div>

      <main id="ticketList">
          <table id="data">
            <tr>
              <th>Issued Date</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Status</th>
               <th>Images</th></tr>
            {filteredData.map((data, i) => (
              <tr key={i}>
                <td>{new Date(data.TICKET_DATE).toLocaleDateString('en-GB')}</td>
                <td>{data.TICKET_CATEGORY} </td>
                <td>{data.TICKET_SUBJECT}</td>
                <td>{data.TICKET_PRIORITY}</td>
                <td>{data.TICKET_STATUS}</td>
                <td><img className="adminTicketPic" src={`http://localhost:3001/uploads/`+ data.TICKET_PIC} alt="Ticket Issued"></img></td>
              </tr>
            ))}
          </table>
      </main>

    </div>
  );
}

export default AdminTicket;
