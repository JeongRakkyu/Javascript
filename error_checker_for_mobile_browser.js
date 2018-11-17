//append structure
var ecmbStructure = ['',
    '            <div id="ecmb_ButtonContainer">',
    '                <button id="ecmb_ErrorButton" onclick="errorButton()">Error</button>',
    '                <button id="ecmb_CommandLineButton" onclick="commandLineButton()">Command Line</button>',
    '                <button id="ecmb_ElementsButton" onclick="elementsButton(); elements();">Elements</button>',
    '                <button id="ecmb_ContainerControlButton" onclick="containerControlButton()">_</button>',
    '            </div>',
    '            <div id="ecmb_WindowContainer">',
    '                <div id="ecmb_ErrorWindow">',
    '                    Has no ‘Javascript’ error.',
    '                </div>',
    '                <div id="ecmb_CommandLineWindow">',
    '                    <input id="ecmb_CommandLineInput" type="text" onkeypress="if(event.keyCode == 13) {consoleLog()}">',
    '                    <div id="ecmb_CommandLineOutput"></div>',
    '                </div>',
    '                <div id="ecmb_ElementsWindow">',
    '                    <pre id="elements"></pre>',
    '                </div>',
    '            </div>'];
var ecmbContainer = document.createElement("div");
ecmbContainer.id = "ecmb_Container";
ecmbContainer.innerHTML = ecmbStructure.join('\n');
document.body.appendChild(ecmbContainer);

//ecmb
var ecmb = {
    head: document.getElementsByTagName('head')[0].outerHTML.split('\n'),
    body: document.getElementsByTagName('body')[0].outerHTML.split('\n'),

    //error window control
    err: document.getElementById("ecmb_ErrorWindow"),
    errorButton: document.getElementById("ecmb_ErrorButton"),
    err_Open: function () {
        this.err.style.display = "block";
        this.errorButton.style.backgroundColor = "black";
        this.errorButton.style.color = "white";
    },
    err_Close: function () {
        this.err.style.display = "none";
        this.errorButton.style.backgroundColor = "white";
        this.errorButton.style.color = "black";
    },

    //commandline window control
    cmd: document.getElementById("ecmb_CommandLineWindow"),
    cmdButton: document.getElementById("ecmb_CommandLineButton"),
    cmd_Open: function () {
        this.cmd.style.display = "block";
        this.cmdButton.style.backgroundColor = "black";
        this.cmdButton.style.color = "white";
    },
    cmd_Close: function () {
        this.cmd.style.display = "none";
        this.cmdButton.style.backgroundColor = "white";
        this.cmdButton.style.color = "black";
    },

    //elements window control
    ele: document.getElementById("ecmb_ElementsWindow"),
    eleButton: document.getElementById("ecmb_ElementsButton"),
    ele_Open: function () {
        this.ele.style.display = "block";
        this.eleButton.style.backgroundColor = "black";
        this.eleButton.style.color = "white";
    },

    ele_Close: function () {
        this.ele.style.display = "none";
        this.eleButton.style.backgroundColor = "white";
        this.eleButton.style.color = "black";
    },

    //container control
    container: document.getElementById("ecmb_WindowContainer"),
    onOffButton: document.getElementById("ecmb_ContainerControlButton"),
    containerUp: function () {
        this.onOffButton.style.backgroundColor = "black";
        this.onOffButton.style.color = "white";
        this.onOffButton.innerHTML = "_";
        this.container.style.height = "233px";
    },

    containerDown: function () {
        this.onOffButton.style.backgroundColor = "white";
        this.onOffButton.style.color = "black";
        this.onOffButton.innerHTML = "□";
        this.container.style.height = "0";
    },

    controlSwitch: 1
}

//check error
onerror = function errorHandle(msg, url, line, col) {
    var errorMessage = '';
    errorMessage += '<p>Error Message : <span style="color:red;">' + msg + '</span></p>';
    errorMessage += '<p>Location : <span style="color:red;">' + url + '</span></p>';
    errorMessage += '<p>Line : <span style="color:red;">' + line + '</span></p>';
    errorMessage += '<p>Column : <span style="color:red;">' + col + '</span></p><br>';
    document.getElementById("ecmb_ErrorWindow").innerHTML = errorMessage;
    return true;
}

//button control
function errorButton() {
    ecmb.err_Open();
    ecmb.cmd_Close();
    ecmb.ele_Close();
}
function commandLineButton() {
    ecmb.err_Close();
    ecmb.cmd_Open();
    ecmb.ele_Close();
}
function elementsButton() {
    ecmb.err_Close();
    ecmb.cmd_Close();
    ecmb.ele_Open();
}
function containerControlButton() {
    if (ecmb.controlSwitch === 1) {
        ecmb.containerDown();
        ecmb.controlSwitch = 0;
    } else {
        ecmb.containerUp();
        ecmb.controlSwitch = 1;
    }
}

//log function
function consoleLog() {
    var inputValue = document.getElementById("ecmb_CommandLineInput").value;
    var commandLine = new Function('return ' + inputValue)();
    var outputLog = document.getElementById("ecmb_CommandLineOutput");
    outputLog.innerText = commandLine;
}

//elements
function elements() {
    if (document.getElementById("elements").innerText === '') {
        ecmb.head[0] = "    <head>";
        ecmb.head.unshift("<html>");
        ecmb.head.unshift("<!DOCTYPE html>");
        ecmb.body[0] = "    <body>";
        ecmb.body[ecmb.body.length - 1] = ecmb.body[ecmb.body.length - 1].split("</body>").join('');
        ecmb.body.push("    </body>");
        ecmb.body.push("</html>");
        document.getElementById("elements").innerText = ecmb.head.join('\n') + "\n" + ecmb.body.join('\n');
    }
}