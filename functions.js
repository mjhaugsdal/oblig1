

/*Sets the intervals for looking up population data*/
var myVar = setInterval(myTimer, 1000);
function myTimer()
{
  var ul = document.getElementById('list1');
  var items = ul.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {

    var n = items[i].innerHTML.indexOf("</button>") + 9;
    var n2 = items[i].innerHTML.indexOf("<button");

    var country = items[i].innerHTML.substr(0,n2);
    items[i].innerHTML = items[i].innerHTML.substr(0,n);

    lookupPop(items[i], country);
  }
}
/*Lookuppop is run for each item in the list. Country is inserted into the GET request.*/
function lookupPop(items, country)
{
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var responseData = JSON.parse(request.response);
         items.innerHTML += "Dagens: " + responseData.total_population[0].population + " I morgen: " + responseData.total_population[1].population;

         var counter = (responseData.total_population[1].population - responseData.total_population[0].population) / 86400;

         items.innerHTML += " Rate: " + counter;
      }
  };

  request.open('GET', 'http://api.population.io/1.0/population/'+country+'/today-and-tomorrow/?format=json', false);
  request.send();
}

/* Creates the list and EventListener.  */
function createList() {

  //Load list from localStorage
  document.getElementById('list1').value = JSON.parse(localStorage.getItem('myList'));

  addButton = document.getElementById('add');
  deleteButton = document.getElementById('delete');

  addButton.addEventListener("click", function(e) {
      var text = document.getElementById('myInput').value;
      if(text != "")
      {
        var addItem = document.getElementById('list1');
        var entry = document.createElement("li");
        var p = document.createElement("p");
        text += '<button class="deleteButton">Delete</button>' ;

        entry.innerHTML = text;

        addItem.appendChild(entry);
        addItem.appendChild(p);
        document.getElementById("myInput").value = "";
      }
  });
}
/* JQuery seems to work best for adding and deleting elements on the fly.*/
//Delete button. Pushes to the list and saves to localStorage
$(document).on('click','.deleteButton', function(e) {

    $(this).parent().remove();
    var listContents = [];
    $("ul").each(function(){
       listContents.push(this.innerHTML);
    })

    e.preventDefault();
    localStorage.clear();
    localStorage.setItem('myList', JSON.stringify(listContents));
});

/*Big thanks to: Source(https://stackoverflow.com/questions/25712602/storing-lists-in-localstorage)*/
//Add button. Pushes to the list and saves to localStorage
$(document).ready(function() {

  $("#add").click(function(e) {
    e.preventDefault();
    var listContents = [];
    $("ul").each(function(){
       listContents.push(this.innerHTML);
    })
    localStorage.setItem('myList', JSON.stringify(listContents));
  });

  //Loaded on document load. Gets all stored elements.
  loadToDo();

  function loadToDo() {
    if (localStorage.getItem('myList')){
        var listContents = JSON.parse(localStorage.getItem('myList'));
        $("ul").each(function(i){
          this.innerHTML = listContents [i];
        })
    }
  }
});
