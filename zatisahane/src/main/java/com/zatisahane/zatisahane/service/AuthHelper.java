package com.zatisahane.zatisahane.service;

import com.zatisahane.zatisahane.entity.Customer;
import com.zatisahane.zatisahane.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthHelper {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private CustomerRepository customerRepository;

    public Customer getCustomer(String token){
        String email = jwtService.getEmail(token);
        Customer customer = customerRepository.findByemail(email);
        return customer;
    }
}
