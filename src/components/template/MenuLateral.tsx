import useAuth from "../../data/hook/useAuth"
import { IconeAjustes, IconeBag, IconeCasa, IconeSair, IconeSino } from "../icons"
import Logo from "./Logo"
import MenuItem from "./MenuItem"
export default function MenuLateral() {

    const { logout } = useAuth()

    return (
      <aside
        className={`
            flex flex-col
            h-100 
            bg-gray-200 text-gray-700
            dark:bg-gray-900
            
        `}
      >
        <div
          className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}
        >
          <Logo />
        </div>
        <ul className="flex-grow">
          <MenuItem url="/" texto="Início" icone={IconeCasa} />
          
          <MenuItem url="/meuspedidos" texto="Meus Pedidos" icone={IconeBag} />
          <MenuItem url="/TodosUsuarios" texto="Todos Usuarios" icone={IconeSino} />
        </ul>
        <ul>
          <MenuItem
            texto="Sair"
            icone={IconeSair}
            onClick={logout}
            className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}
          />
        </ul>
      </aside>
    );
}