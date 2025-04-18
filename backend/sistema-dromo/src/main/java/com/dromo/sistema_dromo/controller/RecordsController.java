package com.dromo.sistema_dromo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.dto.CompanyDTO;
import com.dromo.sistema_dromo.dto.IndividualDTO;
import com.dromo.sistema_dromo.service.CompanyService;
import com.dromo.sistema_dromo.service.IndividualService;

@RestController
@RequestMapping("/records")
public class RecordsController {
	@Autowired
	private IndividualService individualService;
	@Autowired
	private CompanyService companyService;
	
	@GetMapping("/individuals")
	public List<IndividualDTO> listIndividuals(){
		return individualService.listIndividuals();
	}
	
	@GetMapping("/companies")
	public List<CompanyDTO> listCompanies(){
		return companyService.listCompanies();
	}
}
