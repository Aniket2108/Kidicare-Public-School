package com.school.mapper;

import com.school.dto.FatherDTO;
import com.school.entities.Father;
import org.springframework.stereotype.Component;

@Component
public class FatherMapper {


    public Father mapDTOToFather(FatherDTO fatherDTO){

        Father father = new Father();

        father.setFirstName(fatherDTO.getFirstName());
        father.setLastName(fatherDTO.getLastName());
        father.setMobileNumber(fatherDTO.getMobileNumber());
        father.setBloodGroup(fatherDTO.getBloodGroup());
        father.setAadhaarCard(fatherDTO.getAadhaarCard());
        father.setOccupation(fatherDTO.getOccupation());
        father.setOccupationAddress(fatherDTO.getOccupationAddress());
        father.setEmailId(fatherDTO.getEmailId());
        father.setDateOfBirth(fatherDTO.getDateOfBirth());

        return father;
    }

    public FatherDTO mapFatherToDTO(Father father) {

        FatherDTO fatherDTO = new FatherDTO();

        fatherDTO.setFirstName(father.getFirstName());
        fatherDTO.setLastName(father.getLastName());
        fatherDTO.setMobileNumber(father.getMobileNumber());
        fatherDTO.setBloodGroup(father.getBloodGroup());
        fatherDTO.setAadhaarCard(father.getAadhaarCard());
        fatherDTO.setOccupation(father.getOccupation());
        fatherDTO.setOccupationAddress(father.getOccupationAddress());
        fatherDTO.setEmailId(father.getEmailId());
        fatherDTO.setDateOfBirth(father.getDateOfBirth());

        return fatherDTO;
    }
}
