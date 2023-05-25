import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { Item } from 'src/app/models/interfaces';
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

  constructor(private service: LivroService) {}

  // é uma convenção utilizar o símbolo de dólar quando a variável é um observable
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((items) => this.livrosResultadosParaLivros(items))
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
