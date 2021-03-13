function Room(id, owner) {
    this.id = id;
    this.people = [];
    this.owner = owner;
}

Room.prototype.addPerson = function(person,username) {
    this.people.push({"id" : person.id, "name" : username});
}

Room.prototype.removePerson = function (person) {
    for (let i = 0; i < this.people.length; i++) {
        if(this.people[i].id == person.id){
            this.people.splice(i,1);
            break;
        }
    }
}

Room.prototype.getPerson = function (person) {
    for (let i = 0; i < this.people.length; i++) {
        if(this.people[i].id == person.id){
            person = this.people[i];
            break;
        }
    }
    return person;
}

module.exports = Room;