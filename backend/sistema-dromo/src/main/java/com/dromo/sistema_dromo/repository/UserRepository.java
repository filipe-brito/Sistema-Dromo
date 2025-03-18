package com.dromo.sistema_dromo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dromo.sistema_dromo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}