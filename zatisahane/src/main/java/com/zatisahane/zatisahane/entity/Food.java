package com.zatisahane.zatisahane.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String detail;
    private String url;
    private Float price;
    private Boolean isDelete;
    private LocalDate localDate;
    private String turu;
    @ManyToOne
    Customer customer;

}
