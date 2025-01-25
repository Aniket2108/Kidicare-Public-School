package com.school.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "student")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studentId")
    private Integer studentId;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "fatherName" ,nullable = false)
    private String fatherName;

    @Column(name = "motherName", nullable = false)
    private String motherName;

    @Column(name = "dateOfBirth",nullable = false)
    private Date dateOfBirth;

    @Column(name = "fatherMobileNumber")
    private String fatherMobileNumber;

    @Column(name = "motherMobileNumber")
    private String motherMobileNumber;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Standard myStandard;

}
