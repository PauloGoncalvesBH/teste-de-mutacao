---
title: "Teste de mutação 👽: O que é e como fica a cobertura de código?"
published: true
description: "Quem testa os testes? Como podemos garantir a eficiência dos testes? Conheça a resposta para essas perguntas"
tags: testes, ptbr, javascript
canonical_url:
cover_image:
series:
---

## Sumário
- [Who tests the tests?](#who-tests-the-tests)
- [Porque cobertura de código não é confiável](#porque-cobertura-de-código-não-é-confiável)
- [Testes de mutação](#testes-de-mutação)
  - [Detalhe da execução](#detalhe-da-execução)
  - [RIP Cobertura de código?](#rip-cobertura-de-código)
  - [Desvantagem](#desvantagem)
    - [Adoção em grandes projetos - Case Google](#adoção-em-grandes-projetos---case-google)
- [Verificando na prática](#verificando-na-prática)
  - [Cobertura de código](#cobertura-de-código)
  - [Teste de mutação](#teste-de-mutação)
- [Fontes](#fontes)

---

<h2 align="center">Who tests the tests?</h2>

Quando pensamos em validar a eficiência dos testes implementados, normalmente o que vem à mente é a métrica de cobertura de código. Porém, será que ela realmente é a melhor prática para garantir que os testes estão realmente testando os cenários possíveis?

> Cobertura de código é uma métrica que valida o quanto do código foi coberto pelos testes.
> Ou seja, verifica quais linhas do código foram executadas ao rodar os testes e retorna o percentual de cobertura.
>
> _Leia esse [conteúdo (en)](https://en.wikipedia.org/wiki/Code_coverage) e [esse (pt-br)](https://medium.com/liferay-engineering-brazil/um-pouco-sobre-cobertura-de-c%C3%B3digo-e-cobertura-de-testes-4fd062e91007) para saber mais._

Utilizando apenas a métrica de quantidade de cobertura de código não conseguimos garantir que todos os cenários foram cobertos, apenas... quais linhas foram executadas 😮.

Pense um pouco sobre isso. Alguma vez já viu um teste sem asserção apenas para aumentar a cobertura de código? Tenho certeza que já soube de uma situação parecida.

Claro que nessa situação, para evitarmos engraçadinhos, basta colocarmos alguma biblioteca que valida que todos os testes possuem asserção e que o percentual de cobertura de código está acima de algum número mágico, como 80%.

O problema é que, como dito, a cobertura de código não valida a eficiência dos testes, e vamos ver abaixo o porquê.

---

<h2 align="center">Porque cobertura de código não é confiável</h2>

Abaixo temos um pequeno método que possui apenas 1 teste validando o seu comportamento.

> _**Disclaimer**_
> É perceptível que esse método possui mais de 1 cenário, porém precisamos de exemplo prático e simples para comparar _cobertura de código_ e _teste de mutação_.

```js
// ./exemplo/cnh.js
const podeTirarCarteiraDeMotorista = idade => {
  return idade >= 18
}

// ./exemplo/cnh.spec.js
it('Menor de 18 anos', () => {
  expect(podeTirarCarteiraDeMotorista(17)).to.be.false
})
```

Se verificarmos a cobertura de código do arquivo `cnh.js`, será apresentado que ele foi 100% coberto (aqui o gestor comemora), porém sabemos, por ser um teste simples, que a validação não está eficiente e que poderíamos validar outros cenários, como:
1. Deve retornar `true` se idade for igual a `18`
1. Deve retornar `true` se idade for igual a `19`

#### Cobertura de código de `cnh.js`:

![](https://raw.githubusercontent.com/PauloGoncalvesBH/teste-de-mutacao/trunk/images/code_coverage.png)

E é baseado nessa brecha da métrica de linhas executadas é que o uso do teste de mutação faz sentido.

> "...100% code coverage score only means that all lines were exercised at least once, but it says nothing about tests accuracy or use-cases completeness, and that’s why mutation testing matters"
> _Baeldung, 2018_

---

<h2 align="center">Testes de mutação</h2>

> Imagine um sanduíche coberto com uma pasta. Cobertura de código vai te dizer que o pão está 80% coberto com pasta. O teste de mutação, por outro lado, vai dizer que a pasta é _chocolate_ e não... bem... qualquer outra coisa.

O conceito de teste de mutação é bem simples:

Bugs, ou **mutantes**, são inseridos no código e os testes são executados em cima do código mutado. Se pelo menos 1 dos testes quebrar ou tiver timeout, o mutante é considerado morto 💀 e aquele trecho de código alterado é considerado como coberto pelos testes.

Ainda não está claro? Então vamos lá.

Abaixo está o nosso código original:

```js
// ./exemplo/cnh.js
const podeTirarCarteiraDeMotorista = idade => {
  return idade >= 18
}
```

O teste de mutação irá detectar todos os pontos que podem ser alterados no código e atuar em cima deles. No nosso exemplo serão feitas as seguintes alterações (serão 5 mutantes no total):
- A expressão condicional `idade >= 18` será alterada para `true` e `false`;
- O operador de idade `>=` será alterado para `<` e `>`;
- O bloco `=> { return idade >= 18 }` será alterado para `=> {}`.

> Quer entender tudo que será mutado no seu código e para o que será mutado? Leia '[Mutantes suportados pelo stryker (en)](https://github.com/stryker-mutator/stryker-handbook/blob/master/mutator-types.md)'.

A cada alteração feita, todos os testes criados são executados. Se algum teste quebrar, significa que aquela alteração (**mutação**) está coberta, então ela foi assassinada.

É um pouco confuso a questão de que para que aquela mutação seja considerada como morta (sucesso) é preciso que algum teste quebre (afinal, teste quebrar é ruim). Porém temos que entender que o nosso teste foi feito para o cenário ABC e se o cenário foi alterado para ABZ, o nosso teste tem que detectar essa mudança e falhar.

> O teste de mutação é nada mais e nada menos do que automatizar todo o processo de "sabotar o código e executar testes para ver se eles falham"

Se executarmos teste de mutação utilizando o teste e código apresentados anteriormente, o resultado seria esse:

![](https://raw.githubusercontent.com/PauloGoncalvesBH/teste-de-mutacao/trunk/images/mutation_test.png)

Tínhamos 100% de cobertura de código, porém o teste de mutação revelou que 2 mutações criadas não resultaram em quebra do nosso teste (sobreviventes), demonstrando que há brecha no nosso teste.

Para que todos os 5 mutantes não sobrevivam, precisamos criar um novo teste que cubra essa brecha, como:

```js
it('Maior de 18 anos', () => {
  expect(podeTirarCarteiraDeMotorista(18)).to.be.true
})
```

<h3 align="center">Detalhe da execução</h3>

Quando executamos o teste de mutação são feitas as seguintes etapas:
1. Analisa quais arquivos serão mutados;
    - No nosso caso foi `cnh.js`.
1. Executa todos os testes e espera que todos passem;
    - O teste é abortado se algum teste falhar. Para validar se algum teste quebrou com mutação é imprescindível que todos os testes sejam executados com sucesso com o código original.
1. Gera mutante para todos os trechos de código;
    - No nosso caso foram 5 mutantes criados.
1. Executa todos os testes para cada mutante gerado;
1. A pontuação final do teste é de acordo com a quantidade de mutantes que foram mortos ou resultaram em timeout em comparação com a quantidade total de mutantes.


<h3 align="center">RIP Cobertura de código?</h3>

Embora teste de mutação seja uma métrica muito interessante para entendermos a saúde dos testes criados, é importante salientar que ele **NÃO** substitui a cobertura de código, atuando apenas como complemento e possui algumas desvantagens que impedem fortemente a sua adoção em larga escala.

Portanto, cobertura de código continuará sendo uma métrica bastante usada e não é uma ferramenta antagonista ao teste de mutação

<h3 align="center">Desvantagem</h3>

Como o teste de mutação analisa todos os possíveis pontos que podem ser mutados no código e executa todos os testes para cada mutação, ele possui uma execução que onera bastante a máquina e possui um alto tempo de execução.

Devido à necessidade de ter um alto poder computacional, o uso do teste de mutação chega a ser proibitivo em projetos médios e grandes.

Um exemplo dessa limitação é o projeto [ServeRest](https://github.com/PauloGoncalvesBH/serverest). Todos os 86 testes existentes são executados em aproximadamente 550 milissegundos, enquanto os testes de mutação atuam em cima de 22 arquivos, resultando em 599 mutantes e com execução média de 19 minutos.

> No nosso código de exemplo a cobertura de código é executada em 9 ms enquanto o teste de mutação é executado em 3 segundos.

<h4 align="center">Adoção em grandes projetos - Case Google</h4>

Essa limitação de poder computacional não impediu a adoção do teste de mutação pela Google nos seus códigos ([que possuía 2 bilhões de linhas em 2018](https://dl.acm.org/doi/pdf/10.1145/2854146)), porém ela teve que utilizar de algumas estratégias de criação da mutação.

> Traditional mutation analysis is computationally prohibitive which hinders its adoption as an industry standard. In order to alleviate the computational issues, we present a diff-based probabilistic approach to mutation analysis that drastically reduces the number of mutants by omitting lines of code without statement coverage and lines that are determined to be uninteresting - we dub these arid lines.
> _State of Mutation Testing at Google_

No bom português:

> A análise de mutação tradicional é computacionalmente proibitiva, o que impede sua adoção como um padrão da indústria. A fim de aliviar os problemas computacionais, apresentamos uma abordagem probabilística baseada em diff para análise de mutação que reduz drasticamente o número de mutantes, omitindo linhas de código sem cobertura de instrução e linhas que são determinadas como desinteressantes - dublamos essas linhas áridas.
> _Estado do teste de mutação na Google_

Para entender a fundo a estratégia adotada por essa companhia, leia a publicação de pesquisa sobre o [estado do teste de mutação na Google](https://research.google/pubs/pub46584/), feita para a ocasião da _40ª Conferência Internacional de Engenharia de Software_.

---

<h2 align="center">Verificando na prática</h2>

Para executar a cobertura de código e teste de mutação citados nesse texto, primeiramente clone [esse repositório](https://github.com/PauloGoncalvesBH/teste-de-mutacao), executando:

```sh
git clone https://github.com/PauloGoncalvesBH/teste-de-mutacao.git
```

Instale as dependências com o comando `npm install`.

O teste foi implementado utilizando [mocha](https://www.npmjs.com/package/mocha).

<h3 align="center">Cobertura de código</h3>

A cobertura de código foi gerada utilizando a biblioteca [nyc](https://www.npmjs.com/package/nyc). Para rodar os testes, execute:

```sh
npm run test:coverage
``` 

<h3 align="center">Teste de mutação</h3>

O teste de mutação é executado com a biblioteca [stryker](http://stryker-mutator.io), especificamente a implementação para JS. Para rodar o teste de mutação execute:

```sh
npm run test:mutation
```

#### Desafio

O que acha de aumentar o score do teste de mutação de _60%_ para _100%_?

Crie novo teste no arquivo [cnh.spec.js](/exemplo/cnh.spec.js) que mate 👿 as 2 mutações que estão sobrevivendo e mantenha a cobertura de código em _100%_.

---

<h2 align="center">Fontes</h2>

Os seguintes materiais forneceram conteúdo e base para a criação desse texto:

- [State of Mutation Testing at Google](https://research.google/pubs/pub46584/)
- [Mutation Testing - Wikipedia](https://en.wikipedia.org/wiki/Mutation_testing)
- [Apresentação 'An intro to mutation testing - or why coverage sucks'](https://speakerdeck.com/pedrorijo91/mutation-testing-pixels-camp-2019)
- [Mutantes suportados pelo Stryker](https://github.com/stryker-mutator/stryker-handbook/blob/master/mutator-types.md)
- [Mutation Testing: What It Is and How It Makes Code Coverage Matter](https://dev.to/carlosschults/mutation-testing-what-it-is-and-how-it-makes-code-coverage-matter-ijp)
- [Code coverage is useless](https://dev.to/johnpreese/code-coverage-is-useless-1h3h)
- [Why code coverage is not a reliable metric](https://dev.to/conectionist/why-code-coverage-is-not-a-reliable-metric-327l)
- [Mutation testing in 1000 characters](https://dev.to/schreiber_chris/mutation-testing-in-1000-characters-193a)
- [Why Google Stores Billions of Lines of Code in a Single Repository](https://dl.acm.org/doi/pdf/10.1145/2854146)

---

##### _Esse post está sendo versionado e hospedado no [Github](https://github.com/PauloGoncalvesBH/teste-de-mutacao)_
