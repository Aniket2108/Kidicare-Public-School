package com.school.services;

import com.school.dto.TeacherDTO;
import com.school.dto.TeacherResponseDTO;

import java.util.List;

public interface TeacherService {

    TeacherResponseDTO addTeacher(TeacherDTO request);

    List<TeacherResponseDTO> getAllTeachers();

    boolean updateTeacher(String mobileNumber,TeacherDTO teacherDTO);

    boolean deleteTeacher(String mobileNumber);
}
