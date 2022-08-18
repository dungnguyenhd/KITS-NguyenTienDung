package edu.multicampus.restfullapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.multicampus.restfullapi.model.Student;
import edu.multicampus.restfullapi.repository.StudentRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class StudentController {
	@Autowired
	StudentRepository studentRepository;

	@RequestMapping("/students")
	public ResponseEntity<List<Student>> getAllstudents(@Param("name") String name) {
		try {
			List<Student> students = new ArrayList<Student>();

			if (name == null)
				students = studentRepository.findAll();
			else {
				students = studentRepository.search(name);
			}
			
			if (students.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(students, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/students/GreaterScore")
	public ResponseEntity<List<Student>> getListScore(){
		List<Student> list = new ArrayList<>();
		list = studentRepository.getStudentScoreGreaterThanAvg();
		return new ResponseEntity<List<Student>>(list,HttpStatus.OK);
	}
	
	@GetMapping("/students/ScoreToAvg")
	public ResponseEntity<Float> getStudentScoreAvg(){
		return new ResponseEntity<Float>(studentRepository.getStudentScoreAVG(),HttpStatus.OK);
	}

	@GetMapping("/students/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable("id") Integer id) {
		Optional<Student> StudentData = studentRepository.findById(id);

		if (StudentData.isPresent()) {
			return new ResponseEntity<>(StudentData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/students")
	public ResponseEntity<Student> createStudent(@RequestBody Student student) {
		try {
			Student _student = studentRepository.save(new Student(student.getFullname(),student.getStClass(),
					student.getEmail(), student.getAddress(), student.getPhone(), student.getImage(), student.getScore()));
			return new ResponseEntity<>(_student, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable("id") Integer id, @RequestBody Student student) {
		Optional<Student> StudentData = studentRepository.findById(id);

		if (StudentData.isPresent()) {
			Student _student = StudentData.get();
			_student.setFullname(student.getFullname());
			_student.setStClass(student.getStClass());
			_student.setEmail(student.getEmail());
			_student.setAddress(student.getAddress());
			_student.setPhone(student.getPhone());
			_student.setImage(student.getImage());
			_student.setScore(student.getScore());
			return new ResponseEntity<>(studentRepository.save(_student), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/students/{id}")
	public ResponseEntity<List<Student>> deleteStudent(@PathVariable("id") Integer id) {
		try {
			studentRepository.deleteById(id);
			List<Student> list = new ArrayList<Student>();
			list = studentRepository.findAll();
			return new ResponseEntity<>(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@DeleteMapping("/students")
	public ResponseEntity<HttpStatus> deleteAllstudents() {
		try {
			studentRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}

	}

}
