function Room(id, owner) {
    this.id = id;
    this.people = [];
    this.owner = owner;
}

Room.prototype.addPerson = function(personID) {
    this.people.push(personID);
}

Room.prototype.removePerson = function (person) {
    let personID = -1;
    for (let i = 0; i < this.people.length; i++) {
        if(this.people[i].id == person.id){
            personID = i;
            break;
        }
    }
    this.people.remove(personID);
}

Room.prototype.getPerson = function (personID) {
    let person = null;
    for (let i = 0; i < this.people.length; i++) {
        if(this.people[i].id == person.id){
            person = this.people[i];
            break;
        }
    }
    return person;
}

module.exports = Room;