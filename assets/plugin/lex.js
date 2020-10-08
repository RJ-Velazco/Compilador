function evalLexico(code) {
  return code.split(/\s+/)
          .filter(function (t) { return t.length > 0 })
          .map( token =>{

            if(PR.indexOf(token)>=0){
              return { type: 'PR', value: token }
            }
            else if(TP.indexOf(token)>=0){
                controlador = token;
                return { type: 'TP', value: token }
            }
            else if(OR.indexOf(token) >= 0){
                return { type: 'OR',value: token };
            } else if (OA.indexOf(token) >= 0){
                return { type: 'OA', value: token };
            } else if(OL.indexOf(token) >= 0){
                return { type: 'OL', value: token };
            } else if(EL.indexOf(token) >= 0){
                return { type: 'EL', value: token};
            } else if(token == 'true'){
                return {type: 'boolean', value: true};
            } else if(token == 'false'){
                return {type: 'boolean', value: false};
            } else if(isNaN(token)){
                if(TP.indexOf(controlador) >= 0){
                  controlador = '';
                  return {type: 'VR', value: token}
                }
                return {type: 'texto', value: token};
            } else {
                return {type: 'numero', value: token};
            }

        });
}
