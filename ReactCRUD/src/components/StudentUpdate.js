import React, { useEffect, useState } from 'react'
import StudentServices from './StudentServices';
import { useParams, useNavigate, Link  } from "react-router-dom";

function StudentUpdate() {

  const params = useParams();
  const [student, setStudent] = useState(null);
  let navigate = useNavigate();

  useEffect(()=>{
    StudentServices.getStudentById(params.id).then((response) => {
      setStudent(response.data);
  });
  },[]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    let data = { ...student };
    data[name] = value;
    setStudent(data);
    console.log(student.studentAddress);
  }

  const updateStudent = () => {
    StudentServices.updateStudent(student.id, student).then(res => {
      console.log("update success!");
      navigate(-1);
    });
  }

  var layout;
  if(student!=null){
    layout=(
      <>
      <div className='container'>
      <div className='card-body'>
          <div className='row mt-5'>
          <div className='col-md-4'>
            <img src={student.image} height='400' width='300'></img>
          </div>
          <div className='col-md-8'>
            <div className='form-group'>
              <label> Student Full Name: </label>
              <input name='fullname' className='form-control' value={student.fullname} required onChange={(e) => handleChange(e)}>
              </input>
            </div>

            <div className='form-group'>
              <label> Student Class: </label>
              <input name='stClass' className='form-control' value={student.stClass} onChange={(e) => handleChange(e)}>
              </input>
            </div>

            <div className='form-group'>
              <label> Student Email: </label>
              <input name='email' className='form-control' value={student.email} onChange={(e) => handleChange(e)}>
              </input>
            </div>
            <label> Student Adress: </label>
            <input name='address' className='form-control' value={student.address} onChange={(e) => handleChange(e)}>
            </input>

            <div className='form-group'>
              <label> Student Phone: </label>
              <input name='phone' className='form-control' value={student.phone} onChange={(e) => handleChange(e)}>
              </input>
            </div>

            <div className='form-group'>
              <label> Student ImageURL: </label>
              <input name='image' className='form-control' value={student.image} onChange={(e) => handleChange(e)}>
              </input>
            </div>

            <div className='form-group'>
              <label> Student Score: </label>
              <input name='score' className='form-control' value={student.score} onChange={(e) => handleChange(e)}>
              </input>
            </div>

            <button className='btn btn-info mt-2 me-2' onClick={() => updateStudent()}> Update </button>
            <Link to={"/"}><button className='btn btn-secondary mt-2'> Cancle </button></Link>

            </div>
            </div>
        </div>
        </div>
        </>
    );
  }else{
    layout=(<><h1>Error 404</h1></>);
  }


    return (
      <div className='container'>
        <h1> Update student </h1>
        {layout}
      </div>
    );
}

export default StudentUpdate;




