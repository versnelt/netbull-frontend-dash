import { useEffect, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/hook/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LogoVersenlt from "../../public/images/Logo.png"

export default function Autenticacao() {
  const { cadastrar, login } = useAuth();

  const [erro, setErro] = useState(null);
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthday, setBirthday] = useState("");

  const [lojis, setLojis] = useState<"Lojista" | "cliente">("Lojista");

  function exibirErro(msg, tempoEmSegundos = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempoEmSegundos * 1000);
  }

  async function submeter() {
    try {
      if (modo === "login") {
        await login(email, senha);
      } else {
        await cadastrar(name, cpf, email, birthday, senha);
      }
    } catch (e) {
      exibirErro(
        e?.Status == 400 ? e?.message : "Dados inválidos" ?? "Erro desconhecido"
      );
    }
  }

  useEffect(() => {});

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da Tela de Autenticação"
          className="h-screen w-full object-cover"
        />
      </div>

      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
       
        <h1 className={`text-3xl font-bold mb-5`}>
          {modo === "login"
            ? "Entre com a Sua Conta"
            : "Cadastre-se na Plataforma"}
        </h1>

        {modo == "login" ? (
          <>
            <AuthInput
              label="Email"
              tipo="email"
              valor={email}
              valorMudou={setEmail}
              obrigatorio
            />
            <AuthInput
              label="Senha"
              tipo="password"
              valor={senha}
              valorMudou={setSenha}
              obrigatorio
            />
          </>
        ) : (
          <>
            <AuthInput
              label="Nome"
              tipo="name"
              valor={name}
              valorMudou={setName}
              obrigatorio
            />
            <AuthInput
              label="CPF"
              tipo="cpf"
              valor={cpf}
              valorMudou={setCpf}
              obrigatorio
            />
            <AuthInput
              label="Email"
              tipo="email"
              valor={email}
              valorMudou={setEmail}
              obrigatorio
            />
            <AuthInput
              label="Data de Aniversário"
              tipo="birthday"
              valor={birthday}
              valorMudou={setBirthday}
              obrigatorio
            />
            <AuthInput
              label="Senha"
              tipo="password"
              valor={senha}
              valorMudou={setSenha}
              obrigatorio
            />
          </>
        )}

        <button
          onClick={submeter}
          className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}
        >
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>
          <ToastContainer />
        {modo === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={() => setModo("cadastro")}
              className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
            >
              {" "}
              Crie um Conta Gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
            >
              {" "}
              Entre com a suas Credenciais
            </a>
          </p>
        )}
        <hr className="my-6 border-gray-300 w-full" />

        <a
          onClick={() => setLojis("Lojista")}
          href={"/lojista"}
          className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
        >
          Crie um Conta Gratuitamente para Lojista
        </a>
      </div>
    </div>
  );
}
