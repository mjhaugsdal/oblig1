

  var array =  ['Euler', 'Simula', 'Java', 'C', 'Scheme', 'Smalltalk'];
  /*Gets the search word. Calls iterate list*/
  function search()
  {
    //var array =  ['Euler', 'Simula', 'Java'];
    //var searchWord = "";
    var searchWord = document.getElementById("myInput").value;
    iterateList(array, searchWord);

  }

  /*Checks all words in the list.*/
  function iterateList(array, searchWord)
  {
    $('ul').empty();
    for (var i = 0; i < array.length; i++) {
      var arg1 = array[i].toUpperCase();
      var arg2 = searchWord.toUpperCase();
      if(findWord(arg1, arg2) == true)
        func2(array[i].valueOf());
    }
  }

  //Get the substring. Returns true if match.
  function findWord(element, searchWord)
  {
    if(element.substr(0, searchWord.length) == searchWord)
      return true;
    else
      return false;
  }

  //Calls each array element. Func2 appends to the UL.
  function func(arr, func)
  {
    for (var i = 0; i < arr.length; i++) {
      func2(arr[i]);
    }
  }

  function func2(a)
  {
    var ul = document.getElementById('list1');
    var li = document.createElement("li");
    li.innerText = a;
    ul.appendChild(li);
  }
