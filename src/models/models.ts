export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  tipo: string;
  foto: string;
  produtos?: Produto[];
}

export interface CriarUsuario {
  nome: string;
  usuario: string;
  senha: string;
  confirmarSenha?: string;
  tipo: string;
  foto: string;
  produtos?: Produto[];
}

export interface UsuarioLogin {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  tipo: string;
  foto: string;
  token: string;
}

export interface Categoria {
  id: number;
  tipo: string;
}

export interface Produto {
  id: number;
  nome: string;
  foto: string;
  preco: number;
  categorias?: Categoria;
  usuarios: Usuario;
}

export interface CriarProduto {
  [x: string]: any;
  id: number;
  nome: string;
  foto: string;
  preco: number;
  categorias: number;
  usuarios: number;
}
