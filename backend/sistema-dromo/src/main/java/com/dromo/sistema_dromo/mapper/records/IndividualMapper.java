package com.dromo.sistema_dromo.mapper.records;

import java.util.List;

import com.dromo.sistema_dromo.dto.records.IndividualAddressDTO;
import com.dromo.sistema_dromo.dto.records.IndividualDTO;
import com.dromo.sistema_dromo.mapper.utils.CitiesMapper;
import com.dromo.sistema_dromo.model.records.Individual;
import com.dromo.sistema_dromo.model.records.IndividualAddress;

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
		/*
		 * stream é uma forma moderna e "funcional" de percorrer coleções. 
		 */
		if (dto.getAddresses() != null) {
			List<IndividualAddress> entityAddresses = dto.getAddresses().stream().map(AddressMapper::toEntity).toList();
			individual.setAddresses(entityAddresses);
		}
		if (dto.getBirthCity() == null) {
			individual.setBirthCity(null);
		} else {
			individual.setBirthCity(CitiesMapper.toEntity(dto.getBirthCity()));
		}
		individual.setProfileImageUrl(sanitize(dto.getProfileImageUrl()));
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
		dto.setBirthCity(CitiesMapper.toDto(entity.getBirthCity()));
		dto.setProfileImageUrl(entity.getProfileImageUrl());
		if (entity.getAddresses() != null) {
			List<IndividualAddressDTO> DTOAddresses = entity.getAddresses().stream().map(AddressMapper::toDTO).toList();
			dto.setAddresses(DTOAddresses);
		}
		return dto;
	}

	private static String sanitize(String value) {
		return (value != null && value.trim().isEmpty()) ? null : value;
	}
}
