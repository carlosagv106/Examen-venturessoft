import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/api-response.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  selectedCategory: number | null = null;
  @Output() categoriaSeleccionada = new EventEmitter<number>();
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias(); 
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias.reverse();
      },
      error: (err) => console.error('Error cargando categorías:', err),
    });
  }

  seleccionarCategoria(idMenu: number): void {
    this.categoriaSeleccionada.emit(idMenu);
    this.selectedCategory = idMenu;
  }
}
