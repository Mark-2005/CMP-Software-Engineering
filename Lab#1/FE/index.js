function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', function () {
          deleteEmployee(item.id)
        }) // add event listener to delete button
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('submit').addEventListener('click',createEmployee())
// TODO


// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const name = document.getElementById('name')
  const id = document.getElementById('id')
  const empdata = {
    name: name.value,
    id: id.value
  }

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empdata)
  })
    .then(response => response.json())
    .then(data => {
      fetchEmployees()
    })
    .catch(error => console.error(error))
}

// TODO
function deleteEmployee (){
  // get id
  // send id to BE
  // call fetchEmployees
  const id = document.getElementById('id')
  
  fetch('http://localhost:3000/api/v1/employee/:id', {
    method: 'DELETE',
    body: JSON.stringify({ id })
  })
    .then(response => response.json())
    .then(data => {
      fetchEmployees()
    })
    .catch(error => console.error(error))
}

fetchEmployees()
