package com.school.services;

import com.school.dto.StudentDTO;
import com.school.entities.Student;
import com.school.mapper.StudentMapper;
import com.school.repository.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private StudentMapper customStudentMapper;

    @Override
    public StudentDTO addStudent(StudentDTO request){

    Student student =   mapper.map(request,Student.class);
    return (mapper.map(studentRepository.save(student),StudentDTO.class));

    }

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();

        return customStudentMapper.studentsToStudentsDTO(students);
    }


}
