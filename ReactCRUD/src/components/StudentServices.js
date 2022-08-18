import axios from "axios";

const STU_API_BASE_URL = "http://localhost:8080/api/students";

class StudentServices{
    getAllStudents(search){
        var searchAdd = "";
        if(search!=""){
            searchAdd="?name="+search;
        }

        return axios.get(STU_API_BASE_URL+searchAdd);
    }

    addNewStudent(student){
        return axios.post(STU_API_BASE_URL, student);
    }

    getStudentById(student){
        return axios.get(STU_API_BASE_URL + '/' + student);
    }

    updateStudent(studentId, student){
        return axios.put(STU_API_BASE_URL+ '/' + studentId, student);
    }

    deleteStudent(student){
        return axios.delete(STU_API_BASE_URL + '/' + student);
    }

    getGreaterScore(){
        return axios.get(STU_API_BASE_URL+"/GreaterScore");
    }

    getScoreAvg(){
        return axios.get(STU_API_BASE_URL+"/ScoreToAvg");
    }
}

export default new StudentServices();