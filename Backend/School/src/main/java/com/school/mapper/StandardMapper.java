package com.school.mapper;

import com.school.dto.StandardDTO;
import com.school.dto.StandardResponseDTO;
import com.school.entities.Standard;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class StandardMapper {


    public List<StandardDTO> standardToStandardDTO(List<Standard> standards){

        List<StandardDTO> standardDTOList = new ArrayList<>();

        for (Standard standard : standards) {
            standardDTOList.add(mapStandardToDTO(standard));
        }

        return standardDTOList;
    }

    public StandardDTO mapStandardToDTO(Standard standard){
        StandardDTO standardDTO = new StandardDTO();

        standardDTO.setName(standard.getName());

        return standardDTO;
    }

    public List<StandardResponseDTO> standardToStandardResponseDTO(List<Standard> standards) {

        List<StandardResponseDTO> standardResponseDTOList = new ArrayList<>();

        for (Standard standard : standards) {
            standardResponseDTOList.add(mapStandardToResponseDTO(standard));
        }

        return standardResponseDTOList;


    }

    private StandardResponseDTO mapStandardToResponseDTO(Standard standard) {

        StandardResponseDTO standardResponseDTO = new StandardResponseDTO();

        standardResponseDTO.setId(standard.getId());
        standardResponseDTO.setName(standard.getName());

        return standardResponseDTO;

    }
}
