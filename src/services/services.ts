import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-m4yr.onrender.com/",
});

/* TODO: Quando cadastra um usuario invalido dá error mas não retorna */
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    try{
      const resposta = await api.post(url, dados); 
   
      if(resposta.status !== 201) throw new Error(JSON.stringify(resposta))
      setDados(resposta.data);
    } catch (e) {
      console.log(e)
      throw new Error(JSON.stringify(e))
    }
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const listar = async(url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    console.log(resposta)
    setDados(resposta.data)
  }

  export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  try {
    const resposta = await api.post(url, dados, header)
    if(resposta.status !== 200) throw new Error(JSON.stringify(resposta))

    setDados(resposta.data)
  }catch (e) {
console.log(e)
 throw new Error(JSON.stringify(e))
  }
  }
  
  export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
  }

  export const deletar = async(url: string , header: Object) => {
    await api.delete(url, header)
  }