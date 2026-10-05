import { gerarHtml, buscarDados } from "./functions.js"


function gerarLinha(dados) {

    let tr = gerarHtml('tr')

    let td1 = gerarHtml('td')
    let td2 = gerarHtml('td')
    let td3 = gerarHtml('td')
    let td4 = gerarHtml('td')
    let td5 = gerarHtml('td')
    let td6 = gerarHtml('td')
    let td7 = gerarHtml('td')
    let td8 = gerarHtml('td')

    let btnd1 = gerarHtml('button')
    let btnu1 = gerarHtml('button')
    btnu1.innerText = 'Editar';
    btnd1.innerText = 'Deletar';

    btnd1.style.backgroundColor = '#df0707'; 
    btnd1.style.color = 'white';
    btnd1.style.border = 'solid 1px black'

    btnu1.style.backgroundColor = '#ffa600'; 
    btnu1.style.color = 'black';
    btnu1.style.border = 'solid 1px black'


    td1.textContent = dados.id
    td2.textContent = dados.nome
    td3.textContent = dados.email
    td4.textContent = dados.idade
    td5.textContent = dados.sexo
    td6.textContent = dados.total_questoes
    td7.textContent = dados.resultado
    td8.textContent = dados.data_resultado


    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
    tr.appendChild(td8)
    tr.appendChild(btnd1)
    tr.appendChild(btnu1)

    return tr
}


let dados = await buscarDados('http://localhost:3000/resultados')

let table = document.querySelector('#tableResultados')

for (let i = 0; i < dados.length; i++) {

    let l = gerarLinha(dados[i])

    table.append(l)

    console.log(dados[i])
}