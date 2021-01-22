// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  console.log(links.classList);

  // if toggle is clicked and displaying show-links => i want to remove it
//   if (links.classList.contains("show-links")) {
//     links.classList.remove("show-links");
//     // or if not displaying => so i want to add it
//   } else {
//     links.classList.add("show-links");
//   }
  links.classList.toggle('show-links');
});
