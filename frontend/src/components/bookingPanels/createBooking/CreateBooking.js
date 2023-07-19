import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/prospectLogo.png";
<link
  href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap"
  rel="stylesheet"
></link>;

export default function CreateBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [noOfGuest, setNoOfGuest] = useState("");
  const [date, setDate] = useState("");
  const [time, setStartTime] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (state) {
      setId(state.id || "");
      setName(state.name || "");
      setRoomID(state.roomID || "");
      setNoOfGuest(state.noOfGuest || "");
      setDate(state.bookingDate || "");
      setStartTime(state.startTime || "");
      setTotalHours(state.totalHours || "");
      setEnquiry(state.enquiry || "");
      setEndTime(state.endTime || "");
    }
  }, [state]);

  function handleSubmit(event) {
    event.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Booking Created Successfully'
    })
    if (state) {
      Axios.put(`http://localhost:3001/booking/${id}`, {
        roomID,
        name,
        noOfGuest,
        date,
        time,
        totalHours,
        enquiry,
      })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "<strong>Update completed.</strong>",
            html: `<i> Booking request made by ${name} was included in successfully</i>`,
            icon: "success",
          }).then(() => {
            navigate("/createBooking");
          });
        })
        .catch((err) => console.log(err));
    } else {
      Axios.post("http://localhost:3001/booking", {
        roomID,
        name,
        noOfGuest,
        date,
        time,
        totalHours,
        enquiry,
      })
        .then((res) => {
          console.log(res);
          navigate("/createBooking");
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCancel() {
    navigate("/admin");
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      roomID: roomID,
      name: name,
      noOfGuest: noOfGuest,
      bookingDate: date,
      startTime: time,
      totalHours: totalHours,
      enquiry: enquiry,
      endTime: endTime,
    })
      .then(() => {
        Swal.fire({
          title: "<strong>Update completed.</strong>",
          html: `<i> Booking request made by ${name} was included in successfully</i>`,
          icon: "success",
        }).then(() => {
          navigate('/createBooking');
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Please, try again this operation later"
              : JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  return (
    <>
      <header className="header-ct">
        <img id="webLogo-ct" src={logo} alt=""></img>
        <h1 id="ticketHeader-ct">Create Booking</h1>
      </header>

      <div className="main-ct">
        <div className="form-ct">
          <h2 className="welcome-ct">Welcome! John</h2>{" "}
          <h2 className="welcome-ct">Email: John@example.com </h2>
          <br />
          <div className="insideForm-ct">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label-ct">Name:</label>
                <input
                  type="text"
                  className="input-ct"
                  placeholder="Add your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                ></input>
                <br />
              </div>
              <div>
                <label className="label-ct">Select Room Number:</label>
                <select
                  onChange={(e) => setRoomID(e.target.value)}
                  className="select-ct"
                  value={roomID}
                  required
                >
                  <option value="">Choose a Room Number</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div>
                <label className="label-ct">Select Number Of Guests:</label>
                <select
                  onChange={(e) => setNoOfGuest(e.target.value)}
                  className="select-ct"
                  value={noOfGuest}
                  required
                >
                  <option value="">Choose Number Of Max Guests</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div>
                <label className="label-ct">Date Of Booking:</label>
                <input
                  type="date"
                  className="input-ct"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  required
                ></input>
                <br />
              </div>

              <div>
                <label className="label-ct">Start Time:</label>
                <input
                  type="time"
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input-ct"
                  value={time}
                  required
                ></input>
                <br />
              </div>

              <div>
                <label className="label-ct">Select Number Of Hours:</label>
                <select
                  onChange={(e) => setTotalHours(e.target.value)}
                  className="select-ct"
                  value={totalHours}
                  required
                >
                  <option value="">Choose Number Of Hours</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">until end of the day</option>
                </select>
              </div>

              <div>
                <label className="label-ct">Any enquiries or concerns:</label>
                <textarea
                  className="textarea-ct"
                  cols="40"
                  rows="10"
                  placeholder="Add Description"
                  onChange={(e) => setEnquiry(e.target.value)}
                  value={enquiry}
                ></textarea>
              </div>

              <div className="submitButtonPos-ct">
                {state ? (
                  <>
                    <button className="update-ct" type="submit" onClick={update}>
                      Update
                    </button>
                    <button className="cancel-ct" type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <input className="submit-ct" type="submit" value="Book Room!" />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export { CreateBooking };
