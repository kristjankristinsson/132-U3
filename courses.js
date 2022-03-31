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