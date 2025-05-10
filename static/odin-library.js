// create array for all books
const myLibrary = []
const bookMap = new Map();


// create object constructor
function Book(title, author, readStatus, id) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus;
    // give each a unique id
    this.id = crypto.randomUUID();
}


// create a book cover constructor for hashing
function BookCover(book) {
    this.book.id = book;
}


// create function to add a book to the library
function addBookToLibrary(title, author, readStatus) {
    // collect information from form
    
    const newBook = new Book(title, author, readStatus);
    myLibrary.push(newBook);
    bookMap.set(newBook.id, newBook);
}


Book.prototype.toggleReadStatus = function() {
    // when the change status button is clicked, change book.readStatus value
    this.readStatus = !this.readStatus;
}


function displayLibrary(myLibrary) {
    for(let book of myLibrary) {
        let newLibraryRow = document.createElement("tr");
        newLibraryRow.classList.add("library-row");
        newLibraryRow.setAttribute('data-bookId', book.id)
        libraryTable.appendChild(newLibraryRow);
    
        Object.keys(book).forEach(key => {
            if (key === 'id') return;
    
            let newLibTd = document.createElement('td');
    
            if (key === 'title') {
                newLibTd.textContent = book[key];
                newLibraryRow.appendChild(newLibTd);
            } else if (key === 'author') {
                let authorLink = document.createElement('a');
                authorLink.classList.add('author-link');
                authorLink.href = '#';
                authorLink.textContent = book[key];
                newLibTd.appendChild(authorLink);
            } else if (key === 'readStatus') {
                let btnText = readStatusText(book[key]);

                let statusButton = document.createElement('button');
                statusButton.classList.add('read-status-button')
                statusButton.setAttribute('data-book-id', book.id)
                statusButton.textContent = btnText;
                newLibTd.appendChild(statusButton);
            }
    
            newLibraryRow.appendChild(newLibTd);
    
        })
    
        let removeButtonTd = document.createElement('td');
        let removeButton = document.createElement('button'); 
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove Book';
        removeButtonTd.appendChild(removeButton);
        newLibraryRow.appendChild(removeButtonTd);
    }
}

function readStatusText(status) {
    if (status === true) {
        btnText = 'Read';
    } else {
        btnText = 'Not Read';
    };

    return btnText
}



addBookToLibrary('The Hobbit', "J.R.R. Tolkien", true)
const libraryTable = document.querySelector(".my-library-body")

displayLibrary(myLibrary)

// use button to alter read status
libraryTable.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('read-status-button')) {
        const bookId = target.getAttribute('data-book-id');
        bookMap.get(bookId).toggleReadStatus()
        target.textContent = readStatusText(bookMap.get(bookId).readStatus);
    }
    if (target.classList.contains('remove-button')) {
        const bookRow = target.closest('tr');
        const bookId = bookRow.getAttribute('data-bookId');

        // get rid of it!
        bookRow.remove()
        const bookTitle = bookMap.get(bookId).title;
        alert(`"${bookTitle}" was removed from Library.`)
    }
})