$(function () { // quando o documento estiver pronto/carregado

    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btLogin", function () {
        //pegar dados da tela
        login = $("#campoLogin").val();
        senha = $("#campoSenha").val();
        
        // ao inves desse if tem o $ajax com um suposto backend que verifica la
        if (login == "login-backend" && senha == "senha-backend") {
            // guarda na sessao
            sessionStorage.setItem('login', login);

            // encaminha para a página principal
            window.location = 'principal.html';
        } else {
            alert("Login ou senha inválido(s)!!");
        }        
    });   

});