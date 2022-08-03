let ls = {
    salvar: (colecao, obj) => {
        let colecaoLS = localStorage.getItem(colecao) ? JSON.parse(localStorage.getItem(colecao)) : [];
        colecaoLS.push(obj); 
        localStorage.setItem(colecao, JSON.stringify(colecaoLS));
    },
    listar: colecao => JSON.parse(localStorage.getItem(colecao))            
};

function cadastrar(){
   ls.salvar('produtos', {
            nome: nomeP.value,
            categoria: categoriaP.value, 
            valor: valorP.value
        }); 

    alert("Seu produto já faz parte da nossa banca!");
    nomeP.value = '';
    categoriaP.value = '';
    valorP.value = '';

    document.getElementById('resultado').className = "inv";
}

function buscar(tip){
	let flag = true; 
	let material = ls.listar('produtos') || [];
	let text = document.getElementById("resultado");
	text.innerHTML = ""; 
	
	if(material.length == "")
	{
		text.innerHTML = "Não há nenhum produto cadastrado ainda!"; 
	}
	else{
		material.forEach(obj => {
			if(obj.categoria == tip){
				flag = false;
				text.innerHTML += `Nome: ${obj.nome}<br>
				Categoria: ${obj.categoria} <br>
			 	Valor: ${obj.valor}<br>
			 	<hr>`
			}
		});
		if(flag){
			text.innerHTML = "Produto não disponível, contate nossa equipe (^‿^)╯";
		}
	}
	document.getElementById('resultado').className = "vis";
}

function agendar(){
   ls.salvar('consultas', {
            nome: nomeC.value,
            telefone: telefone.value, 
            email: email.value,
            mensagem: mensagem.value
        }); 

    alert("Você já faz parte da nossa agenda!! espere o nosso contato (^‿^)╯");
    nomeC.value = '';
    telefone.value = '';
    email.value = '';
    mensagem.value = '';
    document.getElementById("editar").className = "inv";
}
let contato = ls.listar('consultas') || [];
let text = document.getElementById("texto");
text.innerHTML = "";
if(contato.length == 0){
	text.innerHTML = "Não há nenhuma consulta agendada!";
	}
	else{
		contato.forEach(obj => {
			text.innerHTML += `Nome: ${obj.nome}<br>
			Telefone: ${obj.telefone} <br>
			E-mail: ${obj.email}<br>
			Mensagem: ${obj.mensagem}<br>
			<hr>`
		});
	}

var posicao_editar=-1;

function editar(op){
	if(op == "1")
	{
		document.getElementById("resultadoEX").className = "inv";
		document.getElementById("apagar").className = "inv";
		document.getElementById("editar").className = "vis";
		var escolha = prompt('Insira o número de telefone');
		let flag = true; 
		let contato = ls.listar('consultas') || [];
		let text = document.getElementById("editar");
		text.innerHTML = ""; 
		
		if(contato.length == 0)
		{
			text.innerHTML = "Não há nenhuma consulta agendada!"; 
		}
		else
		{
			contato.forEach((obj,indice) => {
				if(obj.telefone == escolha)
				{
					flag = false;
					posicao_editar = indice;
					document.getElementById("resultadoE").className = "vis";
				 	nomeE.value = obj.nome;
				 	telefoneE.value =  obj.telefone;
				 	emailE.value =  obj.email;
				 }
			 });
			
			if(flag)
			{
				text.innerHTML = "Consulta não encontrada!"; 
			}
		}
	}
	else
	{
		let contato = ls.listar('consultas') || [];
		contato[posicao_editar].nome= nomeE.value;
		contato[posicao_editar].telefone = telefoneE.value;
		contato[posicao_editar].email = emailE.value;

		localStorage.setItem("consultas", JSON.stringify(contato));
		alert("Atualização realizada com sucesso!");
		document.getElementById("resultadoE").className = "inv";
		document.getElementById("editar").className = "inv";
	}
}
function excluir(op){
	if (op == '1') {
		document.getElementById("resultadoE").className = "inv";
		document.getElementById("editar").className = "inv";
		document.getElementById("apagar").className = "vis";
		var escolha = prompt('Insira o número de telefone');
		let resposta = false;
		let flag = true; 
		let contato = ls.listar('consultas') || [];
		let text = document.getElementById("apagar");
		text.innerHTML = ""; 
		
		if(contato.length == 0)
		{
			text.innerHTML = "Não há nenhuma consulta agendada!"; 
		}
		else {
			contato.forEach((obj,indice) => {
				if(obj.telefone == escolha) {
					flag = false;
					posicao_editar = indice;
					document.getElementById("resultadoEX").className = "vis";
					document.getElementById("valor").innerHTML = "Deseja deletar a consulta de "+contato[posicao_editar].nome+ " ??";
				}
			});
			if(flag){
				text.innerHTML = "Consulta não encontrada!";
			}
		}
	}	
	else {
		let contato = ls.listar('consultas') || [];
		contato.splice(posicao_editar,1);
		localStorage.setItem("consultas", JSON.stringify(contato));
		alert("Contato removido com sucesso!");
		document.getElementById("resultadoEX").className = "inv";
		document.getElementById("apagar").className = "inv";
	}
}

function cancelar() {
	document.getElementById("resultadoE").className = "inv";
	document.getElementById("resultadoEX").className = "inv";
}