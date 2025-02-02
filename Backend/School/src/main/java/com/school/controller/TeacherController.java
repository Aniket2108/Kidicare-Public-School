package com.school.controller;

import com.school.dto.StudentDTO;
import com.school.services.StudentService;
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


    @PostMapping(value = "/student")
    public ResponseEntity<?> addStudent(@RequestBody StudentDTO request){

        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addStudent(request));
    }

    @GetMapping(value = "/student")
    public ResponseEntity<?> getAllStudents(){

        return  ResponseEntity.status(HttpStatus.OK).body(studentService.getAllStudents());

    }


}
