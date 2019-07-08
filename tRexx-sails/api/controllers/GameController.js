/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


function getBiggest(obj) {
    let maior = 0;
    for (let jogada of obj.jogadas){
        if (jogada.pontuacao > maior){
            maior = jogada.pontuacao;
        }
    }
    return maior;
}

module.exports = {
    trex: async function (req, res) {
        res.view('pages/game/trex');
    },

    pontuacao: async function (req, res) {
        await Jogada.create({
            pontuacao: req.body.pontuacao,
            jogador: req.me.id
        });
        res.end('Pontuação salva');
    },

    ranking: async function (req, res){
        const data = await User.find().populate('jogadas')
        const ranking = data.map(function(obj){
            return {
                jogador: obj.fullName,
                pontuacao: getBiggest(obj),
                data: new Date(obj.createdAt).toISOString()
            }
        }).sort((a,b)=>{
            return a.pontuacao < b.pontuacao;
        })
        res.view('pages/ranking', {pts: ranking});        
    }
};

