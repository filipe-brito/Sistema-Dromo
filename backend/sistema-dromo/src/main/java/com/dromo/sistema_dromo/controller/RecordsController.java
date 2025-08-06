package com.dromo.sistema_dromo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dromo.sistema_dromo.dto.CompanyDTO;
import com.dromo.sistema_dromo.dto.IndividualDTO;
import com.dromo.sistema_dromo.service.CompanyService;
import com.dromo.sistema_dromo.service.ImageService;
import com.dromo.sistema_dromo.service.IndividualService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/records")
public class RecordsController {
	// Métodos para o cadastro de pessoas físicas
	@Autowired
	private IndividualService individualService;
	@Autowired
	private CompanyService companyService;
	// Adicione a injeção do seu ProfileImageService
	@Autowired // Você pode usar @Autowired em campos, mas a injeção por construtor é
				// recomendada para campos final
	private ImageService profileImageService;
	@Autowired
	private ObjectMapper objectMapper; // Declaração da sua instância

	@GetMapping("/individuals")
	public List<IndividualDTO> listIndividuals(
			// @RequestParam define um parâmetro para a requisição
			// 'required = false' define que esse parâmetro não é obrigatório
			@RequestParam(name = "name", required = false) String fullName, @RequestParam(required = false) String cpf,
			@RequestParam(required = false) String email) {
		return individualService.listIndividuals(fullName, cpf, email);
	}

	@PostMapping("/individuals")
	public ResponseEntity<IndividualDTO> create(@RequestPart(name = "individual") String individual,
			@RequestPart(name = "profile_image", required = false) MultipartFile imageFile)
			throws JsonMappingException, JsonProcessingException {
		IndividualDTO dto = objectMapper.readValue(individual, IndividualDTO.class);
		IndividualDTO saved = individualService.saveIndividual(dto);
		if (imageFile != null && !imageFile.isEmpty()) {
			try {
				String imageUrl = profileImageService.uploadImage(imageFile, String.valueOf(saved.getId()),
						"dromo/records/individuals/profile_images", "individual_profile_pic_");
				saved.setProfileImageUrl(imageUrl);
				individualService.update(saved.getId(), saved);
				return ResponseEntity.status(HttpStatus.CREATED).body(saved);
			} catch (IOException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}

		} else {
			return ResponseEntity.status(HttpStatus.CREATED).body(saved);
		}
	}

	@DeleteMapping("individuals/{id}")
	public ResponseEntity<Void> deleteIndividualById(@PathVariable Integer id) {
		individualService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("individuals/{id}")
	public ResponseEntity<IndividualDTO> getById(@PathVariable Integer id) {
		IndividualDTO dto = individualService.getById(id);
		return ResponseEntity.ok(dto);
	}

	@PutMapping("individuals/{id}")
	public ResponseEntity<IndividualDTO> updateIndividual(@PathVariable Integer id, @RequestBody IndividualDTO dto) throws IOException {
		if (dto.getProfileImageUrl() == "REMOVE_IMAGE") {
			String publicId = "dromo/records/individuals/profile_images/individual_profile_pic_" + dto.getId();
			profileImageService.deleteImage(publicId);
		}
		IndividualDTO updated = individualService.update(id, dto);
		return ResponseEntity.ok(updated);
	}

	// Métodos para o cadastro de pessoas jurídicas
	@GetMapping("/companies")
	public List<CompanyDTO> listCompanies(@RequestParam(name = "companyName", required = false) String companyName,
			@RequestParam(required = false) String cnpj) {
		return companyService.listCompanies(companyName, cnpj);
	}

	@PostMapping("/companies")
	public ResponseEntity<CompanyDTO> create(@RequestBody CompanyDTO dto) {
		CompanyDTO saved = companyService.saveCompany(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

	@DeleteMapping("companies/{id}")
	public ResponseEntity<Void> deleteCompanyById(@PathVariable Integer id) {
		companyService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("companies/{id}")
	public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Integer id) {
		CompanyDTO dto = companyService.getById(id);
		return ResponseEntity.ok(dto);
	}

	@PutMapping("companies/{id}")
	public ResponseEntity<CompanyDTO> updateCompany(@PathVariable Integer id, @RequestBody CompanyDTO dto) {
		CompanyDTO updated = companyService.update(id, dto);
		return ResponseEntity.ok(updated);
	}
}
