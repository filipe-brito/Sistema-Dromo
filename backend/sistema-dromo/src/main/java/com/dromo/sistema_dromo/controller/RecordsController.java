package com.dromo.sistema_dromo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    	System.out.println("teste para ver se a requisição chega até aqui!");
	return individualService.listIndividuals(fullName, cpf, email);
    }
    
    @PostMapping("/individuals")
    public ResponseEntity<IndividualDTO> create(@RequestBody IndividualDTO dto) {
    	IndividualDTO saved = individualService.saveIndividual(dto);
    	return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    @DeleteMapping("individuals/{id}")
    public ResponseEntity<Void> deleteIndividualById(@PathVariable Integer id) {
    	individualService.deleteById(id);
    	return ResponseEntity.noContent().build();
    }
    
    @GetMapping("individuals/{id}")
    public ResponseEntity<IndividualDTO> getById(@PathVariable Integer id) {
        IndividualDTO dto = individualService.getById(id);
        return ResponseEntity.ok(dto);
    }
    
    @PutMapping("individuals/{id}")
    public ResponseEntity<IndividualDTO> updateIndividual(
            @PathVariable Integer id,
            @RequestBody IndividualDTO dto
    ) {
        IndividualDTO updated = individualService.update(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    // Métodos para o cadastro de pessoas jurídicas
    @GetMapping("/companies")
    public List<CompanyDTO> listCompanies(
	    @RequestParam(name = "companyName", required = false) String companyName,
	    @RequestParam(required = false) String cnpj) {
	return companyService.listCompanies(companyName, cnpj);
    }
    
    @PostMapping("/companies")
    public ResponseEntity<CompanyDTO> create(@RequestBody CompanyDTO dto) {
    	CompanyDTO saved = companyService.saveCompany(dto);
    	return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    @DeleteMapping("companies/{id}")
    public ResponseEntity<Void> deleteCompanyById(@PathVariable Integer id) {
    	companyService.deleteById(id);
    	return ResponseEntity.noContent().build();
    }
    
    @GetMapping("companies/{id}")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Integer id) {
        CompanyDTO dto = companyService.getById(id);
        return ResponseEntity.ok(dto);
    }
    
    @PutMapping("companies/{id}")
    public ResponseEntity<CompanyDTO> updateCompany(
            @PathVariable Integer id,
            @RequestBody CompanyDTO dto
    ) {
        CompanyDTO updated = companyService.update(id, dto);
        return ResponseEntity.ok(updated);
    }
}
