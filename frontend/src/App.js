

// Ticketing Importing 
import './components/ticketPanels/createTicketCSS.css';
import './components/ticketPanels/adminTicket.css';
import './components/ticketPanels/ticketSubmitted.css';
import CreateTicket from './components/ticketPanels/createTicket';
import AdminTicket from './components/ticketPanels/adminTicket';
import TicketSubmitted from './components/ticketPanels/ticketSubmitted';
// Tikceting Importing Ending 


// Booking Importing 
import AdminBooking from './components/bookingPanels/adminBooking/AdminBooking';
import CreateBooking from './components/bookingPanels/createBooking/CreateBooking';
import './components/bookingPanels/createBooking/CreateBooking.css';

// Booking Importing Ending



// Admin Importing 

import AdminPanel from './components/adminPanels/Admin_Panel';

// Admin Importing Ending



import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
       <BrowserRouter>
       <Routes>
        <Route path='/viewTickets' element= {<AdminTicket />} ></Route>
        <Route path='/createTicket' element= {<CreateTicket />} ></Route>
        <Route path='/ticketSubmitted' element= {<TicketSubmitted />} ></Route>
        <Route path='/viewBookings' element={<AdminBooking />}></Route>
        <Route path='/createBooking' element= {<CreateBooking />} ></Route>
        <Route path="/" element={<AdminPanel />} /> 
       </Routes>
  </BrowserRouter> 
       </div>  
  );
}

export default App;
