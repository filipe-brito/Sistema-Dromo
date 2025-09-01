package com.dromo.sistema_dromo.service.records;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.dto.records.IndividualDTO;
import com.dromo.sistema_dromo.dto.records.IndividualSummaryDTO;
import com.dromo.sistema_dromo.mapper.records.IndividualMapper;
import com.dromo.sistema_dromo.model.records.Individual;
import com.dromo.sistema_dromo.repository.records.IndividualRepository;

@Service
public class IndividualService {
	@Autowired
	private IndividualRepository individualRepository;

	public Page<IndividualSummaryDTO> listIndividuals(String fullName, String cpf, String email, Pageable pageable) {
		return individualRepository.findByFilters(fullName, cpf, email, pageable);
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
