import React, { useEffect, useState } from 'react';
import StudentServices from './StudentServices';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

export default function StudentDel() {
  const [students, setStudents] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [scoreAvg, setScoreAvg] = useState(0);


  useEffect(() => {
    StudentServices.getGreaterScore().then((response) => {
      setStudents(response.data);
    });

    StudentServices.getScoreAvg().then((response) => {
      setScoreAvg(response.data);
    });
  }, []);

  const studentPerPage = 8;
  const pagesVisited = pageNumber * studentPerPage;

  const pageCount = Math.ceil(students.length / studentPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  console.log(students.length);

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure?') == true) {
      StudentServices.deleteStudent(id).then((response) => {
        setStudents(response.data);
      })
    }
    else {

    }
  }

  var listStudents = [];
  if (students.length != 0) {
    listStudents = students.slice(pagesVisited, pagesVisited + studentPerPage).map((student) => (
      <tr key={student.id}>
        <th scope="row">{student.id}</th>
        <td>{student.name}</td>
        <td>{student.address}</td>
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td>{student.score}</td>
        <td>
          <Link to={`/detail/` + student.id}><button className='btn btn-warning'>Detail</button></Link>
        </td>

        <td>
          <Link to={`/edit/` + student.id}><button className='btn btn-info'>Edit</button></Link>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }
  else {
    listStudents = <tr><th>NO STUDENT FOUND</th><td></td></tr>;
  }

  return (
    <div className="container">

        <div>
            <h1> List Of Student Have Score Greater Than Avg {scoreAvg} </h1>
        </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Student Address</th>
            <th scope="col">Student Email</th>
            <th scope="col">Student Phone</th>
            <th scope="col">Student Score</th>
            <th scope="col">Detail</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {listStudents}
        </tbody>
      </table>

      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  )
}

