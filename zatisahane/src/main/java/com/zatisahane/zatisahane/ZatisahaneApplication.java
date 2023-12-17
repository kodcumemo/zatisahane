package com.zatisahane.zatisahane;

import com.zatisahane.zatisahane.entity.User;
import com.zatisahane.zatisahane.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ZatisahaneApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZatisahaneApplication.class, args);
	}
}


