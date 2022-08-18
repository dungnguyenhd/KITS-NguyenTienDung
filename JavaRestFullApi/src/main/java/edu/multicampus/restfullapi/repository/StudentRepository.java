package edu.multicampus.restfullapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.multicampus.restfullapi.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	@Query(value ="SELECT * FROM students s WHERE s.student_fullname LIKE %?1%"
			+ " OR s.student_email LIKE %?1%",nativeQuery = true)
    public List<Student> search(String name);
	
	@Query(value ="SELECT * FROM students WHERE student_score >= (SELECT AVG(student_score) FROM students)",nativeQuery = true)
	public List<Student> getStudentScoreGreaterThanAvg();
	
	@Query(value ="SELECT AVG(student_score) FROM students",nativeQuery = true)
	public float getStudentScoreAVG();
}
