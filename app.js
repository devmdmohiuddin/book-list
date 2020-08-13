// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // create tr element
    let row = document.createElement('tr');
    // Inserts cols
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a class="delete" href="#">X</a></td>`;

    list.appendChild(row);
};

// Error show
UI.prototype.showAlert = function (message, className) {
    // create div 
    let div = document.createElement('div')
    //add classname
    div.className = `alert ${className}`
    // append text
    div.appendChild(document.createTextNode(message))

    // GEt parent
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')

    container.insertBefore(div, form)

    // timeout after 2s
    setTimeout(function () {
        document.querySelector('.alert').remove()
    }, 2000)
}

// delete list
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}

// clear field
UI.prototype.clearFields = function () {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}

// Listen event Listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form value
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn);

    // instantiate UI
    const ui = new UI();


    // validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fills', 'error')
    } else {
        // add book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert('Book Added!', 'success')

        // clear list
        ui.clearFields()
    }

    e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    
    // instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target)

    // show message
    ui.showAlert('Book removed!', 'success')

    e.preventDefault()
})