$(document).ready(onReady);

function onReady() {
    console.log('jQuery sourced.');
    getTask();
    clickHandlers();
}

function clickHandlers() {
$('#taskBtn').on('click', submitButton);
$(document).on('click', '.deleteButton', deleteTask);
$(document).on('click', '.completeButton', completeTask);
}

function submitButton() {
    console.log('submit clicked');
    let upTask = {};
    upTask.upTask =  $('#viewTasks').val();
    addTask(upTask);
}

function getTask() {
    console.log('in GET task');

    $.ajax({
        type: 'GET',
        url: '/tasks'
}).then(function(response) {
    console.log('GET tasks', response);
    for (let i = 0; i < response.length; i++) {
        $('#viewTasks').append(`
        <tr data-tasks-id="${response[i].id}">
            <td>${response[i].tasks}</td>
            <td data-status="${response[i].status}">${response[i].status}<button class="completeButton">✅</button>
              <td>
                  <button class="deleteButton">❌</button>
              </td>
        
        `)
    }
    if (response.status === true) {
        $(".completeButton").last().addClass("text-decoration-line-through");
      } else if (response.status === false) {
        $(".completeButton").last().addClass("text-decoration-none");
      }
});

}       

// get tasks done


function addTask(upTask){
    console.log('in add task', upTask);
    $('#viewInput').val('')
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: upTask
    }).then(function(response) {
        console.log('POST tasks works', response)
        getTask();
    }).catch((err) => {
        alert('Failed to add task');
        console.log('POST failed:', err);
      });

}

function deleteTask() {
    let taskId = $(this).parents('tr').data('task-id');
    console.log('in delete', taskId);

    $.ajax({
        method: 'DELETE',
        url: '/tasks' + taskId,
        data: taskId
    }).then(function(response){
        console.log('DELETE works', response)
        getTask();

    }).catch((err) => {
        alert('Failed to delete task');
        console.log('DELETE failed:', err);
      });
}

function completeTask() {
    console.log('in PUT');
    let taskId = $(this).parents('tr').data('task-id');
    console.log('task id is', taskId);

    let status = $(this).parents('td').data('status');
    console.log('task done', status);

    let statusTask = {
        doneWithTask: status
    }

    $.ajax({
        url:'/tasks/' + taskId,
        method: 'PUT',
        data: statusTask
      })
      .then(() => {
        console.log('PUT success');
        getTask();
      })
      .catch((err) => {
        console.log('There as an error in PUT', err)
      })
    
    }



