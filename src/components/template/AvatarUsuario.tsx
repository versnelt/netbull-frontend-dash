import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import useAuth from '../../data/hook/useAuth'
import api from '../../pages/api/api';

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const [user , setUser ] = useState([])

    async function handleClick() {
        let Email = localStorage.getItem("Email");
        try {
            const response = await axios.get(`${api}/v1/clients/email/${Email}`);
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

        <h1 className="text-white">{user.name}</h1>
      </>
    );
}