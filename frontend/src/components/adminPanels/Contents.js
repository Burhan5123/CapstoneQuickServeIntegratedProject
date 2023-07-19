import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cover from './images/cover.png';
import './Contents.css';
import Sidebar_Mobile from './Sidebar-mobile';

// generate random number
function generator() {
  // string so we can store each number one by one
  let randomNumber = "";
  
  // loop generate random number 6 times
  for (let i = 0; i < 6; i++) {
    randomNumber += Math.floor(Math.random() * 9);
  }

  // check if length is 6 if not callback
  if(randomNumber.length == 6){
    // convert into number datatype and return it
    return Number(randomNumber);
  } else {
    // callback
    generator();
  }
  
}

const generatedId = generator();
let response = null;
let i;

// Method for creating modal trigger
function createTrigger() {

  if(document.getElementById('trigger') == null) {

    let btn = document.createElement("button");

    btn.id = "trigger";
    btn.type = "button";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalDisplay");
    btn.hidden = true;

    // Create Element
    document.body.appendChild(btn);

  } else {
    console.log("Can't Create modal trigger, Element exist!");
  }

}

// method for creating modal
function createModal(response) {

  // Modal Parent
  const modalDisplay = document.createElement("div");
  modalDisplay.id = "modalDisplay";
  modalDisplay.setAttribute("class", "modal fade");

  // Modal Outer Child 0
  const modalChild0 = document.createElement("div");
  modalChild0.id = "modalChild0";
  modalChild0.setAttribute("class", "modal-dialog modal-dialog-centered modal-dark");

  // Modal Inner Child 1
  const modalChild1 = document.createElement("div");
  modalChild1.id = "modalChild1";
  modalChild1.setAttribute("class", "modal-content");

    // Modal Child 1 of Inner Child 1
    const modalChild1of1 = document.createElement("div");
    modalChild1of1.id = "modalChild1of1";
    modalChild1of1.setAttribute("class", "modal-header");

      // h5 of Modal Child 1 of Inner Child 1
      const modalChild1of1H5 = document.createElement("h5");
      modalChild1of1H5.setAttribute("class", "modal-title");
      modalChild1of1H5.innerText = "Prospect Now - Admin Panel";

      // Button of Modal Child 1 of Inner Child 1
      const modalChild1of1Btn = document.createElement("button");
      modalChild1of1Btn.type = "button";
      modalChild1of1Btn.setAttribute("class", "btn-close");
      modalChild1of1Btn.setAttribute("data-bs-dismiss", "modal");
      modalChild1of1Btn.setAttribute("aria-label", "Close");

    // Modal Child 2 of Inner Child 1
    const modalChild2of1 = document.createElement("div");
    modalChild2of1.id = "modalChild2of1";
    modalChild2of1.setAttribute("class", "modal-body text-center");
    modalChild2of1.innerText = response;

    const modalChild3of1 = document.createElement("div");
    modalChild3of1.id = "modalChild3of1";
    modalChild3of1.setAttribute("class", "modal-footer");

    const modalChild3of1Btn = document.createElement("button");
    modalChild3of1Btn.type = "button";
    modalChild3of1Btn.setAttribute("class", "btn btn-success");
    modalChild3of1Btn.setAttribute("data-bs-dismiss", "modal");
    modalChild3of1Btn.innerText = "Close";

  // Create Modals
  document.body.appendChild(modalDisplay);
  document.getElementById("modalDisplay").appendChild(modalChild0);
  document.getElementById("modalChild0").appendChild(modalChild1);

  document.getElementById("modalChild1").appendChild(modalChild1of1);
  document.getElementById("modalChild1of1").appendChild(modalChild1of1H5);
  document.getElementById("modalChild1of1").appendChild(modalChild1of1Btn);

  document.getElementById("modalChild1").appendChild(modalChild2of1);

  document.getElementById("modalChild1").appendChild(modalChild3of1);
  document.getElementById("modalChild3of1").appendChild(modalChild3of1Btn);

  // Kill the parent and children will follow
  //modalDisplay.remove();
}

// callback response
const checkCallbackResponse = async () => {

  // Create modal trigger element
  createTrigger();

  // get dom element with id trigger
  const modalTrigger = document.getElementById("trigger");

  // response user add
  if(window.location.href.includes("#userAddedTrue") && !window.location.href.includes("#refresh")){

    response = "User added successfully!"; // set response string
    createModal(response); // create modal and pass on the response
    modalTrigger.click(); // trigger click event on button
    window.open(window.location.href+"#refresh", '_self'); // change the url, add #refresh so that it wont do a callback function again

  } else if(window.location.href.includes("#userAddedFalse") && !window.location.href.includes("#refresh")){

    response = "User is not added to the database!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  }

  // response user delete
  if(window.location.href.includes("#userDeletedTrue") && !window.location.href.includes("#refresh")){

    response = "User deleted successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#userDeletedFalse") && !window.location.href.includes("#refresh")){

    response = "User is not deleted in the database! \n\nIf user is an admin you cannot use admin panel to delete another admin, you can only delete admin data directly in the database. (For Security Purposes)";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 

  // response user reactivate
  if(window.location.href.includes("#userReactivatedTrue") && !window.location.href.includes("#refresh")){

    response = "User account is reactivated successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#userReactivatedFalse") && !window.location.href.includes("#refresh")){

    response = "User account is not reactivated!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 

  // response user deactivate
  if(window.location.href.includes("#userDeactivatedTrue") && !window.location.href.includes("#refresh")){

    response = "User account is deactivated successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#userDeactivatedFalse") && !window.location.href.includes("#refresh")){

    response = "User account is not deactivated!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 

  // response admin update pass
  if(window.location.href.includes("#passUpdatedTrue") && !window.location.href.includes("#refresh")){

    response = "Admin password updated successfully!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } else if(window.location.href.includes("#passUpdatedFalse") && !window.location.href.includes("#refresh")){

    response = "Admin password is not updated!";
    createModal(response);
    modalTrigger.click();
    window.open(window.location.href+"#refresh", '_self');

  } 
}

//  Method for checking time on what greetings will be shown to user
const checkTime = (current) => {

  // Array for the greetings
  let greetsArr = ['Good Morning! 🌞', 'Good Afternoon! 🌇', 'Good Evening! 🌃'];
  let greetings;

  // check time using 24 hour format
  if(current.getHours() >= 0 && current.getHours() <= 11) {
      greetings = greetsArr[0];
  } else if(current.getHours() >= 12 && current.getHours() <= 17) {
      greetings = greetsArr[1];
  } else {
      greetings = greetsArr[2];
  }

  // return the greetings
  return greetings;

}


function Contents() { 

  // date
  let current = new Date();
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let dateToday = day[current.getDay()] + " " + month[current.getMonth()] + " " + current.getDate() + ", " + current.getFullYear();

  // server host
  const host = "http://localhost:3001/";

  // form
  const [formData, setFormData] = useState({
    userId: '',
    userEmail: '',
    userPass: '',
    userPassOld: '',
    fName: '',
    lName: '',
    searchUID: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // fetch backend data
  const [dataAdmin, setDataAdmin] = useState(null);
  const [dataUsers, setDataUsers] = useState(null);

  useEffect(() => {
    const fetchDataAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/data/123456');
        setDataAdmin(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataAdmin();

    const fetchDataUsers = async (typeOfData) => {
      try {
        let response;
        if(typeOfData === "user") {
          response = await axios.get('http://localhost:3001/'+typeOfData+'/');
        } else{
          response = await axios.get('http://localhost:3001/user/'+typeOfData+'/');
        }
        
        setDataUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataUsers("user");

  }, []);

  
  // UNDER DEVELOPMENT
  // const userDataFiltered = async (dataFilter) => {
  //   switch(dataFilter) {
  //     case "activeOnly":
  //       fetchDataUsers("activeOnly");
  //       break;
  //     case "deactOnly":
  //       fetchDataUsers("deactOnly");
  //       break;
  //     case "guestOnly":
  //       fetchDataUsers("guestOnly");
  //       break;
  //     case "emloyeeOnly":
  //       fetchDataUsers("emloyeeOnly");
  //       break;
  //     case "adminOnly":
  //       fetchDataUsers("adminOnly");
  //       break;
  //     default: // default all user data
  //       fetchDataUsers("user");
  //       break;
  //   }
  // }

  // local fields
  let adminUID = 0;

  // check if data is not null
  if (dataAdmin === null || dataUsers === null) {
    return <p>Cannot load data from the Backend...</p>;
  } else {
    adminUID = dataAdmin[0].userid;
    console.log("Active Admin UID: " + adminUID);
  }


  function User({ searchInput }) {

    // if search input is empty show all the data from database
    if(searchInput === null || searchInput === "") {
      return dataUsers.map((item) => (       
        <tr>
          <th scope="row">{item.userid}</th>
          <td scope="row">{item.firstName}</td>
          <td scope="row">{item.lastName}</td>
          <td scope="row">{item.email}</td>
          <td scope="row">{item.isEmployee === 1 ? "true" : "false"}</td>
          <td scope="row">{item.isAdmin === 1 ? "true" : "false"}</td>
          <td scope="row">{item.isActive === 1 ? "true" : "false"}</td>
        </tr>
      ))
    }

    // get length of the data
    let lengthOfData = Object.keys(dataUsers).length;
    // Field for the index of the data that matched in user search input. default is -1 if no data matched
    let dataIndex = -1;

    // loop thru the data until the matching data is found
    for(i=0; i < lengthOfData; i++) {
      
      // converts to string so we can use string methods for searching
      let toStringData = "" + dataUsers[i].userid;
      let toStringSearchData = "" + searchInput;

      // if data include of what the search input is
      if(toStringData.startsWith(toStringSearchData)){
        
        dataIndex = i;
        console.log("Matched Data! at Index: " + dataIndex);

      } 

    }

    // if data found show the data with the correct index of the data. if data index is equals or greaterthan zero means that is match
    if(dataIndex >= 0){
      return <tr>
            <th scope="row">{dataUsers[dataIndex].userid}</th>
            <td scope="row">{dataUsers[dataIndex].firstName}</td>
            <td scope="row">{dataUsers[dataIndex].lastName}</td>
            <td scope="row">{dataUsers[dataIndex].email}</td>
            <td scope="row">{dataUsers[dataIndex].isEmployee === 1 ? "true" : "false"}</td>
            <td scope="row">{dataUsers[dataIndex].isAdmin === 1 ? "true" : "false"}</td>
            <td scope="row">{dataUsers[dataIndex].isActive === 1 ? "true" : "false"}</td>
          </tr>
    } else{
      return <tr>
              <th scope="row">No Data</th>
              <td scope="row">No Data</td>
              <td scope="row">No Data</td>
              <td scope="row">No Data</td>
              <td scope="row">No Data</td>
              <td scope="row">No Data</td>
              <td scope="row">No Data</td>
            </tr>;
    }

  }

  return (
        <div className="Contents" id="Contents" onLoad={checkCallbackResponse}>

            <div id="default">
              <img src={cover} alt="Prospect Now Logo" title="Prospect Now" />
              <h1 id="greetings">{checkTime(current)}</h1>
              <p id="dateToday"><b>Today is {dateToday}</b></p>
            </div>

            <div id="settings">
                <h1>Account Settings</h1>

                <form method="GET" action={host+"admin/newpass?userId="+adminUID+"&userNewPass="+formData.userPass}>
                    <b>Change Password</b><br/>

                    <input name="userId" type="text" value={dataAdmin[0].userid} hidden required />

                    <div>
                      <label for="userPass">Password: </label>
                      <input id="userPass" class="form-control" name="userPass" type="text" value={formData.userPass} placeholder="Enter New Password" onChange={handleChange} required />
                    </div>

                    <button class="btn btn-success" type="submit"><i class="bi bi-check2-circle"></i> Change Password</button>
                </form>
            </div>

            <div id="viewUsers">
                <h1>View Users</h1>

                <div id="searchBar">

                <div id="search">
                  <label for="searchUID">Search User: </label>
                  <input id="searchUID" name="searchUID" class="form-control" type="number" placeholder="Search user by User ID" onChange={handleChange} />
                </div><br/>

                {/* <div>
                      <label for="dept">Table Settings: </label>
                      <select id="dept" class="form-control">
                        <option selected onClick={userDataFiltered} disabled>Default view</option>
                        <option onClick={userDataFiltered("activeOnly")}>Show Active Users only</option>
                        <option onClick={userDataFiltered("deactOnly")}>Show Deactivated Users only</option>
                        <option onClick={userDataFiltered("guestOnly")}>Show Guest only</option>
                        <option onClick={userDataFiltered("emloyeeOnly")}>Show Employees only</option>
                        <option onClick={userDataFiltered("adminOnly")}>Show Admins only</option>
                      </select>
                </div> */}
                </div>

                <div class="table-responsive">
                <table class="table table-hover table-dark">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Firstname</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Email</th>
                      <th scope="col">isEmployee</th>
                      <th scope="col">isAdmin</th>
                      <th scope="col">isActive</th>
                    </tr>
                  </thead>
                  <tbody>
                {Array.isArray(dataUsers) ? (
                     
                    <User searchInput={formData.searchUID} />
                    
                    // <tr>
                    //   <th scope="row" key={item.userid}>{item.userid}</th>
                    //   <td scope="row" key={item.firstName}>{item.firstName}</td>
                    //   <td scope="row" key={item.lastName}>{item.lastName}</td>
                    //   <td scope="row" key={item.email}>{item.email}</td>
                    //   <td scope="row" key={item.isEmployee}>{item.isEmployee === 1 ? "true" : "false"}</td>
                    //   <td scope="row" key={item.isAdmin}>{item.isAdmin === 1 ? "true" : "false"}</td>
                    // </tr>
                ) : (
                  <p>No data available</p>
                )}
                  </tbody>
                </table>
                </div>
          </div>

            <div id="addUser">
                <h1>Add New user</h1>

                <form method="GET" action={host+"user/new?userId="+formData.userId+"&userEmail="+formData.userEmail+"&userPass="+formData.userPass+"&fName="+formData.fName+"&lName="+formData.lName}>

                    <div>
                      <label for="userId">User ID: </label>
                      <input id="userId" name="userId" class="form-control" type="number" value={generatedId} readOnly title="Automatically Generated" />
                    </div>

                    <div>
                      <label for="userEmail">Email: </label>
                      <input id="userEmail" name="userEmail" class="form-control" type="email" value={formData.userEmail} placeholder="Enter Email" required onChange={handleChange} />
                    </div>

                    <div>
                      <label for="userPass">Password: </label>
                      <input id="userPass" name="userPass" class="form-control" type="text" value={formData.userPass} placeholder="Enter Password" required onChange={handleChange} />
                    </div>

                    <div>
                      <label for="fName">First Name: </label>
                      <input id="fName" name="fName" class="form-control" type="text" value={formData.fName} placeholder="Enter First Name" required onChange={handleChange} />
                    </div>

                    <div>
                      <label for="lName">Last Name: </label>
                      <input id="lName" name="lName" class="form-control" type="text" value={formData.lName} placeholder="Enter Last Name" required onChange={handleChange} />
                    </div>

                    {/* <div>
                      <label for="dept">Department: </label>
                      <select id="dept" class="form-control">
                        <option selected disabled>Select Employee Department</option>
                        <option onClick={searchDataFiltered("")}>IT Department</option>
                        <option onClick={searchDataFiltered("")}>Human Resource</option>
                        <option onClick={searchDataFiltered("")}>Finance</option>
                        <option onClick={searchDataFiltered("")}>Security</option>
                        <option onClick={searchDataFiltered("")}>Maintenance</option>
                      </select>
                    </div> */}

                    <button class="btn btn-success" type="submit"><i class="bi bi-person-add"></i> Add New User</button>
                </form>
            </div>

            <div id="delUser">
                <h1>Remove user</h1>

                <form method="GET" action={host+"user/delete?userId="+formData.userId+"&userEmail="+formData.userEmail}>

                    <div>
                      <label for="userId">User ID: </label>
                      <input id="userId" name="userId" class="form-control" type="number" value={formData.userId} placeholder="Enter User ID" onChange={handleChange} required />
                    </div>

                    <div>
                      <label for="userEmail">User Email: </label>
                      <input id="userEmail" name="userEmail" class="form-control" type="email" value={formData.userEmail} placeholder="Enter User Email" onChange={handleChange} required  />
                    </div>

                    <span className="checkbox">
                        <input id="confirmation" type="checkbox" required />
                        <label id="confirmationTxt" for="confirmation"> I confirm that I want to remove this user. Once removed it cannot be undone.</label>
                    </span><br/>

                    <button class="btn btn-danger" type="submit"><i class="bi bi-trash"></i> Remove User</button>
                </form>
            </div>

            <div id="reactUser">
                <h1>Reactivate user</h1>

                <form method="GET" action={host+"user/reactivate?userId="+formData.userId+"&userEmail="+formData.userEmail}>

                    <div>
                      <label for="userId">User ID: </label>
                      <input id="userId" name="userId" class="form-control" type="number" value={formData.userId} placeholder="Enter User ID" onChange={handleChange} required />
                    </div>

                    <div>
                      <label for="userEmail">User Email: </label>
                      <input id="userEmail" name="userEmail" class="form-control" type="email" value={formData.userEmail} placeholder="Enter User Email" onChange={handleChange} required  />
                    </div>

                    <button class="btn btn-success" type="submit"><i class="bi bi-person-check"></i> Reactivate User</button>
                </form>
            </div>

            <div id="deactUser">
                <h1>Deactivate user</h1>

                <form method="GET" action={host+"user/deactivate?userId="+formData.userId+"&userEmail="+formData.userEmail}>

                    <div>
                      <label for="userId">User ID: </label>
                      <input id="userId" name="userId" class="form-control" type="number" value={formData.userId} placeholder="Enter User ID" onChange={handleChange} required />
                    </div>

                    <div>
                      <label for="userEmail">User Email: </label>
                      <input id="userEmail" name="userEmail" class="form-control" type="email" value={formData.userEmail} placeholder="Enter User Email" onChange={handleChange} required  />
                    </div>

                    <span className="checkbox">
                        <input id="confirmation0" type="checkbox" required />
                        <label id="confirmationTxt" for="confirmation0"> I confirm that I want to deactivate this user. Once deactivated the user cannot access their account.</label>
                    </span><br/>

                    <button class="btn btn-warning" type="submit"><i class="bi bi-person-slash"></i> Deactivate User</button>
                </form>
            </div>

        </div>
  );
}

export default Contents;
