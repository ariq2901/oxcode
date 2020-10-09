const filterToggle = document.getElementById("filter-toggle")
const gridWrapper = document.querySelector('grid-wrapper');
const mainList = document.querySelector('main-list')

filterToggle.addEventListener('click', _ => {
  gridWrapper.classList.toggle('grid-filter');
  mainList.classList.toggle('main-list-filter');
});