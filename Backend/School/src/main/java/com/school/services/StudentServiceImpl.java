package com.school.services;

import com.school.dto.AddStudentDTO;
import com.school.dto.StudentDTO;
import com.school.entities.Father;
import com.school.entities.Mother;
import com.school.entities.Standard;
import com.school.entities.Student;
import com.school.mapper.FatherMapper;
import com.school.mapper.MotherMapper;
import com.school.mapper.StudentMapper;
import com.school.repository.FatherRepository;
import com.school.repository.MotherRepository;
import com.school.repository.StandardRepository;
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

    @Autowired
    private FatherRepository fatherRepository;

    @Autowired
    private MotherRepository motherRepository;

    @Autowired
    private StandardRepository standardRepository;

    @Autowired
    private FatherMapper fatherMapper;

    @Autowired
    private MotherMapper motherMapper;

    @Override
    public StudentDTO addStudent(AddStudentDTO request){

    Father father = fatherMapper.mapDTOToFather(request.getFather());
    Mother mother = motherMapper.mapDTOToMother(request.getMother());
    Student student = mapper.map(request.getStudent(),Student.class);
    Father fatherEntity = fatherRepository.findByAadhaarCard(father.getAadhaarCard());
    Mother motherEntity = motherRepository.findByAadhaarCard(mother.getAadhaarCard());
    Standard standard = standardRepository.findById(Integer.parseInt(request.getStudent().getClassId())).orElseThrow();

    if(fatherEntity == null && motherEntity == null){
        fatherRepository.save(father);
        motherRepository.save(mother);
        student.setFather(father);
        student.setMother(mother);
        student.setMyStandard(standard);
        Student s1 = studentRepository.save(student);
        father.addChild(student);
        mother.addChild(student);
        return (mapper.map(s1,StudentDTO.class));

    }

    List<Student> fatherSide = fatherEntity.getChildren();
    List<Student> motherSide = fatherEntity.getChildren();
    boolean isExist = false;

    for(Student s:fatherSide){
        if (s.getAadhaarCard().equalsIgnoreCase(student.getAadhaarCard())) {
            isExist = true;
            break;
        }
    }

    for(Student s:motherSide){
        if (s.getAadhaarCard().equalsIgnoreCase(student.getAadhaarCard())) {
             isExist = true;
             break;
        }
    }

    if(!isExist){
        student.setFather(fatherEntity);
        student.setMother(motherEntity);
        student.setMyStandard(standard);
        Student s1 = studentRepository.save(student);
        return (mapper.map(s1,StudentDTO.class));
    }

    return null;
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();

        return customStudentMapper.studentsToStudentsDTO(students);
    }


}
