import React, { useState } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import logo from '../assets/prospectLogo.png';
import Header from "./Header";
import Main from "./Main";
import { useNavigate } from "react-router-dom";

const user = {
  email: 'use@example.com',
};

const AdminBooking = () => {

  const navigate = useNavigate();
  const [requests, setRequests] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [orderBy, setOrderBy] = useState("");

  
  const searchedRequests = requests.filter(
    (request) => {
      const valueToLower = searchValue.toLowerCase();
      const roomIDLower = request.roomID.toString().toLowerCase();
      const nameToLower = request.name.toLowerCase();
      const noOfGuestLower = request.noOfGuest.toString().toLowerCase();
      const bookingDateLower = request.bookingDate.toLowerCase();
      const startTimeLower = request.startTime.toLowerCase();
      const totalHoursLower = request.totalHours.toString().toLowerCase();
      const enquiryLower = request.enquiry.toLowerCase();
      const endTimeLower = request.endTime.toLowerCase();

      return (
        roomIDLower.includes(valueToLower) ||
        nameToLower.includes(valueToLower) ||
        noOfGuestLower.includes(valueToLower) ||
        bookingDateLower.includes(valueToLower) ||
        startTimeLower.includes(valueToLower) ||
        totalHoursLower.includes(valueToLower) ||
        enquiryLower.includes(valueToLower) ||
        endTimeLower.includes(valueToLower) 
      );
    }
  );
  const totalRequests = searchedRequests.length;
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setOrderBy("");
  };
  
  const handleEdit = (values) => {
    const { id, roomID, name, noOfGuest, bookingDate, startTime, totalHours, enquiry, endTime } = values;
    navigate('/createBooking', {
      state: {
        id,
        roomID,
        name,
        noOfGuest,
        bookingDate,
        startTime,
        totalHours,
        enquiry,
        endTime,
      },
    });
  };
  
  const toDelete = (id, name) => {
    Swal.fire({
      title: 'Would you like to delete this register?',
      html: `<i><strong>${name}</strong> would be deleted from files.</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}` )
        .then(() => {
          getRequestList();
          Swal.fire({
            title:'Success!',
            html:`<strong>${name}</strong> has been deleted.`,
            icon:'success'
          });
        }).catch(function(error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Delete process failed.',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Please try again this operation later":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }


  const getRequestList = () => {
    Axios.get("http://localhost:3001/requests").then((response) => {
      const formattedData = response.data.map((item) => {
        const formattedDate = new Date(item.bookingDate).toISOString().split('T')[0];
        return {
          ...item,
          bookingDate: formattedDate,
        };
      });
      setRequests(formattedData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleAddBooking = () => {
    navigate('/createBooking');
  };

  getRequestList();

  // React.useEffect(() => {
  //   getRequestList();
  // }, []);

  return (
    <>
      <Header 
        title="Room Booking Request List" 
        logo={logo} 
        user={user} 
      />
      <Main 
        requests={requests}
        searchedRequests={searchedRequests}
        setRequests={setRequests}
        totalRequests={totalRequests}
        searchValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
        toDelete={toDelete}
        handleEdit={handleEdit}
        handleAddBooking={handleAddBooking}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
>
      </Main>
    </>
  );
}

export default AdminBooking;
