import { useState } from "react";
import "./index.css";
import Input from "@mui/joy/Input";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";

const Studentoffering = ({ associateCourses, corsesType }) => {
  const [showList, setShowList] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [selectedStudentOffer, setSelectedStudentOffer] = useState("");
  const [studentRecords, setStudentRecord] = useState([]);
  const [open, setOpen] = useState(false);
  const [courseTypeselected, setCourseTypeselected] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");

  const formInputValu = (e) => {
    setStudentName(e.target.value);
  };

  const formhandling = (e) => {
    e.preventDefault();
    const newStudentsRecord = {
      studentRecord: studentName,
      courseTaken: selectedStudentOffer,
    };
    setStudentRecord((prev) => [...prev, newStudentsRecord]);
    setSelectedStudentOffer("");
    setStudentName("");
  };

  const handleStudentCourseOffer = (value) => {
    setSelectedStudentOffer(value);
  };

  const handleCourseFilter = (value) => {
    setSelectedCourseFilter(value);
  };

  const selectCourseTypeChange = (value) => {
    setCourseTypeselected(value);
  };

  const filteredRecords = studentRecords.filter((record) =>
    selectedCourseFilter
      ? record.courseTaken.includes(selectedCourseFilter)
      : true
  );

  return (
    <>
      <div className="course-type-main-container">
        <div className="main-container" onClick={() => setShowList(!showList)}>
          <h2>Students Registration</h2>
          <button className="filter-button" onClick={() => setOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-funnel"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
            </svg>
          </button>
        </div>
        { showList &&
        <div>
        <div>
          <form className="form-container" onSubmit={formhandling}>
            <div>
              <label>Student Name</label> <br />
              <Input
                size="md"
                placeholder="Enter Student Name"
                type="text"
                onChange={formInputValu}
                value={studentName}
              />
            </div>
            <div>
            <label>Course</label> <br />
              <Select
                placeholder="Select a course..."
                onChange={(_, value) => handleStudentCourseOffer(value)}
                value={selectedStudentOffer}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {associateCourses.map((item, index) => (
                  <Option
                    key={index}
                    value={`${item.courseType}-${item.courses}`}
                  >
                    {item.courseType}-{item.courses}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <button className="button-62" type="submit">Submit</button>
            </div>
          </form>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Course Offer</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((items, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{items.studentRecord}</td>
                    <td>{items.courseTaken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 1000,
              width: 250,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <Typography level="h4" sx={{ fontWeight: "lg", mb: 1 }}>
              Course Offering
            </Typography>
            <div>
              <label>Course Types</label> <br />
              <Select
                placeholder="Select a Course Type"
                onChange={(_, value) => selectCourseTypeChange(value)}
                value={courseTypeselected}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {corsesType.map((item, index) => (
                  <Option key={index} value={item.courseType}>
                    {item.courseType}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label>Course</label> <br />
              <Select
                placeholder="Select a Course"
                onChange={(_, value) => handleCourseFilter(value)}
                value={selectedCourseFilter}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {associateCourses
                  .filter((item) => item.courseType === courseTypeselected)
                  .map((filteredItem, index) => (
                    <Option key={index} value={filteredItem.courses}>
                      {filteredItem.courses}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="modal-layout-buttons">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>show</Button>
            </div>
          </Sheet>
        </Modal>
        </div>
}
      </div>
    </>
  );
};

export default Studentoffering;
