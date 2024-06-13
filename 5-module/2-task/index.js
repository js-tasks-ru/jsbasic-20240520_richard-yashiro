function toggleText() {
  let hide = document.querySelector(".toggle-text-button");
  let text = document.querySelector("#text");
  hide.addEventListener('click',{
   handleEvent(){
    if (text.hasAttribute('hidden')) {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', '');
    }
  }
  
  })
}