package edu.multicampus.restfullapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Students")
public class Student {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
    
	@Column(name="student_fullname")
	private String fullname;
	
	@Column(name="student_class")
	private String StClass;
	
	@Column(name="student_email")
	private String email;
	
	@Column(name="student_address")
	private String address;
	
	@Column(name="student_phone")
	private String phone;
	
	@Column(name="student_score")
	private int score;
	
	@Column(name="student_image")
	private String image;

	public Student() {
		super();
	}

	public Student(String fullname, String stClass, String email, String address, String phone, String image, int score) {
		super();
		this.fullname = fullname;
		this.StClass = stClass;
		this.email = email;
		this.address = address;
		this.phone = phone;
		this.image = image;
		this.score = score;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getStClass() {
		return StClass;
	}

	public void setStClass(String stClass) {
		StClass = stClass;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
}
