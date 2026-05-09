import { useEffect } from "react";
import { useNavigate } from "react-router"
import Swal from "sweetalert2";

export const AutoLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userLogged = localStorage.getItem('usuarioLogado')

        if (userLogged) {
            const timeLimit = 15 * 60 * 1000
            const timer = setTimeout(() => {
                localStorage.removeItem('usuarioLogado');

            Swal.fire({
                icon: "warning",
                title: "Tempo limite expirado.",
                text: "Tempo limite de segurança expirou, faça login novamente!"
                })

            navigate('/')
            }, timeLimit)

            return () => clearTimeout(timer)
        } else {
            Swal.fire({
                icon: "warning",
                title: "Faça login para acessar as paginas.",
                text: "Insira suas credenciais para iteragir nas outras páginas!"
            })

            navigate('/')
        }
    }, [navigate])
}