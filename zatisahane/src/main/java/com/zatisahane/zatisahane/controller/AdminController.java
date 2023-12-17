package com.zatisahane.zatisahane.controller;

import com.zatisahane.zatisahane.entity.Admin;
import com.zatisahane.zatisahane.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/admin")
    public String register(@RequestBody Admin admin){

        BCryptPasswordEncoder bCryptPasswordEncoder =  new BCryptPasswordEncoder();  // şifre şifreleme algoritması
        String hashlenmisSifre = bCryptPasswordEncoder.encode(admin.getPassword());
        bCryptPasswordEncoder.matches(admin.getPassword(),hashlenmisSifre);      // kriptolu şifreyi buradan çağırıyoruz
        admin.setPassword(hashlenmisSifre);

        adminRepository.save(admin);
        return "Kayıt başarılı";
    }
    @GetMapping("/admin")
    public ArrayList<Admin> adminShow(Admin admin) {
        List<Admin> admins = adminRepository.findAll();
        return (ArrayList<Admin>) admins;
    }
    @PutMapping("/admin{id}")
    public String adminUpdate(Admin admin){

        return "Güncellendi";
    }
}
