package com.zatisahane.zatisahane.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "special")
public class Special {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private String detail1;
    private String detail2;
    private String detail3;
    private String detail4;
    private String url;
    private Double price;
    private Boolean isDelete;
    private LocalDate localDate;
}
