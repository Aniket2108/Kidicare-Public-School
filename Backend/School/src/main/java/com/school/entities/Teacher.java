package com.school.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(name = "teacher")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacherId")
    private Integer teacherId;

    @Column(name = "firstName" , nullable = false)
    private String firstName;

    @Column(name = "lastName" , nullable = false)
    private String lastName;

    @Column(name = "emailId" , nullable = false, unique = true)
    private String emailId;

    @Column(name = "password" , nullable = false)
    private String password;

    @Column(name = "mobileNumber" , nullable = false, unique = true)
    private String mobileNumber;

    @Column(name = "DOB" , nullable = false)
    private Date dateOfBirth;

}

