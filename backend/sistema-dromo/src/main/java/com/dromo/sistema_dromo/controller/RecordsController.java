package com.dromo.sistema_dromo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.model.Individual;
import com.dromo.sistema_dromo.service.IndividualService;

@RestController
@RequestMapping("/records")
public class RecordsController {
	@Autowired
	private IndividualService individualService;
	
	@GetMapping("/individuals")
	public List<Individual> listIndividuals(){
		return individualService.listIndividuals();
	}
}
