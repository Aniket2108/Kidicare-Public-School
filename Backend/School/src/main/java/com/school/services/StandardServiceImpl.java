package com.school.services;

import com.school.dto.StandardDTO;
import com.school.dto.StandardResponseDTO;
import com.school.entities.Standard;
import com.school.mapper.StandardMapper;
import com.school.repository.StandardRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

        List<Standard> standards = standardRepository.findAll();

        for(Standard s:standards){
            if(s.getName().equalsIgnoreCase(standardEntity.getName())){
                return null;
            }
        }

        return standardMapper.mapStandardToDTO(standardRepository.save(standardEntity));

    }

    @Override
    public List<StandardResponseDTO> getAllStandards() {

        List<Standard> standards = standardRepository.findAll();

        return standardMapper.standardToStandardResponseDTO(standards);
    }

    @Override
    public StandardResponseDTO getStandardById(Integer id){

        Standard standardEntity = standardRepository.findById(id).orElseThrow();

        return standardMapper.mapStandardToResponseDTO(standardEntity);
    }
}
