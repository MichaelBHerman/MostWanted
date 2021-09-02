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

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      displayPerson(person[0]);
    // TODO: get person's info
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
          searchUsersByID(people);
          break;
      case "gender":
      case "sex":
          searchUsersByGender(people);
          return;
      case "date of birth":
      case "dob":
          searchUsersByDOB(people);
          break;
      case "height":
          searchUsersByHeight(people);
          break;
      case "weight":
      case "lbs":
          searchUsersByWeight(people);
          break;
      case "eye color":
      case "eyes":
          searchByEyeColor(people);
          break;
      case "occupation":
      case "job":
      case "profession":
          searchByOccupation(people);
          break;
      case "parents":
          searchByParents(people);
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
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}


function searchByEyeColor(people){
    let userInput = prompt("What Eye Color do you want to search for today?")
    if(userInput.toLowerCase() === "brown", "blue", "black", "hazel", "green"){
        let eyeColor = [];
        eyeColor = people.filter(function(people){
            if(people.eyeColor === userInput){
                return eyeColor;
            }
        })
        displayPeople(eyeColor);
    } 
  }

  function searchByOccupation(people){                  
    let userInput = prompt("What is the person's occupation?");
    if(userInput.toLowerCase() === "assistant", "landscaper", "nurse", "programmer", "student", "architect", "doctor", "politician"){
      let occupation = [];
      occupation = people.filter(function(people){
        if(people.occupation === userInput){
          return occupation;
        }
      })
      displayPeople(occupation);
   }
  } 
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
      alert("We do not currently have anyone of those genders in our list");
    } 
  }  

  function searchByParents(people){
    let userInput = prompt("Does the user have parents?")
    if(userInput.toLowerCase() === "yes"){
      let hasParents = [];
      hasParents = people.filter(function(people){
        if(people.parents < 1000000000){
        return hasParents;
      }
    })
    displayPeople(hasParents)
    }
  }
    //TODO: add other trait filter functions here.


function searchUsersByHeight(people){
  let userInput = promptForHeight("Do you know the height of the individual in inches?  If so, please enter it.")
  let peopleByHeight = [];
  peopleByHeight = people.filter(function(people){
      if(people.height == userInput){
          return peopleByHeight;
      }
  })
  displayPeople(peopleByHeight);
}
function searchUsersByWeight(people){
  let userInput = promptForWeight("Do you know the weight of the individual in pounds?  If so, please enter it.")
  let peopleByWeight = [];
  peopleByWeight = people.filter(function(people){
      if(people.weight == userInput){
          return peopleByWeight;
      }
  })
  displayPeople(peopleByWeight)
}
function searchUsersByID(people){
  let userInput = promptForID("If for some reason you can't remember a person's name but you can remember their 9 digit ID number, enter the numerical ID below.")
  let peopleByID = [];
  peopleByID = people.filter(function(people){
      if(people.id == userInput){
          return peopleByID;
      }
  })
  displayPeople(peopleByID)
}
function searchUsersByDOB(people){
  let userInput = promptForID("If you can remember what your person's birthday is, please enter it in the format of month/day/year.")
  let peopleByDOB = [];
  peopleByDOB = people.filter(function(people){
      if(people.dob == userInput){
          return peopleByDOB;
      }
  })
  displayPeople(peopleByDOB)
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

function promptForGender(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    valid = "male"||"female"||"cis"||"transgender"||"binary";
    isValid = valid
  } while(response === ""  ||  isValid === false)
  return response;
}
function promptForHeight(question, valid){
    let isValid;
    do{
      var response = prompt(question).trim();
      valid = 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77
      isValid = valid
    } while(response === ""  ||  isValid === false)
    return response;
}
function promptForWeight(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    valid = response > 99 && response < 257
    isValid = valid
  } while(response === ""  ||  isValid === false)
  return response;
}
function promptForID(question, valid){
  let isValid;
  do{
      var response = prompt(question).trim();
      let x = response.charAt(0) && response.charAt(1) && response.charAt(2)&& response.charAt(3)&& response.charAt(4)&& response.charAt(5)&& response.charAt(6)&& response.charAt(7)&& response.charAt(8)&& response.charAt(9)
      valid = x >= 0 && x<=9;
      isValid = valid
  } while(response === ""  ||  isValid === false)
  return response;
}
function searchUsersByDOB(people){
  let userInput = promptForID("If you can remember what your person's birthday is, please enter it in the format of month/day/year.")
  let peopleByDOB = [];
  peopleByDOB = people.filter(function(people){
      if(people.dob == userInput){
          return peopleByDOB;
      }
  })
  displayPeople(peopleByDOB)
}
//#endregion