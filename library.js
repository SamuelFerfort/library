class LibraryApp {
  constructor() {
    this.bookForm = document.querySelector("#form");
    this.table = document.querySelector("#table");
    this.buttons = document.querySelectorAll("button");
    this.addBookBtn = document.querySelector("#addBook");
    this.dialog = document.querySelector("#formDialog");

    this.myLibrary = new Library();

    this.setupEventListeners();
  }
  setupEventListeners() {
    this.addBookBtn.addEventListener("click", () => this.dialog.showModal());

    this.bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.myLibrary.addBook();
      this.dialog.close();
      this.bookForm.reset();
    });
  }
}

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = status === "yes" ? "yes" : "no";
  }
}
class Library {
  constructor() {
    this.books = [];
  }
  addBook() {
    const author = document.querySelector("#author");
    const title = document.querySelector("#title");
    const pages = document.querySelector("#pages");
    const radioButtons = document.querySelectorAll('input[name="readStatus"]');
    let readStatus = "unknown";
    radioButtons.forEach((button) => {
      if (button.checked) {
        readStatus = button.value;
        return;
      }
    });

    const book = new Book(title.value, author.value, pages.value, readStatus);
    this.books.push(book);
    this.displayBooks();
  }
  displayBooks() {
    table.innerHTML = ""; // Clear the table before populating it

    // Add book with form info
    this.books.forEach((book, index) => {
      const row = document.createElement("tr");
      const td = document.createElement("td");
      const td2 = document.createElement("td");
      // Create a delete button using index
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.classList.add("deleteBtn");
      deleteButton.addEventListener("click", () => {
        this.books.splice(index, 1);
        this.displayBooks();
      });

      // Change read status button
      const updateReadBtn = document.createElement("button");
      updateReadBtn.innerHTML = "&#10003;";

      // Add class depending on status
      if (book.read == "yes") {
        updateReadBtn.classList.add("green");
      } else {
        updateReadBtn.classList.add("red");
      }
      // Color toggle and status change
      updateReadBtn.addEventListener("click", () => {
        book.read = book.read === "yes" ? "no" : "yes";
        this.displayBooks();
        updateReadBtn.classList.toggle("green");
        updateReadBtn.classList.toggle("red");
      });
      row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.pages}</td>
              
          `;
      console.log(book.read);
      td2.innerHTML = book.read;
      td2.appendChild(updateReadBtn);
      td.appendChild(deleteButton);
      table.appendChild(row);
      row.appendChild(td2);
      row.appendChild(td);
    });
  }
}

// Initialize
const app = new LibraryApp();
