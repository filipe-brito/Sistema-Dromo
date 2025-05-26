package com.dromo.sistema_dromo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.dto.CompanyDTO;
import com.dromo.sistema_dromo.dto.IndividualDTO;
import com.dromo.sistema_dromo.service.CompanyService;
import com.dromo.sistema_dromo.service.IndividualService;

@RestController
@RequestMapping("/records")
public class RecordsController {
	// Métodos para o cadastro de pessoas físicas
    @Autowired
    private IndividualService individualService;
    @Autowired
    private CompanyService companyService;

    @GetMapping("/individuals")
    public List<IndividualDTO> listIndividuals(
	    // @RequestParam define um parâmetro para a requisição
	    // 'required = false' define que esse parâmetro não é obrigatório
	    @RequestParam(name = "name", required = false) String fullName, 
	    @RequestParam(required = false) String cpf,
	    @RequestParam(required = false) String email) {
	return individualService.listIndividuals(fullName, cpf, email);
    }
    
    @PostMapping("/individuals")
    public ResponseEntity<IndividualDTO> create(@RequestBody IndividualDTO dto) {
    	IndividualDTO saved = individualService.saveIndividual(dto);
    	return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    @DeleteMapping("individuals/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
    	individualService.deleteById(id);
    	return ResponseEntity.noContent().build();
    }
    
    // Métodos para o cadastro de pessoas jurídicas
    @GetMapping("/companies")
    public List<CompanyDTO> listCompanies(
	    @RequestParam(name = "name", required = false) String companyName,
	    @RequestParam(required = false) String cnpj) {
	return companyService.listCompanies(companyName, cnpj);
    }
}
