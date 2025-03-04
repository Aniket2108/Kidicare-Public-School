package com.school.controller;

import com.school.dto.*;
import com.school.request.AdminLoginRequest;
import com.school.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {


    @Autowired
    private TeacherService teacherService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private StandardService standardService;

    @Autowired
    private SubjectService subjectService;

    @PostMapping(value = "/teacher")
    public ResponseEntity<?> addTeacher(@RequestBody TeacherDTO request){
        Object entity = null;

        entity = teacherService.addTeacher(request);

        if(entity == null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(entity);
    }

    @GetMapping(value = "/teacher")
    public ResponseEntity<?> getAllTeachers(){
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.getAllTeachers());
    }

    @PutMapping(value = "/teacher/{mobileNumber}")
    public ResponseEntity<?> updateTeacher(@PathVariable String mobileNumber,@RequestBody TeacherDTO teacherDTO){

        if(teacherService.updateTeacher(mobileNumber, teacherDTO)){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
        }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    @DeleteMapping(value = "/teacher/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable String id){

        if(teacherService.deleteTeacher(Integer.parseInt(id))){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping(value = "/student")
    public ResponseEntity<?> addStudent(@RequestBody AddStudentDTO request){
        StudentDTO studentDTO = studentService.addStudent(request);

        if(studentDTO == null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(studentDTO);
    }

    @GetMapping(value = "/")
    public ResponseEntity<?> getAllStudents(){

        return  ResponseEntity.status(HttpStatus.OK).body(studentService.getAllStudents());

    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest adminLoginRequest){

        if(adminService.adminLogin(adminLoginRequest)){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping(value = "/class")
    public ResponseEntity<?> addStandard(@RequestBody StandardDTO standardDTO){

        Object entity = standardService.addStandard(standardDTO);

        if(entity == null){
           return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(entity);
    }

    @GetMapping(value = "/class")
    public ResponseEntity<?> getAllStandards(){
        return ResponseEntity.status(HttpStatus.OK).body(standardService.getAllStandards());
    }

    @GetMapping(value =  "/teacher/{id}")
    public ResponseEntity<?> getTeacherById(@PathVariable String id){
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.getTeacherById(Integer.parseInt(id)));
    }

    @PostMapping(value = "/subject")
    public ResponseEntity<?> addSubjects(@RequestBody AddSubjectDTO subjects){

        if (subjects == null || subjects.getSubjects() == null) {
            return ResponseEntity.badRequest().body("Invalid request: subjects are null");
        }
        subjectService.addSubjects(subjects);

        return null;
    }

}
