package com.school.services;

import com.school.dto.StandardDTO;
import com.school.entities.Standard;
import com.school.mapper.StandardMapper;
import com.school.repository.StandardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StandardServiceImpl implements StandardService {

    @Autowired
    private StandardRepository standardRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private StandardMapper standardMapper;


    @Override
    public StandardDTO addStandard(StandardDTO standardDTO) {

        Standard standardEntity = mapper.map(standardDTO,Standard.class);

        return standardMapper.mapToStandardDTO(standardRepository.save(standardEntity));
    }
}
