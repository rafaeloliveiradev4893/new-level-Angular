# New Level

O **New Level** é uma aplicação web gamificada para organizar tarefas, acompanhar eventos e visualizar o progresso do usuário. A interface reúne essas áreas em um painel com navegação lateral; recursos como guilda, NPCs, conquistas, loja e amigos estão disponíveis como páginas em desenvolvimento.

## Funcionalidades

- Visão geral do progresso e das atividades.
- Gerenciamento de tarefas.
- Consulta de eventos.
- Estatísticas e informações do usuário.
- Autenticação integrada ao Auth0.
- Interface responsiva com navegação lateral.

## Tecnologias

- Angular 21 e TypeScript
- SCSS
- Auth0 para autenticação
- Ng Icons com ícones Lucide
- Vitest para testes unitários

## Pré-requisitos

- Node.js compatível com Angular 21.
- npm.

## Como executar

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm start
```

Abra [http://localhost:4200](http://localhost:4200). A aplicação recarrega automaticamente quando os arquivos são alterados.

O endereço da API é definido em `src/environments/environment.ts`. Para usar uma API local, configure a URL correspondente nesse arquivo. A autenticação depende da configuração do Auth0 em `src/app/app.config.ts`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a build de produção em `dist/`. |
| `npm run watch` | Gera a build de desenvolvimento e observa alterações. |
| `npm test` | Executa os testes unitários. |

## Estrutura do projeto

```text
src/app/
├── components/   # Componentes reutilizáveis da aplicação
├── core/         # Layout, navegação e autenticação
├── pages/        # Páginas acessíveis pelas rotas
├── services/     # Integrações com a API e serviços
├── model/        # Modelos de dados
└── utils/        # Funções utilitárias
```

## Rotas principais

| Caminho | Página |
| --- | --- |
| `/` | Visão Geral |
| `/Estatisticas` | Estatísticas |
| `/Tarefas` | Tarefas |
| `/Eventos` | Eventos |

As páginas de Guilda, NPCs, Conquistas, Loja e Amigos estão representadas por telas de conteúdo em desenvolvimento.
