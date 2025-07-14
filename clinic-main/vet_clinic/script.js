const db = {
  animais: [],
  usuarios: [],
  doutores: [],
  consultorios: []
};

function gerarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Cadastro Animal
function cadastrarAnimal() {
  const nome = document.getElementById('animal-nome').value;
  const raca = document.getElementById('animal-raca').value;

  if (!nome || !raca) return mostrarMensagem('Preencha todos os campos do animal.');

  const animal = { id: gerarId(), nome, raca, createdAt: new Date() };
  db.animais.push(animal);
  atualizarSelects();
  mostrarMensagem('Animal cadastrado com sucesso!');
  document.getElementById('animal-nome').value = '';
  document.getElementById('animal-raca').value = '';
}

// Cadastro Usuário
function cadastrarUsuario() {
  const nome = document.getElementById('usuario-nome').value;
  const email = document.getElementById('usuario-email').value;
  const senha = document.getElementById('usuario-senha').value;
  const animalId = document.getElementById('usuario-animal').value;
  const animal = db.animais.find(a => a.id === animalId);

  if (!nome || !email || !senha || !animal) return mostrarMensagem('Preencha todos os campos.');

  const usuario = { id: gerarId(), nome, email, senha, animal, createdAt: new Date() };
  db.usuarios.push(usuario);
  atualizarSelects();
  mostrarMensagem('Usuário cadastrado com sucesso!');
  document.getElementById('usuario-nome').value = '';
  document.getElementById('usuario-email').value = '';
  document.getElementById('usuario-senha').value = '';
}

// Cadastro Doutor
function cadastrarDoutor() {
  const nome = document.getElementById('doutor-nome').value;
  const email = document.getElementById('doutor-email').value;
  const senha = document.getElementById('doutor-senha').value;

  if (!nome || !email || !senha) return mostrarMensagem('Preencha todos os campos do doutor.');

  const doutor = { id: gerarId(), nome, email, senha, createdAt: new Date() };
  db.doutores.push(doutor);
  atualizarSelects();
  mostrarMensagem('Doutor cadastrado com sucesso!');
  document.getElementById('doutor-nome').value = '';
  document.getElementById('doutor-email').value = '';
  document.getElementById('doutor-senha').value = '';
}

// Agendar Consulta
function agendarConsulta() {
  const usuarioId = document.getElementById('consulta-usuario').value;
  const animalId = document.getElementById('consulta-animal').value;
  const doutorId = document.getElementById('consulta-doutor').value;
  const descricao = document.getElementById('consulta-descricao').value;
  const dataInput = document.getElementById('consulta-data').value;
  const horaInput = document.getElementById('consulta-hora').value;

  if (!usuarioId || !animalId || !doutorId || !descricao) {
    mostrarMensagem('Preencha todos os campos obrigatórios.');
    return;
  }

  const usuario = db.usuarios.find(u => u.id === usuarioId);
  const animal = db.animais.find(a => a.id === animalId);
  const doutor = db.doutores.find(d => d.id === doutorId);

  // Se data e hora foram selecionadas, criar um Date com elas
  let dataHoraConsulta;
  if (dataInput && horaInput) {
    dataHoraConsulta = new Date(`${dataInput}T${horaInput}`);
  } else {
    dataHoraConsulta = new Date(); // usa agora
  }

  const consulta = {
    id: gerarId(),
    usuario,
    animal,
    doutor,
    descricao,
    createdAt: dataHoraConsulta
  };

  db.consultorios.push(consulta);
  renderizarConsultas();
  mostrarMensagem('Consulta agendada com sucesso!');

  // Limpar campos
  document.getElementById('consulta-descricao').value = '';
  document.getElementById('consulta-data').value = '';
  document.getElementById('consulta-hora').value = '';
}


 
// Atualiza os selects com opções válidas
function atualizarSelects() {
  const animalSelect = document.getElementById('usuario-animal');
  const animalConsultaSelect = document.getElementById('consulta-animal');
  const usuarioConsultaSelect = document.getElementById('consulta-usuario');
  const doutorConsultaSelect = document.getElementById('consulta-doutor');

  animalSelect.innerHTML = db.animais.map(a => `<option value="${a.id}">${a.nome}</option>`).join('');
  animalConsultaSelect.innerHTML = db.animais.map(a => `<option value="${a.id}">${a.nome}</option>`).join('');
  usuarioConsultaSelect.innerHTML = db.usuarios.map(u => `<option value="${u.id}">${u.nome}</option>`).join('');
  doutorConsultaSelect.innerHTML = db.doutores.map(d => `<option value="${d.id}">${d.nome}</option>`).join('');
}

// Exibe os prontuários na tela
function renderizarConsultas() {
  const lista = document.getElementById('lista-consultas');
  lista.innerHTML = db.consultorios.map(c => `
    <li>
      <strong>Animal:</strong> ${c.animal.nome}<br>
      <strong>Doutor:</strong> ${c.doutor.nome}<br>
      <strong>Dono:</strong> ${c.usuario.nome}<br>
      <strong>Descrição:</strong> ${c.descricao}<br>
      <strong>Data:</strong> ${new Date(c.createdAt).toLocaleString()}
    </li>
  `).join('');
}

// Mensagem animada no centro da tela
function mostrarMensagem(texto) {
  const el = document.getElementById('mensagem');
  el.textContent = texto;
  el.style.display = 'block';
  el.classList.remove('mensagem-sucesso');
  void el.offsetWidth; // força reflow
  el.classList.add('mensagem-sucesso');

  setTimeout(() => {
    el.style.display = 'none';
  }, 2000);
}

function abrirModal() {
  document.getElementById('modal-medico').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal-medico').style.display = 'none';
}

function cadastrarMedico() {
  const nomeMedico = document.getElementById('medico-nome').value;
  const crm = document.getElementById('medico-crm').value;
  const funcionario = document.getElementById('funcionario-nome').value;
  const senha = document.getElementById('funcionario-senha').value;

  if (!nomeMedico || !crm || !funcionario || !senha) {
    mostrarMensagem('Preencha todos os campos.');
    return;
  }

  const novoDoutor = {
    id: gerarId(),
    nome: nomeMedico,
    email: crm + '@clinicaveterinaria.com', // Simulado
    senha: senha,
    createdAt: new Date()
  };

  db.doutores.push(novoDoutor);
  atualizarSelects(); // atualiza o select de agendamento
  mostrarMensagem(`Médico ${nomeMedico} cadastrado com sucesso!`);
  fecharModal();

  // Limpa os campos
  document.getElementById('medico-nome').value = '';
  document.getElementById('medico-crm').value = '';
  document.getElementById('funcionario-nome').value = '';
  document.getElementById('funcionario-senha').value = '';
}

const doutorConsultaSelect = document.getElementById('consulta-doutor');
doutorConsultaSelect.innerHTML = db.doutores.map(d => `<option value="${d.id}">${d.nome}</option>`).join('');
