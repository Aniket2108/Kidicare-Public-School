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

    @Column(name = "dateOfBirth", nullable = false)
    private Date dateOfBirth;

    @Column(name = "aadhaar_card", nullable = false)
    private String aadhaarCard;

    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Standard myStandard;

    // Relationship with Father (Many students can have the same father)
    @ManyToOne
    @JoinColumn(name = "father_id", referencedColumnName = "fatherId", nullable = false)
    private Father father;

    // Relationship with Mother (Many students can have the same mother)
    @ManyToOne
    @JoinColumn(name = "mother_id", referencedColumnName = "motherId", nullable = false)
    private Mother mother;
}
