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

  function renderStudent (student) {
    let results = document.getElementById("results");
    let div = document.createElement("div");
    let studentName = document.createElement("h2");
    div.classList.add("studentContainer");

    let studentCourse = getStudentCourses(student);
    let totalCredits = studentCourse.reduce(function(a, b){return a + b}, 0);

    studentName.innerText = student.firstName + " " + student.lastName + " (total credits: " + totalCredits + ")";
    results.appendChild(studentName);
    results.appendChild(div);

    let foundCourses = getCourseById(student);


    for (let i = 0; i < foundCourses.length; i ++){
        let kurser = document.createElement("div");
        kurser.classList.add("kurser");

        div.appendChild(kurser);
        kurser.innerText = foundCourses[i].title + "\n" + student.courses[i].started.semester + " " + student.courses[i].started.year + " / " 
        + student.courses[i].passedCredits + " of " + foundCourses[i].totalCredits + " credits";
        
        if (foundCourses[i].totalCredits == student.courses[i].passedCredits){
            kurser.style.backgroundColor = "green";
        }
    }
    
}


// lägger till i html

function createHTML (students) {
    for (let student of students){
        renderStudent(student);
    }
}

function getCourseById(student) {
    let foundCourses = [];

    for (let i = 0; i < student.courses.length; i ++) {
        foundCourses.push(DATABASE.courses.find(course => {
            return course.courseId == student.courses[i].courseId; 
        }))
    }
    return foundCourses;
}

function getStudentCourses (student) {
    
    let studentCourses = [];

    for (let studentCourse of student.courses) {
        for (let dbCourse of DATABASE.courses) {
            if (studentCourse.courseId == dbCourse.courseId) {
                studentCourses.push(studentCourse.passedCredits);
            }
        }
    }
    return studentCourses;
}

// ändra färg

let themeSwitch = document.querySelector('input');

themeSwitch.addEventListener('change', () => {
    let wrapper = document.getElementById("wrapper");
    let results = document.getElementById("results");
    let body = document.querySelector("body");
    wrapper.classList.toggle('dark-theme');
    results.classList.toggle("dark-theme");
    body.classList.toggle("dark-theme");

});
