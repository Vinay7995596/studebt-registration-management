import { useState } from "react";
// import {courses} from "../coursesDetails";
import "./index.css";
import Modal from "@mui/joy/Modal";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";

const Individualcourses = ({ jsondata, setjsonData }) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState(false)
  const [existName, setNameExist] = useState(false)

  const addingCourseType = () => {
    setOpen(true);
    setShowList(false)
  };

  const courseTypeInput = (e) => {
    setInputValue(e.target.value);
  };


const addingData = () => {
    if (inputValue.length > 0) {

      const isDuplicate = jsondata.some(
        (course) => course.courseName.toLowerCase() === inputValue.toLowerCase()
      );
  
      if (isDuplicate) {
        setNameExist(true);
        return;
      }
      if (editIndex !== null) {
        const updatedData = [...jsondata];
        updatedData[editIndex] = {
          ...updatedData[editIndex],
          courseName: inputValue, 
        };
        setjsonData(updatedData);
        setEditIndex(null); 
        setInputValue(""); 
        setOpen(false);
      } else {
        const newData = {
          courseName: inputValue, 
        };
        setjsonData([...jsondata, newData]);
        setInputValue(""); 
        setOpen(false);
      }
    } else {
      setError(true)
    }
  
   
  
   
  };
  
  const editCourse = (index) => {
    setOpen(true);
    setInputValue(jsondata[index].courseName); 
    setEditIndex(index); 
  };
  

  const deleteJson = (deletedItem) => {
    const updateitems = jsondata.filter((_, items) => items!== deletedItem)
    setjsonData(updateitems)
  }

  return (
    <>
      <div className="course-type-main-container">
        <div className="main-container" onClick={() => setShowList(!showList)}>
          <h2>Courses</h2>
          <button className="button-15" onClick={addingCourseType}>Add new...</button>
        </div>
        <div
          className="modal-show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
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
              {/* <ModalClose variant="plain" sx={{ m: 1 }} /> */}
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                sx={{ fontWeight: "lg", mb: 1 }}
              >
                Course
              </Typography>
              <Typography id="modal-desc" textColor="text.tertiary">
                <div>
                  <label>Course Name</label> <br />
                  <Input
                    size="md"
                    placeholder="Course Name ..."
                    type="text"
                    onChange={courseTypeInput}
                    value={inputValue}
                  />
                </div>
              </Typography>
              {
              error && 
              <div className="error-in-offering">
              Enter the Course Name
            </div>
            }
            {
              existName &&
              <div className="error-in-offering">
              Course Name alredy exist
            </div>
            }
              <div className="modal-layout-buttons">
                <Button variant="outlined" onClick={() => {setOpen(false)
                  setError(false)
                  setInputValue('')
                  setNameExist(false)
                }}>
                  Cancel
                </Button>
                <Button variant="solid" onClick={addingData}>
                  Save
                </Button>
              </div>
            </Sheet>
          </Modal>
        </div>
        <div>
          {showList && (
            <ul>
              {jsondata.map((items, index) => (
                <li key={index} className="label-container">
                  <div className="inside-main-container">
                  <div>{items.courseName}</div>
                  <div className="inside-list-container">
                    <div className="pencil-icon" onClick={()=> editCourse(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                      </svg>
                    </div>
                    <div className="pencil-icon" onClick={()=> deleteJson(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                        color="red"
                        cursor="pointer"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </div>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Individualcourses;
