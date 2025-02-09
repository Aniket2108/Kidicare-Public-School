package com.school.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class StudentDTO {

    private Integer id;

    private String firstName;

    private String lastName;

    private Date dateOfBirth;

    private String aadhaarCard;

    private String bloodGroup;

    private String classId;

    private Integer rollNum;

    private FatherDTO father;

    private MotherDTO mother;
}
