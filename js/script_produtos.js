const KEY_BD = '@cadastroprodutos'

let listaRegistros = {
    ultimoIdGerado: 0,
    produtos: []
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
        tbody.innerHTML = listaRegistros.produtos
            /* .sort( (a, b) => {
                return a.nome > b.nome ? -1 : 1
            }) */
            .map(produto => {
                return `<tr>
                        <td>${produto.id}</td>
                        <td>${produto.nome}</td>
                        <td>${produto.desc}</td>
                        <td>${produto.qtd}</td>
                        


                    </tr>`
            }).join('')
    }
}

function insertproduto(nome, desc, qtd ) {
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.produtos.push({
        id,
        nome,
        desc,
        qtd
    })
    gravarDados()
    redenrizar()
    visualizar('lista')
}

function limparForm() {
    document.getElementById('nome').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('qtd').value = "";

}

function visualizar(pagina, novo = 'false', id = null) {
    document.body.setAttribute("page", pagina);
    if (pagina === 'cadastro') {
        if (novo) limparForm()
        if (id) {
            const produto = listaRegistros.produtos.find(produto => produto.id == id)
            if (produto) {
                document.getElementById('id').value = produto.id;
                document.getElementById('nome').value = produto.nome;
                document.getElementById('desc').value = produto.desc;
                document.getElementById('qtd').value = produto.qtd;
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
        desc: document.getElementById('desc').value,
        qtd: document.getElementById('qtd').value
    }
    if (dados.id) {
        editproduto(dados.id, dados.nome, dados.desc, dados.qtd)
    } else {
        insertproduto(dados.nome, dados.desc, dados.qtd)
    }
}

window.addEventListener('load', () => {
    lerDados()

    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})