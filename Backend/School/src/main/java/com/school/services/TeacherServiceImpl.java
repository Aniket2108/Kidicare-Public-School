package com.school.services;

import com.school.dto.TeacherDTO;
import com.school.dto.TeacherResponseDTO;
import com.school.entities.Teacher;
import com.school.mapper.TeacherMapper;
import com.school.repository.TeacherRepository;
import com.school.security.PasswordEncoder;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public TeacherResponseDTO addTeacher(TeacherDTO request) {

        Teacher teacher = mapper.map(request,Teacher.class);
        Teacher teacherByMobile = teacherRepository.findByMobileNumber(teacher.getMobileNumber());
        Teacher teacherByEmail = teacherRepository.findByEmailId(teacher.getEmailId());

        if(teacherByEmail == null && teacherByMobile == null){
            teacher.setPassword(passwordEncoder.encodePassword(teacher.getPassword()));
            return mapper.map((teacherRepository.save(teacher)),TeacherResponseDTO.class);
        }

        return null;
    }

    @Override
    public List<TeacherResponseDTO> getAllTeachers() {

        List<Teacher> teachers = teacherRepository.findAll();

        return teacherMapper.teacherToTeacherResponseDTOs(teachers);
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
    public boolean deleteTeacher(Integer id) {

        Teacher teacher = teacherRepository.findById(id).orElseThrow();

        if(teacher == null) {
            return false;
        }

        teacherRepository.delete(teacher);
        return true;
    }


}
