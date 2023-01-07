import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function App() {
  const [attendance, setAttendance] = useState([]);
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  // useEffect hook to update the list of students present in the school
  useEffect(() => {
    const studentsPresent = attendance.filter(
      (student) => student.checkOutTime === ""
    );
    console.log(
      `There are currently ${studentsPresent.length} students present in the school.`
    );
  }, [attendance]);

  function handleCheckIn() {
    setAttendance([
      ...attendance,
      { rollNumber, name, checkInTime: new Date().toString() },
    ]);
  }

  function handleCheckOut(index) {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].checkOutTime = new Date().toString();
    setAttendance(updatedAttendance);
  }
  useEffect(() => {
    const totalStudents = attendance.length;
    console.log(`There have been ${totalStudents} students checked in today.`);
  }, [attendance]);


  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark' : 'bg-light';
  }, [darkMode]);

  
  return (
    <>
      <Navbar />
     

      <div className="container mt-5" style={{ color: darkMode ? 'white' : 'black' }}>
      <button type="button" className={`btn btn-${darkMode ? 'light' : 'dark' }`} onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <WbSunnyIcon/> : <DarkModeIcon/>}
      </button>

        <h1 className="text-center text-info mb-4">Attendance System</h1>
        <form className="mx-auto" style={{ width: "400px" }}>
          <div>
            <div className="form-group ">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-2 mb-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group ">
              <label>Roll Number</label>
              <input
                type="number"
                className="form-control mt-2 mb-2"
                value={rollNumber}
                onChange={(event) => setRollNumber(event.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-4 mx-auto d-block"
            style={{ width: "100px" }}
            onClick={handleCheckIn}
          >
            Check In
          </button>
        </form>

        <br />
        <table className="table mt-5" style={{ color: darkMode ? 'white' : 'black' }}>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((student, index) => (
              <tr key={student.rollNumber}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.checkInTime}</td>
                <td>{student.checkOutTime || "-"}</td>
                <td>
                  {student.checkOutTime ? (
                    "-"
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleCheckOut(index)}
                    >
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3 className="text-center ">
            Total students present in today: {attendance.length}
          </h3>
        </div>
      </div>
    </>
  );
}

export default App;
