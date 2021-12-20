import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../components/template/Lojista/Layout";
import api, { apiLoja } from "../api/api";
import "react-toastify/dist/ReactToastify.css";

export default function pedidosRealizado() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [meusPedidos, setMeusPedidos] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [alterPedido, setAlterPedido] = useState();

  async function handleClick() {
    let Authorization = localStorage.getItem("Authorization");

    try {
      const response = await axios.get(`${apiLoja}/v1/stores/orders`, {
        headers: { Authorization },
      });

      console.log(response, "Meus Pedidos");
      setMeusPedidos(response.data.content);
    } catch (e) {
      console.log(e);
    }
  }

  async function buttonAlterRecebido(pedido) {
    const Authorization = localStorage.getItem("Authorization");

    try {
      const response = await axios.patch(
        `${apiLoja}/v1/stores/orders`,
        {
          state: "ENTREGUE",
        },
        { headers: { Authorization } }
      );

      console.log(response, "Alterou");
      setAlterPedido(response.data);

      console.log(response.data.content, "Response Meus Pediso");
    } catch (error) {
      if (400) {
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
      console.log(error);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <Layout
      titulo="MeusPedidos"
      subtitulo="Aqui você irá gerenciar seus Pedidos"
    >
      <div className="h-full">
        <ToastContainer />
      
              {meusPedidos.map((pedido) => {
                  
                
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
                <a className="">Status: {pedido.state}</a>
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

                  <p>Data da criação: {pedido.orderCreated}</p>

                  <p> Valor Total: {pedido.totalValue}</p>
                </div>

               
              </div>
            </>
          );
                  })}
              
      </div>
    </Layout>
  );
}
