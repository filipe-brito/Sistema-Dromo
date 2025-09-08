package com.dromo.sistema_dromo.mapper.records;

import com.dromo.sistema_dromo.dto.records.CompanyAddressDTO;
import com.dromo.sistema_dromo.dto.records.IndividualAddressDTO;
import com.dromo.sistema_dromo.mapper.utils.CitiesMapper;
import com.dromo.sistema_dromo.model.records.Company;
import com.dromo.sistema_dromo.model.records.CompanyAddress;
import com.dromo.sistema_dromo.model.records.Individual;
import com.dromo.sistema_dromo.model.records.IndividualAddress;

public class AddressMapper {
	public static IndividualAddress toEntity(IndividualAddressDTO dto) {
		if (dto.getZipCode() != null && dto.getCity().validateCity() && dto.getNeighborhood() != null
				&& dto.getStreetNumber() != null && dto.getStreet() != null) {

			IndividualAddress entity = new IndividualAddress();
			entity.setId(dto.getId());
			/*
			 * Verifica se o endereço possui um individual. No caso de um novo cadastro,
			 * esse registro ainda não existe. Então, fazemos essa verificação para definir
			 * Individual como null
			 */
			if (dto.getIndividual() != null) {
				Individual individual = new Individual();
				individual.setId(dto.getIndividual()); // só setando o id
				entity.setIndividual(individual);
			} else {
				entity.setIndividual(null);
			}
			entity.setStreet(dto.getStreet());
			entity.setStreetNumber(dto.getStreetNumber());
			entity.setNeighborhood(dto.getNeighborhood());
			entity.setZipCode(dto.getZipCode());
			entity.setCity(CitiesMapper.toEntity(dto.getCity()));

			return entity;
		} else {
			return null;
		}

	}

	public static IndividualAddressDTO toDTO(IndividualAddress entity) {
		IndividualAddressDTO dto = new IndividualAddressDTO();
		dto.setId(entity.getId());
		dto.setIndividual(entity.getIndividual().getId());
		dto.setStreet(entity.getStreet());
		dto.setStreetNumber(entity.getStreetNumber());
		dto.setNeighborhood(entity.getNeighborhood());
		dto.setZipCode(entity.getZipCode());
		dto.setCity(CitiesMapper.toDto(entity.getCity()));

		return dto;
	}

	public static CompanyAddress toEntity(CompanyAddressDTO dto) {
		if (dto.getZipCode() != null && dto.getCity().validateCity() && dto.getNeighborhood() != null
				&& dto.getStreetNumber() != null && dto.getStreet() != null) {
			CompanyAddress entity = new CompanyAddress();
			entity.setId(dto.getId());
			if (dto.getCompany() != null) {
				Company company = new Company();
				company.setId(dto.getCompany()); // só setando o id
				entity.setCompany(company);
			} else {
				entity.setCompany(null);
			}
			entity.setStreet(dto.getStreet());
			entity.setStreetNumber(dto.getStreetNumber());
			entity.setNeighborhood(dto.getNeighborhood());
			entity.setZipCode(dto.getZipCode());
			entity.setCity(CitiesMapper.toEntity(dto.getCity()));

			return entity;
		} else {
			return null;
		}
	}

	public static CompanyAddressDTO toDTO(CompanyAddress entity) {
		CompanyAddressDTO dto = new CompanyAddressDTO();
		dto.setId(entity.getId());
		dto.setCompany(entity.getCompany().getId());
		dto.setStreet(entity.getStreet());
		dto.setStreetNumber(entity.getStreetNumber());
		dto.setNeighborhood(entity.getNeighborhood());
		dto.setZipCode(entity.getZipCode());
		dto.setCity(CitiesMapper.toDto(entity.getCity()));

		return dto;
	}
}
