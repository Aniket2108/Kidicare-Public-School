package com.school.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adminId")
    private Integer adminId;

    @Column(name = "firstName" , nullable = false)
    private String firstName;

    @Column(name = "lastName" , nullable = false)
    private String lastName;

    @Column(name = "emailId" , nullable = false, unique = true)
    private String emailId;

    @Column(name = "password" , nullable = false)
    private String password;

    @Column(name = "mobileNumber" , nullable = false, unique = true)
    private String mobileNumber;

}
