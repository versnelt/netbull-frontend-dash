import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import useAuth from '../../../data/hook/useAuth'
import api, { apiLoja } from '../../../pages/api/api';

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const [user , setUser ] = useState([])

    async function handleClick() {
        let EMAILLOJA = localStorage.getItem("EMAILLOJA");
        try {
            const response = await axios.get(
              `${apiLoja}/v1/stores/email/${EMAILLOJA}`
            );
            console.log(response.data, "Response Meus Pediso");
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
handleClick()

    },[])

    const { usuario } = useAuth()
    return (
      <>
        <Link href="/perfil">
          <img
            src={usuario?.imagemUrl ?? "/images/avatar.svg"}
            alt="Avatar do Usuário"
            className={`
            h-10 w-10 rounded-full cursor-pointer
            ${props.className}
            `}
          />
        </Link>

        <h1 className="text-white">{user.corporateName}</h1>
      </>
    );
}