import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AuthInput from "../components/auth/AuthInput";
import Layout from "../components/template/Layout";
import api, { apiLoja } from "./api/api";


interface IQUanti {
  quantity: [];
}
export default function Loja() {
  const [lojas, setloja] = useState("");
  const [lojaProduct, setlojaProduct] = useState([]);
  const [cliente , setCliente] = useState()
  const [quanti, setQuanti] = useState();
  const [endereco, setEndereco] = useState();
 
  
  async function handleGetID() {
    try {
      
    const loja1 = localStorage.getItem("loja");
      console.log(loja1)
    
      const response = await axios.get(`${apiLoja}/v1/stores/${loja1}`);
     
      setloja(response.data)

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleGetLojaProduct() {
    try {
          const loja1 = localStorage.getItem("loja");

      const response = await axios.get(
        `${apiLoja}/v1/stores/products/store-id/${loja1}`
      );
      console.log(response.data.content , "Produtos");
      setlojaProduct(response.data.content);
      return response;
    } catch (err) {
      console.log(err);
    }
}
  async function RealizarPedido(produto) {
    try {
      const loja1 = localStorage.getItem("loja");
      let Authorization = localStorage.getItem("Authorization");

      const response = await axios.post(
        `${api}/v1/clients/orders`,
        {
          products: [
            {
              code: produto.code,
              quantity: quanti,
            },
          ],
          store: {
            id: loja1,
          },
          address: {
            id: endereco,
          },
        },
        { headers: { Authorization } }
      );
    
      if (201) {
        toast.success("Pedido realizado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
        return response
        
    } catch (err) {
      console.log(err, "erri")

      if ( 404) {
        toast.error("Cadastre seu Endereço para realizar a compra", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (err?.Status == 400 ) {
        toast.error("Erro ao fazer a requisição", {
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
  



    useEffect(() => {
      handleGetID();
      handleGetLojaProduct();
    }, []);

  return (
    <Layout titulo="Informação da loja">
      <ToastContainer />
      <div
        className={`px-4 py-3 rounded-lg  mt-2
                          border 
                          flex flex-col 
                    focus:outline-none`}
      >
        <a> Nome: {lojas.corporateName} </a>
        <a> Email: {lojas.email} </a>
        <a> CNPJ: {lojas.cnpj} </a>
        <a> phone: {lojas.phone} </a>
      </div>

      <div
        className=" mt-7 mb-5 text-3xl
                text-gray-900 dark:text-gray-100"
      >
        
        Produtos:
      </div>

      {lojaProduct == false
        ? "Nenhum produto cadastrado"
        : lojaProduct.map((produto) => {
            return (
              <>
                <div
                  className={`px-4 py-3 rounded-lg  mt-2
                          border 
                          flex flex-col 
                          
                  `}
                >
                  <a>Nome: {produto.name}</a>
                  <a>Descrição:{produto.description}</a>
                  <a>Preço: R$: {produto.price}</a>

                  {produto.quantity == 0 ? (
                    "Produto Indisponível"
                  ) : (
                    <>
                      <a>Quantidade disponível: {produto.quantity}</a>
                      <a>Quantidade a ser comprada:</a>
                      <AuthInput
                        className={"w-10 text-black"}
                        tipo="number"
                        valor={quanti}
                        valorMudou={setQuanti}
                        obrigatorio
                      />
                      <a>Modalidade da entrega:</a>
                      <AuthInput
                        className={"w-10 text-black"}
                        tipo="number"
                        valor={endereco}
                        valorMudou={setEndereco}
                        obrigatorio
                      />
                    </>
                  )}

                  <a>Codigo: {produto.code}</a>
                  {produto.quantity == 0 ? (
                    "Produto Indisponível"
                  ) : (
                    <>
                      <div className="flex justify-center mt-5">
                        <button
                          className={
                            "bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                          }
                          onClick={() => RealizarPedido(produto)}
                        >
                          Fazer Pedido
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            );
          })}
    </Layout>
  );
}
