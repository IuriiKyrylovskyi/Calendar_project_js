const updateTasksColor = e => {
  localStorage.setItem('bgcolor', e.target.value);
};

// const colorInputElem = document.querySelector('[type="color"]');
const colorInputElem = document.querySelector('#color');

colorInputElem.addEventListener('change', updateTasksColor);

// const onStorageChange = e => {
//    document.querySelectorAll('.event').forEach(task => {
//      task.style.backgroundColor = e.target.value;
//      // console.log(task);
//    });
// };
// window.addEventListener('storage', onStorageChange);

// const defaultColor = '#518fe0';

// localStorage.setItem('bgcolor', defaultColor);
