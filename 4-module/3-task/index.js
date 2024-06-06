function highlight(table) {
  const row = table.querySelectorAll('tbody tr');
  
  row.forEach(row => {
      const cell = row.children;
      
      const status = cell[3];
      if (status.hasAttribute('data-available')) {
          if (status.getAttribute('data-available') === 'true') {
              row.classList.add('available');
          } else {
              row.classList.add('unavailable');
          }
      } else {
          row.hidden = true;
      }
      
      const gender = cell[2];
      if (gender.textContent === 'm') {
          row.classList.add('male');
      } else if (gender.textContent === 'f') {
          row.classList.add('female');
      }
      
      const age = cell[1];
      if (parseInt(age.textContent) < 18) {
          row.style.textDecoration = 'line-through';
      }
  });
}