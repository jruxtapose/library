const mainScreen = document.querySelector('.main');
const form = document.querySelector('.add-book')


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 300, false);
const lordOfTheRings = new Book('Lord of the Rings', 'J.R.R. Tolkein', 400, true);

addBookToLibrary(theHobbit)
addBookToLibrary(lordOfTheRings)

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

function renderBooks(){
    for (let book in myLibrary){
        thisBook = myLibrary[book];
        thisBook.index = book;
        Tile(thisBook);
    }
}

function Tile(book){
    const tile = document.createElement('div');
    if(!book.read){
        tile.className = 'unread';
    }

    const title = document.createElement('div');
    title.className = 'book-title';
    title.textContent = `Title: ${book.title}`;
    
    const author = document.createElement('div');
    author.className = 'book-author';
    author.textContent = `Author: ${book.author}`;
    
    const pages = document.createElement('p');
    pages.className = 'book-pages';
    pages.textContent = `${book.pages} pages`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    
    tile.appendChild(title);
    tile.appendChild(author);
    tile.appendChild(pages);
    tile.appendChild(deleteButton);
    mainScreen.appendChild(tile);

    deleteButton.addEventListener('click', () => {
        deleteBook(myLibrary, book);
        tile.remove();
    })
}

function deleteBook(array, itemToRemove){
    let index = array.indexOf(itemToRemove)
    array.splice(index, 1);
}

renderBooks();