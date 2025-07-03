package com.dromo.sistema_dromo.mapper;

import com.dromo.sistema_dromo.dto.CitiesDTO;
import com.dromo.sistema_dromo.model.Cities;

public class CitiesMapper {
	public static Cities toEntity (CitiesDTO dto) {
		Cities city = new Cities();
		city.setId(dto.getId());
		city.setIbgeCode(dto.getIbgeCode());
		city.setName(dto.getName());
		city.setState(dto.getState());
		
		return city;
	}
	
	public static CitiesDTO toDto (Cities entity) {
		CitiesDTO city = new CitiesDTO();
		city.setId(entity.getId());
		city.setIbgeCode(entity.getIbgeCode());
		city.setName(entity.getName());
		city.setState(entity.getState());
		
		return city;
	}
}
