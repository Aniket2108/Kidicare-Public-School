package com.school.repository;

import com.school.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher,Integer> {

    Teacher findByMobileNumber(String mobileNumber);

    Teacher findByEmailId(String emailId);

}
