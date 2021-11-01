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
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'parents') {
                displayParentsHelper(value)
                return
            }
            const div = document.createElement('div')
            div.innerHTML = `${key} ${value}`
            this.root.appendChild(div)
        })
    })
}

function displayParentsHelper(parentObj){
    if (parentObj.constructor.name === "Array") {
        parentObj.forEach(obj => { displayParent(obj)})
    } else {
        displayParent(parentObj);
    }
}

function displayParent(parentObj) {
    Object.entries(parentObj).forEach(([key, value]) => {
        const div = document.createElement('span')
        div.innerHTML = `${key} ${value}`
        this.root.appendChild(div)
    })
}

// function displayParents(parentObj) {
//     // console.log(parentObj);
//     if (parentObj.constructor.name === "Array"){
//         parentObj.forEach(obj => {
//             Object.entries(obj).forEach(([key, value]) => {
//                 const div = document.createElement('span')
//                 div.innerHTML = `${key} ${value}`
//                 this.root.appendChild(div)
//                 // console.log(key)
//             })
//         })
    
//     } else {
//         Object.entries(parentObj).forEach(([key, value]) => {
//             const div = document.createElement('span')
//             div.innerHTML = `${key} ${value}`
//             this.root.appendChild(div)
//         })
//     }
// }