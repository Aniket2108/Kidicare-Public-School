package com.school.dto;

import lombok.Data;
import java.sql.Date;

@Data
public class StudentDTO {


    private String firstName;

    private String lastName;

    private Date dateOfBirth;

    private String aadhaarCard;

}