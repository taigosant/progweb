module.exports = {
    attributes: {
        jogador: { 
            model: 'User'
         },
        pontuacao: { type: 'number', required: true },
        data: { type: 'string', maxLength: 45 },
    },
};