// RESOURCES
// https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
// https://howtocreateapps.com/fetch-and-display-json-html-javascript/
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
// https://github.com/airbnb/javascript#functions

// Object.entries
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

const root = document.getElementById('root');

fetch("./students.json")
    .then(handleErrors)
    .then(data => displayStudents(data) )
    .catch(error => console.log(error) )

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response.json()
}


function displayStudents(data) {
    data.forEach(obj => {
        const details = document.createElement('details')
        const parentSection = document.createElement('p')
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'parents') {
                parentSection.innerHTML = displayParentsHelper(value)
                details.appendChild(parentSection)            
            } else if ( key === 'name'){
                const summary = document.createElement('summary')
                summary.innerHTML = `${value}`
                details.appendChild(summary)
                this.root.appendChild(details)
            }
            
        })
    })
}


function displayParentsHelper(parentObj){
    let response;
    if (parentObj.constructor.name === "Array") {
        parentObj.forEach(obj => { 
            // console.log('in Parent helper', displayParent(obj));
            response = displayParent(obj)
        })
    } else {
        // console.log('in Parent helper', displayParent(parentObj));
        response = displayParent(parentObj);
    }
    return response;
}


function displayParent(obj) {
    let response; 
    Object.entries(obj).forEach(([key, value]) => {
        if ( key === 'name'){
            response = value;
            // const div = document.createElement('h4')
            // div.innerHTML = `parent: ${value}`
            // this.root.appendChild(div)
        }  
    })
    // console.log("in display parent", response)
    return response;
}

// function displayParents(parentObj) {
//     // console.log(parentObj);
//     if (parentObj.constructor.name === "Array"){
//         parentObj.forEach(obj => {
//             Object.entries(obj).forEach(([key, value]) => {
//                 const div = document.createElement('span')
//                 div.innerHTML = `${key} ${value}`
//                 this.root.appendChild(div)
//                 console.log(key)
//             })
            
//         })
        
    
//     } else {
//         Object.entries(parentObj).forEach(([key, value]) => {
//             if ( key === 'name'){
//                 const valueReturn = value;
//                 return valueReturn;
//             } 
//             const div = document.createElement('span')
//             div.innerHTML = `${key} ${value}`
//             this.root.appendChild(div)
//         })
//     } 
// }