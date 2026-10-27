// Troque aqui o usuário do GitHub, se quiser
const USUARIO = "BrenoCavalcantiGit";

const avatar = document.getElementById("avatar");
const nome = document.getElementById("name");
const username = document.getElementById("username");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const link = document.getElementById("link");
const erro = document.getElementById("error");

async function carregarPerfil() {
    try {
        if (!USUARIO) {
            throw new Error("Nenhum usuário foi informado.");
        }

        const resposta = await fetch(`https://api.github.com/users/${USUARIO}`);

        if (resposta.status === 404) {
            throw new Error("Usuário não encontrado no GitHub.");
        }
        if (resposta.status === 403) {
            throw new Error("Limite de requisições da API atingido. Tente novamente mais tarde.");
        }
        if (!resposta.ok) {
            throw new Error("Erro ao buscar os dados (código " + resposta.status + ").");
        }

        const dados = await resposta.json();

        avatar.src = dados.avatar_url;
        nome.innerText = dados.name || dados.login;
        username.innerText = "@" + dados.login;
        repos.innerText = dados.public_repos;
        followers.innerText = dados.followers;
        following.innerText = dados.following;
        link.href = dados.html_url;
    } catch (e) {
        nome.innerText = "Ops!";
        erro.innerText = e.message === "Failed to fetch"
            ? "Não foi possível conectar. Verifique sua internet."
            : e.message;
    }
}

carregarPerfil();
