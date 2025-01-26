package com.school.controller;

import com.school.services.StandardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/standard")
public class StandardController {


    @Autowired
    private StandardService standardService;


    @GetMapping(value = "/")
    public ResponseEntity<?> getAllStandards(){
        return ResponseEntity.status(HttpStatus.OK).body(standardService.getAllStandards());
    }


}
