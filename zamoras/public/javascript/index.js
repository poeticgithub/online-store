$(document).ready(function()
{


	 $('.login').click(function(){
   		$('#loginModal').modal('show');
   		$('#signupModal').modal('hide');
   });

   $('.signUp').click(function(){
   		$('#signupModal').modal('show');
   		$('#loginModal').modal('hide');
   });


   $('#submitbtn').click(function(){

 	   var input = $.trim($('#inputUsername').val());
 	   check(input);

   		if(input == temp)
   			console.log('hello world');
   		else
   			console.log('not hello world');
   });

});