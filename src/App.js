import Individualcourses from './components/courses';
import CoursesOffering from './components/coursesOffering';
import Coursetype from './components/courseType';
import { courses, coursesTypeData } from './components/coursesDetails';
import { useState } from "react";
import Studentoffering from './components/studentsOffering';

function App() {
  const [jsondata, setjsonData] = useState(courses);
  const [coursesType, setCoursesType] = useState(coursesTypeData);
  const [associateCourses, setAssciateCourses] = useState([]); 
  return (
    <div className="App">
     <Coursetype corsesType={coursesType} setCoursesType={setCoursesType}/>
     <Individualcourses jsondata={jsondata} setjsonData={setjsonData}/>
     <CoursesOffering jsondata={jsondata} corsesType={coursesType} associateCourses={associateCourses} setAssciateCourses={setAssciateCourses} />
     <Studentoffering associateCourses={associateCourses} corsesType={coursesTypeData}/>
    </div>
  );
}

export default App;
