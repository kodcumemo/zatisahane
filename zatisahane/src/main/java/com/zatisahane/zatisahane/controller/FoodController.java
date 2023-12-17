package com.zatisahane.zatisahane.controller;



import com.zatisahane.zatisahane.entity.Customer;
import com.zatisahane.zatisahane.entity.Food;
import com.zatisahane.zatisahane.repository.FoodRepository;
import com.zatisahane.zatisahane.service.AuthHelper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class FoodController {
    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private AuthHelper authHelper;

    // yeni ürün ekleme token ile ekleyen kişiyi belirliyor.
    @PostMapping("/foodsadd")           // yeni yemek ekleme metodu
    public String createFood(@RequestHeader("Authorization") String token,
                             @RequestBody Food food){
        System.out.println("yemek ekleme Başı" + food);
        Customer customer = authHelper.getCustomer(token);
        food.setIsDelete(true);
        food.setUrl("src\\"+food.getUrl());
        food.setLocalDate(LocalDate.now());
        food.setCustomer(customer);
        foodRepository.save(food);
        System.out.println("yemek ekleme Sonu" + food);
        return "Ürün başarıya kaydedildi";
    }
    @GetMapping(path = {"","/","/index","/foodsadd"})
    public ArrayList<Food> foodShow(){
        return (ArrayList<Food>) foodRepository.findAll();
    }

    @GetMapping(path = {"/foodsadd/{id}"})
    public ResponseEntity<Object> foodSingle(@PathVariable("id") int id) {
         Optional<Food> opt =  foodRepository.findById(id);
         if(opt.isEmpty()) {
             return ResponseEntity.notFound().build();
         } else {
             return ResponseEntity.ok(opt.get());
         }
    }

    @PostMapping("/createfoodsadd")
    public String foodAdd(@RequestBody Food food){
        food.setIsDelete(true);
        food.setLocalDate(LocalDate.now());
        food.setUrl("D:\\websites\\yemeksitesi\\src\\"+food.getUrl());
        foodRepository.save(food);
        return "yemek kaydedildi";
    }

    @PostMapping("/foodupdate")
    public String foodUpdate(@RequestBody Food food){
        food.setIsDelete(true);
        food.setLocalDate(LocalDate.now());
        foodRepository.save(food);
        return "" + food.getTitle() + " Güncellendi";
    }



    //  Veriler kalıcı olarak siliniyor.
    @DeleteMapping("/foodsadd/{id}")
    public String  foodHardDelete( @PathVariable("id") int id){
        List<Food> foodList =  foodRepository.findAll();
        for (int i = 0; i < foodList.size(); i++) {
            if(id == foodList.get(i).getId()) {
                foodRepository.deleteById(id);
                return " eşleşti ve silindi";
            }
        }
        return id + " no ile eşleşme yok. silme işlemi başarısız";
    }


    // Veriler Kullanıcıdan siliniyor. İstenirse geri getirilebilir. isDelete false olanlar silinmiş kabul ediiliyor.
    @PutMapping("/foodsadd/{id}/delete")
    public String foodDeleted(@PathVariable("id")int id ){
        Optional<Food> food = foodRepository.findById(id);   // veritabanından bilgileri çektim
        if(food.get().getIsDelete()){
            food.get().setIsDelete(false);
            foodRepository.save(food.get());
            return id + " Silindi " + food.get();
        }else if(food.get().getIsDelete() == false){
            return id+ " zaten silinmiş " + food.get();
        } else {
            return id + " ürün yok ";
        }
    }
    // kullanıcıdan silinen veriler isDelete true yapılarak geri getiriliyor.
    @PutMapping("/foodsadd/{id}/undelete")
    public String foodRemove(@PathVariable("id")int id ){
        Optional<Food> food = foodRepository.findById(id);   // veritabanından bilgileri çektim
        if(food.get().getIsDelete()==false){
            food.get().setIsDelete(true);
            foodRepository.save(food.get());
            return id + " Geri alındı " + food.get();
        }else if(food.get().getIsDelete()){
            return id+ " zaten silinmemiş " + food.get();
        } else {
            return id + " ürün yok ";
        }
    }

//      Güncelleme işlemi buradan doğru çalışıyor ancak frontend den her data modeli kendi alanında tek tek güncelleniyor.
    @PutMapping("/foodsadd/{id}/update")
    public String foodUpdate(@PathVariable("id")int id,@RequestBody Food food) {
         Optional<Food> foods = foodRepository.findById(id);   // veritabanından bilgileri çektim

            if (foods.get().getIsDelete() == true) {
                foods.get().setDetail(food.getDetail());
                foods.get().setTitle(food.getTitle());
                foods.get().setPrice(food.getPrice());
                foods.get().setUrl(food.getUrl());
                foods.get().setTuru(food.getTuru());
                foodRepository.save(foods.get());
                return id + " Güncellendi ";
            } else if (foods.get().getIsDelete() == false) {
                return "Silinmiş ürün değiştirilemez ";
            } else {
                return "ürün yok ";
            }
        }


}
