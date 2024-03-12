const myLibrary = [];
const bookForm = document.querySelector("#submitBtn");
const table = document.querySelector("#table")

function Book(title, author, pages, yes) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = yes === "yes"
    ? "read" : "not read yet";
    this.info = function sayInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

}
const mistborn = new Book("Mistborn", "Brandon Sanderson", "669", "yes");
myLibrary.push(mistborn)

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


console.log(myLibrary);
function displayBooks() {
    table.innerHTML = ""; // Clear the table before populating it

    myLibrary.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read}</td>
        `;
        table.appendChild(row);
    });
}

displayBooks();