
const tabuada = () => {

    for (let i = 1; i <= 10; i++){
        let curDiv = `
            <div style="float: left; margin: 5px"> 
                <table border="1">
                    <thead>
                        <tr>
                            <td colspan=2><b>Produtos de ${i}</b></td>
                        </tr>
                    </thead>
                    <tbody>

        `
        for (let j = 1; j <= 10; j++){
            let curRow = `
                <tr>
                    <td>${i}x${j}</td>
                    <td>${i*j}</td>
                </tr>
            `
            curDiv += curRow
        }
        curDiv += `
                    </tbody>
                </table>
            </div>
        `
        document.write(curDiv);
    }
}
