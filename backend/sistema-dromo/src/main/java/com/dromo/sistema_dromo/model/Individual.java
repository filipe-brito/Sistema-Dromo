package com.dromo.sistema_dromo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "individuals", schema = "records")
@SequenceGenerator(name = "individual_seq",sequenceName = "records.individuals_id_seq",allocationSize = 1)
public class Individual {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "individual_seq")
	private int id;
	@Column(name = "full_name")
	private String fullName;
	private String cpf;
	private char gender;
	@Column(name = "marital_status")
	private String maritalStatus;
	private String phone;
	@Column(name = "cell_phone")
	private String cellphone;
	private LocalDate dob;
	private String rg;
	private String rntrc;
	private String email;
	/*
	 * O atributo abaixo será um JOIN com a tabea cities do banco de dados.
	 * @ManyToOne define como os dados dessa tabela externa serão buscados e a relação 
	 * entre as duas tabelas (muitos para um). No caso, LAZY define que os dados dessa 
	 * tabela externa só serão retornados se solicitados explicitamente. Se não forem, 
	 * será retornado somente o valor de chave estrangeira. 
	 * 
	 * @JoinColumn define qual é a coluna que terá um JOIN com uma tabela externa.
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "birth_city_id") // nome da coluna FK no banco
	private Cities birthCity;
	@Column(name = "profile_image_url")
	private String profileImageUrl;
	
	public int getId() {
		return id;
	}
	public String getFullName() {
		return fullName;
	}
	public String getCpf() {
		return cpf;
	}
	public char getGender() {
		return gender;
	}
	public String getMaritalStatus() {
		return maritalStatus;
	}
	public String getPhone() {
		return phone;
	}
	public String getCellphone() {
		return cellphone;
	}
	public LocalDate getDob() {
		return dob;
	}
	public String getRg() {
		return rg;
	}
	public String getRntrc() {
		return rntrc;
	}
	public String getEmail() {
		return email;
	}
	public Cities getBirthCity() {
		return birthCity;
	}
	public String getProfileImageUrl() {
		return profileImageUrl;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public void setCpf(String cpf) {
	    if (cpf != null) {
	        this.cpf = cpf.replaceAll("[^0-9]", "");
	    } else {
	        this.cpf = null;
	    }
	}
	public void setGender(char gender) {
		this.gender = gender;
	}
	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	public void setPhone(String phone) {
		if (phone != null) {
	        this.phone = phone.replaceAll("[^0-9]", "");
	    } else {
	        this.phone = null;
	    }
	}
	public void setCellphone(String cellphone) {
		if (cellphone != null) {
	        this.cellphone = cellphone.replaceAll("[^0-9]", "");
	    } else {
	        this.cellphone = null;
	    }
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	public void setRg(String rg) {
		this.rg = rg;
	}
	public void setRntrc(String rntrc) {
		this.rntrc = rntrc;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setBirthCity(Cities birthCity) {
		this.birthCity = birthCity;
	}
	public void setProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}
}
