function gerarHtml(textoTag) {
    let novaTag = document.createElement(textoTag)

    return novaTag
}


async function buscarDados(url) {
    let resp = await fetch(url)
    let dados = await resp.json()
    return dados
}


export { gerarHtml, buscarDados }