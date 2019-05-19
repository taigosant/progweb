
const counter = (initValue) => {
    let count = initValue;

    return () => { 
        count++; 
        return count;
    }
}

var incrementar = counter(1);

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());