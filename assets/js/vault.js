function showVault()
{
    var vaultMain = document.createElement('img');
    const vault = document.getElementById('vault').appendChild(vaultMain); // Vault
    vaultMain.src = 'assets/images/Safe/Safe-trimmy.png';
    vaultMain.setAttribute("id", "vaultMain");

    var button1 = document.createElement('img');
    const button1Location = document.getElementById('button').appendChild(button1); // Vault
    button1.src = 'assets/images/Safe/Button1-trimmy.png';
    button1.setAttribute("id", "button1");

    var button2 = document.createElement('img');
    const button2Location = document.getElementById('button').appendChild(button2); // Vault
    button2.src = 'assets/images/Safe/Button2-trimmy.png';
    button2.setAttribute("id", "button2");

    var button3 = document.createElement('img');
    const button3Location = document.getElementById('button').appendChild(button3); // Vault
    button3.src = 'assets/images/Safe/Button3-trimmy.png';
    button3.setAttribute("id", "button3");
}
