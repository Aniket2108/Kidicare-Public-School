package com.school.services;

import com.school.dto.StandardDTO;
import com.school.dto.StandardResponseDTO;

import java.util.List;

public interface StandardService {

    StandardDTO addStandard(StandardDTO standardDTO);

    List<StandardResponseDTO> getAllStandards();

    StandardResponseDTO getStandardById(Integer id);
}
