package com.school.dto;


import lombok.Data;
import java.sql.Date;

@Data
public class StudentDTO {


    private String firstName;

    private String lastName;

    private String fatherName;

    private String motherName;

    private Date dateOfBirth;

    private String fatherMobileNumber;

    private String motherMobileNumber;

}
