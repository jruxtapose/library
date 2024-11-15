const mainScreen = document.querySelector('.main');
const form = document.querySelector('.add-book')
const sortLibraryTitleButton = document.querySelector('.sort-library-title')
const sortLibraryAuthorButton = document.querySelector('.sort-library-author')
const sortLibraryPagesButton = document.querySelector('.sort-library-pages')
const searchBooksField = document.querySelector('#search-books')


function sortLibrary(criteria) {
    searchBooksField.value = '';
    myLibrary.sort((a, b) => {
        const textA = a[criteria].toUpperCase();
        const textB = b[criteria].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    renderBooks(myLibrary);
}

sortLibraryTitleButton.addEventListener('click', () => sortLibrary('title'));
sortLibraryAuthorButton.addEventListener('click', () => sortLibrary('author'));
sortLibraryPagesButton.addEventListener('click', () => {
    myLibrary.sort((a,b) => a.pages - b.pages);
    renderBooks(myLibrary);
});


function filterLibrary(library, searchTerm){
    return library.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()));
}

searchBooksField.addEventListener('input', () => {
    if(searchBooksField.value !== ''){
        console.log(searchBooksField.value)
        let librarySearchResults = filterLibrary(myLibrary, searchBooksField.value);
        renderBooks(librarySearchResults);
    }else renderBooks(myLibrary);
})




let myLibrary = [];
let sortedLibrary = [];



class Book {
    constructor(title, author, pages, read){
        this. title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    }

    addBookToLibrary(){
        myLibrary.push(this);
    }
}

const lordOfTheRings1 = new Book('Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 432, true);
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 366, false);
const lordOfTheRings2 = new Book('Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', 322, true);
const lordOfTheRings3 = new Book('Lord of the Rings: The Return of the King', 'J.R.R. Tolkien', 432, true);
const redRising = new Book('Red Rising', 'Pierce Brown', 382, true);

theHobbit.addBookToLibrary();
lordOfTheRings1.addBookToLibrary();
lordOfTheRings2.addBookToLibrary();
lordOfTheRings3.addBookToLibrary();
redRising.addBookToLibrary();


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
    if (index > -1){
        array.splice(index, 1);
    }
}

function toggleReadUnread(array, itemToToggle){
    let index = array.indexOf(itemToToggle)
    if (index > -1){
        array[index].read = !array[index].read;
    }
}

renderBooks(myLibrary);