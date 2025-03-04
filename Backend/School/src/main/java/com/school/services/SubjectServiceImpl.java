package com.school.services;

import com.school.dto.AddSubjectDTO;
import com.school.dto.SubjectDTO;
import com.school.entities.Subject;
import com.school.repository.StandardRepository;
import com.school.repository.SubjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService{

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private StandardRepository standardRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public SubjectDTO addSubjects(AddSubjectDTO subjects) {

        List<SubjectDTO> subjectDTOS = subjects.getSubjects();

        List<Subject> subjectEntities = new ArrayList<>();

        for(int i=0;i<subjectDTOS.size();i++){

            Subject subject = mapper.map(subjectDTOS.get(i),Subject.class);

            subject.setStandard(standardRepository.findById(subjectDTOS.get(i).getClassId()).orElseThrow());

            subjectEntities.add(subject);

        }

        System.out.println(subjectEntities);

        return null;
    }
}
