class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // create tr element
        let row = document.createElement('tr');
        // Inserts cols
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a class="delete" href="#">X</a></td>`;

        list.appendChild(row);
    }

    showAlert(message, className) {
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

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }

    clearFields() {
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
}

// Local storage
class Store {
    static getBooks() {
        let books 
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }

    static addBook(book) {
        let books = Store.getBooks()

        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        let books = Store.getBooks()

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }

    static displayBook() {
        let books = Store.getBooks()

        books.forEach(function (book) {
            // instantiate UI
            const ui = new UI();

            ui.addBookToList(book)
        })
    }


}



// Listen event Listener
document.addEventListener('DOMContentLoaded', Store.displayBook())

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

        // add book to LS
        Store.addBook(book)

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

    // remove 
    ui.deleteBook(e.target)

    // remove form Local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // show message
    ui.showAlert('Book removed!', 'success')

    e.preventDefault()
})