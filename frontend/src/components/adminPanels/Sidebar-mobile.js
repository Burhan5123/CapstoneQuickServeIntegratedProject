import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Sidebar.css';

const showSettings = () => {
  document.getElementById('settings').style.display = "block";
  document.getElementById('viewUsers').style.display = "none";
  document.getElementById('addUser').style.display = "none";
  document.getElementById('delUser').style.display = "none";
  document.getElementById('reactUser').style.display = "none";
  document.getElementById('deactUser').style.display = "none";
  document.getElementById('default').style.display = "none";
}

const showViewUsers = () => {
  document.getElementById('viewUsers').style.display = "block";
  document.getElementById('settings').style.display = "none";
  document.getElementById('addUser').style.display = "none";
  document.getElementById('delUser').style.display = "none";
  document.getElementById('reactUser').style.display = "none";
  document.getElementById('deactUser').style.display = "none";
  document.getElementById('default').style.display = "none";
}


const showAddUser = () => {
  document.getElementById('addUser').style.display = "block";
  document.getElementById('settings').style.display = "none";
  document.getElementById('viewUsers').style.display = "none";
  document.getElementById('delUser').style.display = "none";
  document.getElementById('reactUser').style.display = "none";
  document.getElementById('deactUser').style.display = "none";
  document.getElementById('default').style.display = "none";
}

const showDelUser = () => {
  document.getElementById('delUser').style.display = "block";
  document.getElementById('settings').style.display = "none";
  document.getElementById('viewUsers').style.display = "none";
  document.getElementById('addUser').style.display = "none";
  document.getElementById('reactUser').style.display = "none";
  document.getElementById('deactUser').style.display = "none";
  document.getElementById('default').style.display = "none";
}

const showReactUser = () => {
  document.getElementById('reactUser').style.display = "block";
  document.getElementById('settings').style.display = "none";
  document.getElementById('viewUsers').style.display = "none";
  document.getElementById('addUser').style.display = "none";
  document.getElementById('delUser').style.display = "none";
  document.getElementById('deactUser').style.display = "none";
  document.getElementById('default').style.display = "none";
}

const showDeactUser = () => {
  document.getElementById('deactUser').style.display = "block";
  document.getElementById('settings').style.display = "none";
  document.getElementById('viewUsers').style.display = "none";
  document.getElementById('addUser').style.display = "none";
  document.getElementById('delUser').style.display = "none";
  document.getElementById('reactUser').style.display = "none";
  document.getElementById('default').style.display = "none";
}

function Sidebar() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/data/123456');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  if (data === null) {
    return <p>Cannot load data from the Backend...</p>;
  }

  return (
      <div className="Sidebar-mobile">

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="./">
      <h1 class="normal">
        <i class="bi bi-shield-lock-fill"></i> Admin Panel<sup class="upper">Mobile Version</sup>
      </h1>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDarkDropdown" data-bs-auto-close="true" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <br/>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink" id="navbarNavDropdown">
            <li class="user-active">
                <b class="dropdown-item active bg-success"><i class="bi bi-shield-lock-fill"></i> Welcome admin, { data[0].firstName ? data[0].firstName : <span>Null</span> }</b>
            </li>

            <li>
                <a class="dropdown-item" href="#accountSettings" onClick={showSettings}><i class="bi bi-gear-wide-connected"></i> Account Settings</a>
            </li>

            <li>
                <a class="dropdown-item" href="#viewUsers" onClick={showViewUsers}><i class="bi bi-people"></i> View Users</a>
            </li>

            <li>
                <a class="dropdown-item" href="#addUser" onClick={showAddUser}><i class="bi bi-person-plus"></i> Add New User</a>
            </li>

            <li>
                <a class="dropdown-item" href="#delUser" onClick={showDelUser}><i class="bi bi-person-x"></i> Remove User</a>
            </li>

            <li>
                <a class="dropdown-item" href="#reactUser" onClick={showReactUser}><i class="bi bi-person-check"></i> Reactivate User</a>
              </li>

            <li>
                <a class="dropdown-item" href="#deactUser" onClick={showDeactUser}><i class="bi bi-person-slash"></i> Deactivate User</a>
            </li>

            <li>
                <a href="/viewTickets"><i class="bi bi-ticket-perforated"></i> View Tickets</a>
            </li>

            <li>
                <a href="/viewBookings"><i class="bi bi-journal-bookmark"></i> View Bookings</a>
            </li>

            <li>
                <a href="./"><i class="bi bi-box-arrow-left"></i> Sign out</a>
            </li>
          </ul>
      </li>
      </ul>
    </div>
  </div>
</nav>
    
    </div>
  );
}

export default Sidebar;
