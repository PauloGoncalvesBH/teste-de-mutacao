---
title: "Título do post - obrigatório"
published: false
description:
tags: tag1, tag2, ptbr, opcional
canonical_url:
cover_image:
series:
---

<!--- Acima está o cabeçalho, com as informações do seu post, edite-as de acordo com sua necessidade. Para saber mais: https://dev.to/p/editor_guide
Apague tudo que está abaixo dessa linha e escreva seu post --->

<div align="center">
  <img alt="logo do DEV e do Github juntos" src="https://user-images.githubusercontent.com/29241659/69934759-aa785080-14b1-11ea-9cca-4ecb928b5bb9.png" width="470px">
</div>

# Gerencie seus post do dev.to através do Github

## Sumário
- [1️⃣ Template](#1️⃣-Template)
- [2️⃣ Ajuste o package.json](#2️⃣-Ajuste-o-package.json)
- [3️⃣ Dev-to-git token](#3️⃣-Dev-to-git-token)
- [4️⃣ Crie um post vazio](#4️⃣-Crie-um-post-vazio)
- [5️⃣ ID do post](#5️⃣-ID-do-post)
- [6️⃣ Escreva o post](#6️⃣-Escreva-o-post)
- [❗️ Informações importantes](#-informações-importantes)
- [❓ Preciso de ajuda](#-Preciso-de-ajuda)

---
## 1️⃣ Template

Clique no botão `Use this template` no topo desse repositório para que seja gerado um repositório na sua conta com os mesmos arquivos desse modelo.

## 2️⃣ Ajuste o package.json

É preciso ajustar os valores abaixo para que a biblioteca [dev-to-git](https://www.npmjs.com/package/dev-to-git) consiga enviar as imagens do diretório `images/` corretamente.

Vá no arquivo [package.json](./package.json) e altere o campo `url` informando os seus dados.
```json
  "repository": {
    "type": "git",
    "url": "https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git"
  }
```

## 3️⃣ Dev-to-git token

É preciso passar um token para o Github para que o _dev-to-git_ tenha acesso à sua conta, atualizando os seus posts.

Acesse a [página de configuração da conta do dev.to](https://dev.to/settings/account) para gerar um token a ser utilizado.

Informe uma descrição para o token, clique em `Generate APi Key` e copie o token gerado.

<div align="center">
  <img alt="Token" src="https://user-images.githubusercontent.com/29241659/70006793-283d6a00-154d-11ea-9112-1190a1271cb5.jpg" width="650px">
</div>

Em seguida, no seu repositório do Github, vá em `Settings > Secrets` e clique em `Add a new secret`. Cadastre um segredo com o nome `DEV_TO_GIT_TOKEN` e inserindo no valor o token copiado anteriormente.

<div align="center">
  <img alt="Secrets" src="https://user-images.githubusercontent.com/29241659/70007268-8e76bc80-154e-11ea-983e-72e76cde737c.jpg" width="650px">
</div>

**NUNCA compartilhe o token gerado**

## 4️⃣ Crie um post vazio

Essa etapa é necessária pois _dev-to-git_ não cria um novo post, apenas atualiza post existente.

Vá no dev.to, clique em `WRITE A POST`, preencha o título e o conteúdo do post com qualquer texto e clique em `SAVE DRAFT` para salvar como rascunho.

## 5️⃣ ID do post

Agora é preciso informar o ID dessa página para que seja possível atualizar a mesma.

Com o post aberto, envie o comando `F12` para abrir a tela de desenvolvedor. Vá na aba `Console` e envie o comando abaixo para que capture o ID do post.
```js
$('div[data-article-id]').getAttribute('data-article-id')
```

![print do console do navegador](https://user-images.githubusercontent.com/29241659/70012164-638e6780-1552-11ea-8b49-9676491cb587.jpg)

Com o ID copiado, vá no arquivo [dev-to-git.json](./dev-to-git.json) e altere o valor do campo `id` com o do seu post.

```json
[
  {
    "id": 214298,
    "relativePathToArticle": "./README.md"
  }
]
```

## 6️⃣ Escreva o post

Pronto 🎉, você já possui tudo configurado para escrever o seu post. Toda vez que atualizar o `README` o post será atualizado no dev.to.

---
## ❗️ Informações importantes

- O `README.md` é composto de 2 seções:
    1. **Cabeçalho**, com informações sobre o seu post, como título, se deve ser publicado ou não e tags. _Para saber mais, veja a seção **Front Matter** do [Guia do editor](https://dev.to/p/editor_guide)._
    2. **Post em si**, que deve ser escrito abaixo do cabeçalho.

- Caso vá colocar imagem que não seja através de URL, armazene ela no diretório [images](./images) e referencie no seu post.

- O build de atualização do post é executado apenas se o commit for feito na branch `master`. _Para saber mais, veja o arquivo de [configuração do build](./.github/workflows/blank.yml)._

---

## ❓ Preciso de ajuda

Está com algum problema e precisa de ajuda? Abra uma [issue aqui](https://github.com/PauloGoncalvesBH/gerencie-seus-posts-do-dev.to/issues) detalhando a sua situação e irei te ajudar.
