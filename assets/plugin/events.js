data.addEventListener('blur', function(e){
  const line = data.innerHTML;
  //console.log(line);

  // Eliminar todas las entidades html.
  const noempty = line.replace(regexDiv, '')
  const nojump = noempty.replace(regexBr, '');
  const datos = nojump.split('<div>');
  highlights(datos);

  const lexico = datos.map(i => {
    // Eliminar los ';'
    const item = i.replace(regexEx, '');
    const nospan = item.replace(regexSpan, '');
    const nospan2 = nospan.replace(regexSpan2, '');

    return nospan2
  }).join(' ');

  // controlador  = evalLexico(lexico);
  // console.log(controlador);
  //console.log(evalLexico(lexico));
  console.log(evalSintactico(lexico));
})
