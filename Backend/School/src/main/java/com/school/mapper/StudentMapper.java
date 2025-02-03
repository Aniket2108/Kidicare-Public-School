package com.school.mapper;

import com.school.dto.StudentDTO;
import com.school.entities.Student;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StudentMapper {

    public List<StudentDTO> studentsToStudentsDTO(List<Student> students){

        List<StudentDTO> studentDTOList = new ArrayList<>();

        for (Student student : students) {
            studentDTOList.add(mapStudentToDTO(student));
        }

        return studentDTOList;
    }

    public StudentDTO mapStudentToDTO(Student student){
        StudentDTO studentDTO = new StudentDTO();

        studentDTO.setFirstName(student.getFirstName());
        studentDTO.setLastName(student.getLastName());
        studentDTO.setDateOfBirth(student.getDateOfBirth());
        studentDTO.setAadhaarCard(student.getAadhaarCard());
        studentDTO.setBloodGroup(student.getBloodGroup());
        studentDTO.setClassId(String.valueOf(student.getMyStandard().getId()));


        return studentDTO;
    }

}
