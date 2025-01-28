package com.school.controller;

import com.school.dto.StandardDTO;
import com.school.dto.StudentDTO;
import com.school.dto.TeacherDTO;
import com.school.request.AdminLoginRequest;
import com.school.services.AdminService;
import com.school.services.StandardService;
import com.school.services.StudentService;
import com.school.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> addStudent(@RequestBody StudentDTO request){

        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addStudent(request));
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

}
