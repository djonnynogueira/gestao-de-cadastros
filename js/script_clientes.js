const KEY_BD = '@cadastroclientes'

let listaRegistros = {
    ultimoIdGerado: 0,
    clientes: [
    ]
}

// gravar dados
function gravarDados() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros))

}
// ler dados
function lerDados() {
    const dados = localStorage.getItem(KEY_BD)
    if (dados) {
        listaRegistros = JSON.parse(dados)
    }
    redenrizar();
}

// monstrando os dados
function redenrizar() {
    const tbody = document.getElementById("listaRegistrosBody");
    if (tbody) {
        tbody.innerHTML = listaRegistros.clientes
            /* .sort( (a, b) => {
                return a.nome > b.nome ? -1 : 1
            }) */
            .map(cliente => {
                return `<tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.fone}</td>
                        


                    </tr>`
            }).join('')
    }
}

function insertcliente(nome, email, fone ) {
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.clientes.push({
        id,
        nome,
        email,
        fone
    })
    gravarDados()
    redenrizar()
    visualizar('lista')
}

function limparForm() {
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('fone').value = "";

}

function visualizar(pagina, novo = 'false', id = null) {
    document.body.setAttribute("page", pagina);
    if (pagina === 'cadastro') {
        if (novo) limparForm()
        if (id) {
            const cliente = listaRegistros.clientes.find(cliente => cliente.id == id)
            if (cliente) {
                document.getElementById('id').value = cliente.id;
                document.getElementById('nome').value = cliente.nome;
                document.getElementById('email').value = cliente.email;
                document.getElementById('fone').value = cliente.fone;
            }
        }
        document.getElementById('nome').focus()
    }
}

function submeter(e) {
    // evitar de carregar
    e.preventDefault()
    const dados = {
        id: document.getElementById('id').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        fone: document.getElementById('fone').value
    }
    if (dados.id) {
        editcliente(dados.id, dados.nome, dados.email, dados.fone)
    } else {
        insertcliente(dados.nome, dados.email, dados.fone)
    }
}

window.addEventListener('load', () => {
    lerDados()

    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})