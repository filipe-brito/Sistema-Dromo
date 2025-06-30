package com.dromo.sistema_dromo.exception;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice // Essa anotação torna essa classe responsável por capturar exceções em toda a
		  // aplicação
public class GlobalExceptionHandler {
    // Captura especificamente erros de violação de integridade (ex: UNIQUE do
    // banco) para o método abaixo
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleUniqueViolation(DataIntegrityViolationException ex) {

	// Captura a causa raiz do erro (lá do PostgreSQL) e guarda em um objeto Throwable
	Throwable rootCause = ex.getRootCause();
	
	// Verifica de rootCause é null
	if (rootCause != null) {
	    String message = rootCause.getMessage(); // Extrai a mensagem de erro do Postgre

	    // Expressão regular para capturar o nome do campo violado
	    // Regex: procure "Key (" seguido de uma palavra (cpf, cnpj etc) e depois ")="
	    Pattern pattern = Pattern.compile("Key \\((\\w+)\\)=");
	    Matcher matcher = pattern.matcher(message);

	    if (matcher.find()) {
		String field = matcher.group(1); // group(1) → conteúdo entre os parênteses, ex: cpf

		// Monta uma mensagem amigável
		String friendlyMessage = String.format("'%s' já está cadastrado.", field.toUpperCase());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(friendlyMessage);
	    }
	}

	// Se não conseguimos identificar a causa, retorna genérico
	return ResponseEntity.status(HttpStatus.CONFLICT).body("Violação de integridade nos dados.");
    }
}
