import React from "react";
import "./TableAdmin.css";

function Table({ id, roomID, name, noOfGuest, bookingDate, startTime, totalHours, enquiry, endTime, isChecked, onSelect, handleEdit, toDelete }) {


  return (
    <tr
      className={isChecked ? "row-container-ab selected table-active" : "row-container-ab"}
      onClick={onSelect} 
    >
      <td className="table-data-ab">{id}</td>
      <td className="table-data-ab">{roomID}</td>
      <td className="table-data-ab">{name}</td>
      <td className="table-data-ab">{noOfGuest}</td>
      <td className="table-data-ab">{bookingDate}</td>
      <td className="table-data-ab">{startTime}</td>
      <td className="table-data-ab">{totalHours}</td>
      <td className="table-data-ab">{enquiry}</td>
      <td className="table-data-ab">{endTime}</td>
      <td className="table-data-ab">
        {isChecked && (
          <>
            <button
              type="button"
              className="button-modify-ab"
              onClick={() => {
                handleEdit({
                  id,
                  roomID,
                  name,
                  noOfGuest,
                  bookingDate,
                  startTime,
                  totalHours,
                  enquiry,
                  endTime,
                });
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="button-delete-ab"
              onClick={() => {
                toDelete(id, name);
              }}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export { Table };
