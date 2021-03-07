const updateTasksColor = e => {
  document.querySelectorAll('.event').forEach(task => {
    task.style.backgroundColor = e.target.value;
    // return task;
  });
};

// const colorInputElem = document.querySelector('[type="color"]');
const colorInputElem = document.querySelector('#color');

colorInputElem.addEventListener('change', updateTasksColor);
