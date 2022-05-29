$(document).ready(function(){
    console.log('jQuery sourced.');
    onReady();
});

function onReady(){
$('#taskBtn').on('click', addTask);

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
              <td>${response[i].status}</td>
              <td>${response[i].notes}</td>
              <td>
                  <button class="doneButton">✅ </button>
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
    })

}

