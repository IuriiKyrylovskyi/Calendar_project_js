const defaultColor = '#518fe0';

const updateTasksColor = e => {
  localStorage.setItem('bgColor', e.target.value);
};

// const colorInputElem = document.querySelector('[type="color"]');
const colorInputElem = document.querySelector('#color');

colorInputElem.addEventListener('change', updateTasksColor);

// const onStorageChange = e => {
//   colorInputElem.value = localStorage.getItem('bgColor');
// };
// window.addEventListener('storage', onStorageChange);

const onDocumentLoaded = () => {
  colorInputElem.value = localStorage.getItem('bgColor') || defaultColor;
};

document.addEventListener('DOMContentLoaded', onDocumentLoaded);
