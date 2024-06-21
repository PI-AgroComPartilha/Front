export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  foto: string;
  produtos?: Produto[];
}

export interface CriarUsuario {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha?: string;
  tipo: string;
  foto: string;
  produtos?: Produto[];
}

export interface UsuarioLogin {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  foto: string;
  token: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  foto: string;
  preco: number;
  categoria?: Categoria;
  usuario: Usuario;
}

export interface CriarProduto {
  [x: string]: any;
  id: number;
  nome: string;
  foto: string;
  preco: number;
  categoria: {
    id: number;
  };
  usuario: {
    id: number;
  };
}
