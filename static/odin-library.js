// create array for all books
const myLibrary = []

// create object constructor
function Book(title, author, readStatus) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus
    // give each a unique id
    this.id = self.crypto.randomUUID
}

// create function to add a book to the library
function addBookToLibrary(title, author, readStatus) {
    // collect information from form

    newBook = new Book(title, author, readStatus);
    myLibrary.push(newBook);

    // refresh library display table
}

Book.prototype.changeReadStatus = function() {
    // when the change status button is clicked, change book.readStatus value
    if(this.readStatus === "Read") {
        this.readStatus = "Not Read";
    } else if (this.readStatus === "Not Read") {
        this.readStatus = "Read";
    };
}

addBookToLibrary('The Hobbit', "J.R.R. Tolkien", "Read")
const libraryTable = document.querySelector(".my-library")

// loop over myLibrary
for(let book of myLibrary) {
    let newLibraryRow = document.createElement("tr");
    newLibraryRow.classList.add("library-row");
    libraryTable.appendChild(newLibraryRow);

    // Object.values(book).forEach(value => {
    //     // console.log(`${value}: ${typeof(value)}`);
    //     if(typeof(value) === 'string'){
    //         console.log(value);
    //         let newLibTd = document.createElement('td');
    //         newLibTd.textContent = value;
    //         newLibraryRow.appendChild(newLibTd);
    //     }
    // });
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
            let statusButton = document.createElement('button');
            statusButton.classList.add('read-status-button')
            statusButton.textContent = book[key];
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

    // display each book to the library
    // create a new table row
        // create 4 <td>'s for each column (might add the id later)
// use button to alter read status