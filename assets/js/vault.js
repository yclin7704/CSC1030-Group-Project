var passcode = [];
var index = 0;
var passcord1Created = false;
var passcord2Created = false;
var passcord3Created = false;
var passcord4Created = false;

function showVault()
{
    var vaultMain = document.createElement('img');
    document.getElementById('vault').appendChild(vaultMain); // Vault
    vaultMain.src = 'assets/images/Safe/Safe-trimmy.png';
    vaultMain.setAttribute("id", "vaultMain");

    var button1 = document.createElement('img');
    document.getElementById('button').appendChild(button1); // Vault
    button1.src = 'assets/images/Safe/Button1-trimmy.png';
    button1.setAttribute("id", "button1");
    button1.setAttribute("onclick", "vaultAdd(1)");

    var button2 = document.createElement('img');
    document.getElementById('button').appendChild(button2); // Vault
    button2.src = 'assets/images/Safe/Button2-trimmy.png';
    button2.setAttribute("id", "button2");
    button2.setAttribute("onclick", "vaultAdd(2)");

    var button3 = document.createElement('img');
    document.getElementById('button').appendChild(button3); // Vault
    button3.src = 'assets/images/Safe/Button3-trimmy.png';
    button3.setAttribute("id", "button3");
    button3.setAttribute("onclick", "vaultAdd(3)");

    var button4 = document.createElement('img');
    document.getElementById('button').appendChild(button4); // Vault
    button4.src = 'assets/images/Safe/Button4-trimmy.png';
    button4.setAttribute("id", "button4");
    button4.setAttribute("onclick", "vaultAdd(4)");

    var button5 = document.createElement('img');
    document.getElementById('button').appendChild(button5); // Vault
    button5.src = 'assets/images/Safe/Button5-trimmy.png';
    button5.setAttribute("id", "button5");
    button5.setAttribute("onclick", "vaultAdd(5)");

    var button6 = document.createElement('img');
    document.getElementById('button').appendChild(button6); // Vault
    button6.src = 'assets/images/Safe/Button6-trimmy.png';
    button6.setAttribute("id", "button6");
    button6.setAttribute("onclick", "vaultAdd(6)");

    var button7 = document.createElement('img');
    document.getElementById('button').appendChild(button7); // Vault
    button7.src = 'assets/images/Safe/Button7-trimmy.png';
    button7.setAttribute("id", "button7");
    button7.setAttribute("onclick", "vaultAdd(7)");

    var button8 = document.createElement('img');
    document.getElementById('button').appendChild(button8); // Vault
    button8.src = 'assets/images/Safe/Button8-trimmy.png';
    button8.setAttribute("id", "button8");
    button8.setAttribute("onclick", "vaultAdd(8)");

    var button9 = document.createElement('img');
    document.getElementById('button').appendChild(button9); // Vault
    button9.src = 'assets/images/Safe/Button9-trimmy.png';
    button9.setAttribute("id", "button9");
    button9.setAttribute("onclick", "vaultAdd(9)");

    var button0 = document.createElement('img');
    document.getElementById('button').appendChild(button0); // Vault
    button0.src = 'assets/images/Safe/Button0-trimmy.png';
    button0.setAttribute("id", "button0");
    button0.setAttribute("onclick", "vaultAdd(0)");

    var buttonD = document.createElement('img');
    document.getElementById('button').appendChild(buttonD); // Vault
    buttonD.src = 'assets/images/Safe/ButtonD-trimmy.png';
    buttonD.setAttribute("id", "buttonD");
    buttonD.setAttribute("onclick", "vaultAdd('delete')");

    var buttonE = document.createElement('img');
    document.getElementById('button').appendChild(buttonE); // Vault
    buttonE.src = 'assets/images/Safe/ButtonE-trimmy.png';
    buttonE.setAttribute("id", "buttonE");
    buttonE.setAttribute("onclick", "vaultAdd('confirm')");
}

function vaultAdd(code)
{
    if ((code === 1 || code === 2 || code === 3 || code === 4 || code === 5 || code === 6 || code === 7 || code === 8 || code === 9 || code === 0) && (passcode.length < 4))
    {
       playSound('assets/sounds/beep.wav');
       passcode[index] = code;
       var passcodeLocation = "passInterface" + index;
       vaultImage(passcodeLocation, code);
    }
    else if (code === 'delete'&& index > 0)
    {
        playSound('assets/sounds/deleted.wav');
        var indexOld = index - 1;
        var passcodeLocationPrev = "passInterface" + indexOld;
        vaultDelete(passcodeLocationPrev);

    }
    else if (code === 'confirm' && passcode[0] == 1 && passcode[1] == 0 && passcode[2] == 3 && passcode[3] == 0)
    {
        playSound('assets/sounds/open.wav');
        vaultClear();
        showTextNode(3.331);
    }
    else
    {
        playSound('assets/sounds/error.wav');
    }
}

function vaultImage(passcodeLocationE , codeE)
{
    if (passcord1Created === false)
    {
        var image1 = document.createElement('img');
        document.getElementById('button').appendChild(image1);
        image1.src = 'assets/images/Safe/' + codeE + '.png';
        image1.setAttribute("id", passcodeLocationE);
        passcord1Created = true;
    }
    else if (passcord2Created === false)
    {
        var image2 = document.createElement('img');
        document.getElementById('button').appendChild(image2);
        image2.src = 'assets/images/Safe/' + codeE + '.png';
        image2.setAttribute("id", passcodeLocationE);
        passcord2Created = true;
    }
    else if (passcord3Created === false)
    {
        var image3 = document.createElement('img');
        document.getElementById('button').appendChild(image3);
        image3.src = 'assets/images/Safe/' + codeE + '.png';
        image3.setAttribute("id", passcodeLocationE);
        passcord3Created = true;
    }
    else if (passcord4Created === false)
    {
        var image4 = document.createElement('img');
        document.getElementById('button').appendChild(image4);
        image4.src = 'assets/images/Safe/' + codeE + '.png';
        image4.setAttribute("id", passcodeLocationE);
        passcord4Created = true;
    }
    index++;
}

function vaultDelete(passcodeLocationE)
{
    var temp = document.getElementById(passcodeLocationE);
    temp.parentNode.removeChild(temp);
    passcode.pop();
    index--;
    if (passcodeLocationE === 'passInterface0')
    {
        passcord1Created = false;
    }
    else if ( passcodeLocationE === 'passInterface1')
    {
        passcord2Created = false;
    }
    else if ( passcodeLocationE === 'passInterface2')
    {
        passcord3Created = false;
    }
    else if ( passcodeLocationE === 'passInterface3')
    {
        passcord4Created = false;
    }
}

function vaultClear()
{
    var temp = document.getElementById('button');
    temp.innerHTML = '';

    var temp2 = document.getElementById('vault');
    temp2.innerHTML = '';
}
