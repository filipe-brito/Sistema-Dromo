package com.dromo.sistema_dromo.service;

import java.io.IOException; // 6. Importa IOException para tratamento de erros
import java.util.Map;       // 7. Importa Map

import org.springframework.stereotype.Service; // 4. Importa a anotação @Service
import org.springframework.web.multipart.MultipartFile; // 5. Importa MultipartFile para lidar com uploads

import com.cloudinary.Cloudinary; // 2. Importa a classe Cloudinary
import com.cloudinary.utils.ObjectUtils; // 3. Importa utilitário para mapas

@Service // 8. Anotação que marca a classe como um componente de serviço Spring
public class ImageService {

    private final Cloudinary cloudinary; // 9. Declaração do campo Cloudinary

    // 10. Construtor para Injeção de Dependência
    public ImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    // 11. Método principal para upload da imagem
    public String uploadImage(MultipartFile file, String individualId, String filePath, String publicId) throws IOException {
        try {
            // 12. Prepara os parâmetros para o upload no Cloudinary
            Map uploadParams = ObjectUtils.asMap(
                "folder", filePath, // A pasta no Cloudinary onde a imagem será salva
                "public_id", publicId + individualId, // ID único para a imagem (ex: user_123_profile_pic)
                "overwrite", true // Se já existir uma imagem com o mesmo public_id, ela será substituída
            );

            // 13. Realiza o upload da imagem para o Cloudinary
            // file.getBytes() converte o MultipartFile em um array de bytes
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);

            // 14. Extrai a URL segura da imagem do resultado do upload
            String imageUrl = (String) uploadResult.get("secure_url");
            return imageUrl;

        } catch (IOException e) {
            // 15. Trata erros de IO (leitura do arquivo, problemas de rede)
            throw new IOException("Falha ao ler o arquivo da imagem ou problema de rede.", e);
        } catch (Exception e) {
        	// AQUI ESTÁ A MUDANÇA: Logue a exceção original para ver mais detalhes!
            e.printStackTrace(); // Isso já ajuda, mas podemos ser mais explícitos
            // Se for uma exceção do Cloudinary, ela pode ter mensagens úteis
            System.err.println("Erro detalhado do Cloudinary: " + e.getMessage()); // Adicione esta linha
            // 16. Trata outros erros gerais do Cloudinary (autenticação, etc.)
            throw new RuntimeException("Falha ao fazer upload da imagem para o Cloudinary.", e);
        }
    }
    
    /**
     * Deleta uma imagem do Cloudinary usando o public_id.
     *
     * @param individualId O ID do indivíduo para construir o public_id.
     * @throws IOException Se a exclusão falhar devido a problemas de rede ou permissão.
     */
    public void deleteImage(String publicId) throws IOException {
        try {
            // Usa o método destroy() do uploader do Cloudinary para excluir a imagem.
            // O ObjectUtils.emptyMap() é usado para passar um mapa vazio de opções.
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            // Lança uma exceção se a exclusão falhar
            throw new IOException("Falha ao deletar a imagem do Cloudinary. Public ID: " + publicId, e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro inesperado ao tentar deletar a imagem.", e);
        }
    }
}
