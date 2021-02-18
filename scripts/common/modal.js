const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана


export function openModal(x, y) {
  modalElem.classList.remove('hidden');
  // modalContentElem.style.top = `${y}px`;
  // modalContentElem.style.left = `${x}px`;
}

export function closeModal() {
  modalElem.classList.add('hidden');
}

function onClickInsideModal(event) {
  event.stopPropagation();
}

modalContentElem.addEventListener('click', onClickInsideModal);
modalElem.addEventListener('click', closeModal);