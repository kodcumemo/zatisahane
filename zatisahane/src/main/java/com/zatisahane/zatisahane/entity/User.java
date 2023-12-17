package com.zatisahane.zatisahane.entity;

import jakarta.persistence.*;
import lombok.Data;

    @Data
    @Entity
    @Table(name = "User")
    public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        Integer id;
        String username;
        String email;
        String adres;
        String tel;
        String password;
        String role;

        public User() {

        }
        public User(String username, String email, String adres, String tel, String password, String role) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.adres = adres;
            this.tel = tel;
            this.password = password;
            this.role = role;
        }

    }
