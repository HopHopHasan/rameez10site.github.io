//tag system, start by calling checkTags()

var tagClicked = false;

window.addEventListener('hashchange', () => {
  if (tagClicked || !window.location.hash){
    location.reload(); //if tag is cleared, or a second tag has been clicked
  }
  else {
    try {
      document.getElementById("clearTag").id = "tag"; //display clear tag button
    }
    catch {
      location.reload(); //fallback
    }
    checkTags();
  }
  window.scrollTo(0, 0); //scroll page to the top
}, false);

function checkTags(){
  if (window.location.hash) {
    try {
      document.getElementById("clearTag").id = "tag"; //display clear tag button (fallback)
    }catch{}
    console.log("Tag detected in URL");
    var tagClicked = true; //check if tag has been clicked once, the page must reload if a second tag is clicked to bring back deleted elements
    var emptyPage = true; //for the error message
    var elements = document.getElementsByClassName('postn'); //new posts
    var i = elements.length; //elements returns an array, start at array length then iterate through divs downwards
    while (i--) {
      emptyPage = checkTagDeletion(elements, i, emptyPage);
    }
    elements = document.getElementsByClassName('post'); //old posts
    var i = elements.length;
    while (i--) {
      emptyPage = checkTagDeletion(elements, i, emptyPage);
    }
    if (emptyPage){
      document.body.innerHTML += "There are no pages for the '"+window.location.hash.substring(1)+"' tag...";
    }
  }
}

function checkTagDeletion(elements, i, emptyPage){
  try {
    temp = elements[i].getElementsByTagName("span")[1].getElementsByClassName('tag'); //index 0 is date, 1 is tags
    emptyPage = emptyPage;
    var j = temp.length; //tag counter
    const tags = []; //array incase of multiple tags
    while (j--){
      tags.push(temp[j].textContent); //add tag name to array
    }
    //console.log(tags);
    if (!tags.includes(window.location.hash.substring(1))){
      elements[i].remove(); //remove if tags array don't contain the hash
    }
    else {
      emptyPage = false;
    }
  }
  catch {
    elements[i].remove(); //element has no tags, remove it
  }
  return emptyPage;
}