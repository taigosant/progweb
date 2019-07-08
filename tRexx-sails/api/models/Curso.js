module.exports = {
    attributes: {
        nome: { type: 'string', required: true , maxLength: 64},
        sigla: { type: 'string', required: true, maxLength: 4, unique: true},
        descricao: { type: 'string', maxLength: 200, allowNull: true },
        alunos: {
            collection: 'User',
            via: 'curso'
        }
    },
};