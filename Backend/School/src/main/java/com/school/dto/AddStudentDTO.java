package com.school.dto;

import lombok.Data;
import java.sql.Date;

@Data
public class AddStudentDTO {

    private FatherDTO father;

    private MotherDTO mother;

    private StudentDTO student;

}