class Player {
    constructor(name, profession, inventory) {
        this.name = name;
        this.profession = profession;
        this.inventory = [];
    }
}

var player = new Player({
    name: "Test User",
    profession: "Medic",
    inventory: []
})

function Tool(options){
    var options = options || {};
    this.name = options.name;
    this.quantity = options.quantity || 0;
    this.use = function() {
        this.quantity - 1;
        if (this.amount <= 0) {
            console.log;
        }
    }
}

function Weapon(options) {
    var options = options || {};
    this.name = options.name;
    this.quantity = options.quantity;
    this.damage = options.damage || 100;
    this.durability = options.durability || 100;
    this.use = function() {
        this.durability - 100;
        if (this.durability <= 0) {
            this.quantity -1;
            console.log;
        }
    }
}

var wrench = new Tool({
    name: "Wrench",
    quantity: 1
})

var bat = new Weapon({
    name: "Baseball Bat",
    quantity: 1,
    damage: 200,
    durability: 200
})

function pickUpBat() {
    player.inventory.push(bat);
    console.log("Player picked up bat");
    var slot = document.getElementById("inventory");
    slot.textContent = player.inventory[0].name;
}