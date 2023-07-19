import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';

const CreateTicket = () => {
  const getInitialState = () => {
    const category = "General";
    return category;
  };

  const getInitialState1 = () => {
    const priority = "Low";
    return priority;
  };

  const [subject, setSubject] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState(getInitialState);

  const [priority, setPriority] = useState(getInitialState1);

  const navigate = useNavigate();

  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const currentTime = new Date();

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append('date', currentTime);
    formData.append('category', category);
    formData.append('priority', priority);
    formData.append('subject', subject);
    formData.append('description', description);
    
    axios.post("http://localhost:3001/createTicket", formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        navigate("/ticketSubmitted");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }


  return (
    <div id="createTicket_issueTicket">
      

      <form  id="createTicket_form" onSubmit={handleSubmit}>
        <header id="createTicket_ticketHeader">
        <nav>
        <ul>
        <li><img id="createTicket_logoPic" src={logo} alt="Logo" /></li>
          <li>  <h1 >Create Ticket</h1>   </li>
          <li> <a href="/">Log Out</a> </li>
        </ul>
      </nav>
         
        </header>

        <br />
        <main id="createTicket_issueTicketMain">
          <label id="createTicket_label" for="createTicket_inputTicketCategory">Issue Category:</label>
          <select
            id="createTicket_inputTicketCategory"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Technical">Technical</option>
            <option value="Water Issues">Water Issue</option>
            <option value="other">Furniture</option>
            <option value="other">Electrical</option>
            <option value="other">Bathroom</option>
            <option value="other">Flooring</option>
            <option value="other">Others</option>
          </select>

          <label id="createTicket_label" for="createTicket_inputTicketPriority">Priority:</label>
          <select
            id="createTicket_inputTicketPriority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <br />
          <label  id="createTicket_label" for="createTicket_inputTicketSubject">Ticket Subject:</label>
          <input
            type="text"
            id="createTicket_inputTicketSubject"
            name="subject"
            placeholder="Write the Subject for Issue"
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label  id="createTicket_label" for="createTicket_inputTicketDescription">Description:</label>
          <textarea
            id="createTicket_inputTicketDescription"
            name="description"
            cols="30"
            rows="10"
            placeholder="Add Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {/* adding a picture 
          status to add in adming panel
          adding the vendor name */}

          <br />

 <input type="file" onChange={handleFile}/>
          <input type="submit" value="Issue Ticket" />
          <input type="reset" value="Cancel" />
        </main>
      </form>
      
    </div>
  );
};

export default CreateTicket;
