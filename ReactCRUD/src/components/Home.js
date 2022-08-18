import React, { useEffect, useState } from 'react';
import StudentServices from './StudentServices';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

function Home() {

    const [students, setStudents] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        StudentServices.getAllStudents(searchTerm).then((response) => {
            setStudents(response.data);
        });
    }, [searchTerm]);

    const branchPerPage = 8;
    const pagesVisited = pageNumber * branchPerPage;

    const pageCount = Math.ceil(students.length / branchPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const onClickEnter=(event)=>{
        if(event.key=='Enter'){
            setSearchTerm(document.querySelectorAll('input[name=inputSearch]')[0].value);
        }
    }

    const deleteStudent = (id) => {
        if (window.confirm('Are you sure?') == true) {
            StudentServices.deleteStudent(id).then((response) => {
                setStudents(response.data);
            })
        }
        else {

        }
    }

    const sortColumn = (field, type) => {
        const sortData = [...students];
        if (type == 'string') {
          sortData.sort((a, b) => direction * a[field].localeCompare(b[field]));
        } else if (type == 'number') {
          sortData.sort((a, b) => direction * (a[field] - b[field]));
        }
        setDirection(direction * -1);
        setStudents(sortData);
      };

    var listStudents = [];
    if (students != null) {
        listStudents = students.slice(pagesVisited, pagesVisited + branchPerPage).map((student) => (
            <tr key={student.id}>
                <th scope="row">{student.id}</th>
                <td>{student.fullname}</td>
                <td>{student.stClass}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>{student.score}</td>
                <td>
                    <Link to={`/detail/`+student.id}><button className='btn btn-warning text-light'><i className="fa fa-eye"></i></button></Link>
                </td>

                <td>
                    <Link to={`/edit/`+student.id}><button className='btn btn-info'><i className="fas fa-edit"></i></button></Link>
                </td>
                <td>
                <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>
                <i className="far fa-trash-alt"></i>
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
                <h1> List All Student</h1>
            </div>

            <div className='mt-4' style={{textAlign:'left'}}>
                <Link to={`/add`}><button className='btn btn-success me-2'> <i class="fa fa-plus"></i>  Add New Student </button></Link>
                <Link to={`/avg`}><button className='btn btn-success'><i class="fa fa-list"></i> List Greater Than Avg </button></Link>
            </div>

            <div className="input-group mt-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder='Search for Student by Name or Email ...'
                    name="inputSearch"
                    onKeyDown={onClickEnter}
                ></input>
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={()=>setSearchTerm(document.querySelectorAll('input[name=inputSearch]')[0].value)}>
                        SEARCH
                    </button>
                </div>
            </div>

            <table className="table table-striped table-hover mt-4">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => sortColumn('id', 'number')}>#ID</th>
                        <th scope="col" onClick={() => sortColumn('fullname', 'string')}>Student Name</th>
                        <th scope="col" onClick={() => sortColumn('stClass', 'string')}>Student Class</th>
                        <th scope="col" onClick={() => sortColumn('address', 'string')}>Student Address</th>
                        <th scope="col" onClick={() => sortColumn('email', 'string')}>Student Email</th>
                        <th scope="col" onClick={() => sortColumn('phone', 'string')}>Student Phone</th>
                        <th scope="col" onClick={() => sortColumn('score', 'number')}>Student Score</th>
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
    );

}

export default Home;