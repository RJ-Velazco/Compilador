data.addEventListener('blur', function(e) {
    consola.innerHTML = '>';
    const line = data.innerHTML;
    //console.log(line);
    console.clear();

    // Eliminar todas las entidades html.
    const noempty = line.replace(regexDiv, '')
    const nojump = noempty.replace(regexBr, '');
    const datos = nojump.split('<div>');
    highlights(datos);

    // Removemos todo los elementos no deseados de la sintaxis del programa.
    const lexico = datos.map(i => {
        // Eliminar los ';'
        const item = i.replace(regexEx, '\n ');
        const nospan = item.replace(regexSpan, '\n');
        const nospan2 = nospan.replace(regexSpan2, '\n');

        // Eliminar los '&nbsp'
        const nondbsp = nospan2.replace(nospace, '');

        // Separar los OR y EL
        const serpararAs = nondbsp.replace(asignador, ' = ');

        const optimoAbrir = serpararAs.replace(apertura, ' ( ');
        const optimoCerra = optimoAbrir.replace(cierre, ' ) ');

        return optimoCerra;
    }).join(' ');

    // Llamos la función para realizar el análisis léxico.
    try {
        const lexResult = evalLexico(lexico).filter((token) => {
            if(token) return token;
        });
        console.log(lexResult);
        const sinResult = evalSintactico(lexResult);
        console.log(sinResult)
        consola.innerHTML = ('> ')
        evalSemantico(sinResult)
    } catch (e) {
      console.log(e);
        consola.innerHTML = ('> Error: ' + e.message);
    }
})
