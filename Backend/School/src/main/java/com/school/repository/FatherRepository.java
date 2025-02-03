package com.school.repository;

import com.school.entities.Father;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FatherRepository extends JpaRepository<Father,Integer> {

    Father findByAadhaarCard(String aadhaarCard);

}
