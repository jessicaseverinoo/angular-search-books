import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
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

  livrosResultadosParaLivros(items): Livro[] {
    const livros: Livro[] = [];
    items.forEach((item) => {
      livros.push(
        (this.livro = {
          title: item.volumeInfo?.title,
          authors: items.volumeInfo?.authors,
          publisher: items.volumeInfo?.publisher,
          publishedDate: items.volumeInfo?.publishedDate,
          description: items.volumeInfo?.description,
          previewLink: items.volumeInfo?.previewLink,
          thumbnail: items.volumeInfo?.imageLinks?.thumbnail,
        })
      );
    });

    return livros;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
