package com.school.services;

import com.school.dto.TeacherDTO;

import java.util.List;

public interface TeacherService {

    TeacherDTO addTeacher(TeacherDTO request);

    List<TeacherDTO> getAllTeachers();

    boolean updateTeacher(String mobileNumber,TeacherDTO teacherDTO);

    boolean deleteTeacher(String mobileNumber);
}
