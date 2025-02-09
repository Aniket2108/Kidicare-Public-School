package com.school.controller;

import com.school.dto.StudentDTO;
import com.school.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable String id){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getStudentById(Integer.parseInt(id)));
    }

}
