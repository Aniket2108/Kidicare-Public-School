package com.school.mapper;

import com.school.dto.MotherDTO;
import com.school.entities.Mother;
import org.springframework.stereotype.Component;

@Component
public class MotherMapper {


    public Mother mapDTOToMother(MotherDTO motherDTO){

        Mother mother = new Mother();

        mother.setFirstName(motherDTO.getFirstName());
        mother.setLastName(motherDTO.getLastName());
        mother.setMobileNumber(motherDTO.getMobileNumber());
        mother.setBloodGroup(motherDTO.getBloodGroup());
        mother.setAadhaarCard(motherDTO.getAadhaarCard());
        mother.setOccupation(motherDTO.getOccupation());
        mother.setOccupationAddress(motherDTO.getOccupationAddress());
        mother.setEmailId(motherDTO.getEmailId());
        mother.setDateOfBirth(motherDTO.getDateOfBirth());

        return mother;
    }


}
