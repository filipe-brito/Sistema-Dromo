package com.dromo.sistema_dromo.mapper;

import com.dromo.sistema_dromo.dto.CompanyDTO;
import com.dromo.sistema_dromo.model.Company;

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
		return dto;
	}

	// Método para trocar String vazia por null antes de converter o DTO para
	// entidade
	private static String sanitize(String value) {
		return (value != null && value.trim().isEmpty()) ? null : value;
	}
}
