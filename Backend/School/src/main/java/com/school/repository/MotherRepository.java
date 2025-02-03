package com.school.repository;

import com.school.entities.Mother;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotherRepository extends JpaRepository<Mother,Integer> {

    Mother findByAadhaarCard(String aadhaarCard);

}
