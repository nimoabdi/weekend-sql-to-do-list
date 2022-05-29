$(document).ready(function(){
    console.log('jQuery sourced.');
    onReady();
});

function onReady(){
$('#taskBtn').on('click', addTask);
$(document).on('click', '.deleteButton', deleteTask)
$(document).on('click', '.completeButton', completeTask)

getTask();
}

function getTask() {
    console.log('in GET task');

    $('#viewTasks').empty();

    $.ajax({
        type: 'GET',
        url: '/tasks'
}).then(function(response) {
    console.log('GET tasks', response);
    for (let i = 0; i < response.length; i++) {
        $('#viewTasks').append(`
        <tr data-tasks-id="${response[i].id}">
            <td>${response[i].tasks}</td>
            <td class="statusComplete">${response[i].status}</td>
              <td>
                  <button class="deleteButton">❌</button>
              </td>

              <td>
                  <button class="completeButton">✅</button>
              </td>
        `)
    }
});
}       

// get tasks done


function addTask(){

    let taskValue = {
        name:$('#viewTasks').val()
    };

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskValue
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
        url: '/tasks',
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

    let completedTask = $(this).parents('tr').data('task-id');

}

