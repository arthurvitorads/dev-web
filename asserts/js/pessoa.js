console.log('funcionou')
console.error('nao funcionou!')

let pessoa = [
    {nome: 'Diogo Muneratto', email: 'diogo@diogo.com'},
    {nome: 'UMFG', email: 'contato@umfg.edu.br'}
];

console.log(pessoa.length)

const $ = (id) => document.getElementById(id);

const modal = new bootstrap.Modal($('exampleModal'))
const tbody = document.getElementById('tbody');

const form = {
    title: $('modalTitle'),
    index: $('editIndex'),
    nome: $('nomeInput'),
    email: $('emailInput')
}

function renderHTML(){
    tbody.innerHTML = '';
    pessoa.forEach((p, index) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${p.nome}</td>
            <td>${p.email}</td>
            <td>
                <button class="btn btn-outline-info" data-index="${index}"><i class="bi bi-pen"></i></button>
                <button class="btn btn-outline-danger" data-index="${index}"><i class="bi bi-trash3"></i></button>
            </td>
        `; 
        tbody.appendChild(tr);
    })
}

function limpaForm(){
    form.nome.value = '';
    form.email.value = '';
}

function abrirModal(index = ''){
    limpaForm();
    form.title.textContent = index === '' ? 'Cadastra' : 'Editar';
    //form.index.value = index;
    if(index !== ''){
        form.nome.value = pessoa[index].nome;
        form.email.value = pessoa[index].email;
        // $('nomeInput').value = pessoa[index].nome;
        // $('emailInput').value = pessoa[index].email;
    }

    modal.show()
}

$('btnAdicionar').addEventListener('click', () => abrirModal())

tbody.addEventListener('click', (event) => {

    const button = event.target.closest('button');
    if(!button) return;

    const index = Number(button.dataset.index);

    if(button.classList.contains('btn-outline-info')){
        abrirModal(index)
    }

})

renderHTML();
