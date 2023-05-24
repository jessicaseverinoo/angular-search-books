import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  protected campoBusca: string = '';
  protected listaLivros: [];

  private subscription: Subscription;

  constructor(private service: LivroService) {}

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (retornoApi) => console.log(retornoApi),
      error: (error) => console.log('Error', error),
      complete: () => console.log('complete'),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
