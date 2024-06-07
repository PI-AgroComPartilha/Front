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
  descricao: string;
  foto: string;
  preco: number;
  quantidade: number;
  categorias?: Categoria;
  usuarios: Usuario;
}

export interface CriarProduto {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  preco: number;
  quantidade: number;
  categorias: number;
  usuarios: number;
}
