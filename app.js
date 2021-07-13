var resultsArea = $('#results');
var displayArea = $('#display')
var books = {};

$('#submit').on('click', function(){
    var searchText = $('input').val()
    performSearch(searchText)
})


// WORK NEEDED (SEE TODO)
function performSearch(searchText){
    
    // TODO: Create a GET request to googleBookAPI_URL with search text from the input box
    var URL = googleBookAPI_URL(searchText);
    $.get(URL, addResultToDOM)
// uses $.get to access url and then put results to addResultToDOM

    // TODO: Add search results from above to the DOM, use addResultToDOM and pass in your search results
}


// DO NOT MODIFY
function googleBookAPI_URL(searchText) {
    return `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}`
}

// DO NOT MODIFY
function addResultToDOM(searchResults){
    var items = searchResults.items;

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var newBook = createBookFrom(item);

        books[newBook.id] = newBook;

        resultsArea.append(newBook.html)
    }

    // REQUIRED TO SUCCEED: Look at what gets logged out
    console.log(books) // Make sure you read what properties are being stored
}



// WORK NEEDED (SEE TODO)
resultsArea.on('click', function(event){

    var isResultElement = event.target.getAttribute('class') === 'result';

    if (isResultElement){
        displayArea.empty();

        var bookId = event.target.id
        var book = books[bookId];

        // TODO:
        // add htmlToDisplay to the display area
        var bookHTML = htmlToDisplay(book)
        console.log(bookHTML)
        // add to display area using insertAdjacentHTML() then afterbegin
        document.getElementById("display").insertAdjacentHTML("afterbegin",bookHTML)
    }
})


// WORK NEEDED (SEE TODO)
function htmlToDisplay(book){

    // TODO: ADD IMAGE FROM BOOK
    //use ${book.} to get image from function createBookFrom
    return `
        <h2>${book.title}</h2>
        <img src="${book.image}" />
        <h3><span class="description">${book.description}<span></h3>
    `
}

// DO NOT MODIFY
function createBookFrom(item){
    return {
        id: item.id,
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks.thumbnail,
        html: `<span id="${item.id}" class="result">${item.volumeInfo.title}</span>`,
    }
}