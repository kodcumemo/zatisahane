package com.zatisahane.zatisahane.repository;

import com.zatisahane.zatisahane.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface FoodRepository extends JpaRepository<Food,Integer> {



    // @Query("FROM food WHERE isDelete = false ORDER BY id DESC")
   // @Override
   // ArrayList<Food> findAll();

    //  @Query("UPDATE food SET isDelete = 1 WHERE id = :id")
   // String withDeleteById(int id);
}
