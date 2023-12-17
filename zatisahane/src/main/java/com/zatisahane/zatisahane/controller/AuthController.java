package com.zatisahane.zatisahane.controller;

import com.zatisahane.zatisahane.entity.Customer;
import com.zatisahane.zatisahane.entity.RegisterResponse;
import com.zatisahane.zatisahane.repository.CustomerRepository;
import com.zatisahane.zatisahane.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JwtService jwtService;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @PostMapping("/cregister") // CustomerController deki register ile değiştirdim.
    public RegisterResponse register(@RequestBody Customer customer){

        // kullanıcıya dönecek responseyi oluşturduk.
        RegisterResponse  registerResponse = new RegisterResponse();
        registerResponse.setCustomer(customer);


        // e mail duplicated mi kontrolü
        List<Customer> cList = customerRepository.findAll();
        customer.setRoll(1);
        for (int i = 0; i < cList.size(); i++) {
            if(customer.getEmail().equals(cList.get(i).getEmail())){
                registerResponse.setMessage("Bu e posta daha önce kaydedilmiş.");
                return  registerResponse;
            }
            if(customer.getTel().equals(cList.get(i).getTel())){
                registerResponse.setMessage("Bu Telefon daha önce kaydedilmiş.");
                return  registerResponse;
            }
        }
        // şifreyi kriptolayıp gönderiyoruz ekledik
        String hashpass = passwordEncoder.encode(customer.getPassword());
        customer.setPassword(hashpass);
        customerRepository.save(customer);

        // kullanıcıya dönecek responseyi oluşturduk.
        registerResponse.setMessage("Kullanıcı başarıyla eklendi");
        return registerResponse;
    }

    @PostMapping("/clogin")
    public String clogin(@RequestBody Customer customer){
        Customer dbCustomer = customerRepository.findByemail(customer.getEmail());
        if(dbCustomer == null){
            return "cloginden Kullanıcı adı veya şifre hatalı";
        }
        if(passwordEncoder.matches(customer.getPassword(), dbCustomer.getPassword())) {
            String token = jwtService.generatedToken(customer.getEmail());
            return token;
        }
        return "cloginden Kullanıcı adı veya şifre hatalı";
    }

}