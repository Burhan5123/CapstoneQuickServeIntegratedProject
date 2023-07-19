import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {Table} from "./Table";
import "./Main.css";

function Main({ 
  totalRequests,
  searchValue,
  requests,
  handleSearchInputChange,
  toDelete,
  handleEdit,
  handleAddBooking,
  orderBy,
  setOrderBy,
}) {  

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const filteredAndSortedRequests = requests.filter((request) => {
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
  }).sort((a, b) => {
    if (orderBy === 'bookingDate') {
      return a.bookingDate.localeCompare(b.bookingDate);
    } else if (orderBy === 'id') {
      return a.id - b.id;
    } else if (orderBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (orderBy === 'roomID') {
      return a.roomID.toString().localeCompare(b.roomID.toString());
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className='main-header'>
        <div className="search-container-ab">
          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="BookingDate">Booking Date</option>
            <option value="id">Order Number</option>
            <option value="name">Name</option>
            <option value="roomID">Room Number</option>
          </select>
          <p className="total-search-ab search-container-element-ab">Total Room Requests: {totalRequests}</p>
          <div className="search-input-explorer-ab search-container-element-ab">
            <FaSearch className="search-icon-ab" />
            <input
              type="text"
              className="search-input-ab"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
      <table className="table table-hover">
        <thead className="header-container table-dark">
          <tr className="row-container-ab">
            <th className="table-header-ab">Order #</th>
            <th className="table-header-ab">Room ID</th>
            <th className="table-header-ab">Name</th>
            <th className="table-header-ab">Guests Number</th>
            <th className="table-header-ab">Date of Booking</th>
            <th className="table-header-ab">Start Time</th>
            <th className="table-header-ab">Total Hrs</th>
            <th className="table-header-ab">Enquiry</th>
            <th className="table-header-ab">End Time</th>
            <th>
              <button
                type="button"
                className="table-header-ab button-content-ab"
                onClick={() => {
                  handleAddBooking();
                }}
              >
                Add Booking
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="table-body-ab">
          {filteredAndSortedRequests.map((val, index) => (
            <Table 
              key={val.id}
              isChecked={selectedRows.includes(index)}
              id={val.id}
              roomID={val.roomID}
              name={val.name}
              noOfGuest={val.noOfGuest}
              bookingDate={val.bookingDate}
              startTime={val.startTime}
              totalHours={val.totalHours}
              enquiry={val.enquiry}
              endTime={val.endTime}
              toDelete={() => toDelete(val.id, val.name)}
              onSelect={() => handleRowSelection(index)}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export  default  Main ;