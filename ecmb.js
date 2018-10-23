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
'<button class="console_button" onclick="onConsole()">Console</button><button class="console_button" onclick="onElement()">Element</button>',
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
var button = {
    dpConsole : document.getElementById("console_Console").style.display,
    dpLog : document.getElementById("log_container").style.display,
    dpElement : document.getElementById("console_Element").style.display,
    sw : 1,
    onElement : function() {
        if (this.sw === 1) {
            this.dpConsole = "none";
            this.dpLog = "none";
            this.dpElement = "block";
            this.sw = 0;
        }
    },
    onConsole : function() {
        if (this.sw === 0) {
            this.dpConsole = "block";
            this.dpLog = "block";
            this.dpElement = "none";
            this.sw = 1;
        }
    }
};

function onElement() {
    button.onElement();
}

function onConsole() {
    button.onConsole();
}
/*function onElement() {
    if (button.sw === 1) {
        button.dpConsole = "none";
        button.dpLog = "none";
        button.dpElement = "block";
        button.sw = 0;
    }
}

function onConsole() {
    if (button.sw === 0) {
        button.dpConsole = "block";
        button.dpLog = "block";
        button.dpElement = "none";
        button.sw = 1;
    }
}*/
/* var console_display = document.getElementById("console_Console").style.display;
var log_display = document.getElementById("log_container").style.display;
var element_display = document.getElementById("console_Element").style.display;
var console_sw = 1;
var element_sw = 0;
function console_Console() {
    if (element_sw === 1) {
        element_display = "none";
        element_sw = 0;

        console_display = "block";
        log_display = "block";
        console_sw = 1;
    }
}

function console_Element() {
    if (console_sw === 1) {
        console_display = "none";
        log_display = "none";
        console_sw = 0;

        element_display.style.display = "block";
        element_sw = 1;
    }
}*/

//log function
function console_log(){
    var log_value = document.getElementById("console_input").value;
    var log_function = new Function('return ' + log_value)();
    var print = document.getElementById("console_log");
    print.innerText = log_function;
}