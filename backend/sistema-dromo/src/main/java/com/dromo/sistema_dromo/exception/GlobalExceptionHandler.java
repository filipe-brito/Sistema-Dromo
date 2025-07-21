package com.dromo.sistema_dromo.exception;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/*
 * Classe global para lançar exceções customizadas. 
 * @ControllerAdvice anotação torna essa classe responsável por capturar exceções em toda a aplicação.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

	/*
	 * A anotação @ExceptionHandler define que o método imediatamente abaixo deve
	 * capturar especificamente erros de violação de integridade (ex: UNIQUE do
	 * banco).
	 * 
	 * @param ex é a exceção em si.
	 * 
	 * @return retorna o código HTTP 409 (CONFLIT) e uma mensagem acusando qual foi
	 * a informação que lançou a exceção
	 */
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<String> handleUniqueViolation(DataIntegrityViolationException ex) {

		// Captura a causa raiz do erro (lá do PostgreSQL) e guarda em um objeto
		// Throwable
		Throwable rootCause = ex.getRootCause();

		// Verifica de rootCause é null
		if (rootCause != null) {
			String message = rootCause.getMessage(); // Extrai a mensagem de erro do Postgre

			// Expressão regular para capturar o nome do campo violado
			// Regex: procure "Key (" seguido de uma palavra (cpf, cnpj etc) e depois ")="
			Pattern pattern = Pattern.compile("Key \\((\\w+)\\)=");
			// Aplica o Regex salvo em pattern na mensagem de erro
			Matcher matcher = pattern.matcher(message);

			// Verifica se o Regex encontrou o pattern na mensagem da exceção
			if (matcher.find()) {
				String field = matcher.group(1); // Pega o primeiro agrupamento identificado

				// Monta uma mensagem amigável
				String friendlyMessage = String.format("'%s' já está cadastrado.", field.toUpperCase());
				System.out.println("teste::: " + friendlyMessage);
				return ResponseEntity.status(HttpStatus.CONFLICT).body(friendlyMessage);
			}
		}

		// Se não conseguimos identificar a causa, retorna genérico
		return ResponseEntity.status(HttpStatus.CONFLICT).body("Violação de integridade nos dados.");
	}
}
