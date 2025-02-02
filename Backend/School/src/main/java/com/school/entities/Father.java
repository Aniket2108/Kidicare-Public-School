package com.school.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "father_details")
@Data
public class Father {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fatherId")
    private Integer fatherId;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "dateOfBirth", nullable = false)
    private Date dateOfBirth;

    @Column(name = "mobile_number", nullable = false)
    private String mobileNumber;

    @Column(name = "emailId", nullable = false)
    private String emailId;

    @Column(name = "aadhaarcar", nullable = false)
    private String aadhaarcard;

    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Column(name = "occupation", nullable = false)
    private String occupation;

    @Column(name = "occupation_address", nullable = false)
    private String occupationAddress;

    // One father can have multiple students
    @OneToMany(mappedBy = "father")
    private List<Student> students;
}
