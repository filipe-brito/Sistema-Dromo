package com.dromo.sistema_dromo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dromo.sistema_dromo.dto.CitiesDTO;
import com.dromo.sistema_dromo.service.CitiesService;

@RestController
@RequestMapping("/utils/cities")
public class CityController {

    private final CitiesService citiesService;

    public CityController(CitiesService citiesService) {
        this.citiesService = citiesService;
    }

    /**
     * Retorna uma lista de cidades cujo nome contenha o valor pesquisado.
     *
     * @param name Parte do nome da cidade a ser buscada.
     * @return Lista de CitiesDTO com as cidades encontradas.
     */
    @GetMapping("/search")
    public List<CitiesDTO> searchCitiesByName(@RequestParam("name") String name) {
        return citiesService.searchByName(name);
    }
}
