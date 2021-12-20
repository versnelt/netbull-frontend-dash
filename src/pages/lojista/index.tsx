import { useState } from "react";
import { ToastContainer } from "react-toastify";
import AuthInput from "../../components/auth/AuthInput";
import Layout from "../../components/template/Layout";
import useAuth from "../../data/hook/useAuth";

export default function Lojista() {
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [corporateName, setCorporateName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [phone, setPhone] = useState("");
    const { cadastrarLojista, loginLojista } = useAuth();

    const [lojis, setLojis] = useState<"cliente" | "Lojista">("cliente");


async function submeter() {
  try {
    if (modo === "login") {
      await loginLojista(email, senha);
    } else {
      await cadastrarLojista(corporateName, cnpj, email, phone, senha);
    }
  } catch (e) {
    console.log(e);
  }
}


  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3 ">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da Tela de Autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className={`text-3xl font-bold mb-5`}>
          {modo === "login"
            ? "Entre com a Sua Conta de lojista"
            : "Cadastre-se na Plataforma como lojista"}
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
              label="Nome da Corporação"
              tipo="corporateName"
              valor={corporateName}
              valorMudou={setCorporateName}
              obrigatorio
            />
            <AuthInput
              label="CNPJ"
              tipo="cnpj"
              valor={cnpj}
              valorMudou={setCnpj}
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
              label="Telefone"
              tipo="phone"
              valor={phone}
              valorMudou={setPhone}
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
              Entre com a suas Credenciais
            </a>
          </p>
        )}
        <hr className="my-6 border-gray-300 w-full" />

        <a
          onClick={() => setLojis("Lojista")}
          href={"/autenticacao"}
          className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
        >
          Acesse de Cliente
        </a>
      </div>
    </div>
  );
}
