package com.dromo.sistema_dromo.mapper;

import com.dromo.sistema_dromo.dto.IndividualDTO;
import com.dromo.sistema_dromo.model.Individual;

public class IndividualMapper {
	public static Individual toEntity(IndividualDTO dto) {
		Individual individual = new Individual();
		individual.setId(dto.getId());
		individual.setFullName(dto.getName());
		individual.setCpf(dto.getCpf());
		individual.setGender(dto.getGender());
		individual.setMaritalStatus(sanitize(dto.getMaritalStatus()));
		individual.setPhone(sanitize(dto.getPhone()));
		individual.setCellphone(sanitize(dto.getCellphone()));
		individual.setDob(dto.getDob());
		individual.setRg(sanitize(dto.getRg()));
		individual.setRntrc(sanitize(dto.getRntrc()));
		individual.setEmail(sanitize(dto.getEmail()));
		return individual;
	}

	public static IndividualDTO toDTO(Individual entity) {
		IndividualDTO dto = new IndividualDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getFullName());
		dto.setCpf(entity.getCpf());
		dto.setGender(entity.getGender());
		dto.setMaritalStatus(entity.getMaritalStatus());
		dto.setPhone(entity.getPhone());
		dto.setCellphone(entity.getCellphone());
		dto.setDob(entity.getDob());
		dto.setRg(entity.getRg());
		dto.setRntrc(entity.getRntrc());
		dto.setEmail(entity.getEmail());
		return dto;
	}

	private static String sanitize(String value) {
		return (value != null && value.trim().isEmpty()) ? null : value;
	}
}
