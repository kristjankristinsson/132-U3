'use strict'

let inputStudent = document.getElementById('sok-student');

function lookStudent () {
  let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(inputStudent.value.toLowerCase()));

    // Bokstavsordning sortering a,b,c
    student.sort(function (a, b) {
        if (a.lastName > b.lastName) {
            return 1;
        } 
        if (a.lastName < b.lastName) {
            return -1;
        }
        return 0; 
    });

  return student;
}

// Eventlistener för sök
inputStudent.addEventListener('keyup', function () {
    let foundStudent = lookStudent();
    document.getElementById("results").innerHTML = "";
    createHTML(foundStudent);
  
    if (inputStudent.value == ""){
      document.getElementById("results").innerHTML = "";
    }
  });