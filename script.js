const mainScreen = document.querySelector('.main');
const form = document.querySelector('.add-book')
const sortLibraryTitleButton = document.querySelector('.sort-library-title')
const sortLibraryAuthorButton = document.querySelector('.sort-library-author')
const sortLibraryPagesButton = document.querySelector('.sort-library-pages')
const searchBooksField = document.querySelector('#search-books')

let librarySearchResults = [];

sortLibraryTitleButton.addEventListener('click', () => {
    sortLibraryTitle();
})

sortLibraryAuthorButton.addEventListener('click', () => {
    sortLibraryAuthor();
})

sortLibraryPagesButton.addEventListener('click', () => {
    sortLibraryPages();
})

function filterLibrary(library, searchTerm){
    return library.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()));
}

searchBooksField.addEventListener('input', () => {
    if(searchBooksField.value !== ''){
        console.log(searchBooksField.value)
        let librarySearch = filterLibrary(myLibrary, searchBooksField.value);
        renderBooks(librarySearch);
    }else renderBooks(myLibrary);
})




let myLibrary = [];
let sortedLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function sortLibraryTitle(){
    
    sortedLibrary = myLibrary.sort(function(a,b) {
        let textA = a.title.toUpperCase();
        let textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    myLibrary = sortedLibrary;

    renderBooks(myLibrary);

}

function sortLibraryAuthor(){
    
    sortedLibrary = myLibrary.sort(function(a,b) {
        let textA = a.author.toUpperCase();
        let textB = b.author.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    myLibrary = sortedLibrary;

    renderBooks(myLibrary);

}

function sortLibraryPages(){
    
    sortedLibrary = myLibrary.sort((a,b) => a.pages - b.pages);

    myLibrary = sortedLibrary;
    mainScreen.textContent = '';
    renderBooks(myLibrary);

}

const lordOfTheRings1 = new Book('Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 432, true);
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 366, false);
const lordOfTheRings2 = new Book('Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', 322, true);
const lordOfTheRings3 = new Book('Lord of the Rings: The Return of the King', 'J.R.R. Tolkien', 432, true);
const aaaaa = new Book('AAA', 'ZZZ', 12, true);

addBookToLibrary(theHobbit)
addBookToLibrary(lordOfTheRings1)
addBookToLibrary(lordOfTheRings2)
addBookToLibrary(lordOfTheRings3)
addBookToLibrary(aaaaa)


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newBookTitle = document.querySelector('#new-book-title').value;
    const newBookAuthor = document.querySelector('#new-book-author').value;
    const newBookPages = document.querySelector('#new-book-pages').value;
    const newBookReadBox = document.querySelector('#new-book-read');
    let newBookRead;

    // Check if the 'read' box is checked and return a boolean
    if(newBookReadBox.checked){
        newBookRead = true;
    }else {
        newBookRead = false;
    }

    newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead)
    addBookToLibrary(newBook);
    Tile(newBook)

    form.reset();

})

function renderBooks(library){
    mainScreen.textContent = '';
    for (let book in library){
        thisBook = library[book];
        thisBook.index = book;
        Tile(thisBook);
    }
}

function Tile(book){
    const tile = document.createElement('div');
    if(!book.read){
        tile.className = 'unread';
    } else {
        tile.className = '';
    }

    const title = document.createElement('div');
    title.className = 'book-title';
    title.innerHTML = `<h3>${book.title}</h3>`;
    
    const author = document.createElement('div');
    author.className = 'book-author';
    author.innerHTML = `<h4>${book.author}</h4>`;
    
    const pages = document.createElement('div');
    pages.className = 'book-pages';
    pages.innerHTML = `<p>${book.pages} pages</p>`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';

    const toggleRead = document.createElement('button');
    toggleRead.textContent = 'Toggle Read/Unread';

    const buttons = document.createElement('div');
    buttons.className = 'buttons'
    buttons.appendChild(deleteButton);
    buttons.appendChild(toggleRead);
    
    tile.appendChild(title);
    tile.appendChild(author);
    tile.appendChild(pages);
    tile.appendChild(buttons);

    mainScreen.appendChild(tile);

    deleteButton.addEventListener('click', () => {
        if(confirm(`Are you sure you want to remove ${book.title}?`)){
            deleteBook(myLibrary, book);
            tile.remove();
        }
    })

    toggleRead.addEventListener('click', () => {
        toggleReadUnread(myLibrary, book);
        tile.classList.toggle('unread');
    })
}

function deleteBook(array, itemToRemove){
    let index = array.indexOf(itemToRemove)
    array.splice(index, 1);
}

function toggleReadUnread(array, itemToToggle){
    let index = array.indexOf(itemToToggle)
    if(myLibrary[index].read === true){
        myLibrary[index].read = false
    } else {
        myLibrary[index].read = true;
    }
}

renderBooks(myLibrary);