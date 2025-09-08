package com.dromo.sistema_dromo.mapper.records;

import java.util.List;

import com.dromo.sistema_dromo.dto.records.CompanyAddressDTO;
import com.dromo.sistema_dromo.dto.records.CompanyDTO;
import com.dromo.sistema_dromo.dto.records.IndividualAddressDTO;
import com.dromo.sistema_dromo.model.records.Company;
import com.dromo.sistema_dromo.model.records.CompanyAddress;
import com.dromo.sistema_dromo.model.records.IndividualAddress;

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
		/*
		 * Vamos verificar se o DTO possui addresses antes de percorrer a lista e
		 * converter o dto de address para entidade. Cada address precisa ter o seu
		 * atributo individual preenchido. Então, passamos o próprio individual que está
		 * em construção agora, utilizando um helper na classe individual.
		 */
		if (dto.getAddresses() != null) {
			for (CompanyAddressDTO addrDTO : dto.getAddresses()) {
				if (addrDTO != null) {
					// Converte cada endereço do dto em endereço para a entidade
					CompanyAddress addr = AddressMapper.toEntity(addrDTO);
					/*
					 * Aqui usamos o helper, que garante que addr.setCompany(company) seja chamado.
					 * Verificamos se ao mapear o address o retorno é null. Se for null, o endereço
					 * não entra na lista.
					 */
					if (addr != null) {
						company.addAddress(addr);
					}
				}
			}
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
