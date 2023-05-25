import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  protected campoBusca = new FormControl();
  protected mensagemErro: string = '';
  livrosResultado: LivrosResultado;

  constructor(private service: LivroService) {}

  totalDeLivros$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((resultado) => (this.livrosResultado = resultado)),
    catchError((_) => {
      return of();
    })
  );

  // é uma convenção utilizar o símbolo de dólar quando a variável é um observable
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    tap(() => {
      console.log('Fluxo inicial de dados');
    }),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultadosParaLivros(items)),
    catchError((erro) => {
      return throwError(
        () =>
          new Error(
            (this.mensagemErro =
              'Ocorreu um erro inesperado, recarregue a página.')
          )
      );
    })
  );

  livrosResultadosParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}

// switchmap
// A ideia desse operador é trocar os valores e passar ao servidor só o último valor (B),
// desconsiderando os valores anteriores (A).
//
// Exemplo
// [Observable] ---- [switchMap] ---- observer
//
// Neste exemplo a cada dígito é feita uma chamada para o servidor,
// mas com o switchMap essas chamadas são canceladas e é feita somente a última
// isso reduz o número de requisições feitas
