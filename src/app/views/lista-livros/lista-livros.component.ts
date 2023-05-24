import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  protected campoBusca: string = '';
  protected listaLivros: Livro[] = [];

  private livro!: Livro;
  private subscription: Subscription;

  constructor(private service: LivroService) {}

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.listaLivros = this.livrosResultadosParaLivros(items);
      },
      error: (error) => console.log('Error', error),
      complete: () => console.log('complete'),
    });
  }

  // .subscribe(data => this.config = {
  //   heroesUrl: (data as any).heroesUrl,
  //   textFile: (data as any).textFile,
  // })

  livrosResultadosParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
