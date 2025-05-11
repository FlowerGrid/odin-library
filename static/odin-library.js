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
    const libraryBody = document.querySelector('tbody');
    libraryBody.innerHTML = '';

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
        let removeButton = makeTrash();

        removeButtonTd.appendChild(removeButton);
        newLibraryRow.appendChild(removeButtonTd);
    }
}

function makeTrash() {
    // const mainContent = document.querySelector('.main-content');
    let removeButtonDiv = document.createElement('div');
    removeButtonDiv.classList.add("remove-button-container");
    let removeButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    removeButton.classList.add('make-trash');
    // removeButton.textContent = 'Remove Book';
    removeButton.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    removeButton.setAttribute('viewBox', "0 0 24 24");
    removeButton.setAttribute('width', '24px')
    removeButton.setAttribute('height', '24px')
    removeButton.style.fill = '#ff4248';
    
    let svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    svgTitle.textContent = 'trash-can';
    
    let svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgPath.setAttribute('d', "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z");

    removeButton.appendChild(svgTitle);
    removeButton.appendChild(svgPath);
    removeButtonDiv.appendChild(removeButton);

    return removeButtonDiv
    // mainContent.appendChild(removeButtonDiv);
}

function readStatusText(status) {
    if (status === true) {
        btnText = 'Read';
    } else {
        btnText = 'Not Read';
    };

    return btnText
}


addBookToLibrary('The Hobbit', "J.R.R. Tolkien", true);
const libraryTable = document.querySelector(".my-library-body");
const dialogBox = document.querySelector('dialog');
const dialogSubmitButton = document.querySelector('#add-book-button');
const dialogCloseButton = document.querySelector('#close-dialog-button');
const showDialogButton = document.querySelector('#show-dialog');
const newBookForm = document.querySelector('form');

displayLibrary(myLibrary)

// use button to alter read status
libraryTable.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('read-status-button')) {
        const bookId = target.getAttribute('data-book-id');
        bookMap.get(bookId).toggleReadStatus();
        target.textContent = readStatusText(bookMap.get(bookId).readStatus);
    }
    if (target.closest('.remove-button-container')) {    
        console.log(event.target.closest('.remove-button-container'));
        const bookRow = target.closest('tr');
        const bookId = bookRow.getAttribute('data-bookId');

        // get rid of it!
        bookRow.remove()
        const bookTitle = bookMap.get(bookId).title;
        alert(`"${bookTitle}" was removed from Library.`);
        removeBook(bookId);
    }
})

function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId)
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    bookMap.delete(bookId)
}


// TODO: implement logic for users to add books
function gatherBookInfo () {
    const newBookTitle = document.querySelector('[name="book-title-input"]').value;
    const newBookAuthor = document.querySelector('[name="book-author-input"]').value;
    const newBookReadStatus = document.querySelector('.checkbox').checked;
    
    addBookToLibrary(newBookTitle, newBookAuthor, newBookReadStatus);
}


dialogCloseButton.addEventListener('click', (event) => {
    dialogBox.close();
    dialogCloseButton.preventDefault()
})


dialogSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (!newBookForm.checkValidity()) {
        newBookForm.reportValidity(); // Show built-in validation messages
        return;
    }

    gatherBookInfo()
    newBookForm.reset();
    dialogBox.close();
    displayLibrary(myLibrary);
    
});

showDialogButton.addEventListener('click', (event) => {
    dialogBox.showModal();
})