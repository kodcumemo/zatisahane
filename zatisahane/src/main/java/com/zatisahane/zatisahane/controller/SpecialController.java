package com.zatisahane.zatisahane.controller;

import com.zatisahane.zatisahane.entity.Special;
import com.zatisahane.zatisahane.repository.SpecialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;

@RestController
@CrossOrigin("*")
public class SpecialController {
    @Autowired
    private SpecialRepository specialRepository;

    @PostMapping("/specialadd")
    public String specialAdd(@RequestBody Special special) {
        special.setIsDelete(false);
        special.setLocalDate(LocalDate.now());
        specialRepository.save(special);
        return "Günün menüsü eklendi.";
    }
    @GetMapping("/specialadd")
    public String specialShow(){
        specialRepository.findAll();
        return "Gunun menuleri";
    }
    @GetMapping("/specialadd/{id}")
    public String specialShowmenutoday(@PathVariable Integer id){
        //specialRepository.findById(id);
        specialRepository.findAllById(Collections.singleton(id));
        return "Gunun menusu" ;
    }
}
