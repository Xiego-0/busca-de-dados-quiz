import { gerarHtml, buscarDados, deletarDados, atualizarDados } from "./functions.js"

const URL_BASE = 'http://localhost:3000/resultados'

const campos = ['nome', 'email', 'idade', 'sexo', 'total_questoes', 'resultado', 'data_resultado']


function gerarBotao(texto, classe) {
    let btn = gerarHtml('button')
    btn.innerText = texto
    btn.className = 'btn-acao ' + classe
    return btn
}


function gerarLinha(dados) {

    let atual = { ...dados }

    let tr = gerarHtml('tr')
    let tdId = gerarHtml('td')
    let tdsCampos = campos.map(() => gerarHtml('td'))
    let tdAcoes = gerarHtml('td')
    tdAcoes.className = 'acoes'

    tdId.textContent = atual.id

    tr.appendChild(tdId)
    tdsCampos.forEach(td => tr.appendChild(td))
    tr.appendChild(tdAcoes)

    let btnEditar = gerarBotao('Editar', 'btn-editar')
    let btnDeletar = gerarBotao('Deletar', 'btn-deletar')
    let btnSalvar = gerarBotao('Salvar', 'btn-salvar')
    let btnCancelar = gerarBotao('Cancelar', 'btn-cancelar')

    let inputs = []

    function modoLeitura() {
        tdsCampos.forEach((td, i) => {
            td.textContent = atual[campos[i]]
        })
        tdAcoes.replaceChildren(btnEditar, btnDeletar)
    }

    function modoEdicao() {
        inputs = campos.map((campo, i) => {
            let input = gerarHtml('input')
            input.value = atual[campo]
            tdsCampos[i].replaceChildren(input)
            return input
        })
        tdAcoes.replaceChildren(btnSalvar, btnCancelar)
    }

    btnEditar.addEventListener('click', modoEdicao)
    btnCancelar.addEventListener('click', modoLeitura)

    btnSalvar.addEventListener('click', async () => {
        let novosDados = {}

        campos.forEach((campo, i) => {
            let valor = inputs[i].value
            // mantém o tipo original (número continua número)
            novosDados[campo] = typeof atual[campo] === 'number' ? Number(valor) : valor
        })

        try {
            let atualizado = await atualizarDados(`${URL_BASE}/${atual.id}`, novosDados)
            atual = atualizado
            modoLeitura()
        } catch (erro) {
            console.error(erro)
            alert('Não foi possível atualizar o registro.')
        }
    })

    btnDeletar.addEventListener('click', async () => {
        if (!confirm(`Deseja deletar o resultado de "${atual.nome}"?`)) return

        try {
            await deletarDados(`${URL_BASE}/${atual.id}`)
            tr.remove()
        } catch (erro) {
            console.error(erro)
            alert('Não foi possível deletar o registro.')
        }
    })

    modoLeitura()

    return tr
}


let dados = await buscarDados(URL_BASE)

let table = document.querySelector('#tableResultados')

for (let i = 0; i < dados.length; i++) {
    table.append(gerarLinha(dados[i]))
}