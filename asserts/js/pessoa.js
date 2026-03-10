const $ = (id) => document.getElementById(id);
const modal = new bootstrap.Modal($('exampleModal'))
const tbody = document.getElementById('tbody');
const campoCep = document.getElementById('cepInput');

let pessoa = [];

var getPessoa = localStorage.getItem('pessoa');
if(getPessoa) {
    pessoa = JSON.parse(getPessoa);
}
    
const form = {
    title: $('modalTitle'),
    index: $('editIndex'),
    nome: $('nomeInput'),
    email: $('emailInput'),
    logr: $('logInput'),
    num: $('numInput'),
    bairro: $('baInput'),
    comp: $('comInput'),
    cidade: $('cidInput'),
    uf: $('ufInput')
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
    form.index.value = '';
    form.nome.value = '';
    form.email.value = '';
    form.logr.value = '';
    form.bairro.value = '';
    form.comp.value = '';
    form.cidade.value = '';
    form.uf.value = '';
}

function abrirModal(index = ''){
    limpaForm();
    form.title.textContent = index === '' ? 'Cadastrar' : 'Editar';
    form.index.value = index;
    if(index !== ''){
        form.nome.value = pessoa[index].nome;
        form.email.value = pessoa[index].email;
        $('nomeInput').value = pessoa[index].nome;
        $('emailInput').value = pessoa[index].email;
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
        return
    }

    if(button.classList.contains('btn-outline-danger')) {
        if(!confirm('Deseja excluir este item')) return;
    }
    pessoa.splice(index, 1);
    localStorage.setItem('pessoa', JSON.stringify(pessoa))
    renderHTML();

})

$('btnSalvar').addEventListener('click', () => {
    const nome  = form.nome.value.trim();
    const email = form.email.value.trim();

    if(!nome || !email) {
        alert('Informe os campos obrigatórios');
        return;
    }
    
    const index = form.index.value;
    index === '' ? pessoa.push({nome, email}) : pessoa[index] = {nome, email};

    localStorage.setItem('pessoa', JSON.stringify(pessoa));
    renderHTML();
    modal.hide();
    limpaForm();

})

$('cepInput').addEventListener('blur', async() => {
    var cep = campoCep.value.replace(/\D/g, '')
    var request = `https://viacep.com.br/ws/${cep}/json/`;

    if(cep === '') {
        limpaForm()
    }

    await fetch(request).then(function(response) {
        return response.json();
      }).then(function(data) {        
        index = form.index.value;
        form.logr.value = data?.logradouro;
        form.bairro.value = data?.bairro
        form.comp.value = data?.complemento
        form.cidade.value = data?.localidade
        form.uf.value = data?.estado
        $('logInput').value = data?.logradouro;
        $('baInput').value = data?.bairro
        $('comInput').value = data?.complemento
        $('cidInput').value = data?.localidade
        $('ufInput').value = data?.estado
        
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
})

renderHTML();
