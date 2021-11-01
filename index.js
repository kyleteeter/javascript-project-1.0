// RESOURCES
// https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
// https://howtocreateapps.com/fetch-and-display-json-html-javascript/
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
// https://github.com/airbnb/javascript#functions

// Object.entries
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries




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
    // console.log(data)
    const root = document.getElementById('root')
    data.forEach(obj => {
        // console.log("object" ,obj)
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'parents') {
                displayParents(value)
                return
            }
            const div = document.createElement('div')
            div.innerHTML = `${key} ${value}`
            root.appendChild(div)
        })
    })
}

function displayParents(parentObj) {
    parentObj.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            const div = document.createElement('div')
            div.innerHTML = `${key} ${value}`
            root.appendChild(div)
        })
    })
}