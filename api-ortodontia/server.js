//Base de configurações e rotas da api:
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Configurando criptografia para ser usada nas senhas
//==============================================================
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

//Iniciando o Servidor (Aplicação):
//==============================================================
var port = process.env.PORT || 8000;
app.listen(port);

//Configuração base de dados da Aplicação:
//====================================================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:xexuto65@ds013366.mlab.com:13366/data');

//Model
//======================================================================
var Usuario = require('./models/Usuario');



//Rotas da API:
//==============================================================

//Aqui irá pegar as instâncias das Rotas do Express 
var router = express.Router();

//Interceptando requisições e adicionando cors
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Todas as rotas serão prefixadas com '/api'
app.use('/api', router);

router.get('/', function (req, res) {
    res.json("Teste");
});

router.route('/usuarios')
    .post(function (req, res) {
        var usuario = new Usuario();

        usuario.nome            = req.body.nome;
        usuario.email           = req.body.email;
        usuario.senha           = bcrypt.hashSync(req.body.senha, salt);
        usuario.rg              = req.body.rg;
        usuario.sexo            = req.body.sexo;
        usuario.telefone        = req.body.telefone;
        usuario.dataNascimento  = req.body.dataNascimento;
        usuario.cidade          = req.body.cidade;
        usuario.cep             = req.body.cep;
        usuario.estado          = req.body.estado;

        usuario.save(function (error) {
            if (error){
                if(error.code && error.code == "11000"){
                    res.status(400).send("E-mail já cadastrado, por favor informe outro e-mail, ou tente recuperar sua senha!");    
                }
                res.status(400).send(error);
            }

            res.json({ message: 'Usuário criado!' });
        });
    })

    .get(function (req, res) {
        Usuario.find(function (err, usuarios) {
            if (err)
                res.send(err);

            res.json(usuarios);
        });
    });

router.route('/usuarios/:usuario_id')
    .get(function (req, res) {
        Usuario.findById(req.params.usuario_id, function (error, usuario) {
            if (error)
                res.send(error);

            res.json(usuario);
        });
    })
    .put(function (req, res) {
        Usuario.findById(req.params.usuario_id, function (error, usuario) {
            if (error)
                res.send(error);

            usuario.nome            = req.body.nome;
            usuario.email           = req.body.email;
            usuario.senha           = bcrypt.hashSync(req.body.senha, salt);
            usuario.rg              = req.body.rg;
            usuario.sexo            = req.body.sexo;
            usuario.telefone        = req.body.sexo;
            usuario.dataNascimento  = req.body.dataNascimento;
            usuario.cidade          = req.body.cidade;
            usuario.cep             = req.body.cep;
            usuario.estado          = req.body.estado;

            usuario.save(function (error) {
                if (error)
                    res.send(error);

                res.json({ message: 'Usuário Atualizado!' });
            });
        });
    })
    .delete(function(req, res) {
        Usuario.remove({
        _id: req.params.usuario_id
        }, function(error) {
            if(error)
                res.send(error);
 
            res.json({ message: 'Usuário excluído com Sucesso! '});
        });
    });

router.route('/autenticar')
    .post(function (req, res) {
        var senhaCrip = bcrypt.hashSync(req.body.senha, salt);
        Usuario.find({email: req.body.email, senha: senhaCrip}, function (error, usuario) {
            if (error)
                res.status(400).send(error);
            if(usuario && usuario.length > 0){
                res.json(usuario);
            }
            res.status(400).send("Email ou senha inválidos!");
        });
    });