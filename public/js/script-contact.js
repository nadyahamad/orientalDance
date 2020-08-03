console.log('it works') /*checked to see js is inserted correctly*/

function contactForm(){
  // to verify that subject input is not empy
  var sub = document.getElementById("subject").value;

  if (sub == "") {
      alert("Subject must be filled out");
      return false;
  }
  else if (/\s+/.test(sub)) { 
      text2 = "Thanks for letting us the motive of your message";
      document.getElementById("alert1").innerHTML = text2;
  }

  //to verify email input
  em = document.getElementById("email").value;
  yy = (/@/.test(em));

  if (yy == false){
      text3 = "That is Not a Real Email";
      alert(text3.toString());
  }
  else if  (yy == true){
      text3 = "That is  a Real Email";
      document.getElementById("alert2").innerHTML = text3;
  }


  //to verify message input
  var me = document.getElementById("message").value;

  if(me.length <=10) {
      text4 = "That is not a message";
      alert(text4.toString());
     }
  else if (me.length >=10) {
       text4 = "That is  a Real mesage";
      document.getElementById("alert3").innerHTML = text4;
  }
      
}


    