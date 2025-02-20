export interface Categoria {
  idMenu: number;
  'descripción': string;
}

export interface Marca {
  idItem: number;
  nombreMarca: string; 
  'descripción': string;  
  imagen: string;
}


export interface ApiResponse <T> {
  error: boolean;
  codigo: string;
  message: string;
  menuItems: T[];
}
