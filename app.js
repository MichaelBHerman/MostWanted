"use strict"

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people); 
      break;
    case 'no':
      findPeopleByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person[0]);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
function findPeopleByTraits(people){
  let traitSearch = prompt('What trait would you like to filter people by?  You can select "ID Number", "Gender", "Date of Birth", "Height", "Weight", "Eye Color" "Occupation", "Parents", or "Spouse"')
  switch(traitSearch.toLowerCase()){
      case "id":
      case "id number":
      case "id #":
          console.log("testing ID input");
          break;
      case "gender":
      case "sex":
          searchUsersByGender(people);
          break;
      case "date of birth":
      case "dob":
          console.log("testing DOB");
          break;
      case "height":
          console.log("testing height");
          break;
      case "weight":
      case "lbs":
          console.log("testing weight");
          break;
      case "eye color":
      case "eyes":
          console.log("testing eye color");
          break;
      case "occupation":
      case "job":
      case "profession":
          console.log("testing occupation");
          break;
      case "parents":
          console.log("testing parents");
          break;
      case "spouse":
      case "married":
          console.log("testing marriage");
          break;
  }
}
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;

}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
let eyeColor = promptFor("What is the person's eye color?", autoValid);

let foundEyeColor = people.filter(function(potentialMatch){
  if(potentialMatch.eyeColor === eyeColor){
    return true;
}
  else{
    return false;
  }
  })
  return foundEyeColor;

}

function searchByOccupation(people){                  //OCCUPATION FINDER
  let occupation = promptFor("What is the person's occupation?", autoValid);

let foundOccupation = people.filter(function(potentialMatch){
  if(potentialMatch.occupation === occupation){
    return true;
  }
  else{
    return false;
  }
  })
  return foundOccupation;

}

function searchByParents(people){                                  //PARENT FINDER
  let parents = promptFor("What is the person's parents first name?") //need to find parents id # based on first and last name
}



function searchByCurrentSpouse(people){                           //SPOUSE FINDER
  let currentSpouse = promptFor("What is the name of the person's current spouse?")}

function searchUsersByGender(people){
  let userInput = prompt("What gender do you want to search for today?")

  if(userInput.toLowerCase() === "male"){
      let men = [];
      men = people.filter(function(people){
          if(people.gender === userInput){
              return men;
          }
      })
      displayPeople(men)
  } 
  else if(userInput.toLowerCase() === "female"){
    let women = [];
    women = people.filter(function(people){
        if(people.gender === userInput){
            return women;
        }
    })
    displayPeople(women)
  }
  else if(userInput === "binary" || userInput === "cis" || userInput === "transgender"){
    alert("We do not currently have anyone of those genders in our list.  Please input \"male\" or \"female\" for now.");
    searchUsersByGender(people);
  } 
}
//TODO: add other trait filter functions here.


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Numerical ID: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n"
  personInfo += "Spouse ID: " + person.currentSpouse +"\n"
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion