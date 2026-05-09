import Swal from "sweetalert2";
import type { NavigateFunction } from 'react-router';

interface InterfaceUserLogin {
    cpf: string,
    senha: string
}

export const PostLogin = async (body: InterfaceUserLogin, navegar: NavigateFunction) => {
    try { 

        if (!body.cpf || !body.senha) {
            console.log("error falta usuários", body)
        }

        const url = "http://localhost:3000/api/users/login"

        const resposta: Response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
            cpf: body.cpf,
            senha: body.senha,
            }),
            headers: {
            "Content-Type": "application/json",
            },
        });
        const response = await resposta.json()
        console.log(response)
        if (resposta.ok === false) {
            await Swal.fire({
                icon: "error",
                title: "Usuário não encontrado!",
                text: "CPF ou SENHA inválida, corrija!"
            })

            return
        }

        await Swal.fire({
            icon: "info",
            title: "Usuário encontrado",
            text: "Seu usuário foi encontrado e vc já será redirecionado",
        });

        localStorage.setItem('usuarioLogado', 'true');
        navegar('/pets')
   } catch {
        await Swal.fire({
                icon: "error",
                title: "Erro do servidor!",
                text: "Ocorreu um erro ao se comunicar com o servidor!"
            })
   }
}