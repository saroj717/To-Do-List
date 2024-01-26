$('document').ready(function () {
  var inputBox = $('#input-box');
  var listContainer = $('#list-container');
  
  // render the data from api
$.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1154',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response)
      response.tasks.forEach(function(task){
        // if task.completed === 'true' linethrough
        var li = $('<li>').text(task.content).attr("id", task.id);
        var checkbox = $('<input type="checkbox">');
        var span = $('<span>').text('x');
        if(task.completed === true){
          console.log('true');
          checkbox.prop("checked", true);
        }

        listContainer.append(li);
        li.append(checkbox);
        li.append(span);
        
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

  // add a new task
  $('button').on('click', function () {
  var inputValue = inputBox.val(); 
  if (inputValue === "") {
    alert("You must add a task.");
  } else {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1154',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: inputValue
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        var li = $('<li>').text(inputValue).attr("id", response.task.id); 
        var checkbox = $('<input type="checkbox">');
        listContainer.append(li);
        
        var span = $('<span>').text('x');
        li.append(checkbox);
        li.append(span);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    }
    inputBox.val(""); 
  });
  
  listContainer.on('click', function (e) {
    var check = e.target.prop("checked");
    console.log(check);
    var id = e.target.parentElement.id
    console.log(id)

    $.ajax({
      type: 'PUT',
      url: `https://fewd-todolist-api.onrender.com/tasks/${id}/mark_complete?api_key=1154`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          completed: completed
        }
      }),
      success: function (response, textStatus) {
        console.log('Task updated:', response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });

    if (e.target.tagName === 'LI') {
      // console.log(e.target.classList)

      e.target.classList.toggle('checked');
      // make put call to update
    } else 
    if (e.target.tagName === 'SPAN')  { 
      // make detele call to remove
      $.ajax({
        type: 'DELETE',
        url: `https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=1154`,
        success: function (response, textStatus) {
          console.log(response);
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
      e.target.parentElement.remove();
    }
  })
}); 