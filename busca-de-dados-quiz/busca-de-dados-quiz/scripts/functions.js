function gerarHtml(textoTag) {
    let novaTag = document.createElement(textoTag)

    return novaTag
}


async function buscarDados(url) {
    let resp = await fetch(url)
    let dados = await resp.json()
    return dados
}


async function deletarDados(url) {
    let resp = await fetch(url, { method: 'DELETE' })

    if (!resp.ok) {
        throw new Error('Erro ao deletar: ' + resp.status)
    }
}


async function atualizarDados(url, dados) {
    let resp = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })

    if (!resp.ok) {
        throw new Error('Erro ao atualizar: ' + resp.status)
    }

    return await resp.json()
}


export { gerarHtml, buscarDados, deletarDados, atualizarDados }
