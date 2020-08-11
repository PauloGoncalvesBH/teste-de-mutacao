---
title: "Testes de mutação em JS"
published: false
description:
tags: testes, ptbr, javascript
canonical_url:
cover_image:
series:
---

<!--- Acima está o cabeçalho, com as informações do seu post, edite-as de acordo com sua necessidade. Para saber mais: https://dev.to/p/editor_guide
Apague tudo que está abaixo dessa linha e escreva seu post --->

O que deve ser abordado:

- qual problema o teste de mutação veio resolver
    - complementa code coverage > "Good tests should fail when your service rules are changed."
- funcionamento dos testes de mutação
- uso do stryker-mutator
    - configuração
    - tempo de execução no serverest

code coverage verifica quantas linhas estão cobertas pelos testes, enquanto mutation altera o código para verificar quantos testes detectam a alteração.
code coverage é uma medida da porcentagem de linhas cobertas, enquanto mutation test 

desvantagem:
- exige certo poder computacional. Para projetos médios e grandes, o seu uso chega a ser proibitivo
    - testes de API executam em 2s, mutation executa em 32 minutos.



"Check out mutation testing, it's a technique for testing the quality of your test suite. The principle is simple:

a) in the current state, all tests pass
b) make an arbitrary modification to the code under test that breaks functionality
c) if your tests still pass, they are lacking"

"...100% code coverage score only means that all lines were exercised at least once, but it says nothing about tests accuracy or use-cases completeness, and that’s why mutation testing matters". (Baeldung, 2018)

"The goals of mutation testing are multiple:

identify weakly tested pieces of code (those for which mutants are not killed)[1]
identify weak tests (those that never kill mutants)[3]
compute the mutation score[2]
learn about error propagation and state infection in the program[4]"

"Mutation testing is nothing more, nothing less, than automating the whole "sabotaging production code and running tests to see if they fail" process you just saw. "

fonte:
- State of Mutation Testing at Google > https://research.google/pubs/pub46584/
- https://en.wikipedia.org/wiki/Mutation_testing
- https://speakerdeck.com/pedrorijo91/mutation-testing-pixels-camp-2019
- https://github.com/stryker-mutator/stryker-handbook/blob/master/mutator-types.md