import route from "next/router";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import axios from "axios";

import base_url, { apiLoja } from "../../pages/api/api";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import api from "../../pages/api/api";
interface AuthContextProps {
  usuario?: IUser;
  carregando?: boolean;
  cadastrar?: (
    name: string,
    cpf: string,
    email: string,
    birthday: string,
    senha: string
  ) => Promise<void>;
  login?: (
    email: string,
    senha: string,
    nome: string,
    cpf: string,
    birthday: string
  ) => Promise<void>;
  cadastrarLojista?: (
    corporateName: string,
    cnpj: string,
    email: string,
    phone: string,
    senha: string
  ) => Promise<void>;
  loginLojista?: (
    email: string,
    senha: string,
    nome: string,
    cpf: string,
    birthday: string
  ) => Promise<void>;

  logout?: () => Promise<void>;
}

interface IUser {
  email: string;
  nome: string;
  cpf: string;
  birthday: string;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(
  email: string,
  nome: string,
  cpf: string,
  birthday: string
): Promise<IUser> {
  const token = localStorage.getItem("Authorization");
  return {
    nome: nome,
    email: email,
    cpf: cpf,
    birthday: birthday,
  };
}

export function AuthProvider(props) {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<IUser>();

  async function configurarSessao(
    email: string,
    nome: string,
    cpf: string,
    birthday: string
  ) {
    if (email) {
      const usuario = await usuarioNormalizado(email, nome, cpf, birthday);
      setUsuario(usuario);
      gerenciarCookie();
      setCarregando(false);
      return usuario;
    } else {
      setUsuario(null);
      gerenciarCookie();
      setCarregando(false);
      return false;
    }
  }

  const [LoginOn, setLoginOn] = useState("");
  const [sucesso, setSucesso] = useState(null);

  function exibirSucesso(msg, tempoEmSegundos = 5) {
    setSucesso(msg);
    setTimeout(() => setSucesso(null), tempoEmSegundos * 1000);
  }
  function getTokenFromStorage() {
    const authData = localStorage.getItem("Authorization");
    var token = JSON.stringify(authData);
    return token;
  }

  function gerenciarCookie() {
    if (LoginOn) {
      Cookies.set("Authorization");
    } else {
      Cookies.remove("data.jwtToken");
    }
  }

  async function login(
    email: string,
    senha: string,
    nome: string,
    cpf: string,
    birthday: string
  ) {
    try {
      setCarregando(true);
      const resp = await axios.post(`${api}/authenticate`, {
        username: email,
        password: senha,
      });
      let em = email;
      localStorage.setItem("Email", em);

      let token = resp.data.jwtToken;
      console.log(resp);
      let bearToken = "Bearer " + token;
      if (200)
        toast.success("Login efetuado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      localStorage.setItem("Authorization", bearToken);

      await configurarSessao(email, nome, cpf, birthday);

      route.push("/", { auth: bearToken });
    } catch (err) {
      setCarregando(false);
     
     
        toast.error("Dados inválidos!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        
        });
    }
  }

  async function cadastrar(
    name: string,
    cpf: string,
    email: string,
    birthday: string,
    senha: string
  ) {
    try {
      setCarregando(true);
      const resp = await axios.post(`${api}/v1/clients`, {
        name,
        cpf,
        email,
        birthday,
        password: senha,
      });
      if (200) {
        toast.success("Usuário cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        route.push("/autenticacao");

        return resp;
      }
    } catch(err) {
      setCarregando(false);
      
        toast.error("Dados invalido", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
     
    }
  }
  async function loginLojista(
    email: string,
    senha: string,
    nome: string,
    cpf: string,
    birthday: string
  ) {
    try {
      setCarregando(true);
      const resp = await axios.post(`${apiLoja}/authenticate`, {
        username: email,
        password: senha,
      });
      let token = resp.data.jwtToken;
      console.log(resp);
      let bearToken = "Bearer " + token;
      localStorage.setItem("EMAILLOJA", email);

      
        toast.success("Lojista criado com suce1sso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("Authorization", bearToken);

        await configurarSessao(email, nome, cpf, birthday);

        route.push("/AreaLojista", { auth: bearToken });
      
    } catch(err) {
      setCarregando(false);
      toast.error("Por favor insira dados corretamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  async function cadastrarLojista(
    corporateName: string,
    cnpj: string,
    email: string,
    phone: string,
    senha: string
  ) {
    try {
      setCarregando(true);
      const resp = await axios.post(`${apiLoja}/v1/stores`, {
        corporateName,
        cnpj,
        email,
        phone,
        password: senha,
      });
     
          toast.success("Sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      
        route.push("/lojista");

        return resp;
      
    } catch(err) {
      setCarregando(false);
   
        toast.error("Dados invalido", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      
    }
  }

  async function logout() {
    try {
      setCarregando(true);
      await sessionStorage.setItem("Authorization", "");
      await sessionStorage.clear();
      route.push("/autenticacao");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    setLoginOn(getTokenFromStorage());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        login,
        cadastrar,
        loginLojista,
        cadastrarLojista,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
