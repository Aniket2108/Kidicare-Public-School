package com.school.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class FatherDTO {

    private String firstName;

    private String lastName;

    private Date dateOfBirth;

    private String mobileNumber;

    private String emailId;

    private String aadhaarCard;

    private String bloodGroup;

    private String occupation;

    private String occupationAddress;

}
