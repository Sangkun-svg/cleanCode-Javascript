function getElements() {
  const result = {}; // 임시 객체
  result.title = document.querySelector(".title");
  result.text = document.querySelector(".text");
  result.value = document.querySelector(".value");
  return result;
}

/* refactoring.... */

function getElementsRefactor() {
  const result = {
    title: document.querySelector(".title"),
    text: document.querySelector(".text"),
    value: document.querySelector(".value"),
  };
  return result;
}

/* refactoring.... */

function getElementsRefactor() {
  return {
    title: document.querySelector(".title"),
    text: document.querySelector(".text"),
    value: document.querySelector(".value"),
  };
}
