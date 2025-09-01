package com.dromo.sistema_dromo.mapper.records;

import java.util.List;

import com.dromo.sistema_dromo.dto.records.CompanyAddressDTO;
import com.dromo.sistema_dromo.dto.records.CompanyDTO;
import com.dromo.sistema_dromo.model.records.Company;
import com.dromo.sistema_dromo.model.records.CompanyAddress;

public class CompanyMapper {
	public static Company toEntity(CompanyDTO dto) {
		Company company = new Company();
		company.setId(dto.getId());
		company.setCompanyName(dto.getCompanyName());
		company.setCnpj(dto.getCnpj());
		company.setTradeName(sanitize(dto.getTradeName()));
		company.setDoe(dto.getDoe());
		company.setMunicipalRegistration(sanitize(dto.getMunicipalRegistration()));
		company.setStateRegistration(sanitize(dto.getStateRegistration()));
		company.setPhone(sanitize(dto.getPhone()));
		company.setEmail(sanitize(dto.getEmail()));
		company.setProfileImageUrl(sanitize(dto.getProfileImageUrl()));
		/*
		 * stream é uma forma moderna e "funcional" de percorrer coleções. 
		 */
		if (dto.getAddresses() != null) {
			List<CompanyAddress> entityAddresses = dto.getAddresses().stream().map(AddressMapper::toEntity).toList();
			company.setAddresses(entityAddresses);
		}
		return company;
	}

	public static CompanyDTO toDTO(Company entity) {
		CompanyDTO dto = new CompanyDTO();
		dto.setId(entity.getId());
		dto.setCompanyName(entity.getCompanyName());
		dto.setCnpj(entity.getCnpj());
		dto.setTradeName(entity.getTradeName());
		dto.setDoe(entity.getDoe());
		dto.setMunicipalRegistration(entity.getMunicipalRegistration());
		dto.setStateRegistration(entity.getStateRegistration());
		dto.setPhone(entity.getPhone());
		dto.setEmail(entity.getEmail());
		dto.setProfileImageUrl(entity.getProfileImageUrl());
		if (entity.getAddresses() != null) {
			List<CompanyAddressDTO> DTOAddresses = entity.getAddresses().stream().map(AddressMapper::toDTO).toList();
			dto.setAddresses(DTOAddresses);
		}
		return dto;
	}

	// Método para trocar String vazia por null antes de converter o DTO para
	// entidade
	private static String sanitize(String value) {
		return (value != null && value.trim().isEmpty()) ? null : value;
	}
}
