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
			individual.getCellphone(),
			individual.getDob(), 
			individual.getRg(),
			individual.getRntrc(),
			individual.getEmail(),
			individual.getBirthCity()))
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
    
    public IndividualDTO getById(Integer id) {
        Individual individual = individualRepository.findById(id).orElse(null);
        return IndividualMapper.toDTO(individual);
    }
    
    public IndividualDTO update(Integer id, IndividualDTO dto) {
        Individual existing = individualRepository.findById(id).orElse(null);

        Individual updated = IndividualMapper.toEntity(dto);
        updated.setId(existing.getId()); // mantém o mesmo ID
        individualRepository.save(updated);
        return IndividualMapper.toDTO(updated);
    }
}
