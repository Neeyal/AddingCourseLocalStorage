// variables

const courses = document.querySelector('#courses-list'),

    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#button1');


// listeners
loadEvent();
function loadEvent(){
  courses.addEventListener('click',buyCourse);

  shoppingCartContent.addEventListener('click', removeCourse);

  clearCartBtn .addEventListener('click', clearCart);

  document.addEventListener('DOMContentLoaded' , getFromLocalStorage)
}
// function
function buyCourse(e){
  e.preventDefault();
 if(e.target.classList.contains('add-to-cart')){
    const course = e.target.parentElement.parentElement;
    getCourseInfo(course);
  }
}


function getCourseInfo(course){ 
const courseInfo = {
 image: course.querySelector('img').src,
 title: course.querySelector('h4').textContent,
 price: course.querySelector('.price span').textContent,
 id: course.querySelector('a').getAttribute('data-id')
}
addIntoCart(courseInfo);
}

//Display the slected course in to shoping cart

function addIntoCart(course){
  const row= document.createElement('tr');

  row.innerHTML = `<tr>
  <td> 
  <img src= "${course.image}" width=80>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td><a href="#" class="remove" data-id="${course.id}">x</a></td>
  </tr>`;

  shoppingCartContent.appendChild(row);

  saveToStorage(course);
}

function saveToStorage(course){
let courses = getCoursesFromStorage();

courses.push(course);

localStorage.setItem('courses', JSON.stringify(courses));

}

function getCoursesFromStorage()
{
  let courses;

  if(localStorage.getItem('courses')===null){
    courses=[];
  }
  else{
    courses = JSON.parse(localStorage.getItem('courses'));
  }
  return courses;
}
function getFromLocalStorage(){
  let coursesLS = getCoursesFromStorage();

  coursesLS.forEach(function(course){

    const row= document.createElement('tr');

    row.innerHTML = `<tr>
    <td> 
    <img src= "${course.image}" width=80>
    </td>
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td><a href="#" class="remove" data-id="${course.id}">x</a></td>
    </tr>`;
    shoppingCartContent.appendChild(row);
  });

}

function removeCourse(e){
  let course, courseID;
if(e.target.classList.contains('remove')){
  e.target.parentElement.parentElement.remove();
  course= e.target.parentElement.parentElement;
  courseID = course.querySelector('a').getAttribute('data-id');
}
console.log(courseID);
 removeFromLocalStorage(courseID);
}
function removeFromLocalStorage(id){
  let coursesLS = getCoursesFromStorage();
  coursesLS.forEach(function(courseLS,index){
    if(courseLS.id===id){
      coursesLS.splice(index,1);
    }
  });
localStorage.setItem('courses',JSON.stringify(coursesLS));
}


function clearCart(e){
  shoppingCartContent.innerHTML = '';
  clearLocalStorage();
}

function clearLocalStorage(){
  localStorage.clear();
}