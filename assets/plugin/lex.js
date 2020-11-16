function evalLexico(code) {
    // Clasificamos los componentes gramaticales en "Tokens"
    return code.split(/\s+/)
        .filter(function(t) { return t.length > 0 })
        .map(token => {
            // console.log(token + " " + token.endsWith('\n'));
            if (PR.indexOf(token) >= 0) {
                if (texto) textErr();
                return { type: 'PR', value: token };
            } else if (TP.indexOf(token) >= 0) {
                if (texto) textErr();
                controlador = token;
                return { type: 'TP', value: token }
            } else if (OR.indexOf(token) >= 0) {
                if (texto) textErr();
                if (token == '&gt') { return { type: 'OR', value: '>' }; } else if (token == '&lt') { return { type: 'OR', value: '<' }; }
                return { type: 'OR', value: token };
            } else if (OA.indexOf(token) >= 0) {
                if (texto) textErr();
                return { type: 'OA', value: token };
            } else if (OL.indexOf(token) >= 0) {
                if (texto) textErr();
                return { type: 'OL', value: token };
            } else if (EL.indexOf(token) >= 0) {
                if (texto) textErr();
                return { type: 'EL', value: token };
            } else if (token == 'true') {
                if (texto) textErr();
                return { type: 'boolean', value: true };
            } else if (token == 'false') {
                if (texto) textErr();
                return { type: 'boolean', value: false };
            } else if (isNaN(token)) {
                if (TP.indexOf(controlador) >= 0 || variables[token]) {
                    controlador = '';

                    if (token.match(regexVariables) === null) {
                        throw new Error(`La variable ${token} esta mal definida. Las variables deben empezar por una letra.`)
                    };
                    // Instanciamos las variables del Programa.
                    if (!variables[token]) {
                        variables[token] = {
                            variable: token,
                            codigo: 1
                        };
                    };
                    //   variables[].
                    return { type: 'VR', value: token }
                } else {
                    init = token.startsWith('"');
                    if (!init && noTextAnlz) {
                        throw new Error('El texto debe empezar con unas comillas dobles ( " )');
                    } else if (init && noTextAnlz) {
                        if (token.endsWith('"')) {
                            token = token.replace(/"/g, "");
                            noTextAnlz = true;
                            return { type: 'texto', value: token };
                        } else {
                            token = token.substring(1);
                            texto = texto + token + " ";
                            noTextAnlz = false;
                        }
                    } else {
                        if (token.includes('"')) {
                            let idx = token.indexOf('"');
                            noTextAnlz = true;
                            token = texto + token.substr(0, idx);
                            texto = '';
                            return { type: 'texto', value: token };
                        }
                        texto = texto + token + " ";
                    }

                }
            } else {
                if (texto) textErr();
                if (TP.indexOf(controlador) >= 0) {
                    controlador = '';
                    throw new Error(`Las variables deben empezar por una letra.`)
                }
                return { type: 'numero', value: token };
            };
        });
}

function textErr() {
    texto = '';
    init = false;
    throw new Error('El texto debe terminar con una comilla doble ( " )');
}