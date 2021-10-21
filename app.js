//VARIABLES PARA AUTOMATA 1
var alfabetoAutomata1 = [];
var alfabeto1 = [];
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);
var arrayIdEstados = [];
var arrayLabelEstados = [];
var arrayEventos = [];
var arrayEstadosFinales = [];
var container = document.getElementById('automataDiv');
var data = {
  nodes: nodes,
  edges: edges
};
var estadosVacios = [];

//VARIABLES PARA AUTOMATA 2
var alfabetoAutomata2 = [];
var alfabeto2 = [];
var nodes2 = new vis.DataSet([]);
var edges2 = new vis.DataSet([]);
var arrayIdEstados2 = [];
var arrayLabelEstados2 = [];
var arrayEventos2 = [];
var arrayEstadosFinales2 = [];
var container2 = document.getElementById('automataDiv2');
var data2 = {
  nodes: nodes2,
  edges: edges2
};
//VARIABLES PARA AUTOMATA 3
var nodes3 = new vis.DataSet([]);
var edges3 = new vis.DataSet([]);
var arrayEventos3 = [];
var arrayIdEstados3 = [];
var containerResultados = document.getElementById('resultados-automata');
var dataResultados = {
  nodes: nodes3,
  edges: edges3
};

//VARIABLE PARA SIMPLIFICAR AFD
var matrizSimp = new Array();


//LOCALES PARA TODOS LOS AUTOMATAS
var locales = {
    en: {
        edit:"Editar",
        del:"Eliminar selección",
        back:"Volver",
        addNode:"Agregar Estado",
        addEdge:"Agregar Transición",
        editNode:"Editar Nodo",
        editEdge:"Editar Arista",
        addDescription:"Click en un espacio vacío para agregar un estado",
        edgeDescription:"Click sobre estado-origen y arrastrar hasta estado-final para conectarlos",
        editEdgeDescription:""
    }
};

//OPTIONS PARA AUTOMATA 1
var options = {
    autoResize:true,
    height:'100%',
    width:'100%',
    locale: 'en',
    locales: locales,
    clickToUse: true,
    configure:{
        enabled:false,
        filter: 'nodes,edges',
        showButton:true
    },
    edges:{
        length:300,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow"
          },
          middle: {
            enabled: true,
            scaleFactor: 1,
            type: "image"
          },
          from: {
            enabled: false,
            scaleFactor: 1,
            type: "arrow"
          }
        },
    },
    interaction:{
        dragNodes:true,
        dragView:true,
        hover:true,
        multiselect:true,
        navigationButtons:false
    },
    manipulation:{
        enabled:true,
        initiallyActive: true,
        addNode: function(data, callback){
            var span = document.getElementById('operation-state');
            var nodeSaveButton = document.getElementById('saveButton-state');
            var nodeCancelButton = document.getElementById('cancelButton-state');
            var node_div = document.getElementById('state-popUp');
            span.innerHTML = "Añadir Estado";
            nodeSaveButton.onclick = nodeSaveData.bind(this,data,callback);
            nodeCancelButton.onclick = nodeClearPopUp.bind();
            node_div.style.display = 'block';
        },
        addEdge: function(data, callback){
            var edgeSpan = document.getElementById('operation-transition');
            var edgeSaveButton = document.getElementById('saveButton-transition');
            var edgeCancelButton = document.getElementById('cancelButton-transition');
            var edge_div = document.getElementById('transition-popUp');
            edgeSpan.innerHTML = "Añadir Transición";
            edgeSaveButton.onclick = edgeSaveData.bind(this,data,callback);
            edgeCancelButton.onclick = edgeClearPopUp.bind();
            edge_div.style.display = 'block';
        }, 
        editEdge:false,   
        deleteNode:true,
        deleteEdge:false
    }
};
//OPTIONS PARA AUTOMATA 2
var options2 = {
  autoResize:true,
  height:'100%',
  width:'100%',
  locale: 'en',
  locales: locales,
  clickToUse: true,
  configure:{
      enabled:false,
      filter: 'nodes,edges',
      showButton:true
  },
  edges:{
      length:180,
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 1,
          type: "arrow"
        },
        middle: {
          enabled: true,
          scaleFactor: 1,
          type: "image"
        },
        from: {
          enabled: false,
          scaleFactor: 1,
          type: "arrow"
        }
      },
  },
  interaction:{
      dragNodes:true,
      dragView:true,
      hover:true,
      multiselect:true,
      navigationButtons:false
  },
  manipulation:{
      enabled:true,
      initiallyActive: true,
      addNode: function(data2, callback){
          var span = document.getElementById('operation-state');
          var nodeSaveButton = document.getElementById('saveButton-state');
          var nodeCancelButton = document.getElementById('cancelButton-state');
          var node_div = document.getElementById('state-popUp');
          span.innerHTML = "Añadir Estado";
          nodeSaveButton.onclick = nodeSaveData.bind(this,data2,callback);
          nodeCancelButton.onclick = nodeClearPopUp.bind();
          node_div.style.display = 'block';
      },
      addEdge: function(data2, callback){
          var edgeSpan = document.getElementById('operation-transition');
          var edgeSaveButton = document.getElementById('saveButton-transition');
          var edgeCancelButton = document.getElementById('cancelButton-transition');
          var edge_div = document.getElementById('transition-popUp');
          edgeSpan.innerHTML = "Añadir Transición";
          edgeSaveButton.onclick = edgeSaveData.bind(this,data2,callback);
          edgeCancelButton.onclick = edgeClearPopUp.bind();
          edge_div.style.display = 'block';
      }, 
      editEdge:false,   
      deleteNode:true,
      deleteEdge:false
  }
};
//OPTIONS AUTOMATA-RESULTADOS
var optionsResultados = {
  autoResize:true,
  height:'100%',
  width:'100%',
  locale: 'en',
  locales: locales,
  clickToUse: true,
  configure:{
      enabled:false,
      filter: 'nodes,edges',
      showButton:true
  },
  edges:{
      length:180,
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 1,
          type: "arrow"
        },
        middle: {
          enabled: true,
          scaleFactor: 1,
          type: "image"
        },
        from: {
          enabled: false,
          scaleFactor: 1,
          type: "arrow"
        }
      },
  },
  interaction:{
      dragNodes:true,
      dragView:true,
      hover:true,
      multiselect:true,
      navigationButtons:false
  },
  manipulation:{
      enabled:false,
      initiallyActive: true,    
      deleteNode:false,
      deleteEdge:false
  }
};

//AUTOMATA 1
var network = new vis.Network(container, data, options);
//AUTOMATA 2
var network2 = new vis.Network(container2, data2, options2);

//GUARDAR ALFABETO AUTOMATA 1
function guardarAlfabeto(){
    alfabetoAutomata1 = document.getElementById('alfabeto-automata1').value;
    alfabeto1 = alfabetoAutomata1.split(';');
    alfabeto1.sort();
    if(alfabeto1.length < 2){
      alert("El alfabeto ingresado es muy corto. Vuelva a intentarlo.");
      return false;
    }
    else{
      alert("Alfabeto ingresado correctamente. Alfabeto: " + alfabeto1);
      return true;
    }
}
//GUARDAR ALFABETO AUTOMATA 2
function guardarAlfabeto2(){
  alfabetoAutomata2 = document.getElementById('alfabeto-automata2').value;
  alfabeto2 = alfabetoAutomata2.split(';');
  alfabeto2.sort();
  if(alfabeto2.length < 2){
    alert("El alfabeto ingresado es muy corto. Vuelva a intentarlo.");
    return false;
  }
  else{
    alert("Alfabeto ingresado correctamente. Alfabeto: " + alfabeto2);
    return true;
  }
}

//A1
function nodeClearPopUp() {
    var nodeSaveButton = document.getElementById('saveButton-state');
    var nodeCancelButton = document.getElementById('cancelButton-state');
    nodeSaveButton.onclick = null;
    nodeCancelButton.onclick = null;
    var node_div = document.getElementById('state-popUp');
    node_div.style.display = 'none';
}
//A2
function nodeClearPopUp2() {
  var nodeSaveButton = document.getElementById('saveButton-state2');
  var nodeCancelButton = document.getElementById('cancelButton-state2');
  nodeSaveButton.onclick = null;
  nodeCancelButton.onclick = null;
  var node_div = document.getElementById('state-popUp2');
  node_div.style.display = 'none';
}

//A1
function nodeSaveData(data,callback) {
    var nodeIdInput = document.getElementById('state-id');
    var finalState = document.getElementById('state-final').value;
    data.id = nodeIdInput.value;
    if(alfabeto1.length == 0){
      alert("CUIDADO! Aun no se ha ingresado el alfabeto. Ingresa el alfabeto y vuelve a intentarlo");
      return null;
    }
    else{
      if((finalState == 'si') || (finalState == 'SI') || (finalState == 'Si') || (finalState == 'no') || (finalState == 'NO') || (finalState == 'No')){
        if(nodes.length == 0){
          if(finalState == 'si'){
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value+": Estado Inicial y Estado Final", title:"Estado Inicial y Final"});
            arrayEstadosFinales.push(1);
            arrayLabelEstados.push(data.id);
          }
          else{
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value + ": Estado Inicial", title:"Estado Inicial"});
            arrayEstadosFinales.push(0);
            arrayLabelEstados.push(data.id);
          }
        }
        else{
          if(finalState == 'si'){
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value + ": Estado Final", title:"Estado Final"});
            arrayEstadosFinales.push(1);
            arrayLabelEstados.push(data.id);
          }
          else{
            arrayIdEstados.push(nodes.length);
            nodes.add({id:nodes.length, label:nodeIdInput.value});
            arrayEstadosFinales.push(0);
            arrayLabelEstados.push(data.id);
          }
        }
        nodeClearPopUp();
        callback(data);
      }
      else{
        alert("Se debe indicar si el estado ingresado es final o no. Ingrese 'si' o 'no'.");
        return null;
      }
    }
}
//A2
function nodeSaveData2(data2,callback) {
  var nodeIdInput = document.getElementById('state-id2');
  var finalState = document.getElementById('state-final2').value;
  data2.id = nodeIdInput.value;
  if(alfabeto2.length == 0){
    alert("CUIDADO! Aun no se ha ingresado el alfabeto. Ingresa el alfabeto y vuelve a intentarlo");
    return null;
  }
  else{
    if((finalState == 'si') || (finalState == 'SI') || (finalState == 'Si') || (finalState == 'no') || (finalState == 'NO') || (finalState == 'No')){
      if(nodes2.length == 0){
        if(finalState == 'si'){
          nodes2.add({id:nodes2.length, label:nodeIdInput.value+": Estado Inicial y Estado Final", title:"Estado Inicial y Final"});
          arrayEstadosFinales2.push(1);
        }
        else{
          nodes2.add({id:nodes2.length, label:nodeIdInput.value + ": Estado Inicial", title:"Estado Inicial"});
          arrayEstadosFinales2.push(0);
        }
      }
      else{
        if(finalState == 'si'){
          nodes2.add({id:nodes2.length, label:nodeIdInput.value + ": Estado Final", title:"Estado Final"});
          arrayEstadosFinales2.push(1);
        }
        else{
          nodes2.add({id:nodes2.length, label:nodeIdInput.value});
          arrayEstadosFinales2.push(0);
        }
      }
      arrayIdEstados2.push(data2.id);
      arrayLabelEstados2.push(data2.label);
      nodeClearPopUp2();
      callback(data);
    }
    else{
      alert("Se debe indicar si el estado ingresado es final o no. Ingrese 'si' o 'no'.");
      return null;
    }
  }
}

//A1
function edgeClearPopUp(){
    var edgeSaveButton = document.getElementById('saveButton-transition');
    var edgeCancelButton = document.getElementById('cancelButton-transition');
    edgeSaveButton.onclick = null;
    edgeCancelButton.onclick = null;
    var edge_div = document.getElementById('transition-popUp');
    edge_div.style.display = 'none';
}
//A2
function edgeClearPopUp2(){
  var edgeSaveButton = document.getElementById('saveButton-transition2');
  var edgeCancelButton = document.getElementById('cancelButton-transition2');
  edgeSaveButton.onclick = null;
  edgeCancelButton.onclick = null;
  var edge_div = document.getElementById('transition-popUp2');
  edge_div.style.display = 'none';
}

//A1
function edgeSaveData(data,callback){
    var edgeLabelInput = document.getElementById('transition-label');
    data.label = edgeLabelInput.value;
    if(edgeLabelInput.length > 1){
      alert("Solo se permite ingresar un caracter.");
      return null;
    }
    else{
      if(alfabeto1.includes(data.label)){
        arrayEventos.push({from:data.from, to:data.to, evento:data.label});
      }
      else{
        alert("El evento ingresado no pertenece al alfabeto. Intente nuevamente.");
        return null;
      }
      edgeClearPopUp();
      callback(data);
    }
}
//A2
function edgeSaveData2(data2,callback){
  var edgeLabelInput = document.getElementById('transition-label2');
  data2.label = edgeLabelInput.value;
  if(edgeLabelInput.length > 1){
    alert("Solo se permite ingresar un caracter.");
    return null;
  }
  else{
    if(alfabeto2.includes(data2.label)){
      arrayEventos2.push({from:data2.from, to:data2.to, evento:data2.label});
    }
    else{
      alert("El evento ingresado no pertenece al alfabeto. Intente nuevamente.");
      return null;
    }
    edgeClearPopUp2();
    callback(data2);
  }
}

//A1
function transicionesVacias(){
  var estadoVerificado;
  var arrayAux = [];
  var estadosVacios = [];

  for(let i=0; i<nodes.length; i++){
    estadoVerificado = arrayIdEstados[i];
    for(let j=0; j<arrayEventos.length; j++){
      if((estadoVerificado == arrayEventos[j].from) && (arrayEventos[j].evento == '?')){
        arrayAux.push(arrayEventos[j].to);
      }
    }
    arrayAux.sort();
    estadosVacios[i] = new Array();
    for(let k=0; k<arrayAux.length; k++){
      estadosVacios[i][k] = arrayAux[k];
    }
    arrayAux = [];
  }
  let varAux = 0;
  while(varAux < estadosVacios.length){
    for(let l=0; l<estadosVacios.length; l++){
      for(let m=0; m<estadosVacios[l].length; m++){
        if((varAux != l) && (varAux == estadosVacios[l][m]) && (estadosVacios[varAux].length != 0)){
          for(let o=0; o<estadosVacios[varAux].length; o++){
            let elemento = estadosVacios[varAux][o];
            if(!estadosVacios[l].includes(estadosVacios[varAux][o])){
              estadosVacios[l].push(elemento);
            }
          }
        }
      }
      estadosVacios[l].sort();
    }
    varAux++;
  }
  
  return estadosVacios;
}
//A2
function transicionesVacias2(){
  var estadoVerificado;
  var arrayAux = [];
  var estadosVacios = [];

  for(let i=0; i<nodes2.length; i++){
    estadoVerificado = arrayIdEstados2[i];
    for(let j=0; j<arrayEventos2.length; j++){
      if((estadoVerificado == arrayEventos2[j].from) && (arrayEventos2[j].evento == '?')){
        arrayAux.push(arrayEventos2[j].to);
      }
    }
    arrayAux.sort();
    estadosVacios[i] = new Array();
    for(let k=0; k<arrayAux.length; k++){
      estadosVacios[i][k] = arrayAux[k];
    }
    arrayAux = [];
  }
  let varAux = 0;
  while(varAux < estadosVacios.length){
    for(let l=0; l<estadosVacios.length; l++){
      for(let m=0; m<estadosVacios[l].length; m++){
        if((varAux != l) && (varAux == estadosVacios[l][m]) && (estadosVacios[varAux].length != 0)){
          for(let o=0; o<estadosVacios[varAux].length; o++){
            let elemento = estadosVacios[varAux][o];
            if(!estadosVacios[l].includes(estadosVacios[varAux][o])){
              estadosVacios[l].push(elemento);
            }
          }
        }
      }
      estadosVacios[l].sort();
    }
    varAux++;
  }

  return estadosVacios;
}

//A1
function tablaDeTransiciones(){
  var tablaTransiciones = [];
  var letraAlfabeto;
  var idEstado;

  for(let i=0; i<arrayIdEstados.length; i++){
    idEstado = arrayIdEstados[i];
    tablaTransiciones[i] = new Array();
    for(let j=0; j<alfabeto1.length; j++){
      letraAlfabeto = alfabeto1[j];
      tablaTransiciones[i][j] = new Array();
      for(let k=0; k<arrayEventos.length; k++){
        if((idEstado == arrayEventos[k].from) && (letraAlfabeto == arrayEventos[k].evento)){
          tablaTransiciones[i][j].push(arrayEventos[k].to);
        }
      }
    }
  }

  return tablaTransiciones;
}
//A2
function tablaDeTransiciones2(){
  var tablaTransiciones = [];
  var letraAlfabeto;
  var idEstado;

  for(let i=0; i<arrayIdEstados2.length; i++){
    idEstado = arrayIdEstados[i];
    tablaTransiciones[i] = new Array();
    for(let j=0; j<alfabeto2.length; j++){
      letraAlfabeto = alfabeto2[j];
      tablaTransiciones[i][j] = new Array();
      for(let k=0; k<arrayEventos2.length; k++){
        if((idEstado == arrayEventos2[k].from) && (letraAlfabeto == arrayEventos2[k].evento)){
          tablaTransiciones[i][j].push(arrayEventos2[k].to);
        }
      }
    }
  }

  return tablaTransiciones;
}

//HACE EL AFD EQUIVALENTE A PARTIR DE UN AFND
function transformarAfnd(){
  var tabTrans = tablaDeTransiciones();
  var tabTransVac = transicionesVacias();
  var tabTransAfdEquivalente = [];
  var eventoEvaluado;
  var estadoInicial = [];
  var nuevoEstado = [];
  var arrayIdEstados3 = [];
  var idEvaluado = [];
  var varAux = [];

  estadoInicial.push(arrayIdEstados[0]);
  if(tabTransVac[0].length != 0){
    for(let a=0; a<tabTransVac[0].length; a++){
      estadoInicial.push(tabTransVac[0][a]);
    }
  }
  arrayIdEstados3[0] = new Array();
  for(let b=0; b<estadoInicial.length; b++){
    arrayIdEstados3[0].push(estadoInicial[b]);
  }

  for(let i=0; i<arrayIdEstados3.length; i++){
    idEvaluado = arrayIdEstados3[i];
    tabTransAfdEquivalente[i] = new Array();
    for(let j=0; j<alfabeto1.length; j++){
      eventoEvaluado = alfabeto1[j];
      if(eventoEvaluado != '?'){
        for(let k=0; k<idEvaluado.length; k++){
          varAux = tabTrans[idEvaluado[k]][j];
          for(let l=0; l<varAux.length; l++){
            if(!nuevoEstado.includes(varAux[l])){
              nuevoEstado.push(varAux[l]);
            }
          }
          varAux = [];
          for(let m=0; m<nuevoEstado.length; m++){
            varAux = tabTransVac[m];
            for(let n=0; n<varAux.length; n++){
              if(!nuevoEstado.includes(varAux[n])){
                nuevoEstado.push(varAux[n]);
              }
            }
          }            
        }
        nuevoEstado.sort();
        varAux = [];
        let aux = 0;
        let aux2 = 0;
        for(let o=0; o<arrayIdEstados3.length; o++){
          varAux = arrayIdEstados3[o];
          if(varAux.length == nuevoEstado.length){
            for(let q=0; q<varAux.length; q++){
              if(varAux[q] == nuevoEstado[q]){
                aux++;
              }
            }
            if(aux == varAux.length){
              aux2++;
            }
          }
        }
        if(aux2 == 0){
          var cont = arrayIdEstados3.length;
          arrayIdEstados3[cont] = new Array();
          for(let p=0; p<nuevoEstado.length; p++){
            arrayIdEstados3[cont].push(nuevoEstado[p]);
          }  
        }
        if(j == 0){
          tabTransAfdEquivalente[i][j] = new Array();
          tabTransAfdEquivalente[i][j].push(nuevoEstado);
        }
        else{
          tabTransAfdEquivalente[i][j-1] = new Array();
          tabTransAfdEquivalente[i][j-1].push(nuevoEstado);
        }
        nuevoEstado = [];
      }
    }
  }

  for(let r=0; r<arrayIdEstados3.length; r++){
    if(r == 0){
      nodes3.add({id:r, label:arrayIdEstados3[r].toString()+": Estado Inicial"});
    }
    else{
      nodes3.add({id:r, label:arrayIdEstados3[r].toString()});
    }
  }

  if(alfabeto1.includes('?')){
    for(let f=0; f<tabTransAfdEquivalente.length; f++){
      for(let g=0; g<tabTransAfdEquivalente[f].length; g++){
        let idAux = tabTransAfdEquivalente[f][g];
        for(let h=0; h<arrayIdEstados3.length; h++){
          if(idAux == arrayIdEstados3[h]){
            edges3.add({from:f, to:h, label:alfabeto1[g+1].toString()});
          }
        }
      }
    }
  }
  else{
    for(let f=0; f<tabTransAfdEquivalente.length; f++){
      for(let g=0; g<tabTransAfdEquivalente[f].length; g++){
        let idAux = tabTransAfdEquivalente[f][g];
        for(let h=0; h<arrayIdEstados3.length; h++){
          if(idAux == arrayIdEstados3[h]){
            edges3.add({from:f, to:h, label:alfabeto1[g].toString()});
          }
        }  
      }
    }
  }  

 var network3 = new vis.Network(containerResultados, dataResultados, optionsResultados);
}

function transformarAfnd2(){
  var tabTrans = tablaDeTransiciones2();
  var tabTransVac = transicionesVacias2();
  var tabTransAfdEquivalente = [];
  var eventoEvaluado;
  var estadoInicial = [];
  var nuevoEstado = [];
  var arrayIdEstados3 = [];
  var idEvaluado = [];
  var varAux = [];

  estadoInicial.push(arrayIdEstados2[0]);
  if(tabTransVac[0].length != 0){
    for(let a=0; a<tabTransVac[0].length; a++){
      estadoInicial.push(tabTransVac[0][a]);
    }
  }
  arrayIdEstados3[0] = new Array();
  for(let b=0; b<estadoInicial.length; b++){
    arrayIdEstados3[0].push(estadoInicial[b]);
  }

  for(let i=0; i<arrayIdEstados3.length; i++){
    idEvaluado = arrayIdEstados3[i];
    tabTransAfdEquivalente[i] = new Array();
    for(let j=0; j<alfabeto2.length; j++){
      eventoEvaluado = alfabeto2[j];
      if(eventoEvaluado != '?'){
        for(let k=0; k<idEvaluado.length; k++){
          varAux = tabTrans[idEvaluado[k]][j];
          for(let l=0; l<varAux.length; l++){
            if(!nuevoEstado.includes(varAux[l])){
              nuevoEstado.push(varAux[l]);
            }
          }
          varAux = [];
          for(let m=0; m<nuevoEstado.length; m++){
            varAux = tabTransVac[m];
            for(let n=0; n<varAux.length; n++){
              if(!nuevoEstado.includes(varAux[n])){
                nuevoEstado.push(varAux[n]);
              }
            }
          }            
        }
        nuevoEstado.sort();
        varAux = [];
        let aux = 0;
        let aux2 = 0;
        for(let o=0; o<arrayIdEstados3.length; o++){
          varAux = arrayIdEstados3[o];
          if(varAux.length == nuevoEstado.length){
            for(let q=0; q<varAux.length; q++){
              if(varAux[q] == nuevoEstado[q]){
                aux++;
              }
            }
            if(aux == varAux.length){
              aux2++;
            }
          }
        }
        if(aux2 == 0){
          var cont = arrayIdEstados3.length;
          arrayIdEstados3[cont] = new Array();
          for(let p=0; p<nuevoEstado.length; p++){
            arrayIdEstados3[cont].push(nuevoEstado[p]);
          }  
        }
        if(j == 0){
          tabTransAfdEquivalente[i][j] = new Array();
          tabTransAfdEquivalente[i][j].push(nuevoEstado);
        }
        else{
          tabTransAfdEquivalente[i][j-1] = new Array();
          tabTransAfdEquivalente[i][j-1].push(nuevoEstado);
        }
        nuevoEstado = [];
      }
    }
  }

  for(let r=0; r<arrayIdEstados3.length; r++){
    if(r == 0){
      nodes3.add({id:r, label:arrayIdEstados3[r].toString()+": Estado Inicial"});
    }
    else{
      nodes3.add({id:r, label:arrayIdEstados3[r].toString()});
    }
  }

  if(alfabeto2.includes('?')){
    for(let f=0; f<tabTransAfdEquivalente.length; f++){
      for(let g=0; g<tabTransAfdEquivalente[f].length; g++){
        let idAux = tabTransAfdEquivalente[f][g];
        for(let h=0; h<arrayIdEstados3.length; h++){
          if(idAux == arrayIdEstados3[h]){
            edges3.add({from:f, to:h, label:alfabeto2[g+1]});
          }
        }
      }
    }
  }
  else{
    for(let f=0; f<tabTransAfdEquivalente.length; f++){
      for(let g=0; g<tabTransAfdEquivalente[f].length; g++){
        let idAux = tabTransAfdEquivalente[f][g];
        for(let h=0; h<arrayIdEstados3.length; h++){
          if(idAux == arrayIdEstados3[h]){
            edges3.add({from:f, to:h, label:alfabeto2[g]});
          }
        }
  
      }
    }
  }
  

 var network3 = new vis.Network(containerResultados, dataResultados, optionsResultados);
}
//########################################################################################################
//########################################################################################################

function equivalencia(estado1,estado2){
  //Para sacar posibles estados compatibles dejarlos en 1 y los no compatibles en 0
   if(arrayEstadosFinales[estado1]==0&&arrayEstadosFinales[estado2]==0){
    return 1;
   } 
   else if(arrayEstadosFinales[estado1]==1&&arrayEstadosFinales[estado2]==1){   
    return 1;
   }
   else{
      return 0;
   } 
}

function compatible(estado1,estado2){
    arrayEstado1= new Array ();
    arrayEstado2= new Array();
    for(let i=0; i<arrayEventos.length;i++){
      if(arrayEventos[i].from == estado1 ){
        arrayEstado1.push({from:arrayEventos[i].from, to:arrayEventos[i].to, evento:arrayEventos[i].evento});
      }
      else if(arrayEventos[i].from == estado2){
        arrayEstado2.push({from:arrayEventos[i].from, to:arrayEventos[i].to, evento:arrayEventos[i].evento});
      }
      else{}
    }
    
    for(let i=0;i<arrayEstado1.length;i++){
      for(let j=0;j<arrayEstado2.length;j++){
        if(arrayEstado1[i].evento==arrayEstado2[j].evento)
        {
          matrizSimp[estado1][estado2]=equivalencia(arrayEstado1[i].to,arrayEstado2[j].to);
        }
      }
    }
}

function afdEquivalente(){
  for(let i=0;i<arrayIdEstados.length;i++)  {
    matrizSimp[i] = new Array();
  }
  //PARA LOS CASOS QUE LOS DOS SON FINALES O NO FINALES
  for(let i=1;i<arrayIdEstados.length;i++){
    for(let j=0;j<arrayIdEstados.length;j++){
       if(i>j){
          matrizSimp[i][j] = equivalencia(i,j);     
       }
    }
  }
  //PARA LOS POSIBLES CASOS 
  for(let i=0;i<arrayIdEstados.length;i++){
    for(let j=0;j<arrayIdEstados.length;j++){
       if(i>j){
          if(matrizSimp[i][j]==1){
              compatible(i,j); 
          }       
       }
    }
  } 
}

function eliminar(estado1,estado2){
  //BORRAR UN NODO
  for(let i=0; i<arrayIdEstados.length;i++)  {
    if(arrayIdEstados3[i]!=-1){
      if(arrayIdEstados[i]!=estado1){
        arrayIdEstados3[i] = arrayIdEstados[i];
      }
      else{
        arrayIdEstados3[i]=-1;
      }
    }
    
  }
  for(let i=0;i<arrayEventos.length;i++){
    if(arrayEventos3[i].from!=-1){
      if(arrayEventos[i].from==estado1){
        arrayEventos3[i].from=-1;
        arrayEventos3[i].to=-1;
        arrayEventos3[i].evento=-1;
        //ELIMINAR 
      }
      else if(arrayEventos[i].to==estado1){
        arrayEventos3[i].from = arrayEventos[i].from;
        arrayEventos3[i].to = estado2;
        arrayEventos3[i].evento = arrayEventos[i].evento;
        arrayEventos[i].to= estado2;
        //MODIFICAR
      }
      else{
        arrayEventos3[i].from=arrayEventos[i].from;
        arrayEventos3[i].to=arrayEventos[i].to;
        arrayEventos3[i].evento=arrayEventos[i].evento;
        //MANTENER
      }
    }
  }
}

function afdSimplicado(){
  afdEquivalente();
  //ELIMINAR UN ESTADO Y SUS SALIDAS Y LAS ENTRADAS CONECTARLAS AL OTRO ESTADO
  for(let i=0;i<arrayIdEstados.length;i++){
        arrayIdEstados3[i]=0;
  }
  for(let i=0;i<arrayEventos.length;i++){
    arrayEventos3.push({from:0, to:0, evento:0});
  }
  for(let i=0;i<arrayIdEstados.length;i++){
    for(let j=0;j<arrayIdEstados.length;j++){
       if(i>j){
          if(matrizSimp[i][j]==1){
            eliminar(i,j);
          }       
       }
    }
  }
  for(let i=0;i<arrayIdEstados3.length;i++){
    if(arrayIdEstados3[i]!=-1){
      nodes3.add({id:i, label: arrayLabelEstados[i]}); //Guardando todos los nodos
    }
  }
  for(let i=0;i<arrayEventos3.length;i++){
    if(arrayEventos3[i].from!=-1 ){
      edges3.add({from: arrayEventos3[i].from, to:arrayEventos3[i].to, label:arrayEventos3[i].evento});
    }
  }
  var network3 = new vis.Network(containerResultados, dataResultados, optionsResultados);
}

function nada(){
  alert("Esta función aún no esta lista");
}

//######################################################################################################################################
//######################################################################################################################################

function equivalencia2(estado1,estado2){
  //Para sacar posibles estados compatibles dejarlos en 1 y los no compatibles en 0
   if(arrayEstadosFinales2[estado1]==0&&arrayEstadosFinales2[estado2]==0){
    return 1;
   } 
   else if(arrayEstadosFinales2[estado1]==1&&arrayEstadosFinales2[estado2]==1){   
    return 1;
   }
   else{
      return 0;
   } 
}

function compatible2(estado1,estado2){
    arrayEstado1= new Array ();
    arrayEstado2= new Array();
    for(let i=0; i<arrayEventos2.length;i++){
      if(arrayEventos2[i].from == estado1 ){
        arrayEstado1.push({from:arrayEventos2[i].from, to:arrayEventos2[i].to, evento:arrayEventos2[i].evento});
      }
      else if(arrayEventos2[i].from == estado2){
        arrayEstado2.push({from:arrayEventos2[i].from, to:arrayEventos2[i].to, evento:arrayEventos2[i].evento});
      }
      else{}
    }
    
    for(let i=0;i<arrayEstado1.length;i++){
      for(let j=0;j<arrayEstado2.length;j++){
        if(arrayEstado1[i].evento==arrayEstado2[j].evento)
        {
          matrizSimp[estado1][estado2]=equivalencia2(arrayEstado1[i].to,arrayEstado2[j].to);
        }
      }
    }
}

function afdEquivalente2(){
  for(let i=0;i<arrayIdEstados2.length;i++)  {
    matrizSimp[i] = new Array();
  }
  //PARA LOS CASOS QUE LOS DOS SON FINALES O NO FINALES
  for(let i=1;i<arrayIdEstados2.length;i++){
    for(let j=0;j<arrayIdEstados2.length;j++){
       if(i>j){
          matrizSimp[i][j] = equivalencia2(i,j);     
       }
    }
  }
  //PARA LOS POSIBLES CASOS 
  for(let i=0;i<arrayIdEstados2.length;i++){
    for(let j=0;j<arrayIdEstados2.length;j++){
       if(i>j){
          if(matrizSimp[i][j]==1){
              compatible2(i,j); 
          }       
       }
    }
  }
}


function eliminar2(estado1,estado2){
  //BORRAR UN NODO
  for(let i=0; i<arrayIdEstados2.length;i++)  {
    if(arrayIdEstados3[i]!=-1){
      if(arrayIdEstados2[i]!=estado1){
        arrayIdEstados3[i] = arrayIdEstados2[i];
      }
      else{
        arrayIdEstados3[i]=-1;
      }
    }
  }
  for(let i=0;i<arrayEventos2.length;i++){
    if(arrayEventos3[i].from!=-1){
      if(arrayEventos2[i].from==estado1){
        arrayEventos3[i].from=-1;
        arrayEventos3[i].to=-1;
        arrayEventos3[i].evento=-1;
        //ELIMINAR 
      }
      else if(arrayEventos2[i].to==estado1){
        arrayEventos3[i].from = arrayEventos2[i].from;
        arrayEventos3[i].to = estado2;
        arrayEventos3[i].evento = arrayEventos2[i].evento;
        arrayEventos2[i].to= estado2;
        //MODIFICAR
      }
      else{
        arrayEventos3[i].from=arrayEventos2[i].from;
        arrayEventos3[i].to=arrayEventos2[i].to;
        arrayEventos3[i].evento=arrayEventos2[i].evento;
        //MANTENER
      }
    }
  }
}


function afdSimplicado2(){
  afdEquivalente2();
  //ELIMINAR UN ESTADO Y SUS SALIDAS Y LAS ENTRADAS CONECTARLAS AL OTRO ESTADO
  for(let i=0;i<arrayIdEstados2.length;i++){
        arrayIdEstados3[i]=0;
  }
  for(let i=0;i<arrayEventos2.length;i++){
    arrayEventos3.push({from:0, to:0, evento:0});
  }
  for(let i=0;i<arrayIdEstados2.length;i++){
    for(let j=0;j<arrayIdEstados2.length;j++){
       if(i>j){
          if(matrizSimp[i][j]==1){
            eliminar2(i,j);
          }       
       }
    }
  }
  for(let i=0;i<arrayIdEstados3.length;i++){
    if(arrayIdEstados3[i]!=-1){
      nodes3.add({id:i, label: arrayLabelEstados2[i]}); //Guardando todos los nodos
    }
  }
  for(let i=0;i<arrayEventos3.length;i++){
    if(arrayEventos3[i].from!=-1 ){
      edges3.add({from: arrayEventos3[i].from, to:arrayEventos3[i].to, label:arrayEventos3[i].evento});
    }
  }
  var network3 = new vis.Network(containerResultados, dataResultados, optionsResultados);
}