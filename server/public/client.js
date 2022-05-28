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
        
        `)
    }
})
}       




function addTask(){

}