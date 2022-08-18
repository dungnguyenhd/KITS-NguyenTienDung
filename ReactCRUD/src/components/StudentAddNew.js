import React, { Component, useState } from 'react'
import StudentServices from './StudentServices';
import { Link } from 'react-router-dom';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';

function StudentAddNew() {
  const [student, setStudent] = useState([]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log(name);
    let data = { ...student };
    data[name] = value;

    setStudent(data);
  }

  const saveStudent = (event) => {
    StudentServices.addNewStudent(student).then(res => {
      console.log('save success!');
    });
  }


  return (

    <div className='container col-md-8'>
      <h1> Add New Student </h1>
      <div>
        <MDBValidation className='row g-3 mt-3'>

          <label style={{textAlign: 'left'}}> Student Full Name: </label>
          <MDBValidationItem feedback='Please provide a valid name.' invalid>
            <MDBInput
              placeholder='Student Full Name'
              name='fullname'
              className='form-control'
              value={student.fullname}
              onChange={(e) => handleChange(e)}
              required
            />
          </MDBValidationItem>

          {/* --------------------------------------------------------- */}

          <label style={{textAlign: 'left'}}> Student Class: </label>
          <MDBValidationItem feedback='Please provide a valid adress.' invalid>
            <MDBInput
              placeholder='Student Class'
              name='stClass'
              className='form-control'
              value={student.stClass}
              onChange={(e) => handleChange(e)}
              required
            />
          </MDBValidationItem>

          {/* --------------------------------------------------------- */}

          <label style={{textAlign: 'left'}}> Student Email: </label>
          <MDBValidationItem feedback='Please provide a valid email.' invalid>
            <MDBInput
              placeholder='Student Email'
              name='email'
              className='form-control'
              value={student.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </MDBValidationItem>

          {/* --------------------------------------------------------- */}

          <label style={{textAlign: 'left'}}> Student Email: </label>
          <MDBValidationItem feedback='Please provide a valid address.' invalid>
            <MDBInput
              placeholder='Student Address'
              name='address'
              className='form-control'
              value={student.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </MDBValidationItem>

          {/* --------------------------------------------------------- */}

          <label style={{textAlign: 'left'}}> Student ImageURL: </label>
          <MDBValidationItem feedback='Please provide a valid imageURL.' invalid>
            <MDBInput
              placeholder='Student ImageURL'
              name='image'
              className='form-control'
              value={student.image}
              onChange={(e) => handleChange(e)}
              required
            />
          </MDBValidationItem>

          {/* --------------------------------------------------------- */}

          <label style={{textAlign: 'left'}}> Student Phone: </label>
          <MDBValidationItem feedback='Please provide a valid phone.' invalid>
            <MDBInput
              placeholder='Student Phone'
              name='phone' className='form-control'
              value={student.phone}
              onChange={(e) => handleChange(e)}
              required
            />
          </MDBValidationItem>

          {/* --------------------------------------------------------- */}

          <label style={{textAlign: 'left'}}> Student Score: </label>
          <MDBValidationItem feedback='Please provide a valid score.' invalid>
            <MDBInput
              placeholder='Student Score'
              type='number'
              name='score'
              className='form-control'
              value={student.score}
              onChange={(e) => handleChange(e)}
              required
            />
          </MDBValidationItem>


          {/* --------------------------------------------------------- */}
          <div className='col-12'>
            <MDBBtn type='submit' className='btn btn-info me-2' onClick={(e) => saveStudent(e)}>Save</MDBBtn>
            <MDBBtn type='reset' className='btn btn-danger me-2'>Reset form</MDBBtn>
            <Link to={"/"}><button className='btn btn-secondary me-2'> Cancel </button></Link>
          </div>
        </MDBValidation>
      </div>

    </div>
  )
}

export default StudentAddNew;
