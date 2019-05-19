

const choices = ['Pedra', 'Papel', 'Tesoura'];
let score = 0;

while (true) {
    console.log('Escolha sua Jogada:\n1 - PEDRA\n2 - PAPEL\n3 - TESOURA\n');
    let user_choice = parseInt(prompt());
    let compiuter_choice = Math.ceil((Math.random()*3));

    // console.log(user_choice);
    console.log('O computador escolheu: ', choices[compiuter_choice-1]);

    if (user_choice > 3 || user_choice < 1) {
        console.log('Voce perdeu!', 'Pontuação: ', score);
    }

    if (user_choice == compiuter_choice){
        console.log('A rodada empatou!');
    }else if(user_choice == 1 && compiuter_choice == 3){
        score = score + 1;
        console.log('Voce ganhou!');
    } else if (user_choice == 2 && compiuter_choice == 1){
        score = score + 1;
        console.log('Voce ganhou!');
    } else if (user_choice == 3 && compiuter_choice == 2){
        score = score + 1;
        console.log('Voce ganhou!');
    }else{
        console.log('Voce perdeu!', 'Pontuação: ', score);
        break;
    }

}
