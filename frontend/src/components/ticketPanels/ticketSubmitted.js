import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const TicketSubmitted = () => {
  const navigate = useNavigate();

  function issueTicket() {
    navigate("/createTicket");
  }
  function logOut() {
    navigate("/createTicket");
  }

  return (
    <div className="ticketSubmitted">
      <header id="ticketSubmittedHeader">
        <img id="logoPic1" src={logo} alt="Logo" />
      </header>
      <br/>
      <h1 id="ticketSubmittedText">Your Ticket Has Been Submitted!</h1>
      <br/><br/>
      <h2 id="textEmail">A confromation Email has been Sent</h2> 
      <br/><br/>
      <button id="ticketSubmittedAnother" className="ticketSubmittedclass" onClick={issueTicket}>Issue Another Ticket</button>
      <br></br>
      <button id="ticketSubmittedAnother" onClick={logOut}>Log Out</button>
    </div>
  );
};

export default TicketSubmitted;
