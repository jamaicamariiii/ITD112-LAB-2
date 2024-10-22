import React, { useState, useEffect } from "react";
import AddStudentData from "./Components/AddStudentData";
import StudentDataList from "./Components/StudentDataList";
import CsvUploader from "./Components/CsvUploader";
import IQDistribution from "./Components/IQDistribution";
import StudyHabitComposition from "./Components/StudyHabitComposition";
import NATStudyHabitBoxPlot from "./Components/NATStudyHabitBoxPlot";  // Import new component
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';  
import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState("addStudent");
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const studentCollection = collection(db, "studentData");
      const studentSnapshot = await getDocs(studentCollection);
      const dataList = studentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudentData(dataList);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="sidebarlist">
            <li onClick={() => setSelectedOption("addStudent")}>Add Student Information</li>
            <li onClick={() => setSelectedOption("displayTable")}>Display Table</li>
            <li onClick={() => setSelectedOption("iqDistribution")}>IQ Distribution by Gender</li>
            <li onClick={() => setSelectedOption("studyHabitVisualization")}>Student Habit Composition</li>
            <li onClick={() => setSelectedOption("natStudyHabitVisualization")}>NAT Results by Study Habit Composition</li> {/* New option */}
          </ul>
        </div>

        {/* Main content */}
        <div className="content">
          <header className="App-header">
            <h1 className="app-title">STUDENT DATA MANAGEMENT</h1>
          </header>

          {selectedOption === "addStudent" && (
            <div className="two-column-section">
              <div className="form-column">
                <AddStudentData />
              </div>
              <div className="form-column">
                <CsvUploader setStudentData={setStudentData} />
              </div>
            </div>
          )}

          {selectedOption === "displayTable" && (
            <div className="single-column-section">
              <StudentDataList />
            </div>
          )}

          {selectedOption === "iqDistribution" && (
            <div className="visualization-section">
              <IQDistribution data={studentData} />
            </div>
          )}

          {selectedOption === "studyHabitVisualization" && (
            <div className="visualization-section">
              <StudyHabitComposition data={studentData} />
            </div>
          )}

          {selectedOption === "natStudyHabitVisualization" && (
            <div className="visualization-section">
              <NATStudyHabitBoxPlot data={studentData} />  {/* New component for box plot */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
