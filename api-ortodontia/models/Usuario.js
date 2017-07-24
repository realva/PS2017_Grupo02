var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UsuarioSchema = new Schema({
    nome: String,
    email: { type: String, unique: true, index: true },
    senha: String,
    cpf: { type: String, maxlength: 14, trim:true},
    rg: { type: String, maxlength: 10, trim:true},
    sexo: { type: String, maxlength: 1, trim:true, uppercase: true },
    telefone: String,
    dataNascimento: Date,
    cidade: String,
    cep: String,
    estado: { type: String, trim:true},
});
 
module.exports = mongoose.model('Usuario', UsuarioSchema);