// ==UserScript==
// @name         LusoRegistoCriminal+
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Melhorar os registos criminais para mais eficácia
// @author       Mikas
// @match        http://forum.lusoroleplay.pt/index.php?/forms/
// @grant        GM_addStyle
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @license MIT
// @copyright 2018, mikasonwar (https://openuserjs.org/users/mikasonwar)
// ==/UserScript==

// ==OpenUserJS==
// @author mikasonwar
// ==/OpenUserJS==
//<input type="checkbox" name="vehicle2" value="Car"> I have a car // Checkbox para agentes

//<input type="number" name="quantity" min="1" max="5"> // numero para confiscado

//lista para confiscado | multas
//<select name="carlist">
 // <option value="volvo">Teste1</option>
  //<option value="saab">Saab</option>
  //<option value="opel">Opel</option>
  //<option value="audi">Audi</option>
//</select>

//Variaveis
var click=true;
var clickdebug=true;

var agentes = [
"Sérgio Ribeiro",
"Mikey Pereira",
"Hugo Almeida",
"Luis Belezas",
"Mike Mercedes",
"Sérgio Silva",
"Opie Winston",
"Daniel Rodrigues",
"Ruben Almeida",
"Fanuncio Albertino",
"Luis Sousa",
"Ferbf Martolo",
"Manuel Duarte",
];

var infracao = [
    'Uso abusivo da buzina',
    'Veículo Danificado',
    'Circulação fora da estrada',
    'Estacionamento desajeitado / proibido',
    'Cruzar/Pisar uma linha contínua',
    'Faroís/Luzes Desligados',
    'Desrespeito do sinal de STOP',
    'Paragem perigosa/proibida',
    'Utilização de telemóvel ao volante',
    'Pertubação dentro da via pública',
    'Sem capacete em cima de uma motorizada',
    'Desrespeito a um veiculo em emergência',
    'Desrespeito do semáforo',
    'Circulação no sentido contrário',
    'Ultrapassagem perigosa',
    'Conduzir sem carta de condução',
    'Excesso de velocidade - 80+ KM/H',
    'Excesso de velocidade - 120+ KM/H',
    'Fuga às autoridades'
];

var leve = [
    'Impedir a circulação',
    'Insultos com / entre civis',
    'Ameaça verbal ou intimidação para o civil',
    'Pertubação aos agentes de autoridades',
    'Manisfestação ilegal',
    'Degradação da via pública',
    'Insultar agente de polícia',
    'Impedir uma operação policial',
    'Ameaça verbal ou intimidação para o polícia'
];

var media = [
    'Exibição de arma letal',
    'Porte de arma legal sem licença',
    'Roubar civil/agente de estado',
    'Porte de arma ilegal',
    'Roubo',
    'Roubo de carro',
    'Posse de estupefacientes',
    'Tentativa de roubo de loja',
    'Posse de Dinheiro Sujo',
    'Roubo de loja',
    'Captura de refém - civil',
    'Tentativa de roubo de banco',
    'Produção de estupefacientes',
    'Fraude à empresa',
    'Venda de estupefacientes',
    'Tentativa de corrupção',
    'Roubo de banco'
];

var grave = [
    'Uso de arma de fogo',
    'Tentativa de assassinato sobre civil',
    'Assassinato involuntário',
    'Uso de arma de fogo sobre um agente do estado',
    'Rapto de um civil',
    'Assassinato em civil',
    'Rapto de um agente do estado',
    'Assassinato em agente do estado'
];

//CSS

GM_addStyle ( `
  .Mikasbutton {
    border-radius: 0px !important;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    border: 0px solid rgba(0,0,0,0.1) !important;
  }

  .mikasespaco {
    display:block !important;
    padding-left: 10px !important;
    padding-bottom: 10px !important;
    background: #272727 !important;
  }

  .MikasActive {
    background: #4e0001 !important;
    color: #ffffff !important;
  }

  .mikastab {
    background: #9b0002;
    border-radius: 10px;
  }
` );


// Testes
// ------------------------------------------------------------------------------------------------------------------------------------------------------










// ------------------------------------------------------------------------------------------------------------------------------------------------------
//Elementos
//Tabs das multas
  var MultasTab = document.createElement('div');
  MultasTab.className = "mikastab mikasmonkey";
  MultasTab.setAttribute("id", "MikasTab");
  MultasTab.innerHTML= '<button class="ipsButton_primary ipsButton Mikasbutton MikasActive" id="infracoes" type="button">'
                    + 'Infrações de Trânsito</button>'
                    + '<button class="ipsButton_primary ipsButton Mikasbutton " id="leves" type="button">'
                    + 'Infrações Leves</button>'
                    + '<button class="ipsButton_primary ipsButton Mikasbutton " id="medias" type="button">'
                    + 'Infrações Médias</button>'
                    + '<button class="ipsButton_primary ipsButton Mikasbutton " id="graves" type="button">'
                    + 'Infrações Graves</button>'
                    + '<div id="espacomultas" class="mikasespaco"></div>';

//Multas de Infração de Trânsito
var zInfracao = document.createElement('div');
zInfracao.className = 'mikasmonkey categoria';
zInfracao.setAttribute('id','catinfracao');
var conteudoinfracao = '<ul class="ipsField_fieldList">';
infracao.forEach(function(item, index){
conteudoinfracao += '<li><span class="ipsCustomInput">'
                 + '<input type="checkbox" name="infracao" id="infracao'+index+'" onchange=""  value="'+index+'">'
                 + '<span></span></span>'
                 + '<div class="ipsField_fieldList_content"><label>'+item+'</label></div></li>';
});
conteudoinfracao += '</ul>';
zInfracao.innerHTML=conteudoinfracao;

//Multas de Infrações leves
var zLeve = document.createElement('div');
zLeve.className= 'mikasmonkey categoria';
zLeve.setAttribute('id', 'catleve');
var conteudoleve = '<ul class="ipsField_fieldList">';
leve.forEach(function(item, index){
conteudoleve += '<li><span class="ipsCustomInput">'
                 + '<input type="checkbox" name="leve" id="leve'+index+'" onchange=""  value="'+index+'">'
                 + '<span></span></span>'
                 + '<div class="ipsField_fieldList_content"><label>'+item+'</label></div></li>';
});
conteudoleve+= '</ul>';
zLeve.innerHTML=conteudoleve;

//Multas de Infrações médias
var zMedia = document.createElement('div');
zMedia.className='mikasmonkey categoria';
zMedia.setAttribute('id','catmedia');
var conteudomedio = '<ul class="ipsField_fieldList">';
media.forEach(function(item, index){
conteudomedio += '<li><span class="ipsCustomInput">'
                 + '<input type="checkbox" name="media" id="media'+index+'" onchange=""  value="'+index+'">'
                 + '<span></span></span>'
                 + '<div class="ipsField_fieldList_content"><label>'+item+'</label></div></li>';
});
conteudomedio+='</ul>';
zMedia.innerHTML=conteudomedio;

//Multas de Infrações Graves
var zGrave = document.createElement('div');
zGrave.className='mikasmonkey categoria';
zGrave.setAttribute('id','catgrave');
var conteudograve = '<ul class="ipsField_fieldList">';
grave.forEach(function(item, index){
conteudograve += '<li><span class="ipsCustomInput">'
                 + '<input type="checkbox" name="grave" id="grave'+index+'" onchange=""  value="'+index+'">'
                 + '<span></span></span>'
                 + '<div class="ipsField_fieldList_content"><label>'+item+'</label></div></li>';
});
conteudograve+='</ul>';
zGrave.innerHTML=conteudograve;

//Botão inicializador do script
var zScript       = document.createElement ('button');
zScript.className = 'ipsButton_primary ipsButton';
zScript.innerHTML =  'Ativar Modo Avançado';
zScript.setAttribute ('id', 'greasemonkey');
zScript.setAttribute ('type', 'button');
$(zScript).appendTo( ".ipsForm li:last .ipsFieldRow_content" );
$("<br>").appendTo( ".ipsForm li:last" );

//Lista de todos os agentes
var zAgentes = document.createElement('li');
zAgentes.className= 'ipsFieldRow ipsClearfix mikasmonkey';
var conteudoagentes = '<label class="ipsFieldRow_label" for="form_field_6">'
                   + 'Agentes Envolvidos <span class="ipsFieldRow_required">Obrigatório</span>'
                   + '</label><ul class="ipsField_fieldList">'
                   ;
agentes.forEach(function(item, index){
conteudoagentes += '<li><span class="ipsCustomInput">'
                 + '<input type="checkbox" name="agente" id="agente'+index+'" onchange=""  value="'+index+'">'
                 + '<span></span></span>'
                 + '<div class="ipsField_fieldList_content"><label>'+item+'</label></div></li>';
});
conteudoagentes += '</ul>';
zAgentes.innerHTML=conteudoagentes;
zAgentes.setAttribute('id','AgentesContainer');


//Ativar Elementos

//ativar o botão inicializador do script
document.getElementById ("greasemonkey").addEventListener (
    "click", ScriptStart, false
);

//Funcoes

//Funcoes para ver multas [Tabs]
function verinfracoes(zInfracoes) {
            $('.categoria').hide();
            $('#catinfracao').show();
            $('.MikasActive').removeClass("MikasActive");
            $('#infracoes').addClass("MikasActive");
}
function verleves(zLeves) {
            $('.categoria').hide();
            $('#catleve').show();
            $('.MikasActive').removeClass("MikasActive");
            $('#leves').addClass("MikasActive");
}
function vermedias(zMedias) {
            $('.categoria').hide();
            $('#catmedia').show();
            $('.MikasActive').removeClass("MikasActive");
            $('#medias').addClass("MikasActive");
}
function vergraves(zGraves) {
            $('.categoria').hide();
            $('#catgrave').show();
            $('.MikasActive').removeClass("MikasActive");
            $('#graves').addClass("MikasActive");
}

//Função para dar DEBUG ao programa
function debug (zDebug) {
    if (clickdebug) {
        clickdebug=false;
        document.getElementById("greasemonkeydebug").innerHTML = "Desativar modo DEBUG";
        $("#form_field_6").show();
        $("#form_field_7").show();
    }
    else {
        clickdebug=true;
        document.getElementById("greasemonkeydebug").innerHTML = "Ativar modo DEBUG";
        $("#form_field_6").hide();
        $("#form_field_7").hide();
    }
}

//Função que preenche as "outras observações" com todas as informações
function resumo (zResumo) {
    var msg1 = document.getElementById ("mikas_1").value.replace(/;/g,"\n");
    var msg2 = document.getElementById ("mikas_2").value.replace(/;/g,"\n");
    var msg3  = "";

    $("input:checkbox[name=infracao]:checked").each(function(){
      msg3 += '\n'+infracao[$(this).val()];
    });
    $("input:checkbox[name=leve]:checked").each(function(){
      msg3 += '\n'+leve[$(this).val()];
    });
    $("input:checkbox[name=media]:checked").each(function(){
      msg3 += '\n'+media[$(this).val()];
    });
    $("input:checkbox[name=grave]:checked").each(function(){
      msg3 += '\n'+grave[$(this).val()];
    });

    if(document.getElementById("mikas_1").value.length!=0){
    var mensagem = "\nFoi consfiscado do sujeito:\n"
                 + msg1
                 + "\n\nSituação: "
                 + msg2
                 + "\n\nO Sujeito apanhou as seguintes multas:"
                 + msg3
                 ;
    } else {
            var mensagem = "\nSituação: "
                 + msg2
                 + "\n\nO Sujeito apanhou as seguintes multas:"
                 + msg3
                 ;
    }
    document.getElementById("elTextarea_form_field_7").value = mensagem;
}

//Função que lista os agentes envolvidos
function agentesenvolvidos(zAgentesEnvolvidos) {
    document.getElementById("elInput_form_field_6").value = "";
    $("input:checkbox[name=agente]:checked").each(function(){
    if (document.getElementById("elInput_form_field_6").value=="") {
      document.getElementById("elInput_form_field_6").value += 'Agente ' + agentes[$(this).val()];
    } else {
        document.getElementById("elInput_form_field_6").value += ' , Agente ' + agentes[$(this).val()];
    }
    });
}

//Função principal que ativa a maioria dos scripts
function ScriptStart (zEvent) {
    if (click) {
            click=false;
            document.getElementById("greasemonkey").innerHTML = "Desativar modo avançado";
            document.getElementById ("elTextarea_form_field_7").style.height = "400px"; // caixa de texto

            //Inserir Agentes
            $(zAgentes).insertAfter("#form_field_6");
            //Confiscado [Inicial]
            var mikas1 = document.createElement ('li');
            mikas1.className = 'ipsFieldRow ipsClearfix mikasmonkey';
            mikas1.innerHTML = '<label class="ipsFieldRow_label" for="mikas_1">Foi confiscado do sujeito:</label><div class="ipsFieldRow_content">'
                             + '<input type="text" name="mikas_1" value="" id="mikas_1"></input>'
                             + '<br><span class="ipsFieldRow_desc">O que foi consfiscado do invididuo?</span></div>'
                             ;
            $(mikas1).insertBefore("#form_field_7");
            //Situação [Inicial]
            var mikas2 = document.createElement ('li');
            mikas2.className = 'ipsFieldRow ipsClearfix mikasmonkey';
            mikas2.innerHTML = '<label class="ipsFieldRow_label" for="mikas_2">Situação:</label><div class="ipsFieldRow_content">'
                             + '<input type="text" name="mikas_2" value="" id="mikas_2"></input>'
                             + '<br><span class="ipsFieldRow_desc">O que se passou para o individuo ser detido?</span></div>'
                             ;
            $(mikas2).insertBefore("#form_field_7");

            //insere Categoria de multas
            $(MultasTab).insertBefore("#form_field_7");

            //Insere e esconde as multas

            $(zInfracao).appendTo("#espacomultas");
            $(zLeve).appendTo("#espacomultas");
            $('#catleve').hide();
            $(zMedia).appendTo("#espacomultas");
            $('#catmedia').hide();
            $(zGrave).appendTo("#espacomultas");
            $('#catgrave').hide();
            $('<br>').insertBefore("#form_field_7");
            //Ativa script de decidir categoria quando esta é mudada
            document.getElementById("infracoes").addEventListener("click", verinfracoes, false);
            document.getElementById("leves").addEventListener("click", verleves, false);
            document.getElementById("medias").addEventListener("click", vermedias, false);
            document.getElementById("graves").addEventListener("click", vergraves, false);
            //Ativa script de resumir tudo para as observações adicionais
            document.getElementById ("mikas_1").addEventListener("keyup", resumo, false);
            document.getElementById ("mikas_2").addEventListener("keyup", resumo, false);
            document.getElementById ("catinfracao").addEventListener("click", resumo, false);
            document.getElementById ("catleve").addEventListener("click", resumo, false);
            document.getElementById ("catmedia").addEventListener("click", resumo, false);
            document.getElementById ("catgrave").addEventListener("click", resumo, false);

            //Ativa script que resume os agentes envolvidos
            document.getElementById ("AgentesContainer").addEventListener ("click", agentesenvolvidos, false);
            //Esconde os fields principais
            $("#form_field_6").hide();
            $("#form_field_7").hide();

            //Botão DEBUG
            var zDebug = document.createElement('button');
            zDebug.className = 'ipsButton_primary ipsButton';
            zDebug.innerHTML =  'Ativar Modo Debug';
            zDebug.setAttribute('id','greasemonkeydebug');
            zDebug.setAttribute ('type', 'button');
            $(zDebug).appendTo( ".ipsForm li:last .ipsFieldRow_content" );
            document.getElementById ("greasemonkeydebug").addEventListener ("click", debug, false);
    }
    else {
        click=true;
        clickdebug=true;
        document.getElementById("greasemonkey").innerHTML = "Ativar modo avançado";
        //Renicia os textos e apaga as caixas dos scripts
        $("#form_field_6").show();
        $("elInput_form_field_6").val("");
        $("#form_field_7").show();
        $("#elTextarea_form_field_7").val("");
        $(".mikasmonkey").remove();
        $("#greasemonkeydebug").remove();

    }
}
