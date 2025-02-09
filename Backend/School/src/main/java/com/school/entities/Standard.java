package com.school.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "class")
public class Standard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private Integer id;

    @Column(name = "class_name")
    private String name;

    @OneToMany(mappedBy = "myStandard",cascade = CascadeType.ALL,
            orphanRemoval = true/* ,fetch=FetchType.EAGER */)
    private List<Student> students = new ArrayList<>();

    @OneToMany(mappedBy = "standard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Subject> subjects = new ArrayList<>();

    public void addStudent(Student student){
        students.add(student);
    }

    public void deleteStudent(Student student){
        students.remove(student);
    }
}
