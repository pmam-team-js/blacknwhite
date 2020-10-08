// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	//$(this).toggleClass("completed");
	//data = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
	// var data = JSON.parse($(this).attr("name"));   
	// var taskId = data.taskId;
	// var TaskStatus = data.TaskStatus;
	// if(TaskStatus === "OPEN")
	// 	TaskStatus = "COMPLETED"
	// else
	// 	TaskStatus = "OPEN"

	// UpdateTaskStatus(taskId,TaskStatus);  
	// event.stopPropagation();
	//alert("Done !!!");
});

$('.lielements').click(function() {
    var data = JSON.parse($(this).attr("name"));   
    //var data = JSON.parse($(this).attr("name"));
	//alert(data.taskId);
	var taskId = data.taskId;
	var TaskStatus = data.TaskStatus;
	if(TaskStatus === "OPEN")
		TaskStatus = "COMPLETED"
	else
		TaskStatus = "OPEN"

	UpdateTaskStatus(taskId,TaskStatus);  
	event.stopPropagation();
});

function UpdateTaskStatus(taskId,TaskStatus) {
    $.ajax({
      url: "/task/"+taskId+"?TaskStatus="+TaskStatus, error: function(xhr){
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
    }
    }).done(function(data) {      
      console.log(data);
      location.reload();
    });
}


//Click on X to delete Todo
// $("ul").on("click", "span", function(event){
// 	$(this).parent().fadeOut(500,function(){
// 		$(this).remove();
// 	});
// 	event.stopPropagation();
// });



$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		//var todoText = $(this).val();
		//$(this).val("");
		//create a new li and add to ul
		//alert(($"#ulActive"));
		//$("ul[id='#ulActive']").append("<li><span ><i class='fa fa-trash'></i></span> &nbsp;" + todoText + "</li>")
		//alert("wait")
		//event.stopPropagation();
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

$("#Google_Meet").click(function(){
	window.open('https://meet.google.com/')
});