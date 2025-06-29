package com.dromo.sistema_dromo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // aplica para todos os endpoints
						.allowedOrigins("http://localhost:5173", "https://dromo.filipixel.com") // origem do front
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // métodos permitidos
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}
}
