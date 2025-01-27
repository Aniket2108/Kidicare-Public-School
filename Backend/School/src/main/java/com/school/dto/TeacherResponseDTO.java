package com.school.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class TeacherResponseDTO {

    private Integer id;

    private String firstName;

    private String lastName;

    private String emailId;

    private String mobileNumber;

    private Date dateOfBirth;

}
