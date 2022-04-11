# Endereço e links de consulta do IBGE a partir de um CEP

O objetivo desse projeto foi praticar requisições em API e manipular as respostas no formato JSON.

## Funcionalidades
- Pesquisa por um CEP informado e retorna, além do endereço, links do IBGE para mais informações sobre a cidade e o estado da localidade encontrada. <br>
A API de Brasil API (https://brasilapi.com.br/docs#tag/CEP)  e a API do IBGE (https://servicodados.ibge.gov.br/api/docs/localidades) foram consumidas utilizando o cliente HTTP Axios (https://axios-http.com/). <br>
As URLs dos links da cidade e do estado foram geradas observando sua estruturação ao visitar o site do IBGE como usuário comum.
- Apresenta mensagem de erro para o caso de um CEP inválido ou inexistente ser fornecido e para o caso de insucesso na conexão com uma das APIs.

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript
- Node.js / Express.js / Handlebars.js
- Axios

## Como acessar
- **Para pesquisar um CEP** <br>
  https://sm-cep-ibge.herokuapp.com/
- **Para instalar e executar o projeto** <br>
  1. Fazer clone deste repositório. <br>
     `https://github.com/simeaomessias/cep-ibge.git`
  2. Certificar que o npm está instalado. <br>
     O npm pode ser obtido instalando o [Node](https://nodejs.org/en/).
  3. Executar o comando *npm start*. <br>
     Acesse http://localhost:8081 para visualizar no navegador.

## Sugestões
Entre em contato
- https://www.linkedin.com/in/simeaomessias/
- https://twitter.com/simeaomessias
- simeaoclaudiomessiasneto@gmail.com

## Autor
https://github.com/simeaomessias
