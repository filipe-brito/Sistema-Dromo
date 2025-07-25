package com.dromo.sistema_dromo.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

// Essa é uma classe de configuração para autenticar requisições ao Cloudinary

@Configuration // 1. Spring reconhece que essa classe define beans
public class CloudinaryConfig {

    // 2. @Value injeta as credenciais lidas do application.properties
    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    @Bean // 3. Este método cria e configura o objeto Cloudinary
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        return new Cloudinary(config); // Retorna o objeto Cloudinary configurado
    }
}