package com.dromo.sistema_dromo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.model.Individual;
import com.dromo.sistema_dromo.repository.IndividualRepository;

@Service
public class IndividualService {
	@Autowired
	private IndividualRepository individualRepository;
	
	public List<Individual> listIndividuals(){
		return individualRepository.findAll();
	}
}
