import axios from "axios";
import { useEffect, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import Layout from "../components/template/Layout";
import useAuth from "../data/hook/useAuth";
import base_url from "../pages/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  email: string;
  name: string;
  cpf: string;
  birthday: string;
  password: string;
}

interface UserEndData {
  street: string;
  number: string;
  district: string;
  city: string;
  cep: string;
  state: string;
  type: {
    id: "1" | "2" | "3";
  };
}

export default function Perfil() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  //Endereço do usuário
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState(["1" || "2" || "3"]);

  const [endeCad, setEndeCad] = useState<"dadosPessoais" | "endereco">(
    "dadosPessoais"
  );

  async function handleClick() {
    let Authorization = localStorage.getItem("Authorization");

    try {
      const userData: UserData = {
        email,
        name,
        
        birthday,
        password,
      };
      const response = await axios.put(`${base_url}/v1/clients`, userData, {
        headers: { Authorization },
      });
      if (200) {
        toast.success("Dados Alterado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);

      if (400) {
        toast.error("Por favor preencha os campos abaixo", {
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
  }

  async function cadEnder() {
    let Authorization = localStorage.getItem("Authorization");

    try {
      const endData: UserEndData = {
        street,
        number,
        district,
        city,
        cep,
        state,
        type: { id: "1" || "2" || "3" },
      };
      const response = await axios.post(
        `${base_url}/v1/clients/addresses`,
        endData,
        {
          headers: { Authorization },
        }
      );

      if (201) {
        toast.success("Endereço cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      
      console.log(response.data);
    } catch (e) {
    
      if (400) {
        toast.error("Por favor preencha os campos abaixo", {
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
  }

  return (
    <Layout
      titulo="Perfil do Usuário"
      subtitulo="Administre as suas informações de usuário!"
    >
      <p className="">
        {endeCad == "dadosPessoais" ? (
          <>
            <a
              onClick={() => setEndeCad("endereco")}
              className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
            >
              Cadastre seu Endereço
            </a>
          </>
        ) : (
          <>
            <a
              onClick={() => setEndeCad("dadosPessoais")}
              className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}
            >
              Altere seus dados
            </a>
          </>
        )}
      </p>
      {endeCad == "dadosPessoais" ? (
        <>
          <div className="h-screen">
            <AuthInput
              className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
              label="Email"
              tipo="email"
              valor={email}
              valorMudou={setEmail}
              obrigatorio
            />
            <AuthInput
              className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
              label="Nome"
              tipo="name"
              valor={name}
              valorMudou={setName}
              obrigatorio
            />

            <AuthInput
              className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
              label="Data de aniversário"
              tipo="birthday"
              valor={birthday}
              valorMudou={setBirthday}
              obrigatorio
            />
            <AuthInput
              className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
              label="Senha"
              tipo="password"
              valor={password}
              valorMudou={setPassword}
              obrigatorio
            />
            <button
              onClick={() => handleClick()}
              className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}
            >
              Altere seus dados
            </button>
            <ToastContainer />
          </div>
        </>
      ) : (
        <div className="h-full h-screen">
          <AuthInput
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
            label="Rua / Av."
            tipo="street"
            valor={street}
            valorMudou={setStreet}
            obrigatorio
          />
          <AuthInput
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
            label="Numero"
            tipo="number"
            valor={number}
            valorMudou={setNumber}
            obrigatorio
          />
          <AuthInput
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
            label="Bairro"
            tipo="district"
            valor={district}
            valorMudou={setDistrict}
            obrigatorio
          />
          <AuthInput
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
            label="Cidade"
            tipo="city"
            valor={city}
            valorMudou={setCity}
            obrigatorio
          />

          <AuthInput
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
            label="CEP"
            tipo="cep"
            valor={cep}
            valorMudou={setCep}
            obrigatorio
          />
          <AuthInput
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
            label="UF"
            tipo="state"
            valor={state}
            valorMudou={setState}
            obrigatorio
          />
          <AuthInput
            className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
            label="Modalidade"
            tipo="number"
            valor={type}
            valorMudou={setType}
            obrigatorio
          />

          <button
            onClick={() => cadEnder()}
            className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}
          >
            Cadastre um novo endereço
          </button>
        </div>
      )}
    </Layout>
  );
}
