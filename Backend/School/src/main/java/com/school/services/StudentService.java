package com.school.services;

import com.school.dto.AddStudentDTO;
import com.school.dto.StudentDTO;

import java.util.List;

public interface StudentService {

    StudentDTO addStudent(AddStudentDTO request);

    List<StudentDTO> getAllStudents();
}
