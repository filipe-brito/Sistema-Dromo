package com.dromo.sistema_dromo.mapper.records;

import com.dromo.sistema_dromo.dto.records.CompanyAddressDTO;
import com.dromo.sistema_dromo.dto.records.IndividualAddressDTO;
import com.dromo.sistema_dromo.mapper.utils.CitiesMapper;
import com.dromo.sistema_dromo.model.records.CompanyAddress;
import com.dromo.sistema_dromo.model.records.IndividualAddress;

public class AddressMapper {
	public static IndividualAddress toEntity(IndividualAddressDTO dto) {
		IndividualAddress entity = new IndividualAddress();
		entity.setId(dto.getId());
		entity.setIndividual(dto.getIndividual());
		entity.setStreet(dto.getStreet());
		entity.setStreetNumber(dto.getStreetNumber());
		entity.setNeighborhood(dto.getNeighborhood());
		entity.setZipCode(dto.getZipCode());
		entity.setCity(CitiesMapper.toEntity(dto.getCity()));

		return entity;
	}

	public static IndividualAddressDTO toDTO(IndividualAddress entity) {
		IndividualAddressDTO dto = new IndividualAddressDTO();
		dto.setId(entity.getId());
		dto.setIndividual(entity.getIndividual());
		dto.setStreet(entity.getStreet());
		dto.setStreetNumber(entity.getStreetNumber());
		dto.setNeighborhood(entity.getNeighborhood());
		dto.setZipCode(entity.getZipCode());
		dto.setCity(CitiesMapper.toDto(entity.getCity()));

		return dto;
	}
	
	public static CompanyAddress toEntity(CompanyAddressDTO dto) {
		CompanyAddress entity = new CompanyAddress();
		entity.setId(dto.getId());
		entity.setCompany(dto.getCompany());
		entity.setStreet(dto.getStreet());
		entity.setStreetNumber(dto.getStreetNumber());
		entity.setNeighborhood(dto.getNeighborhood());
		entity.setZipCode(dto.getZipCode());
		entity.setCity(CitiesMapper.toEntity(dto.getCity()));
		
		return entity;
	}
	
	public static CompanyAddressDTO toDTO(CompanyAddress entity) {
		CompanyAddressDTO dto = new CompanyAddressDTO();
		dto.setId(entity.getId());
		dto.setCompany(entity.getCompany());
		dto.setStreet(entity.getStreet());
		dto.setStreetNumber(entity.getStreetNumber());
		dto.setNeighborhood(entity.getNeighborhood());
		dto.setZipCode(entity.getZipCode());
		dto.setCity(CitiesMapper.toDto(entity.getCity()));
		
		return dto;		
	}
}
