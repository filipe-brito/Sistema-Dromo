package com.dromo.sistema_dromo.service.utils;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.dromo.sistema_dromo.dto.utils.ViacepAddressDTO;

/*
 * Essa é uma classe utilitária que conterá diversos métodos úteis que serão
 * usados pelo sistema. O foco dela é consultar APIs externas.
 * 
 * Criamos um objeto WebClient. Esse objeto é muito útil para consumir APIs REST.
 * A ideia é fazer um objeto genérico que terá estrutura alterada
 * dependendo do método que o chamar. Então, vamos utilizar o objeto auxiliar Builder
 * para construir um WebClient completo.
 * 
 * Com o Builder, não será necessário ter que reatribuir headers, timeouts e codecs
 * a toda nova instância de WebClient. Pelo construtor, o próprio Spring define
 * essa configuração com valores padrões
 */

// Anotação que diz ao Spring que essa é uma classe de serviço
@Service
public class UtilsService {
	/*
	 * Vamos criar um objeto Builder, que é uma classe interna de WebClient.
	 * Builder serve para configurar o WebClient antes de criar a instância.
	 * Com isso, podemos definir configurações específicas para cada serviço
	 * sem antes precisar instanciar WebClients
	 */
	private final WebClient.Builder builder;
	
	// Spring vai fornecer um builder padrão
	public UtilsService(WebClient.Builder builder) {
		this.builder = builder;
	}
	
	// MÉTODO QUE INTEGRA COM VIACEP PARA BUSCAR ENDEREÇOS A PARTIR DE UM CEP
	public ViacepAddressDTO getAddressByCep(String cep) {
		/*
		 * Vamos construir um WebClient com o builer
		 * builder: pré-configuração antes de criar o objeto final
		 * .baseUrl: define a url base desse WebClient
		 * .build: método final que cria a instancia real de WebClient
		 * 
		 * .get: define "GET" como método de requisição HTTP
		 * .uri: define o serviço que queremos consumir da API
		 * .retrieve: dispara a requisição após tudo estar definido
		 * .bodyToMono(DTO.class): converte a resposta inteira (JSON ou XML) em objeto java
		 * .block: "pausa" a execução do método até que a resposta fique pronta
		 */
		WebClient viaCep = builder.baseUrl("https://viacep.com.br/ws/").build();
		ViacepAddressDTO response = viaCep.get().uri("{cep}/json", cep).retrieve().bodyToMono(ViacepAddressDTO.class).block();
		return response;
	}
}
