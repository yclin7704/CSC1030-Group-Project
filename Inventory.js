class Player {
    constructor(name, profession) {
        this.name = name;
        this.profession = profession;
        this.inventory = [];
    }
}

class Item {
    constructor(name, status) {
        this.name = name;
        this.status = status; // 0 for not found, 1 for found
    }
}

class Weapon extends Item {
    constructor(name, damage, status) {
        super(name, status);
        this.damage = damage;
    }
}

var items = [
    baseballBat = new Weapon("Baseball Bat", 10, 1),
    knife = new Weapon("Knife", 50, 1),
    pistol = new Weapon("9mm Hangun", 100, 1),
    wrench = new Item("Wrench", 1),
    petrol = new Item("Petrol Can", 1)
];



