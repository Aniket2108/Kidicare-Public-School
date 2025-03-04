package com.school.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Integer id;

    @Column(name = "subject_name")
    private String name;

    @Column(name = "subject_code")
    private String subjectCode;

    @Column(name = "sessions")
    private Integer sessions;

    @ManyToOne
    @JoinColumn(name = "standard_id")
    private Standard standard;
}
