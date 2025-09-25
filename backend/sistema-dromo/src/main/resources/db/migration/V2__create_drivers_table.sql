-- ============================================
-- Migration V2__create_drivers_table.sql
-- Objetivo:
--   Criar a tabela 'drivers' para armazenar
--   informações de motoristas no sistema.
-- Contexto:
--   Atualmente, apenas indivíduos podem ser
--   motoristas, mas vou deixar essas classificações 
--   de cadastro padrão para companies também	 
-- ============================================

CREATE TABLE records.drivers (
    -- id: chave primária da tabela.
    -- BIGSERIAL gera automaticamente valores sequenciais (1, 2, 3...).
    -- É do tipo BIGINT (64 bits), útil se o volume de registros for alto.
    id BIGSERIAL PRIMARY KEY,

    -- person_type: define se o motorista está associado a um 'individual' ou 'company'.
    -- VARCHAR(10) é suficiente para armazenar valores como 'individual' ou 'company'.
    -- O CHECK constraint garante que só valores válidos sejam aceitos.
    person_type VARCHAR(10) NOT NULL CHECK (person_type IN ('individual','company')),

    -- individual_id: chave estrangeira opcional que aponta para a tabela 'individuals'.
    -- Só deve ser preenchida quando person_type = 'individual'.
    individual_id BIGINT NULL REFERENCES records.individuals(id),

    -- company_id: chave estrangeira opcional que aponta para a tabela 'companies'.
    -- Só deve ser preenchida quando person_type = 'company'.
    company_id BIGINT NULL REFERENCES records.companies(id),

    -- license_number: número da CNH ou documento equivalente do motorista.
    -- VARCHAR(50) dá flexibilidade para armazenar diferentes formatos de licenças.
    license_number VARCHAR(50) NOT NULL,
	
	-- license_type: tipo de habilitação
	license_type VARCHAR(2) NOT NULL CHECK (license_type IN ('A', 'AB', 'AC', 'AD', 'AE', 'B', 'C', 'D', 'E')),
	
		-- ============================================
	-- Notas sobre a modelagem:
	-- - Esse design é considerado "FK polimórfica":
	--   a mesma tabela pode referenciar entidades diferentes (individual ou company).
	-- - A integridade "se só pode ser individual OU company"
	--   poderia ser reforçada via CHECK constraint, mas aqui será
	--   garantida pela lógica do backend/frontend.
	-- - Esse modelo permite evolução futura: novos tipos de "person"
	--   podem ser adicionados sem grandes mudanças estruturais.
	-- ============================================

	-- ============================================
	--  CONSTRAINT CHECK
	--  Vamos criar uma constraint para verificar
	--  a qual tipo de cadastro (individual ou company)
	--  um registro drivers pertence. Essa validação
	--  irá obrigar que o registro seja vinculado somente
	--  à um tipo de cadastro
	-- ============================================

	--  CHECK é a constraint que só grava/atualiza o registro caso a condicional entre
	--  os parênteses for true
	CHECK (
		--  Se person_type = 'individual': a coluna individual_id precisa ter um valor (IS NOT NULL)
		--  e a coluna company_id deverá ser nula (IS NULL)
		--  Se person_type = 'company': a coluna company_id precisa ter valor (IS NOT NULL)
		--  e a coluna individual_id deverá ser nula (IS NULL)
		(person_type = 'individual' AND individual_id IS NOT NULL AND company_id IS NULL)
	 OR (person_type = 'company' AND company_id IS NOT NULL AND individual_id IS NULL)
	)
);
