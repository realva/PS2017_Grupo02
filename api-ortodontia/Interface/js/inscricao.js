 $(document).ready(function() {
    $('#formularioCadastro').submit(function () {
        var nomeCompleto = $("#nomeCompleto").val();
        var cpf = $("#cpf").val();
        var rg = $("#rg").val();
        var telefone = $("#telefone").val();
        var dataNascimento = $("#dataNascimento").val();
        var cidade = $("#cidade").val();
        var cep = $("#cep").val();
        var estado = $("#estado").val();
        var email = $("#email").val();
        var senha = $("#senha").val();
        var sexo = $( "input:checked" ).val();
        
        var usuario = {
            nome: nomeCompleto,
            sexo: sexo,
            cpf: cpf,
            rg: rg,
            telefone: telefone,
            dataNascimento: dataNascimento,
            cidade: cidade,
            cep: cep,
            estado: estado,
            email: email,
            senha: senha,
        }

        $.ajax({
            url: "http://localhost:8000/api/usuarios",
            type: 'POST',
            async: true,
            data: usuario,  
            success: function(resp){ 
                $("#tituloModal").text("Cadastro concluído");
                $("#conteudoModal").text("Seu cadastro foi efetuado com sucesso!");
                $("#btnFecharModalRedirecionar").show();
                $("#btnFecharModal").hide();
                $("#myModal").modal("show");
            }, 
            error: function(erro){ 
                $("#tituloModal").text("Erro ao cadastrar usuário");
                $("#conteudoModal").text(erro.responseText);
                $("#btnFecharModalRedirecionar").hide();
                $("#btnFecharModal").show();
                $("#myModal").modal("show");
            }  
        });

        return false;
    });

    $("#btnFecharModalRedirecionar").click(function (){
        $(location).attr('href', 'home.html');
    });

    $("#cpf").mask("999.999.999-99");
    $("#rg").mask("99.999.999");
    $("#telefone").mask("(99) 99999-9999");
    $("#cep").mask("99.999-999");
});