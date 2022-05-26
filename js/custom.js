
fetch("data.json")
.then(function(response){
    return response.json();
})
.then(function(data){
  let placeholder = document.querySelector("#data-output");
  let out = "";
  for(let item of data){
    out += `<tr>
      <th>
        <img src="${item.img}"style="max-width: 10rem; border-bottom-width:0">
      </th>
    <th>${item.first_name}</th>
    <th>${item.last_name}</th>
    <th>${item.email}</th>
    </tr>`;
  }
  placeholder.innerHTML=out;

})

var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["lastname"] = document.getElementById("lastname").value;
  formData["email"] = document.getElementById("email").value;
  return formData;
}

//Insert the data
function insertNewRecord(data) {
  var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.name;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.lastname;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.email;
  cell4 = newRow.insertCell(3);
      cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("lastname").value = selectedRow.cells[1].innerHTML;
  document.getElementById("email").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = formData.lastname;
  selectedRow.cells[2].innerHTML = formData.qty;

}

//Delete the data
function onDelete(td) {
  if (confirm('Do you want to delete this record?')) {
      row = td.parentElement.parentElement;
      document.getElementById('storeList').deleteRow(row.rowIndex);
      resetForm();
  }
}

//Reset the data
function resetForm() {
  document.getElementById("name").value = '';
  document.getElementById("lastname").value = '';
  document.getElementById("email").value = '';
  selectedRow = null;
}