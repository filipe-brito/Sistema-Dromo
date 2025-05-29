package com.dromo.sistema_dromo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.dto.CompanyDTO;
import com.dromo.sistema_dromo.dto.IndividualDTO;
import com.dromo.sistema_dromo.mapper.CompanyMapper;
import com.dromo.sistema_dromo.mapper.IndividualMapper;
import com.dromo.sistema_dromo.model.Company;
import com.dromo.sistema_dromo.model.Individual;
import com.dromo.sistema_dromo.repository.CompanyRepository;

@Service
public class CompanyService {
	@Autowired
	private CompanyRepository companyRepository;
	
	public List<CompanyDTO> listCompanies(String companyName, String cnpj){
		return companyRepository.findByFilters(companyName, cnpj)
			.stream()
			.map(company -> new CompanyDTO(
					company.getId(),
					company.getCompanyName(),
					company.getCnpj(),
					company.getTradeName(),
					company.getDoe(),
					company.getMunicipalRegistration(),
					company.getStateRegistration(),
					company.getPhone(),
					company.getEmail()
				))
			.toList();
	}
	
	public CompanyDTO saveCompany(CompanyDTO dto) {
		Company entity = CompanyMapper.toEntity(dto);
	        Company saved = companyRepository.save(entity);
	        return CompanyMapper.toDTO(saved);
	    }
	
    public void deleteById(Integer id) {
	    companyRepository.deleteById(id);
	}
    
    public CompanyDTO getById(Integer id) {
        Company company = companyRepository.findById(id).orElse(null);
        return CompanyMapper.toDTO(company);
    }
    
    public CompanyDTO update(Integer id, CompanyDTO dto) {
        Company existing = companyRepository.findById(id).orElse(null);

        Company updated = CompanyMapper.toEntity(dto);
        updated.setId(existing.getId()); // mantém o mesmo ID
       companyRepository.save(updated);
        return CompanyMapper.toDTO(updated);
    }
}
