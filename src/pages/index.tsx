import axios from "axios";
import router from "next/router";

import { useEffect, useState } from "react";
import Layout from "../components/template/Layout";

import { apiLoja } from "./api/api";

export default function Home() {
  const [user, setUser] = useState([]);
  const [loja3, setloja3] = useState();

 

  

  async function handleClick() {
     let Authorization = localStorage.getItem("Authorization");
     let lojas = [];
    try {
      const response = await axios.get(`${apiLoja}/v1/stores`, {  headers: { Authorization }});
      //   console.log(response.data.content);

      setUser(response.data.content);

      return response.data.content.map((usuario) => {
        lojas.push(usuario);
      });
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <Layout titulo="Versenlt Cliente">
      <div className="h-screen">
        <h3>Escolha a loja para comprar: </h3>

        {user.map((loja) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              className={` px-4 py-3 rounded-lg  mt-2
                 w-40 border  
                    focus:outline-none`}
            >
              <a
                onClick={() => localStorage.setItem("loja", loja.id)}
                href={"/Loja"}
              >
                <div>
                  <p>Name: {loja.corporateName}</p>
                  <p>Email: {loja.email}</p>
                  <p>CNPJ: {loja.cnpj}</p>
                  <p>Telefone: {loja.phone}</p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
