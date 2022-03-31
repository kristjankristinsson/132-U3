'use strict'

let inputCourse = document.getElementById('sok-kurs');

function hittaKurs () {
  let course = DATABASE.courses
    .filter((course) => course.title.toLowerCase().includes(inputCourse.value));
// sortera efter kurs a,b,c
    course.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        } 
        if (a.title < b.title) {
            return -1;
        }
        return 0; 
    });
    return course; 
}
// Eventlyssnare 
inputCourse.addEventListener("keyup", function(){
    let kurshittad = hittaKurs ();
    document.getElementById("results").innerHTML = "";
    skapaHTML(kurshittad);

    if (inputCourse.value == ""){
        document.getElementById("results").innerHTML = "";
    }
});


function renderaKurs (course) {
    let results = document.getElementById("results");
    let div = document.createElement("div");
    let courseTitle = document.createElement("h2");
    div.classList.add("studentContainer");

    courseTitle.innerText = course.title + " (" + course.totalCredits + " credits)";
    results.appendChild(courseTitle);
    results.appendChild(div);
// kurs lärare 
    let foundStudents = getStudentsById(course);
    let huvudLararen = getResponsibleTeacher(course);
    let allTeachers = getAllTeachers(course);
    let studentCourses = [];
    
    for (let student of foundStudents){
        for (let studentCourse of student.courses){
            if (studentCourse.courseId == course.courseId){
                studentCourses.push(studentCourse);
            }
        }
    }

    for (let i = 0; i < foundStudents.length; i ++){
        let studenter = document.createElement("div");
        studenter.classList.add("studenter");

        div.appendChild(studenter);
        studenter.innerText = foundStudents[i].firstName + " " + foundStudents[i].lastName + " (" + studentCourses[i].passedCredits +" credits)" + "\n" 
        + "Started: "+ studentCourses[i].started.semester + " " + studentCourses[i].started.year; 
        
        if (studentCourses[i].passedCredits == course.totalCredits){
            studenter.style.backgroundColor = "green";
        }
    }

    let repsonsibleDiv = document.createElement("div"); 
    repsonsibleDiv.innerHTML = "Course responsible: ";
    repsonsibleDiv.classList.add("ansvarig");
    div.appendChild(repsonsibleDiv);


    for (let i = 0; i < huvudLararen.length; i++) {
        let respP = document.createElement("p");
        respP.classList.add("respP");
        repsonsibleDiv.appendChild(respP);
        respP.innerText = huvudLararen[i].firstName + " " + huvudLararen[i].lastName + " (" + huvudLararen[i].post + ")";
    }

    let larare = document.createElement("div");
    larare.classList.add("larare");
    div.appendChild(larare);
    larare.innerText = "Teachers: ";

    for(let i = 0; i < allTeachers.length; i++){
        let teacherP = document.createElement("p");
        larare.appendChild(teacherP);
        teacherP.innerText =  allTeachers[i].firstName + " " + allTeachers[i].lastName + " (" + allTeachers[i].post + ")";
    }
}

function skapaHTML (courses) {
    for (let course of courses){
        renderaKurs(course);
    }
}

// Hitta rätt student baserad på studentID:et
function getStudentsById(course) {
    let foundStudents = [];

    for (let student of DATABASE.students) {
        for (let studentCourse of student.courses) {
            if (studentCourse.courseId == course.courseId) {
                foundStudents.push(student);
            }
        }
    }
    return foundStudents;
}


// hitta lärarna
function getResponsibleTeacher (course) {
    let responsibleTeacher = [];

    for (let teacher of DATABASE.teachers) {
         if (teacher.teacherId == course.courseResponsible) {
            responsibleTeacher.push(teacher);
        }  
    }
    return responsibleTeacher;
}


// Lärare kopplade till kurs
function getAllTeachers (course){
    let allTeachers = [];

    for (let teacher of DATABASE.teachers){
        for(let oneTeacher of course.teachers)
        if (teacher.teacherId == oneTeacher){
            allTeachers.push(teacher);
        }
    }
    return allTeachers;
}
