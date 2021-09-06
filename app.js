"use strict"

//Menu functions
/////////////////////////////////////////////////////////////////
//#region 
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
    app(people);
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      displayPerson(person[0]);
      break;
    case "family":
      findPersonsFamily(person[0], people);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}
//#endregion


//Filter functions
/////////////////////////////////////////////////////////////////
//#region 
function findPeopleByTraits(people){
  let traitGroup = [];
  let traitSearch = prompt('What trait would you like to filter people by?  You can select "ID Number", "Gender", "Date of Birth", "Height", "Weight", "Eye Color" "Occupation", "Parents", or "Spouse".  You can also search for multiple traits at a time by typing "multiple".')
  switch(traitSearch.toLowerCase()){
      case "id":
      case "id number":
      case "id #":
        traitGroup =searchUsersByID(people);
        narrowDownTraitGroup(traitGroup);
        break;
      case "name":
      case "first name":
      case "first":
        traitGroup = searchUsersByFirstName(people);
        narrowDownTraitGroup(traitGroup);
        break;
      case "last name":
      case "family name":
      case "surname":
        traitGroup = searchUsersByLastName(people);
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
      case "multiple":
        searchByMultipleTraits(people);
        break;
  }
}
//#endregion


//Multiple Trait Functions
/////////////////////////////////////////////////////////////////
//#region
function searchByMultipleTraits(people){
  let numberOfTraits;
  let userTraits = [];
  let filteredPeople = [];
  numberOfTraits = determineNumberOfTraits(numberOfTraits);
  multipleTraitInput(userTraits, numberOfTraits);
  while(userTraits.length>0){
    filteredPeople = compareTraits(userTraits, people);
      if(filteredPeople.length === 1){
        alert("Your search has yielded only one individual.");
        let person = filteredPeople;
        mainMenu(person, people);
        return;
      }
      else if (filteredPeople.length == 0){
        alert("There are no people on our current list that match those traits.  Please try again")
          app(people);
          return;
      }
  }
  if(filteredPeople.length > 0)narrowDownTraitGroup(filteredPeople);
}
function determineNumberOfTraits(numberOfTraits){
  numberOfTraits = promptFor("How many traits would you like to use to search today?  Please enter a numeric value between 2 and 5.", numberOfTraitsValid);
  return numberOfTraits;
}
function determineTrait(userTraits){
  let userTrait = promptFor('What is a you wish to search for? Please enter a trait from the following list:\n"id"\n"first name"\n"last name"\n"gender"\n"dob"\n"weight"\n"eye color"\n"occupation"\n"has parents"\n"has spouse"', multipleTraitsValid);
  userTrait = convertInputToProperTerm(userTrait);
  userTraits.push(userTrait);
  return userTraits
}
function multipleTraitInput(userTraits, numberOfTraits){
  if(numberOfTraits === 0){
    return;
  }
  else{
    determineTrait(userTraits);
    multipleTraitInput(userTraits, numberOfTraits -1);
    return;
  }
}
function convertInputToProperTerm(userTrait){
  switch(userTrait.toLowerCase()){
    case "id":
    case "id number":
    case "id #":
        userTrait = "id";
        return userTrait;
    case "first name":
    case "first":
    case "name":
      userTrait = "firstName";
      return userTrait;
    case "last name":
    case "surname":
    case "family name":
      userTrait = "lastName"
      return userTrait;
    case "gender":
    case "sex":
        userTrait = "gender";
        return userTrait;
    case "date of birth":
    case "dob":
    case "birthday":
        userTrait = "dob";
        return userTrait;
    case "height":
        userTrait = "height";
        return userTrait;
    case "weight":
    case "lbs":
        userTrait = "weight"
        return userTrait;
    case "eye color":
    case "eyes":
    case "color":
        userTrait = "eyeColor";
        return userTrait;
    case "occupation":
    case "job":
    case "profession":
        userTrait = "occupation";
        return userTrait;
    case "parents":
    case "has parents":
        userTrait = "parents"
        return userTrait;
    case "spouse":
    case "married":
        userTrait = "currentSpouse"
        return userTrait;
  }
}
function compareTraits(userTraits, people){
  let traitOne = userTraits.shift();
  let filteredPeople = [];
  if(traitOne === "id"){
    filteredPeople = searchUsersByID(people);
  }
  if(traitOne === "firstName"){
    filteredPeople = searchUsersByFirstName(people);
  }
  if(traitOne === "lastName"){
    filteredPeople = searchUsersByLastName(people);
  }
  if(traitOne === "gender"){
    filteredPeople = searchUsersByGender(people);
  }
  if(traitOne === "dob"){
    filteredPeople = searchUsersByDOB(people);
  }
  if(traitOne === "height"){
    filteredPeople = searchUsersByHeight(people);
  }
  if(traitOne === "weight"){
    filteredPeople = searchUsersByWeight(people);
  }
  if(traitOne === "eyeColor"){
    filteredPeople = searchByEyeColor(people);
  }
  if(traitOne === "occupation"){
    filteredPeople = searchByOccupation(people);
  }
  if(traitOne === "parents"){
    filteredPeople = searchByParents(people);
  }
  if(traitOne === "currentSpouse"){
    filteredPeople = searchByCurrentSpouse(people);
  }
  return filteredPeople;
}
function narrowDownTraitGroup(traitGroup){
  if(traitGroup.length === 1){
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
//#endregion


//Trait Functions
/////////////////////////////////////////////////////////////////
//#region 

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
function searchUsersByFirstName(people){
  let userInput = promptFor("If you only remember the first name of the person, please type it in below.  Remember, names start with a capital letter!", autoValid)
  if(userInput.toLowerCase() === "exit"){
    return;
  }
  let peopleByFirstName = [];
  peopleByFirstName = people.filter(function(people){
      if(people.firstName == userInput){
          return peopleByFirstName;
      }
  })
  let traitGroup = peopleByFirstName;
  displayPeople(traitGroup);
  return traitGroup;
}
function searchUsersByLastName(people){
  let userInput = promptFor("If you only remember the last name of the person, please type it in below.  Remember that names start with a capital letter!", autoValid)
  if(userInput.toLowerCase() === "exit"){
    return;
  }
  let peopleByLastName = [];
  peopleByLastName = people.filter(function(people){
      if(people.lastName == userInput){
          return peopleByLastName;
      }
  })
  let traitGroup = peopleByLastName;
  displayPeople(traitGroup);
  return traitGroup;
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
function searchByEyeColor(people){
  let userInput = promptFor("What Eye Color do you want to search for today?", eyeColorValid)
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
  //    if(people.currentSpouse  0){
  //      return doesNotHaveSpouse;
  //    }
  //    })
  //   displayPeople(doesNotHaveSpouse);
  }
}

//#endregion


//Family Functions
/////////////////////////////////////////////////////////////////
//#region 
function findPersonsFamily(person, people){
  let spouse = findPersonsSpouse(person, people);
  person.spouseName = spouse;
  let parentNames = findPersonsParents(person, people);
  person.parentNames = parentNames;
  let siblingID = findPersonSiblingsID(person, people);
    if(siblingID === "Unknown"){
      let numberOfSiblings = 0;
      person.numberOfSiblings = numberOfSiblings;
    }
    else{
      let numberOfSiblings = siblingID.length;
      person.numberOfSiblings = numberOfSiblings;
  }
  let siblingNames = findSiblingsNames(siblingID, people);
  person.siblingNames = siblingNames;
  let childrenNames = findPersonChildren(person, people);
  person.childrenNames = childrenNames;
  

  displayFamily(person)
}
function findPersonsSpouse(person, people){
  let spouse;
  let spouseID = person.currentSpouse; 
  spouseID = people.filter(function(people){ 
      if(people.id == spouseID){
        let person = people;
        spouse = person.firstName + " " + person.lastName;
        return spouse;
      }
  })
  if(spouse === undefined){
    spouse = "Unknown";
    return spouse;
}
  return spouse;
}
function findPersonsParents(person, people){
  let parentNames;
  let parentOne;
  let parentTwo;
  let parentID = person.parents;
  if(parentID.length ==0){
    parentNames = "Unknown";
    return parentNames;
  }
  let parentOneID = parentID[0];
  let parentTwoID = parentID[1];
  parentOneID = people.filter(function(people){ 
    if(people.id == parentOneID){
      let person = people;
      parentOne = person.firstName + " " + person.lastName;
      return parentOne;
    }
    return parentOne;
  })
  if(parentTwoID != undefined){
    parentTwoID = people.filter(function(people){ 
      if(people.id == parentTwoID){
        let person = people;
        parentTwo = person.firstName + " " + person.lastName;
        return parentTwo;
      }    
    })
  }
  if(parentTwoID == undefined){
    parentTwo = "Unknown";
  }
  parentNames = parentOne + " and " + parentTwo;
  return parentNames;
}
function findPersonSiblingsID(person, people){
  let siblingID = [];
  let siblings;
  let parentID = person.parents;
  let personID = person.id;
  if(parentID.length == 0){
    siblingID = 0;
    siblings = "Unknown";
    return siblingID, siblings;
  }
  let parentOneID = parentID[0];
  let parentTwoID = parentID[1];
  siblingID = people.filter(function(people){
      if(people.id != personID&&people.parents[0]==parentOneID || people.parents[1] == parentOneID){
        return siblingID;
      }
  })
  if(parentTwoID == undefined){
    return siblingID;
  }
  else{
    siblingID = people.filter(function(people){ 
      if(people.id !== personID && people.parents[0]==parentTwoID||people.parents[1] == parentTwoID){
        return siblingID;
      }
    })
  }
  returnParentIDtoFormer(person, parentOneID, parentTwoID)
  return siblingID;
}
function returnParentIDtoFormer(person, parentOneID, parentTwoID){
  if(parentTwoID === undefined){
    person.parents = parentOneID;
  }
  else{
    person.parents = parentOneID + ", " + parentTwoID;
  }
}
function findSiblingsNames(siblingID, people){
  let siblingNames = "";
  if(siblingID.length == 0){
    siblingNames = "Unknown";
    return siblingNames;
  }
  for(let i = 0; i<siblingID.length; i++){
    let oneSibling = siblingID[i];
    let oneSiblingID = oneSibling.id;
    oneSiblingID = people.filter(function(people){
      if(people.id == oneSiblingID){
      let person = people;
      let siblingName = person.firstName + " " + person.lastName + ",";
      siblingNames += "  " + siblingName;
      return siblingNames;
      }
    })
  }
  return siblingNames;
}
function findPersonChildren(person, people){
  let childrenNames =""
  let parentID = person.id
  let children = [];
  children = people.filter(function(people){
    if(parentID == people.parents[0]||parentID == people.parents[1]){
        let children = people;
        childrenNames += children.firstName + " " + children.lastName + ", ";
        return childrenNames;
    }
  })
  if(childrenNames == ""){
    childrenNames = "Unknown";
  }
  return childrenNames;
}

//#endregion


//Display functions
/////////////////////////////////////////////////////////////////
//#region 

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
function displayFamily(person){
  let personInfo = "The full name of the person you're viewing: " + person.firstName + " " + person.lastName + "\n";
  personInfo += "Parents: " + person.parentNames +"\n";
  personInfo += "Current Spouse: " + person.spouseName + "\n";
  personInfo += `Siblings: ${person.numberOfSiblings} siblings\n`;
  if (person.siblingNames != undefined){
    personInfo +=`Sibling Names: ${person.siblingNames}\n`;
  } 
  personInfo += "Children: " + person.childrenNames + "\n";
  alert(personInfo);
}
//#endregion


//Validation functions
/////////////////////////////////////////////////////////////////
//#region 
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"|| input.toLowerCase() == "exit"){
    return true;
  }
  else{
    return false;
  }
}
function autoValid(input){
  return true; // default validation only
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
function eyeColorValid(input){
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
function numberOfTraitsValid(input){
  if(input>=2 &&input <=5||input.toLowerCase() == "exit"){
    return true;
  }
  else{
    return false;
  }
}
function multipleTraitsValid(input){
  if(input.toLowerCase() == "exit"||input.toLowerCase() == "id"||input.toLowerCase() == "id number"||input.toLowerCase() == "id #"||input.toLowerCase() == "name"||input.toLowerCase() == "first name"||input.toLowerCase() == "first"||input.toLowerCase() == "last name"||input.toLowerCase() == "family name"||input.toLowerCase() == "surname"||input.toLowerCase() == "gender"||input.toLowerCase() == "sex"||input.toLowerCase() == "date of birth"||input.toLowerCase() == "dob"||input.toLowerCase() == "height"||input.toLowerCase() == "weight"||input.toLowerCase() == "lbs"||input.toLowerCase() == "eye color"||input.toLowerCase() == "eyes"||input.toLowerCase() == "occupation"||input.toLowerCase() == "job"||input.toLowerCase() == "profession"||input.toLowerCase() == "parents"||input.toLowerCase() == "has parents"||input.toLowerCase() == "has spouse"||input.toLowerCase() == "spouse"||input.toLowerCase() == "married"){
    return true;
  }
  else{
    return false;
  }
}

//#endregion


//testing
/////////////////////////////////////////////////////////////////
//#region


//#end region
