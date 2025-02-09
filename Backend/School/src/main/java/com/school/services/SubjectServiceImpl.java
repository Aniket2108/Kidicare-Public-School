package com.school.services;

import com.school.dto.SubjectDTO;
import com.school.entities.Subject;
import com.school.repository.SubjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectServiceImpl implements SubjectService{

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public SubjectDTO addSubject(SubjectDTO subjectDTO) {

        Subject subjectEntity = mapper.map(subjectDTO,Subject.class);
        subjectEntity


        return null;
    }
}
