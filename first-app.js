const person={
    name:"Jayanta",
    age:32,
    greet(){
        console.log("Hey, I am "+this.name);
    }
}
// person.greet();
const printName=({name})=>{
    console.log(name);    
}
printName(person);
const hobbies=['Sports','Watching','Programming'];
const [hobby1]=hobbies;
console.log(hobby1);
// console.log(hobbies.map(hobby=> {
//     return 'Hobby : '+hobby;
// }));
// console.log(hobbies);