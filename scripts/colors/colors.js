export const updateTasksColor = e => {
  document.querySelectorAll('.event').forEach(task => {
    task.style.backgroundColor = e.target.value;
    console.log(task);
    return task;
  });
};

// const colorInputElem = document.querySelector('[type="color"]');
const colorInputElem = document.querySelector('#color');

if (colorInputElem) {
  colorInputElem.addEventListener('change', updateTasksColor);
}

// const onStorageChange = e => {
//    document.querySelectorAll('.event').forEach(task => {
//      task.style.backgroundColor = e.target.value;
//      // console.log(task);
//    });
// };
// window.addEventListener('storage', onStorageChange);