# Buscante

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Módulo 01: Programação reativa

##### Conteúdo:

- Utilizar a arquitetura de componentes de apresentação e componentes inteligentes;
- Lidar com a biblioteca RxJS;
- Aplicar o padrão Observer;

## Módulo 02: Ciclo do observable

##### Conteúdo:

- Utilizar os métodos next, error e complete;
- Unsubscribe do observable;
- Adequar a resposta da API para o formato necessário;

## Módulo 03: Operador RxJS

##### Conteúdo:

- Utilizar o operador para agrupar múltiplos operadores;
- Utilizar o operador tap para fazer debugging na aplicação;
- Transformar o fluxo de dados com o operador map;

## Módulo 04: Pipes do angular

Conteúdo:

- Transformar dados com pipes;
- Passar parâmetros e utilizar pipes encadeados;
- Criar um pipe customizado.

#### Colinha dos operadores

Pipe- Função que serve para agrupar múltiplos operadores. Não modifica o observable anterior.

Tap - Operador de serviços públicos. Usado para debugging. Não modifica o observable.

Map - Operador de transformação. Transforma o observable de acordo com a função passada. Retorna um observable modificado.

#### Para saber mais: pipes do Angular

De acordo com a documentação do Angular, os pipes podem ser usados para transformar strings, valores monetários, datas e outros dados para exibição.

Pipes são funções simples que aceitam um valor de entrada e retornam um valor transformado para ser usado em expressões no template. Os pipes são úteis porque você pode usá-los em toda a sua aplicação, enquanto declara cada pipe apenas uma vez.

O Angular possui vários pipes prontos para uso, conheça alguns deles:

- DatePipe: formata um valor de data de acordo com as regras de localidade.
- UpperCasePipe: transforma o texto em letras maiúsculas.
- LowerCasePipe: transforma o texto em letras minúsculas.
- CurrencyPipe: transforma um número em uma string de moeda, formatada de acordo com as regras de localidade.
- DecimalPipe: transforma um número em uma string com um ponto decimal, formatado de acordo com as regras de localidade.
- PercentPipe: transforma um número em uma string de porcentagem, formatada de acordo com as regras de localidade.
