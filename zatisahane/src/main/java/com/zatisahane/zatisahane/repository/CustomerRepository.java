package com.zatisahane.zatisahane.repository;

import com.zatisahane.zatisahane.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    Customer findByemail (String email);
}
