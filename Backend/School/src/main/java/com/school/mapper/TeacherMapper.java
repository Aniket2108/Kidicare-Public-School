package com.school.mapper;

import com.school.dto.TeacherDTO;
import com.school.entities.Teacher;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TeacherMapper {


    public List<TeacherDTO> teacherToTeacherDTOs(List<Teacher> teachers){

        List<TeacherDTO> teacherDTOList = new ArrayList<>();

        for(Teacher teacher:teachers){
            teacherDTOList.add(teacherToteacherDTO(teacher));
        }

        return teacherDTOList;
    }


    public TeacherDTO teacherToteacherDTO(Teacher teacher){

        TeacherDTO teacherDTO = new TeacherDTO();

        teacherDTO.setFirstName(teacher.getFirstName());
        teacherDTO.setLastName(teacher.getLastName());
        teacherDTO.setMobileNumber(teacher.getMobileNumber());
        teacherDTO.setEmailId(teacher.getEmailId());
        teacherDTO.setPassword(teacher.getPassword());
        teacherDTO.setDateOfBirth(teacher.getDateOfBirth());

        return teacherDTO;
    }

}
