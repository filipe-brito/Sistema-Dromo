package com.dromo.sistema_dromo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dromo.sistema_dromo.model.Cities;

public interface CitiesRepository extends JpaRepository<Cities, Integer> {
	// Método para buscar cidades por nome
	List<Cities> findTop10ByNameContainingIgnoreCaseOrderByNameAsc(String name);
}
