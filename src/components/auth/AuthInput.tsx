interface AuthInputProps {
  label?: string;
  valor: any;
  obrigatorio?: boolean;
  naoRenderizarQuando?: boolean;
  className?: string;
  tipo?:
    | "text"
    | "email"
    | "password"
    | "name"
    | "cpf"
    | "birthday"
    | "street"
    | "number"
    | "district"
    | "city"
    | "cep"
    | "state"
    | "type"
    | "corporateName"
    | "cnpj"
    | "phone"
    | "quanti"
    | "description"
    | "price"

  valorMudou: (novoValor: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
    return props.naoRenderizarQuando ? null : (
        <div className="flex flex-col mt-4">
            <label>{props.label}</label>
            <input
                type={props.tipo ?? 'text'}
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target.value)}
                required={props.obrigatorio}
                className={props.className ??`
                    px-4 py-3 rounded-lg bg-gray-200 mt-2
                    text-gray-dark
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none
                `}
            />
        </div>
    )
}