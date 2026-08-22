var images=[]
  images[0]="smile.gif";
  images[1]="frown.gif";
  var myMood= document.getElementById("mood");
  function change(){
    if(myMood==images[0]){
      myMood.src=images[1];
    }
    else if(myMood.src==imgaes[1]){
      myMood.src=images[0];
    }
 }

 setInterval(change,5000);      