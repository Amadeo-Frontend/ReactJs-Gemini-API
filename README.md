# Google AI Gemini Integration 🤖🌐

Este projeto é uma aplicação React que integra a API Gemini para gerar texto com base em entradas de texto e imagem. Ele permite ao usuário enviar texto e imagens para a API Gemini e exibir a resposta gerada. A aplicação é construída com React e utiliza a biblioteca `react-spinners` para indicar o estado de carregamento das solicitações à API.

## Funcionalidades 🎉

- **Geração de Texto**: O usuário pode enviar texto e imagens para a API Gemini e receber uma resposta gerada. 📝🖼️
- **Carregamento**: Um spinner é exibido enquanto a resposta está sendo gerada. 🔄
- **Exibição de Resposta**: A resposta da API é exibida na tela após a geração. 📜
- **Reset de Estado**: O usuário pode resetar o estado da aplicação, removendo a resposta e recarregando a página. 🔄🔁

## Como Usar 🚀

1. Clone o repositório. 📂
2. Instale as dependências com `npm install`. 📦
3. Configure a chave da API Gemini no arquivo `.env` como `VITE_GEMINI_API_KEY=your_api_key`. 🔑
4. Inicie o servidor de desenvolvimento com `npm run dev`. 🚀

## Estrutura do Projeto 🏗️

- `App.jsx`: Componente principal que lida com a lógica de geração de texto e exibição da resposta.
- `fileToGenerativePart`: Função auxiliar para converter arquivos de imagem em partes gerativas para a API.

## Dependências 📦

- `@google/generative-ai`: SDK da API Gemini. 🧩
- `react-spinners`: Para exibir um spinner durante o carregamento. 🔄
- `react`: Biblioteca React. 📚

## Contribuições🤝

Contribuições são bem-vindas Se você encontrar um bug, tiver uma sugestão de melhoria ou quiser adicionar uma nova funcionalidade, sinta-se à vontade para criar um issue ou pull request. Siga estas etapas:

1. Faça um fork do repositório.
2. Crie um novo branch com sua contribuição (`git checkout -b feature/minha-contribuicao`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona minha contribuição'`).
4. Faça push para o branch (`git push origin feature/minha-contribuicao`).
5. Abra um Pull Request.

## Suporte ⚙

Se você encontrar algum problema ou tiver dúvidas sobre o uso deste projeto, por favor, abra um issue para discussão.

Desenvolvido com ❤️ por Amadeo Bon para contribuir com a comunidade de desenvolvimento ReactJs!