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

});