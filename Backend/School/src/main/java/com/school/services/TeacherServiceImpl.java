package com.school.services;

import com.school.dto.TeacherDTO;
import com.school.entities.Teacher;
import com.school.mapper.TeacherMapper;
import com.school.repository.TeacherRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService{

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private TeacherMapper teacherMapper;

    @Override
    public TeacherDTO addTeacher(TeacherDTO request) {

        Teacher teacher = mapper.map(request,Teacher.class);

        return mapper.map((teacherRepository.save(teacher)),TeacherDTO.class);
    }

    @Override
    public List<TeacherDTO> getAllTeachers() {

        List<Teacher> teachers = teacherRepository.findAll();

        return teacherMapper.teacherToTeacherDTOs(teachers);
    }

    @Override
    public boolean updateTeacher(String mobileNumber,TeacherDTO request) {

        Teacher teacher = teacherRepository.findByMobileNumber(mobileNumber);

        if(teacher == null) {
            return false;
        }

        teacher.setFirstName(request.getFirstName());
        teacher.setLastName(request.getLastName());
        teacher.setEmailId(request.getEmailId());
        teacher.setPassword(request.getPassword());
        teacher.setMobileNumber(request.getMobileNumber());
        teacher.setDateOfBirth(request.getDateOfBirth());

        teacherRepository.save(teacher);
        return true;
    }

    @Override
    public boolean deleteTeacher(String mobileNumber) {

        Teacher teacher = teacherRepository.findByMobileNumber(mobileNumber);

        if(teacher == null) {
            return false;
        }

        teacherRepository.delete(teacher);
        return true;
    }


}
