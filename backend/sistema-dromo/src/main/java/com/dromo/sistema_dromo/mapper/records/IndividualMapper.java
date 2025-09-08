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
		 * Vamos verificar se o DTO possui addresses antes de percorrer a lista e
		 * converter o dto de address para entidade. Aqui temos uma relação
		 * bidirecional, onde um individual possui um address e cada address possui um
		 * individual. Então, para construir os address, passamos para o seu atributo
		 * "individual" o próprio individual que está sendo criado por esse mapper. Para
		 * isso, utilizamos um método helper lá na classe Individual.
		 */
		if (dto.getAddresses() != null || dto.getAddresses().isEmpty()) {
			for (IndividualAddressDTO addrDTO : dto.getAddresses()) {
				if (addrDTO != null) {
					// Converte cada endereço do dto em endereço para a entidade
					IndividualAddress addr = AddressMapper.toEntity(addrDTO);
					/*
					 * Aqui usamos o helper, que garante que addr.setIndividual(individual) seja
					 * chamado. Verificamos se ao mapear o address o retorno é null. Se for null, o
					 * endereço não entra na lista.
					 */
					if (addr != null) {
						individual.addAddress(addr);
					}
				}

			}
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
