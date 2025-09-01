package com.dromo.sistema_dromo.service.records;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.dto.records.CompanyDTO;
import com.dromo.sistema_dromo.dto.records.CompanySummaryDTO;
import com.dromo.sistema_dromo.mapper.records.CompanyMapper;
import com.dromo.sistema_dromo.model.records.Company;
import com.dromo.sistema_dromo.repository.records.CompanyRepository;

@Service
public class CompanyService {
	@Autowired
	private CompanyRepository companyRepository;
	
	public Page<CompanySummaryDTO> listCompanies(String companyName, String cnpj, Pageable pageable){
		return companyRepository.findByFilters(companyName, cnpj, pageable);
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
