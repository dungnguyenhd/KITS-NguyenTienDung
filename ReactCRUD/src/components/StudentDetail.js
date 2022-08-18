import React, { useEffect, useState } from 'react'
import StudentServices from './StudentServices';
import { useParams, Link } from "react-router-dom";

function StudentDetail() {

  const params = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    StudentServices.getStudentById(params.id).then((response) => {
      setStudent(response.data);
    });
  }, []);

  var layout;
  if (student != null) {
    layout = (
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
                <p name='fullname' className='form-control'> {student.fullname}
                </p>
              </div>

              <div className='form-group'>
                <label> Student Class: </label>
                <p name='stClass' className='form-control'> {student.stClass}
                </p>
              </div>

              <div className='form-group'>
                <label> Student Email: </label>
                <p name='email' className='form-control'> {student.email}
                </p>
              </div>
              <label> Student Adress: </label>
              <p name='address' className='form-control'>{student.address}
              </p>

              <div className='form-group'>
                <label> Student Phone: </label>
                <p name='phone' className='form-control'>{student.phone}
                </p>
              </div>

              <div className='form-group'>
                <label> Student Score: </label>
                <p name='score' className='form-control'>{student.score}
                </p>
              </div>

              <Link to={"/"}><button className='btn btn-secondary'> Back </button></Link>
              </div>
            </div>
        </div>
        </div>
        </>
          );
  }else{
            layout = (<><h1>Error 404</h1></>);
  }


          return (
          <div>
            <h1> Student Id {params.id} Detail </h1>
            {layout}
          </div>
          );
}

          export default StudentDetail;




