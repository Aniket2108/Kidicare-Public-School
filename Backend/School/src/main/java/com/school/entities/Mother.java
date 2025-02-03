package com.school.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mother_details")
@Data
public class Mother {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "motherId")
    private Integer motherId;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "dateOfBirth", nullable = false)
    private Date dateOfBirth;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "emailId")
    private String emailId;

    @Column(name = "aadhaar_card")
    private String aadhaarCard;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "occupation_address")
    private String occupationAddress;

    // One mother can have multiple students
    @OneToMany(mappedBy = "mother")
    private List<Student> children = new ArrayList<>();

    public void addChild(Student child){
        children.add(child);
    }

    public void deleteChild(Student child){
        children.remove(child);
    }
}
