class IntegerSet {
    constructor(maxNumber) {
        this.maxNumber = maxNumber;
        this.set = new Array();
        for (let i = 0; i < maxNumber; i++) {
            this.set.push(false);
        }
    }

    insere(numero) {
        if (numero > 0 && numero < this.maxNumber) {
            this.set[numero - 1] = true;
        }
    }

    remove(numero) {
        if (numero > 0 && numero < this.maxNumber) {
            this.set[numero - 1] = false;
        }
    }

    getSet(){
        return this.set;
    }

    static uniao(set1, set2) {
        set1 = set1.getSet();
        set2 = set2.getSet();

        let resultado = [];
        let maiorTam = 0;

        if (set1.length > set2.length) {
            maiorTam = set1.length;
        } else {
            maiorTam = set2.length;
        }

        for (let i = 0; i < maiorTam; i++) {
            resultado.push(set1[i] || set2[i]);
        }

        let neoIntSet = new IntegerSet(maiorTam);
        neoIntSet.set = resultado;
        return neoIntSet;
    }

    static intersecao(set1, set2) {
        set1 = set1.getSet();
        set2 = set2.getSet();

        let resultado = [];
        let menorTam = 0;

        if (set1.length > set2.length) {
            menorTam = set2.length;
        } else {
            menorTam = set1.length;
        }


        for (let i = 0; i < menorTam; i++) {
            resultado.push(set1[i] && set2[i]);
        }

        let neoIntSet = new IntegerSet(menorTam);
        neoIntSet.set = resultado;

        return neoIntSet;
    }

    static diferenca(set1, set2) {
        set1 = set1.getSet();
        set2 = set2.getSet();

        let resultado = [];

        for (let i = 0; i < set1.length; i++) {
            resultado.push(set1[i] && !set2[i]);
        }

        let neoIntSet = new IntegerSet(set1.length);
        neoIntSet.set = resultado;

        return neoIntSet;
    }

    toString() {
        let retorno = [];
        for (let i = 0; i < this.set.length; i++) {
            if (this.set[i]) retorno.push(i + 1);
        }
        return retorno.toString();
    }
}

set1 = new IntegerSet(5);
set2 = new IntegerSet(10);

set1.insere(2);
set1.insere(1);
set1.insere(4);

set2.insere(2);
set2.insere(1);
set2.insere(7);
set2.insere(8);
set2.insere(9);
set2.insere(3);

console.log("[SET 1]", set1.toString());
console.log("[SET 2]", set2.toString());

console.log("[UNIAO]", IntegerSet.uniao(set1,set2).toString());
console.log("[INTER]", IntegerSet.intersecao(set1,set2).toString());
console.log("[DIF]", IntegerSet.diferenca(set1,set2).toString());





