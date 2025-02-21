import { Component, Input, OnChanges } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';
import { Marca } from '../../interfaces/api-response.interface';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss'],
})
export class MarcaComponent implements OnChanges {
  @Input() idCategoria!: number;
  marcas: Marca[] = [];
  displayedMarcas: Marca[] = [];
  viewMode: 'lista'|'mosaico' | 'galeria' = 'mosaico';
  sortOrder: 'asc' | 'desc' = 'asc';
  initialItemCount = 7;
  currentCategory = 'All Categories';
  isExpanded = false;

  constructor(
    private marcaService: MarcaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnChanges(): void {
    if (this.idCategoria) {
      this.isExpanded = false;
      this.loadCategoryName();
      this.cargarMarcas();
    }
  }

  private loadCategoryName(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        const categoria = categorias.find((c) => c.idMenu === this.idCategoria);
        this.currentCategory = categoria?.['descripción'] || 'All Categories';
      },
      error: (err) => console.error('Error loading category:', err),
    });
  }

  cargarMarcas(): void {
    this.marcaService.getMarcasPorCategoria(this.idCategoria).subscribe({
      next: (marcas) => {
        this.marcas = marcas;
        this.sortMarcas();
        this.displayedMarcas = this.marcas.slice(0, this.initialItemCount);
      },
      error: (err) => console.error('Error cargando marcas:', err),
    });
  }

  toggleLoadMore(): void {
    this.isExpanded = !this.isExpanded;
    this.updateDisplayedMarcas();
  }

  private updateDisplayedMarcas(): void {
    this.displayedMarcas = this.isExpanded
      ? [...this.marcas]
      : this.marcas.slice(0, this.initialItemCount);
  }

  sortMarcas(): void {
    this.marcas.sort((a, b) => {
      const compare = a.nombreMarca.localeCompare(b.nombreMarca);
      return this.sortOrder === 'asc' ? compare : -compare;
    });
    this.updateDisplayedMarcas();
  }
}
