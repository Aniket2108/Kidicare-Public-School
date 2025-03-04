package com.school.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
public class StandardDTO {

    private String name;

    @JsonIgnoreProperties("standard")  // Prevent recursion
    private List<SubjectDTO> subjects;

}
