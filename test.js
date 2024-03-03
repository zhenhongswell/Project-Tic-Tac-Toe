function Person(name){
    this.name = name
    const getName = ()=>{
        return this.name
    }
    return {
        getName
    }
}

const person = new Person("test")

console.log(person.getName())