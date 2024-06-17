function hideSelf() {
  let button = document.querySelector(".hide-self-button");
  
    button.addEventListener('click', {

      handleEvent() {
        button.setAttribute('hidden', '');
      }

    });
  
}
