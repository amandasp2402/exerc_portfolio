function validateForm(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = parseInt(document.getElementById("idade").value.trim(), 10);

    // Validações
    if (nome.length < 3 || nome.length > 50) {
        alert("O nome deve ter entre 3 e 50 caracteres.");
        return false;
    }
    if (sobrenome.length < 3 || sobrenome.length > 50) {
        alert("O sobrenome deve ter entre 3 e 50 caracteres.");
        return false;
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }
    if (isNaN(idade) || idade <= 0 || idade >= 120) {
        alert("A idade deve ser um número positivo e menor que 120.");
        return false;
    }

    // Passa a validação, salva os dados no sessionStorage
    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("sobrenome", sobrenome);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("idade", idade);

    // Redireciona para a página de confirmação
    window.location.href = "confirmation.html";
    return false;
}

function confirmData() {
    const nome = sessionStorage.getItem("nome");
    const sobrenome = sessionStorage.getItem("sobrenome");
    const email = sessionStorage.getItem("email");
    const idade = sessionStorage.getItem("idade");

    const dados = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        idade: idade
    };

    JSONToFile(dados)

    // Simula salvar os dados (apenas um console.log)
    console.log("Dados salvos:", JSON.stringify(dados));

    // Limpa o sessionStorage e redireciona para a página inicial
    // sessionStorage.clear();
    alert("Dados recebidos com sucesso!");
    window.location.href = "index.html";
}



const JSONToFile = (obj, filename = 'data') => {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  

window.onload = function() {
    const nome = sessionStorage.getItem("nome");
    const sobrenome = sessionStorage.getItem("sobrenome");
    const email = sessionStorage.getItem("email");
    const idade = sessionStorage.getItem("idade");

    if (nome && sobrenome && email && idade) {
        document.getElementById("dados").innerText = 
            `Nome: ${nome}\nSobrenome: ${sobrenome}\nEmail: ${email}\nIdade: ${idade}`;
    }
};