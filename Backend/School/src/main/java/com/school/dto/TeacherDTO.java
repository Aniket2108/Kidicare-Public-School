package com.school.dto;

import lombok.Data;
import java.sql.Date;

@Data
public class TeacherDTO {

    private String firstName;

    private String lastName;

    private String emailId;

    private String password;

    private String mobileNumber;

    private Date dateOfBirth;

}
