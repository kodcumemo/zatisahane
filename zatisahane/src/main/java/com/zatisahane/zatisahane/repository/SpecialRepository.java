package com.zatisahane.zatisahane.repository;

import com.zatisahane.zatisahane.entity.Special;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialRepository extends JpaRepository<Special,Integer> {
}
