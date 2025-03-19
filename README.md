# Sistema Dromo

## Descrição
Dromo inicialmente será um projeto fullstack para aperfeiçoar meu conhecimento em programação. A ideia, é criar uma solução simples que compreenda todo o fluxo básico do desenvolvimento de um sistema utilizando as principais ferramentas do mercado, que tornarei fixa em meus estudos.

## Tecnologias Utilizadas
- **Frontend:** Java Script com React, CSS com Bootstrap e HTML 
-**Backend:** Java com Spring Boot
-**Banco de Dados:** PostgreSQL
-**Infraestrutura:** Nginx, GitHub, Cloudflare Tunnel

## Estrutura do Projeto
sistema-dromo/
│   .gitignore
│   project-structure
│   README.md
│   
├───backend
│   │   .gitkeep
│   │   
│   └───sistema-dromo
│       │   .classpath
│       │   .gitattributes
│       │   .gitignore
│       │   .project
│       │   mvnw
│       │   mvnw.cmd
│       │   pom.xml
│       │   
│       ├───.mvn
│       │   └───wrapper
│       │           maven-wrapper.properties
│       │           
│       ├───.settings
│       │       org.eclipse.core.resources.prefs
│       │       org.eclipse.jdt.core.prefs
│       │       org.eclipse.m2e.core.prefs
│       │       
│       ├───src
│       │   └───main
│       │       ├───java
│       │       │   └───com
│       │       │       └───dromo
│       │       │           └───sistema_dromo
│       │       │               │   SistemaDromoApplication.java
│       │       │               │   
│       │       │               ├───config
│       │       │               │       Config.java
│       │       │               │       
│       │       │               ├───controller
│       │       │               │       UserController.java
│       │       │               │       
│       │       │               ├───dto
│       │       │               │       Dto.java
│       │       │               │       
│       │       │               ├───model
│       │       │               │       User.java
│       │       │               │       
│       │       │               ├───repository
│       │       │               │       UserRepository.java
│       │       │               │       
│       │       │               └───service
│       │       │                       UserService.java
│       │       │                       
│       │       └───resources
│       │               application.properties
│       │               
│       └───target
│           │   sistema-dromo-0.0.1-SNAPSHOT.jar
│           │   sistema-dromo-0.0.1-SNAPSHOT.jar.original
│           │   
│           ├───classes
│           │   │   application.properties
│           │   │   
│           │   └───com
│           │       └───dromo
│           │           └───sistema_dromo
│           │               │   SistemaDromoApplication.class
│           │               │   
│           │               ├───config
│           │               │       Config.class
│           │               │       
│           │               ├───controller
│           │               │       UserController.class
│           │               │       
│           │               ├───dto
│           │               │       Dto.class
│           │               │       
│           │               ├───model
│           │               │       User.class
│           │               │       
│           │               ├───repository
│           │               │       UserRepository.class
│           │               │       
│           │               └───service
│           │                       UserService.class
│           │                       
│           ├───generated-sources
│           │   └───annotations
│           ├───maven-archiver
│           │       pom.properties
│           │       
│           └───maven-status
│               └───maven-compiler-plugin
│                   └───compile
│                       └───default-compile
│                               createdFiles.lst
│                               inputFiles.lst
│                               
├───docs
│       .gitkeep
│       
├───frontend
│       .gitkeep
│       
└───modus_operandi
    │   ambiente-de-desenvolvimento.txt
    │   arquitetura-geral-de-projeto.txt
    │   duvidas.txt
    │   fluxo-de-versionamento.txt
    │   plano-de-acao.txt
    │   
    └───procedimentos
            backend.txt
            versionamento.txt