package com.school.mapper;

import com.school.dto.StandardDTO;
import com.school.entities.Standard;

public class StandardMapper {

    public StandardDTO mapToStandardDTO(Standard standard){
        StandardDTO standardDTO = new StandardDTO();

        standardDTO.setName(standard.getName());

        return standardDTO;
    }

}
