package com.dromo.sistema_dromo.controller.records;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import com.dromo.sistema_dromo.dto.records.CompanyDTO;
import com.dromo.sistema_dromo.dto.records.CompanySummaryDTO;
import com.dromo.sistema_dromo.dto.records.IndividualDTO;
import com.dromo.sistema_dromo.dto.records.IndividualSummaryDTO;
import com.dromo.sistema_dromo.service.records.CompanyService;
import com.dromo.sistema_dromo.service.records.IndividualService;
import com.dromo.sistema_dromo.service.utils.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

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
	public Page<IndividualSummaryDTO> listIndividuals(
			// @RequestParam define um parâmetro para a requisição
			// 'required = false' define que esse parâmetro não é obrigatório
			@RequestParam(name = "name", required = false) String fullName, @RequestParam(required = false) String cpf,
			@RequestParam(required = false) String email, Pageable pageable) {
		return individualService.listIndividuals(fullName, cpf, email, pageable);
	}
	
	// Requisição de cadastro de Individual
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, value = "/individuals")
	public ResponseEntity<IndividualDTO> create(@RequestBody IndividualDTO dto) {
		IndividualDTO saved = individualService.saveIndividual(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

	/*
	 * Requisição de cadastro para também submeter arquivo de imagem. As imagens são
	 * armazenadas no Cloudinary, e para integrar, baixamos a respectiva biblioteca
	 * pelo maven. Como o corpo da requisição também terá um arquivo, é necessário
	 * configurar o recebimento com multipart/formData. Isso é feito como o
	 * parâmetro "consumes" da anotação de post
	 */
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = "/individuals")
	public ResponseEntity<IndividualDTO> createIndividualWithImage(@RequestPart(name = "individual") String individual,
			@RequestPart(name = "profile_image", required = true) MultipartFile imageFile) {
		try {
			IndividualDTO dto = objectMapper.readValue(individual, IndividualDTO.class);
			IndividualDTO saved = individualService.saveIndividual(dto);
			String imageUrl = profileImageService.uploadImage(imageFile, String.valueOf(saved.getId()),
					"dromo/records/individuals/profile_images", "individual_profile_pic_");
			saved.setProfileImageUrl(imageUrl);
			individualService.update(saved.getId(), saved);
			return ResponseEntity.status(HttpStatus.CREATED).body(saved);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("individuals/{id}")
	public ResponseEntity<Void> deleteIndividualById(@PathVariable Integer id) throws IOException {
		IndividualDTO dto = individualService.getById(id);
		String hasImage = dto.getProfileImageUrl();
		if (hasImage != null && !hasImage.isEmpty()) {
			String publicId = "dromo/records/individuals/profile_images/individual_profile_pic_" + dto.getId();
			profileImageService.deleteImage(publicId);
		}
		;
		individualService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("individuals/{id}")
	public ResponseEntity<IndividualDTO> getById(@PathVariable Integer id) {
		IndividualDTO dto = individualService.getById(id);
		return ResponseEntity.ok(dto);
	}

	@PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = "individuals/{id}")
	public ResponseEntity<IndividualDTO> updateIndividualWithFile(@PathVariable Integer id,
			@RequestPart(name = "individual", required = true) String individual,
			@RequestPart(name = "profile_image") MultipartFile imageFile) {
		try {
			@Valid
			IndividualDTO dto = objectMapper.readValue(individual, IndividualDTO.class);
			String imageUrl = profileImageService.uploadImage(imageFile, String.valueOf(id),
					"dromo/records/individuals/profile_images", "individual_profile_pic_");
			dto.setProfileImageUrl(imageUrl);
			individualService.update(id, dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(dto);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping(value = "individuals/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<IndividualDTO> updateIndividual(@PathVariable Integer id, @RequestBody @Valid IndividualDTO dto)
			throws IOException {
		String hasImage = dto.getProfileImageUrl();
		if (hasImage != null && hasImage.equals("REMOVE_IMAGE")) {
			String publicId = "dromo/records/individuals/profile_images/individual_profile_pic_" + id;
			profileImageService.deleteImage(publicId);
			dto.setProfileImageUrl(null);
		}
		IndividualDTO updated = individualService.update(id, dto);
		return ResponseEntity.ok(updated);
	}

	// Métodos para o cadastro de pessoas jurídicas
	@GetMapping("/companies")
	public Page<CompanySummaryDTO> listCompanies(
			@RequestParam(name = "companyName", required = false) String companyName,
			@RequestParam(required = false) String cnpj, Pageable pageable) {
		return companyService.listCompanies(companyName, cnpj, pageable);
	}

	@PostMapping("/companies")
	public ResponseEntity<CompanyDTO> create(@RequestBody CompanyDTO dto) {
		CompanyDTO saved = companyService.saveCompany(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

	/*
	 * Requisição de cadastro para também submeter arquivo de imagem. As imagens são
	 * armazenadas no Cloudinary, e para integrar, baixamos a respectiva biblioteca
	 * pelo maven. Como o corpo da requisição também terá um arquivo, é necessário
	 * configurar o recebimento com multipart/formData. Isso é feito como o
	 * parâmetro "consumes" da anotação de post
	 */
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = "/companies")
	public ResponseEntity<CompanyDTO> createCompanyWithImage(@RequestPart(name = "company") String company,
			@RequestPart(name = "profile_image", required = true) MultipartFile imageFile) {
		try {
			CompanyDTO dto = objectMapper.readValue(company, CompanyDTO.class);
			CompanyDTO saved = companyService.saveCompany(dto);
			String imageUrl = profileImageService.uploadImage(imageFile, String.valueOf(saved.getId()),
					"dromo/records/companies/profile_images", "company_profile_pic_");
			saved.setProfileImageUrl(imageUrl);
			companyService.update(saved.getId(), saved);
			return ResponseEntity.status(HttpStatus.CREATED).body(saved);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("companies/{id}")
	public ResponseEntity<Void> deleteCompanyById(@PathVariable Integer id) throws IOException {
		CompanyDTO dto = companyService.getById(id);
		String hasImage = dto.getProfileImageUrl();
		if (hasImage != null && !hasImage.isEmpty()) {
			String publicId = "dromo/records/companies/profile_images/company_profile_pic_" + id;
			profileImageService.deleteImage(publicId);
			dto.setProfileImageUrl(null);
		}
		companyService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("companies/{id}")
	public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Integer id) {
		CompanyDTO dto = companyService.getById(id);
		return ResponseEntity.ok(dto);
	}

	@PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = "companies/{id}")
	public ResponseEntity<CompanyDTO> updateCompanyWithFile(@PathVariable Integer id,
			@RequestPart(name = "company", required = true) String company,
			@RequestPart(name = "profile_image") MultipartFile imageFile) {
		try {
			CompanyDTO dto = objectMapper.readValue(company, CompanyDTO.class);
			String imageUrl = profileImageService.uploadImage(imageFile, String.valueOf(id),
					"dromo/records/companies/profile_images", "company_profile_pic_");
			dto.setProfileImageUrl(imageUrl);
			companyService.update(id, dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(dto);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("companies/{id}")
	public ResponseEntity<CompanyDTO> updateCompany(@PathVariable Integer id, @RequestBody CompanyDTO dto)
			throws IOException {
		String hasImage = dto.getProfileImageUrl();
		if (hasImage != null && hasImage.equals("REMOVE_IMAGE")) {
			String publicId = "dromo/records/companies/profile_images/company_profile_pic_" + id;
			profileImageService.deleteImage(publicId);
			dto.setProfileImageUrl(null);
		}
		CompanyDTO updated = companyService.update(id, dto);
		return ResponseEntity.ok(updated);
	}
}
