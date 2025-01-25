package com.school.services;

import com.school.dto.StudentDTO;

import java.util.List;

public interface StudentService {

    StudentDTO addStudent(StudentDTO request);

    List<StudentDTO> getAllStudents();
}
