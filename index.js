let myLibrary = ['The Lord Of The Rings', 'Harry Potter', 'Hobbit'];

let books = document.querySelector('.books');

function Book() {

}

function addBookToLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        book = document.createElement('div');
        book.textContent = myLibrary[i];
        books.appendChild(book);
    }
}

addBookToLibrary();