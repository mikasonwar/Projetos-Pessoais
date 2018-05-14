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
    'Infracao1',
    'Infracao2',
    'Infracao3',
    'Infracao4',
];

var leve = [
    'Leve1',
    'Leve2',
    'Leve3',
    'Leve4',
];

var media = [
    'Media1',
    'Media2',
    'Media3',
    'Media4',
];

var grave = [
    'Grave1',
    'Grave2',
    'Grave3',
    'Grave4',
];

//Elementos

//Categoria das multas
var zCatMulta = document.createElement('li');
zCatMulta.className = 'mikasmonkey';
zCatMulta.setAttribute('id','catmultali');
zCatMulta.innerHTML =  '<label class="ipsFieldRow_label">'
                       + 'Multas: <span class="ipsFieldRow_required">Obrigatório</span>'
                       + '</label><br>'
                       + '<select name="multa" id="catmulta">'
                       + '<option value="infracao" selected>Infrações de trânsito</option>'
                       + '<option value="leve">Infrações Leves</option>'
                       + '<option value="media">Infrações Médias</option>'
                       + '<option value="grave">Infrações Graves</option>'
                       + '</select>';

//Multas de Infração de Trânsito
var zInfracao = document.createElement('div');
zInfracao.className = 'mikasmonkey categoria';
zInfracao.setAttribute('id','catinfracao');
infracao.forEach(function(item, index){
    zInfracao.innerHTML += '<input type="checkbox" name="infracao" id="infracao'+index+'" onchange=""  value="'+index+'"> ' + item + '<br>';
});

//Multas de Infrações leves
var zLeve = document.createElement('div');
zLeve.className= 'mikasmonkey categoria';
zLeve.setAttribute('id', 'catleve');
leve.forEach(function(item, index){
    zLeve.innerHTML += '<input type="checkbox" name="leve" id="leve'+index+'" onchange=""  value="'+index+'"> ' + item + '<br>';
});

//Multas de Infrações médias
var zMedia = document.createElement('div');
zMedia.className='mikasmonkey categoria';
zMedia.setAttribute('id','catmedia');
media.forEach(function(item, index){
    zMedia.innerHTML += '<input type="checkbox" name="media" id="media'+index+'" onchange=""  value="'+index+'"> ' + item + '<br>';
});

//Multas de Infrações Graves
var zGrave = document.createElement('div');
zGrave.className='mikasmonkey categoria';
zGrave.setAttribute('id','catgrave');
grave.forEach(function(item, index){
    zGrave.innerHTML += '<input type="checkbox" name="grave" id="grave'+index+'" onchange=""  value="'+index+'"> ' + item + '<br>';
});

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
zAgentes.innerHTML = '<label class="ipsFieldRow_label" for="form_field_6">'
                   + 'Agentes Envolvidos <span class="ipsFieldRow_required">Obrigatório</span>'
                   + '</label>'
                   ;
agentes.forEach(function(item, index){
zAgentes.innerHTML += '<input type="checkbox" name="agente" id="agente'+index+'" onchange=""  value="'+index+'"> ' + item + '<br>';
});
zAgentes.setAttribute('id','AgentesContainer');


//Ativar Elementos

//ativar o botão inicializador do script
document.getElementById ("greasemonkey").addEventListener (
    "click", ScriptStart, false
);

//Funcoes

//Função para decididr a categoria
function decidircat (zDecidirCat) {
    switch(document.getElementById("catmulta").value) {
        case 'infracao':
            $('.categoria').hide();
            $('#catinfracao').show();
            break;
        case 'leve':
            $('.categoria').hide();
            $('#catleve').show();
            break;
        case 'media':
            $('.categoria').hide();
            $('#catmedia').show();
            break;
        case 'grave':
            $('.categoria').hide();
            $('#catgrave').show();
            break;
        default:
            alert("Erro");
    }
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
            $(zCatMulta).insertBefore("#form_field_7");
            //Insere e esconde as multas
            $(zInfracao).insertBefore("#form_field_7");
            $(zLeve).insertBefore("#form_field_7");
            $('#catleve').hide();
            $(zMedia).insertBefore("#form_field_7");
            $('#catmedia').hide();
            $(zGrave).insertBefore("#form_field_7");
            $('#catgrave').hide();
            $('<br>').insertBefore("#form_field_7");
            //Ativa script de decidir categoria quando esta é mudada
            document.getElementById("catmulta").addEventListener("change", decidircat, false);

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
