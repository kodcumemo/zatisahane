package com.zatisahane.zatisahane.controller;

import com.zatisahane.zatisahane.entity.Customer;
import com.zatisahane.zatisahane.entity.RegisterResponse;
import com.zatisahane.zatisahane.repository.CustomerRepository;
import com.zatisahane.zatisahane.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*
roll = 0;   // Silindi.
roll = 1;   // Müşteri.
roll = 2;   // Admin.
 */
@RestController
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JwtService jwtService;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/customer")
    public List<Customer> customersShow(){
        List<Customer> customerArrayList = customerRepository.findAll();
        return customerArrayList;
    }
    @PostMapping("/customerl")
    public String customerLoginNormal(@RequestBody Customer customer){
        String token = null;
        List<Customer> customerArrayList = customerRepository.findAll();
        for (int i = 0; i <customerArrayList.size(); i++) {
            if(customerArrayList.get(i).getEmail().equals(customer.getEmail()) && customerArrayList.get(i).getPassword().equals(customer.getPassword())) {
                System.out.println(customer.getEmail());
             //   token = customerLogin(customer);
                return token;
            }
        }
        return "javadaki işlem hatalı";
    }
    @PostMapping("/customer")
    public String customerLogin(@RequestBody Customer customer){
        String token = null;
        Customer dbCustomer = customerRepository.findByemail(customer.getEmail());
        if(dbCustomer != null && passwordEncoder.matches(customer.getPassword(), dbCustomer.getPassword())){
            token = jwtService.generatedToken(customer.getEmail());
            System.out.println(token);
            return token.toString();
        } else {
            return "Kullanıcı adı veya şifre hatalı";
        }
    }
    // Güncelleme işlemi yapılıyor. Güncelleme yaparken burdaki bütün propertyleri girin yoksa silinir.
    @PutMapping("/customer/{id}")
    public String customerUpdate(@PathVariable("id") int id,@RequestBody Customer customer){
        Optional<Customer> customer1 = customerRepository.findById(id);
        customer1.get().setName(customer.getName());
        customer1.get().setEmail(customer.getEmail());
        customer1.get().setAdress(customer.getAdress());
        customer1.get().setTel(customer.getTel());
        customerRepository.save(customer1.get());
        System.out.println(customer);
        System.out.println(customer1);
        return "Güncellendi";
    }
    //  customerin roll properysi 0 oldu. sistemde silinenler roll = 0;
    @GetMapping("/customer/{id}")
    public Customer customerShow(@PathVariable("id") int id){
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.get();
    }
    //  customerin roll properysi 1 oldu. sistemde müşteriler roll = 1;
    @GetMapping("/customer/{id}/customer")
    public String customerRoll(@PathVariable("id") int id,@RequestBody Customer customer){
        Optional<Customer> customer1 = customerRepository.findById(id);
        customer1.get().setRoll(1);
        customerRepository.save(customer1.get());
        return "Kullanıcı müşteri seviyesine alındı";
    }
    //  customerin roll properysi 2 oldu. sistemde admin roll = 2;
    @GetMapping("/customer/{id}/admin")
    public String adminRoll(@PathVariable("id") int id,@RequestBody Customer customer){
        Optional<Customer> customer1 = customerRepository.findById(id);
        customer1.get().setRoll(2);
        customerRepository.save(customer1.get());
        return "Kullanıcı admin seviyesine alındı";
    }
    // kullanıcı kalıcı olarak silinir. bu işlem hata yapıldığında kullanılmalı aksi takdirde bilgi geri getirilemez.
    @DeleteMapping("/customer/{id}")
    public String customerHardDelete(@PathVariable("id") int id,@RequestBody Customer customer){
        Optional<Customer> customer1 = customerRepository.findById(id);
        if(customer1.get().getRoll() == 0){
            customerRepository.delete(customer1.get());
            return "silindi";
        }
        return "Silinmeyen müşteri kalıcı olarak silinemez.";
    }
}
