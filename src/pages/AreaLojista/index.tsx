import axios from "axios";
import router from "next/router";

import { useEffect, useState } from "react";
import Layout from "../../components/template/Lojista/Layout";

import { apiLoja } from "../api/api";

export default function AreaLojista() {
  const [loja3, setloja3] = useState([]);

const [storeEnviado, setStoreEnviado] = useState();

  async function handlePedidos() {
  let Authorization = localStorage.getItem("Authorization");

    try {
      const response = await axios.get(`${apiLoja}/v1/stores/orders`, {
        headers: { Authorization },
      });
     console.log(response.data.content);

      setloja3(response.data.content);

      return response.data.content;
    } catch (error) {
      console.log(error);
    }
  }
  async function buttonAlterRecebido(pedido) {
    let loja = localStorage.getItem("loja");
 let Authorization = localStorage.getItem("Authorization");
    try {
      const response = await axios.patch(
        `${apiLoja}/v1/stores/orders/${pedido.id}`,
        {
          state: "ENVIADO",
        },
        { headers: { Authorization } }
      );

      console.log(response, "Alterou");
      setStoreEnviado(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handlePedidos();
  }, []);

  return (
    <Layout titulo="Versenlt Lojista" className={``}>
      {loja3.map((pedido) => {
         return (
           <>
             <div
               className={`px-4 py-3 rounded-lg  mt-2
              h-15 w-full 
                          border 
                          mb-10
                          flex flex-col 
                    focus:outline-none`}
             >
               <a>Status: {pedido.state}</a>
               <div
                 className={`px-4 py-3 rounded-lg  mt-2
                          border 
                          flex flex-col 
                    focus:outline-none`}
               >
                 <h1>Endereço:</h1>
                 <a>Rua / Av:{pedido.address.street}</a>
                 <a>Número: {pedido.address.number}</a>
                 <a>CEP/ZipCode: {pedido.address.cep}</a>
                 <a>Cidade: {pedido.address.city}</a>
                 <a>Bairro: {pedido.address.district}</a>
                 <a>UF: {pedido.address.state}</a>
               </div>
               <div
                 className={`px-4 py-3 rounded-lg  mt-2
                          border 
                          flex flex-col 
                    focus:outline-none`}
               >
                 <h1>Informação da Loja: </h1>
                 <a>CNPJ: {pedido.store.cnpj}</a>
               </div>
               <div
                 className={`px-4 py-3 rounded-lg  mt-2
                          border 
                          flex flex-col 
                    focus:outline-none`}
               >
                 <h1>Produto: </h1>
                 <a>Codigo do Produto: {pedido.products.code}</a>
                 <a>Quantidade: {pedido.products.quantity}</a>
                 <a>Valor: {pedido.products.price}</a>
               </div>
               <p>Data da criação: {pedido.orderCreated}</p>

               <p> Valor Total: {pedido.totalValue}</p>
               <div className="flex justify-center mt-5">
                 <button
                   type="button"
                   className={
                     "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                   }
                   onClick={() => buttonAlterRecebido(pedido)}
                 >
                   Enviar
                 </button>
               </div>
             </div>
           </>
         );
      })}
    </Layout>
  );
}
