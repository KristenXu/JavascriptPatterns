function Person(name, age, job){
    this.name= name;
    this.age= age;
    this.job= job;
    this.friends= ["Shelby", "Court"];
}

Person.prototype= {
    constructor: Person,
    sayName: function(){
        alert(this.name);
    }
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");
alert(person1.friends);//"Shelby,Count,Van"  
alert(person2.friends);//"Shelby,Count"  
alert(person1.friends=== person2.friends); //false  
alert(person1.sayName=== person2.sayName); //true 