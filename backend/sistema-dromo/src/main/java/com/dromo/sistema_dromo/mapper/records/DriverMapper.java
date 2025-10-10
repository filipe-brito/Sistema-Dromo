package com.dromo.sistema_dromo.mapper.records;

import com.dromo.sistema_dromo.dto.records.DriverDTO;
import com.dromo.sistema_dromo.model.records.Company;
import com.dromo.sistema_dromo.model.records.Driver;
import com.dromo.sistema_dromo.model.records.Individual;

public class DriverMapper {
	public static Driver toEntity(DriverDTO dto, String personType) {
		if (dto.getLicenseNumber() != null || dto.getLicenseType() != null) {
			Driver entity = new Driver();
			entity.setId(dto.getId());
			/*
			 * Driver sempre será "individual", mas por boa prática, apliquei a 
			 * lógica para company também, apenas para aprendizado. Porém, a classe 
			 * Company não terá um atributo Driver.
			 * 
			 * Aqui, verificamos se personType é "individual" ou "company".
			 * Essa propriedade vai definir se será preenchido individualId
			 * ou companyId, mas como explicado acima, Driver sempre será "individual"
			 */
			entity.setPersonType(personType);
			if (personType.equals("individual")) {
				Individual individual = new Individual();
				individual.setId(dto.getIndividualId());
				entity.setIndividualId(individual);
			} else if (personType.equals("company")) {
				Company company = new Company();
				company.setId(dto.getCompanyId());
				entity.setCompanyId(company);
			}
			entity.setLicenseNumber(dto.getLicenseNumber());
			entity.setLicenseType(dto.getLicenseType());

			return entity;
		} else {
			return null;
		}
	}

	public static DriverDTO toDTO(Driver entity) {
		if (entity.getLicenseNumber() != null || entity.getLicenseType() != null) {
			DriverDTO dto = new DriverDTO();
			dto.setId(entity.getId());
			dto.setPersonType(entity.getPersonType());
			if (entity.getPersonType().equals("individual")) {
				dto.setIndividualId(entity.getIndividualId().getId());
			} else if (entity.getPersonType().equals("company")) {
				dto.setCompanyId(entity.getCompanyId().getId());
			};
			dto.setLicenseNumber(entity.getLicenseNumber());
			dto.setLicenseType(entity.getLicenseType());

			return dto;
		} else {
			return null;
		}

	}
}
