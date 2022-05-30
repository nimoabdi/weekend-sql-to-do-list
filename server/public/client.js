$(document).ready(onReady);

function onReady() {
    console.log('jQuery sourced.');
    getTask();
    clickHandlers();
}

function clickHandlers() {
$('#taskBtn').on('click', submitButton);
$('#viewTasks').on('click', '.deleteButton', deleteTask);
$('#viewTasks').on('click', '.completeButton', completeTask);
}

function submitButton() {
    console.log('submit clicked');
    let upTask = {
        tasks: $('#taskIn').val()
    };
    // upTask.tasks =  $('#viewTasks').val();
    addTask(upTask);
}


function getTask() {
    console.log('in GET task');
$('#viewTasks').empty();

    $.ajax({
        type: 'GET',
        url: '/tasks'
}).then(function(response) {
    console.log('GET tasks', response); 
    for (let value of response) {
        if(value.status === 'true') {
            newClass = 'class = "green"';
        }
        else {
            newClass = 'class = "grey"';
        }
    
    $('#viewTasks').append(`
        <tr ${newClass} data-task-id="${value.id}">
            <td>${value.tasks}</td>
            <td data-status="${value.status}">
              <td>
                    <button class= "deleteButton">❌</button>
              </td>
              <td>
                    <button class="completeButton">✅</button>
                    
              </td>
          </td>

        </tr>
        `);
     }
    })
    .catch((err) => {
            alert('Failed to get task');
            console.log('GET failed:', err);
          });
    }    
       

//     for (let i = 0; i < response.length; i++) {
//       let task = response[i];
//       if (task.status === true){
//         console.log('task true');
//         // $('#.completeButton').addClass('green');
//       } else if (task.status === false) {
//         console.log('task false');
//         // $('#.completeButton').addClass('white');
//       }
//         $('#viewTasks').append(`
//         <tr data-tasks-id="${task[i].id}">
//             <td>${task[i].tasks}</td>
//             <td data-status="${task[i].status}">
//               <td>
//                   <button class="deleteButton">❌</button>
//               </td>
//               <td>
//                     <button class="completeButton">✅</button>
//               </td>
//           </td>

//         </tr>
//         `)
        
       
// }
      

// get tasks done


function addTask(upTask){
    console.log('in add task', upTask);
    // $('#viewInput').val('')
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
    const taskId = $(this).parents('tr').data('task-id');
    console.log('in delete', taskId);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
        // data: taskId
    }).then(function(response){
        getTask()
        console.log('DELETE works', response)
       
    }).catch((err) => {
        alert('Failed to delete task');
        console.log('DELETE failed:', err);
      });
}

function completeTask() {
    console.log('in PUT');

    const taskId = $(this).parents('tr').data('task-id');
    console.log('task id is', taskId);

    // let status = $(this).parents('td').data('status');
    // console.log('task done', status);

    // let statusTask = {
    //     doneWithTask: status
    // }

    $.ajax({
        url:`/tasks/${taskId}`,
        method: 'PUT',
        // data: statusTask
      })
      .then(() => {
        console.log('PUT success');
        getTask();
      })
      .catch((err) => {
        console.log('There as an error in PUT', err)
      })
    
    }


   