package com.dromo.sistema_dromo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.dto.CompanyDTO;
import com.dromo.sistema_dromo.repository.CompanyRepository;

@Service
public class CompanyService {
	@Autowired
	private CompanyRepository companyRepository;
	
	public List<CompanyDTO> listCompanies(String companyName, String cnpj){
		return companyRepository.findByFilters(companyName, cnpj)
			.stream()
			.map(company -> new CompanyDTO(
					company.getCompanyName(),
					company.getCnpj()
				))
			.toList();
	}

}
