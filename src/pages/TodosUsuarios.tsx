import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/template/Layout";
import api from "./api/api";

export default function TodosUsuarios() {
  const [user, setUser] = useState([]);

  const usuarios = [];
  console.log(usuarios);

  async function handleClick() {
    try {
      const response = await axios.get(`${api}/v1/clients`);
      //   console.log(response.data.content);

      setUser(response.data.content);

      return response.data.content.map((usuario) => {
        usuarios.push(usuario);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <Layout
      titulo="Todos UserData"
      subtitulo="Aqui você irá gerenciar as suas notificações!"
    >
      <div className="h-screen">
      {user.map((usuario) => {
        return (
          <>
            <div
              className={` px-4 py-3 rounded-lg  mt-2 
          w-40 border
                    focus:outline-none`}
            >
              <p>Name: {usuario.name}</p>
              <p>Email: {usuario.email}</p>
              <p>CPF: {usuario.cpf}</p>
              <p>Rua/Av.: {usuario.street}</p>
              <p>Numero: {usuario?.number}</p>
              <p>Bairro: {usuario?.district}</p>
              <p>Cidade: {usuario?.state}</p>
              <p>Modalidade: {usuario?.type}</p>
            </div>
          </>
        );
      })}
        </div>
    </Layout>
  );
}
