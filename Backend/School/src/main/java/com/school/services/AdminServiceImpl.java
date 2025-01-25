package com.school.services;

import com.school.entities.Admin;
import com.school.repository.AdminRepository;
import com.school.request.AdminLoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public boolean adminLogin(AdminLoginRequest adminLoginRequest) {

        Admin admin = adminRepository.findByEmailId(adminLoginRequest.getEmailId());
        if(admin != null){
            return admin.getPassword().equals(adminLoginRequest.getPassword());
        }
        return false;
    }
}
