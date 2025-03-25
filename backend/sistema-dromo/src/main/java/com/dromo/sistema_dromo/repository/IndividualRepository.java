package com.dromo.sistema_dromo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dromo.sistema_dromo.model.Individual;

@Repository
public interface IndividualRepository extends JpaRepository<Individual, Long>{
}
