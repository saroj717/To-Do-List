$('document').ready(function () {
  var inputBox = $('#input-box');
  var listContainer = $('#list-container');

  $('button').on('click', function () {
  var inputValue = inputBox.val(); 
  if (inputValue === "") {
    alert("You must add a task.");
  } else {
    var li = $('<li>').text(inputValue); 
    listContainer.append(li);
    
    var span = $('<span>').text('x');
    li.append(span);
    }
    inputBox.val(""); 
  });
  
  listContainer.on('click', function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
    } else if (e.target.tagName === 'SPAN')  {
      e.target.parentElement.remove();
    }
  })
}); 