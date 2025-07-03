package com.dromo.sistema_dromo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dromo.sistema_dromo.dto.CitiesDTO;
import com.dromo.sistema_dromo.mapper.CitiesMapper;
import com.dromo.sistema_dromo.model.Cities;
import com.dromo.sistema_dromo.repository.CitiesRepository;

@Service
public class CitiesService {
	@Autowired
	private CitiesRepository citiesRepository;
	
	public List<CitiesDTO> searchByName (String name) {
		List<Cities> cities = citiesRepository.findByNameContainingIgnoreCase(name);
		List<CitiesDTO> dtoList = new ArrayList<>();
		for (Cities city : cities) {
			dtoList.add(CitiesMapper.toDto(city));
		}
		return dtoList;
	}
}
