//append structure
var console_structure = ['<style>',
'#console_container{position:fixed; box-sizing:border-box; padding:40px; background-color:rgb(222, 204, 255); width:100%; height:500px; bottom:0; left:0; right:0;}',
'#button_container {width:100%; background-color:rgb(255, 213, 220); overflow:hidden;}',
'.console_button{float:left; border:none; outline:none; background-color:rgb(253, 147, 147); color:rgb(252, 245, 188); padding:6px 10px; font-size:3vw;}',
'#console_Element {background-color:rgb(255, 241, 220); width:100%; height:88%; overflow:auto; display:none; font-size:3vw;}',
'#console_Console{background-color:rgb(255, 241, 220); width:100%; height:58%; overflow:auto; display:block; font-size:3vw;}',
'#console_Console p{margin:0;}',
'#log_container{background-color:rgb(255, 241, 220); width:100%; height:30%; overflow:auto; display:block;}',
'#console_input{border:none; float:left; display:block; width:100%; height:3vw; font-size:3vw;}',
'#console_log{display:block; float:left; font-size:3vw;}',
'</style>',
'<div id="console_container">',
'<div id="button_container">',
'<button class="console_button" onclick="console_Console()">Console</button><button class="console_button" onclick="console_Element()">Element</button>',
'</div>',
'<div id="console_Element">html object</div>',
'<div id="console_Console">Has no ‘Javascript’ error.</div>',
'<div id="log_container"><input id="console_input" type="text" onkeypress="if(event.keyCode == 13) {console_log()}"><div id="console_log"></div></div>',
'</div>']
var create_div = document.createElement("div");
create_div.innerHTML = console_structure.join('');
document.body.appendChild(create_div);

//check error
var error_message = '';
onerror = function handleErr(msg, url, line, col) {
    error_message += '<p>Error Message : <span style="color:red;">' + msg + '</span></p>';
    error_message += '<p>Location : <span style="color:red;">' + url + '</span></p>';
    error_message += '<p>Line : <span style="color:red;">' + line + '</span></p>';
    error_message += '<p>Column : <span style="color:red;">' + col + '</span></p><br>';
    document.getElementById("console_Console").innerHTML = error_message;
    return true;
}

//button control
var con_con = document.getElementById("console_Console");
var con_input = document.getElementById("log_container");
var con_ele = document.getElementById("console_Element");
var con_sw = 1;
var con_sw2 = 1;
var ele_sw = 0;

function console_Console() {
    if (ele_sw === 1) {
        con_ele.style.display = "none";
        ele_sw = 0;
        con_con.style.display = "block";
        con_sw = 1;
        con_input.style.display = "block";
        con_sw2 = 1;
    }
}

function console_Element() {
    if (con_sw === 1) {
        con_con.style.display = "none";
        con_sw = 0;
        con_input.style.display = "none";
        con_sw2 = 0;
        con_ele.style.display = "block";
        ele_sw = 1;
    }
}

//log function
function console_log(){
    var log_value = document.getElementById("console_input").value;
    var log_function = new Function('return ' + log_value)();
    var print = document.getElementById("console_log");
    print.innerText = log_function;
}