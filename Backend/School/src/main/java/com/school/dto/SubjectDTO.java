package com.school.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
public class SubjectDTO {

    private Integer id;

    private String name;

    private String subjectCode;

    private Integer sessions;

    private Integer classId;

    @JsonIgnoreProperties("subjects")
    private StandardDTO standard;

}
