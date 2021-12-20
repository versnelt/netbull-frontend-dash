import axios from "axios";
import { useEffect, useState } from "react";
import AuthInput from "../../components/auth/Lojista/AuthInput";
import Layout from "../../components/template/Lojista/Layout";
import useAuth from "../../data/hook/useAuth";
import { apiLoja } from "../api/api";


interface IProduto {
  name: string;
  description: string;
  price: string;
  quantity: string;
  code: string;
}

export default function Produtolojista() {
    const [name , setName] = useState("");
    const [description , setDescription] = useState("");
    const [price , setPrice] = useState("");
    const [quantity , setQuantity] = useState("");
    const [code , setCode] = useState("");
    
    async function cadProdutolojista() {
        const Authorization = localStorage.getItem("Authorization");
        try {
            const produtctData: IProduto = {
                name,
                description,   
                price,
                quantity,
                code,
            }

            const response = await axios.post(
              `${apiLoja}/v1/stores/products`,
              produtctData,
              { headers: { Authorization } }
            );
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }


    }



  return (
    <Layout titulo="Produtos" subtitulo="Cadastre seus produtos">
      <div className="h-screen">
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
          label="Descrição"
          tipo="description"
          valor={description}
          valorMudou={setDescription}
          obrigatorio
        />
        <AuthInput
          className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
          label="Preço"
          tipo="price"
          valor={price}
          valorMudou={setPrice}
          obrigatorio
        />
        <AuthInput
          className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
          label="Quantidade disponível"
          tipo="number"
          valor={quantity}
          valorMudou={setQuantity}
          obrigatorio
        />
        <AuthInput
          className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-black
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none`}
          label="Codigo de venda"
          tipo="text"
          valor={code}
          valorMudou={setCode}
          obrigatorio
        />
        <div className="flex justify-center mt-5">
          <button
            className={
              "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            }
            onClick={() => cadProdutolojista()}
          >
            Cadastrar um Novo produto
          </button>
        </div>
      </div>
    </Layout>
  );
}
