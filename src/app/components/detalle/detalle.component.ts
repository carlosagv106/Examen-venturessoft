import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marca, Categoria } from '../../interfaces/api-response.interface';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  featuredBrands: Marca[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private marcaService: MarcaService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedBrands();
  }

  private loadFeaturedBrands(): void {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      const topCategories = categorias.slice(0, 4);
      const requests = topCategories.map((cat) =>
        this.marcaService
          .getMarcasPorCategoria(cat.idMenu)
          .pipe(map((marcas) => (marcas.length > 0 ? marcas[0] : null)))
      );

      forkJoin(requests).subscribe((brands) => {
        this.featuredBrands = brands.filter((b) => b !== null) as Marca[];
      });
    });
  }
}
