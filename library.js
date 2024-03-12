const myLibrary = [];
const bookForm = document.querySelector("#submitBtn");
const table = document.querySelector("#table")
const buttons = document.querySelectorAll("button");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = status === "yes"
    ? "yes" : "no";
    this.info = function sayInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

}


function addBookToLibrary(e) {
    e.preventDefault();
    const author = document.querySelector("#author");
    const title = document.querySelector("#title");
    const pages = document.querySelector("#pages");
    const radioButtons = document.querySelectorAll('input[name="readStatus"]');
    let readStatus = "unknown"
    radioButtons.forEach(button => {
        if (button.checked) {
            readStatus = button.value
            return
        }
    })
    console.log(readStatus)
    console.log(title.value)
    const book = new Book(title.value, author.value, pages.value, readStatus);
    myLibrary.push(book)
    return  displayBooks();
   
}

bookForm.addEventListener("click", addBookToLibrary);



function displayBooks() {
    table.innerHTML = ""; // Clear the table before populating it

    myLibrary.forEach((book, index) => {
        const row = document.createElement("tr");
        
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read}</td>
            
        `;
        
        // Create a delete button using index
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayBooks();
        })
        
        // Change read status button
        const updateReadBtn = document.createElement("button");
        updateReadBtn.textContent = "Status";
        
        updateReadBtn.addEventListener("click", () => {
            if (book.read == "yes") {
                book.read = "no"
            } else {
                book.read = "yes"
            }
            displayBooks()
        })

        table.appendChild(row);
        table.appendChild(deleteButton);
        table.appendChild(updateReadBtn)
    });
        
}


