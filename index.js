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
        const parentSection = document.createElement('div')
        parentSection.className = "parent-wrapper";
        const summary = document.createElement('summary')
        Object.entries(obj).forEach(([key, value]) => {
            console.log(key, value)
            if (key === 'name') {
                let studentName = value;
                summary.innerHTML += `<span><p class="key">${studentName}</p></span>`
            } if (key === 'parents') {
                let [parentInfo, parentName] = displayParentsHelper(value);
                for (i = 0; i  < parentName.length; i++){
                    parentSection.innerHTML += `<details class="parent"><summary>${parentName[i]}</summary>${parentInfo[i]}</details>`
                }
            }
            else {
                details.innerHTML += `<span><p class="key">${key}:<br>${value}</p></span>`
            }
            details.appendChild(parentSection)
        })
        details.appendChild(summary)
        this.root.appendChild(details)
    })
}


function displayParentsHelper(parentObj){
    let parentInfo = []; 
    let parentName = [];
    if (parentObj.constructor.name === "Array") {
        parentObj.forEach(obj => { 
            let[newParentInfo, newParentName] = displayParent(obj);
            parentName.push(newParentName)
            parentInfo.push(newParentInfo)
            // response += `<div class="parent">${displayParent(obj)}</div>`
        })
    } else {
        [parentInfo, parentName] = displayParent(parentObj);
        console.log('parentNameInside', parentInfo)
    }
    
    return [parentInfo, parentName];
}


function displayParent(obj) {
    let parentInfo = []; 
    let parentName = [];
    let tempStorage = [];
    Object.entries(obj).forEach(([key, value]) => {
            if (key === 'name'){
                parentName.push(value)
            } else {
            tempStorage += (`<p>${key}:<br> ${value}</p>`)
            }
    })
    parentInfo.push(tempStorage)
    
    return [parentInfo, parentName];
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