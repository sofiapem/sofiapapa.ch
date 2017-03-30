var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  //x[slideIndex-1].style.display = "block";  
  // dots[slideIndex-1].className += " w3-white";
}



// On reprend le même id que dans le précédent chapitre

$(document).ready(function(){

  $(".index").click(function(){

      console.log("OK"); 

      $.ajax({
         url : '1_portes_ouvertes/portes_ouvertes.html',
         type : 'GET',
         dataType : 'html',
         success : function(code_html, statut){
             $(code_html).appendTo(".index"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
         },

         error : function(resultat, statut, erreur){
           
         },

         complete : function(resultat, statut){

         }

      });

      
     
  });
});

