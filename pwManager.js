var fs = require('fs'),
    readline = require('readline');
    colors = require('colors/safe');

//Creates Write Stream
var writeStream = fs.createWriteStream('passwords.txt', {'flags': 'a'});

//Creates Read Stream
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Generates a randomized 30 character password
function generatePassword(){
  var rdmString = "";
  for ( ; rdmString.length < 30; rdmString  += Math.random().toString(36).substr(2));
  return  rdmString.substr(0, 30);
}

//Function that appends data to the passwords.txt file
function appendToDocument(service, description, password){
	writeStream.write(`${service}\n\n-${description}\n\nPassword: ${password}\n\n___________________________________________________________________________________________________\n\n`);
}

rl.question(colors.green('1) What is the name of the service you need a password for?: '), (serviceName) => {

	rl.question(colors.green('2) A quick description of what the account is for or whatever else you want to record about it: '), (description) => {
		
		appendToDocument(serviceName, description, generatePassword());
		console.log(colors.blue("Finished, the account's information is recorded in your password document!"));
		console.log(colors.red("Warning! Do not share this password document with anyone whom you don't want knowing all of your information. "));
		rl.close();
	
	});//Description Question

});//Service Question
