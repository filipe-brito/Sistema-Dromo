package com.dromo.sistema_dromo.controller.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.dto.utils.Address;
import com.dromo.sistema_dromo.dto.utils.CitiesDTO;
import com.dromo.sistema_dromo.dto.utils.ViacepAddressDTO;
import com.dromo.sistema_dromo.mapper.utils.CitiesMapper;
import com.dromo.sistema_dromo.service.utils.CitiesService;
import com.dromo.sistema_dromo.service.utils.UtilsService;

@RestController
@RequestMapping("/utils")
public class UtilsController {
	@Autowired
	private UtilsService utilsService;
	@Autowired
	CitiesService citiesService;
	
	@GetMapping("/address-by-cep")
	public Address searchAddressByCep(@RequestParam(name="cep", required=true) String cep) {
		Address address = new Address();
		ViacepAddressDTO viaCepAddress = utilsService.getAddressByCep(cep);
		CitiesDTO cityInfo = CitiesMapper.toDto(citiesService.searchByIbgeCode(viaCepAddress.getIbge()));
		address.setCity(cityInfo);
		address.setNeighborhood(viaCepAddress.getNeighborhood());
		address.setStreet(viaCepAddress.getStreet());
		address.setZipCode(cep);
		return address;
	}
}
