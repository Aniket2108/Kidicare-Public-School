package com.school.mapper;

import com.school.dto.TeacherDTO;
import com.school.dto.TeacherResponseDTO;
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

    public List<TeacherResponseDTO> teacherToTeacherResponseDTOs(List<Teacher> teachers) {

        List<TeacherResponseDTO> teacherDTOList = new ArrayList<>();

        for(Teacher teacher:teachers){
            teacherDTOList.add(teacherToteacherResponseDTO(teacher));
        }

        return teacherDTOList;

    }

    private TeacherResponseDTO teacherToteacherResponseDTO(Teacher teacher) {

        TeacherResponseDTO teacherResponseDTO = new TeacherResponseDTO();

        teacherResponseDTO.setId(teacher.getTeacherId());
        teacherResponseDTO.setFirstName(teacher.getFirstName());
        teacherResponseDTO.setLastName(teacher.getLastName());
        teacherResponseDTO.setMobileNumber(teacher.getMobileNumber());
        teacherResponseDTO.setEmailId(teacher.getEmailId());
        teacherResponseDTO.setDateOfBirth(teacher.getDateOfBirth());

        return teacherResponseDTO;

    }
}
