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
      return;
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
  let traitGroup = [];
  let traitSearch = prompt('What trait would you like to filter people by?  You can select "ID Number", "Gender", "Date of Birth", "Height", "Weight", "Eye Color" "Occupation", "Parents", or "Spouse"')
  switch(traitSearch.toLowerCase()){
      case "id":
      case "id number":
      case "id #":
          traitGroup =searchUsersByID(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "gender":
      case "sex":
          traitGroup = searchUsersByGender(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "date of birth":
      case "dob":
          traitGroup = searchUsersByDOB(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "height":
          traitGroup = searchUsersByHeight(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "weight":
      case "lbs":
          traitGroup = searchUsersByWeight(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "eye color":
      case "eyes":
          traitGroup = searchByEyeColor(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "occupation":
      case "job":
      case "profession":
          traitGroup = searchByOccupation(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "parents":
          traitGroup = searchByParents(people);
          narrowDownTraitGroup(traitGroup);
          break;
      case "spouse":
      case "married":
          traitGroup = searchByCurrentSpouse(people);
          narrowDownTraitGroup(traitGroup);
          break;
  }
}

function narrowDownTraitGroup(traitGroup){
  if(traitGroup.length <= 1){
    let person = traitGroup;
    return mainMenu(person);
  }
  if(traitGroup.length > 1){
    let userInput = promptFor("Would you like to run your new group through again and look for another trait to narrow your list down?  Please enter \"yes\" or \"no\".", yesNo).toLowerCase();
      if(userInput === "yes"){
    findPeopleByTraits(traitGroup);
    }
  if(traitGroup.length === 0){
    alert("We had no one in our database that matches all the parameters you were searching for.")
  }
  else{
    return app(people);
  }
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
    let userInput = promptFor("What Eye Color do you want to search for today?", eyeColor)
    if(userInput.toLowerCase() === "brown", "blue", "black", "hazel", "green"){
      if(userInput.toLocaleLowerCase === "exit"){
        return;
      }  
      let eyeColor = [];
        eyeColor = people.filter(function(people){
            if(people.eyeColor === userInput){
                return eyeColor;
            }
        })
        let traitGroup = eyeColor;
        displayPeople(traitGroup);
        return(traitGroup);
    } 
  }
  function searchByOccupation(people){                  
    let userInput = promptFor("What is the person's occupation?", occupation);
    if(userInput.toLowerCase() === "assistant", "landscaper", "nurse", "programmer", "student", "architect", "doctor", "politician"){
      if(userInput.toLowerCase === "exit"){
        return;
      }
      let occupation = [];
      occupation = people.filter(function(people){
        if(people.occupation === userInput){
          return occupation;
        }
      })
      let traitGroup = occupation;
      displayPeople(traitGroup);
      return(traitGroup);
   }
  } 
function searchUsersByGender(people){
  let userInput = promptFor("What gender do you want to search for today?", maleFemale);
  if(userInput.toLowerCase === "exit"){
    return;
  }
  if(userInput.toLowerCase() === "male"){
      let men = [];
      men = people.filter(function(people){
          if(people.gender === userInput){
              return men;
          }
      })
      let traitGroup = men;
      displayPeople(traitGroup);
      return traitGroup;
  } 
  else if(userInput.toLowerCase() === "female"){
    let women = [];
    women = people.filter(function(people){
        if(people.gender === userInput){
            return women;
        }
    })
    let traitGroup = women;
    displayPeople(traitGroup);
    return(traitGroup);
  }
}  

  function searchByParents(people){
    let userInput = promptFor("Does the person have a parent?", yesNo)
    if(userInput.toLowerCase() === "yes"){
      let hasParents = [];
      hasParents = people.filter(function(people){
        if(people.parents.length > 0){
        return hasParents;
      }
    })
    let traitGroup = hasParents;
    displayPeople(traitGroup);
    return(traitGroup);
    }
  }

  function searchByCurrentSpouse(people){
    let userInput = promptFor("Does the person have a current spouse?", yesNo)
    if(userInput.toLowerCase() === "yes"){
      let hasSpouse = [];
      hasSpouse = people.filter(function(people){
        if(people.currentSpouse > 0){
          return hasSpouse;
        }
          })
          let traitGroup = hasSpouse;
          displayPeople(traitGroup);
          return(traitGroup);

      //   if(userInput.towLowerCase() ==="no"){  this is currently commented out because it breaks the whole file
      //  let doesNotHaveSpouse = [];
      //  doesNotHaveSpouse = people.filter(function(people){
      //    if(people.currentSpouse < 0){
      //      return doesNotHaveSpouse;
      //    }
      //    })
      //   displayPeople(doesNotHaveSpouse);
      }
    }

function searchUsersByHeight(people){
  let userInput = promptFor("Do you know the height of the individual in inches?  If so, please enter it.", height)
  if(userInput.toLowerCase() === "exit"){
    return;
  }
  let peopleByHeight = [];
  peopleByHeight = people.filter(function(people){
      if(people.height == userInput){
          return peopleByHeight;
      }
  })
  let traitGroup = peopleByHeight;
  displayPeople(traitGroup);
  return(traitGroup);
}
function searchUsersByWeight(people){
  let userInput = promptFor("Do you know the weight of the individual in pounds?  If so, please enter it.", weight)
  if(userInput.toLowerCase === "exit"){
    return;
  }
  let peopleByWeight = [];
  peopleByWeight = people.filter(function(people){
      if(people.weight == userInput){
          return peopleByWeight;
      }
  })
  let traitGroup = peopleByWeight;
  displayPeople(traitGroup)
  return traitGroup;
}
function searchUsersByID(people){
  let userInput = promptFor("If for some reason you can't remember a person's name but you can remember their 9 digit ID number, enter the numerical ID below.", idNumber)
  if(userInput.toLowerCase() === "exit"){
    return;
  }
  let peopleByID = [];
  peopleByID = people.filter(function(people){
      if(people.id == userInput){
          return peopleByID;
      }
  })
  let traitGroup = peopleByID;
  displayPeople(traitGroup);
  return traitGroup;
}
function searchUsersByDOB(people){
  let userInput = promptFor("If you can remember what your person's birthday is, please enter it in the format of month/day/year.", autoValid);
  if(userInput.toLowerCase() === "exit"){
    return;
  }
  let peopleByDOB = [];
  peopleByDOB = people.filter(function(people){
    if(people.dob == userInput){
        return peopleByDOB;
    }
  })
  let traitGroup = peopleByDOB;
  displayPeople(traitGroup);
  return(traitGroup);
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

function maleFemale(input){
  if(input.toLowerCase() == "male" || input.toLowerCase() == "female"){
    return true;
  }
  else{
    return false;
  }
}  
function occupation(input){
  if(input.toLowerCase() == "nurse"||input.toLowerCase() == "doctor"||input.toLowerCase() == "landscaper"||input.toLowerCase() == "assistant"||input.toLowerCase() == "programmer"||input.toLowerCase() == "politician"||input.toLowerCase() == "architect"||input.toLowerCase() == "exit"){
    return true;
  }
  else{
    return false;
  }
}
function eyeColor(input){
  if(input.toLowerCase() == "blue"||input.toLowerCase() == "green"||input.toLowerCase() == "hazel"||input.toLowerCase() == "black"||input.toLowerCase() == "brown"||input.toLowerCase() == "exit"){
    return true;
  }
  else{
    return false;
  }
}
function height(input){
  if(input>=58&&input<=76 ||input.toLowerCase() == "exit"){
    return true;
  }
  else{
    return false;
  }
}
function weight(input){
  if(input>=100&&input<=256 ||input.toLowerCase() == "exit"){
    return true;
  }
  else{
    return false;
  }
}
function idNumber(input){
  if(input.length === 9||input.toLowerCase() == "exit"){
    return true;
  }
  else{
    return false;
  }
}


//#endregion