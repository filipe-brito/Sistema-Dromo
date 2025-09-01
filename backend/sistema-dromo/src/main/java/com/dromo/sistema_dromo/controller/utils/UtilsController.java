package com.dromo.sistema_dromo.controller.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.dto.utils.ViacepAddressDTO;
import com.dromo.sistema_dromo.service.utils.UtilsService;

@RestController
@RequestMapping("/utils")
public class UtilsController {
	@Autowired
	private UtilsService utilsService;
	
	@GetMapping("/address-by-cep")
	public ViacepAddressDTO searchAddressByCep(@RequestParam(name="cep", required=true) String cep) {
		ViacepAddressDTO address = utilsService.getAddressByCep(cep);
		return  address;
	}
}
