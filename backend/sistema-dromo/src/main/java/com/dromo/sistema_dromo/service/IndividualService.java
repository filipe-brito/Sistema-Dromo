package com.dromo.sistema_dromo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.dto.IndividualDTO;
import com.dromo.sistema_dromo.mapper.IndividualMapper;
import com.dromo.sistema_dromo.model.Individual;
import com.dromo.sistema_dromo.repository.IndividualRepository;


@Service
public class IndividualService {
    @Autowired
    private IndividualRepository individualRepository;

    public List<IndividualDTO> listIndividuals(String fullName, String cpf, String email) {
	return individualRepository.findByFilters(fullName, cpf, email).stream()
		.map(individual -> new IndividualDTO(
			individual.getId(), 
			individual.getFullName(), 
			individual.getCpf(),
			individual.getGender(),
			individual.getMaritalStatus(),
			individual.getPhone(),
			individual.getCellPhone(),
			individual.getDob(), 
			individual.getRg(),
			individual.getRntrc(),
			individual.getEmail()))
		.toList();
    }
    
    public IndividualDTO saveIndividual(IndividualDTO dto) {
	Individual entity = IndividualMapper.toEntity(dto);
        Individual saved = individualRepository.save(entity);
        return IndividualMapper.toDTO(saved);
    }
    
    public void deleteById(Integer id) {
	    individualRepository.deleteById(id);
	}
}
