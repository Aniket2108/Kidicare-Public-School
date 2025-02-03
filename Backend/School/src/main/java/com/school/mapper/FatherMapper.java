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

}
