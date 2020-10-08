const privateStrings = [ 'string', 'number', 'var', 'print', 'for', 'while', 'equal', 'if', 'else', 'then'];

function highlights(text){
  // Aplicar colores a las palabras reservadas
  const mapeo = text.map(item => {
    return item.split(' ').map( d => {
      if(privateStrings.includes(d)){
        return '<span class="highlights">'+d+'</span>'
      }
      return d;
    }).join(' ')
  }).join('<div></div>');

  const nocolor = mapeo.replace(regexColor, '');
  const nocolor2 = nocolor.replace(regexColor2, '');
  data.innerHTML = nocolor2;
}
