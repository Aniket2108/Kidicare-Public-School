package com.school.controller;

import com.school.dto.AddStudentDTO;
import com.school.dto.StudentDTO;
import com.school.dto.SubjectDTO;
import com.school.services.StudentService;
import com.school.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private SubjectService subjectService;


    @PostMapping(value = "/student")
    public ResponseEntity<?> addStudent(@RequestBody AddStudentDTO request){

        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addStudent(request));
    }

    @GetMapping(value = "/student")
    public ResponseEntity<?> getAllStudents(){

        return  ResponseEntity.status(HttpStatus.OK).body(studentService.getAllStudents());

    }

    @PostMapping(value = "/subject")
    public ResponseEntity<?> addSubject(@RequestBody SubjectDTO subjectDTO){

        SubjectDTO subjectResponseDTO = subjectService.addSubject(subjectDTO);

        if( subjectResponseDTO != null ){
            return ResponseEntity.status(HttpStatus.CREATED).body(subjectResponseDTO);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
    }

}
