// David: Código implementado corretamente 
// Nota: 2.0

class Venda {
    constructor(id, quant, valor) {
        this.id = id;
        this.quant = quant;
        this.valor = valor;
    }

    getId() {
        return id;
    }
    setId(id) {
        this.id = id;
    }
    getQuantidade(){
        return this.quant;
    }
    setQuantidade(qt){
        this.quant = qt;
    }
    getValor(){
        return this.valor;
    }
    setValor(val){
        this.valor = val;
    }

    getValorTotal(){
        return this.valor * this.quant;
    }
}

venda1 = new Venda("a1", 2, 6.5);
venda1.setValor(3)
venda2 = new Venda("a2", 5, 2.5);

console.log("[VENDA 1 TOTAL]", venda1.getValorTotal());
console.log("[VENDA 2 TOTAL]", venda2.getValorTotal());

