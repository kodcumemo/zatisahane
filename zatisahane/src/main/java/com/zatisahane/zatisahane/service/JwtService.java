package com.zatisahane.zatisahane.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private String secretKey = "123abc123";
    private Algorithm algorithm = Algorithm.HMAC256(secretKey);

    public String generatedToken(String email) {    // emaili verip token alıyoruz.
        String token = JWT.create()
                .withSubject(email)
                .sign(algorithm);
        return token;
    }

    public String getEmail(String token) {  //  tokeni verip emaili alıyoruz
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject();
    }
}
