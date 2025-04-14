package com.dromo.sistema_dromo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dromo.sistema_dromo.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
	
}
