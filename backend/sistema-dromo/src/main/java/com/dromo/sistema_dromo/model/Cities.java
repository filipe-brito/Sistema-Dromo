package com.dromo.sistema_dromo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cities", schema = "utils")
public class Cities {
	@Id
	private int id;
	@Column(name="ibge_code")
	private int ibgeCode;	
	private String name;
	private String state;
	
	public int getId() {
		return id;
	}
	public int getIbgeCode() {
		return ibgeCode;
	}
	public String getName() {
		return name;
	}
	public String getState() {
		return state;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	public void setIbgeCode(int ibgeCode) {
		this.ibgeCode = ibgeCode;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setState(String state) {
		this.state = state;
	}	
	
}
