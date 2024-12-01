const myLibrary = [];

function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
	this.info = function () {
		const readStatus = this.isRead ? "Read" : "Not read";
		return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
	};
}

Book.prototype.toggleReadStatus = function () {
	this.isRead = !this.isRead;
};

const addBookToLibrary = (title, author, pages, isRead) => {
	const newBook = new Book(title, author, pages, isRead);
	myLibrary.push(newBook);
};

const saveLibrary = () => {
	localStorage.setItem("library", JSON.stringify(myLibrary));
};

const loadLibrary = () => {
	const libraryData = localStorage.getItem("library");
	if (libraryData) {
		const books = JSON.parse(libraryData);
		myLibrary.length = 0; // Clear the current book library
		books.forEach((book) => {
			myLibrary.push(
				new Book(book.title, book.author, book.pages, book.isRead)
			);
		});
	} else {
		// Add initial books only if library is empty
		addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
		addBookToLibrary("1984", "George Orwell", 328, true);
		addBookToLibrary("The War of the Worlds", "H.G. Wells", 192, true);
		addBookToLibrary("The Princess Bride", "William Goldman", 429, false);
		addBookToLibrary("2001: A Space Odyssey", "Arthur C. Clark", 297, true);
		addBookToLibrary("Foundation", "Issac Asimov", 244, false);
		saveLibrary(); // Save initial books to localStorage
	}
};

const bookCardsContainer = document.querySelector(".book-cards");

const displayBooks = () => {
	bookCardsContainer.innerHTML = "";

	myLibrary.forEach((book, index) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("card");

		const bookTitle = document.createElement("h3");
		bookTitle.textContent = book.title;

		const bookAuthor = document.createElement("p");
		bookAuthor.textContent = `Author: ${book.author}`;

		const bookPages = document.createElement("p");
		bookPages.textContent = `Pages: ${book.pages}`;

		const bookRead = document.createElement("p");
		const bookReadStatus = book.isRead ? "Read" : "Not read";
		bookRead.textContent = `Status: ${bookReadStatus}`;

		const toggleReadBookButton = document.createElement("button");
		toggleReadBookButton.textContent = "Change Status";
		toggleReadBookButton.addEventListener("click", () => {
			book.toggleReadStatus();
			saveLibrary();
			displayBooks();
		});

		const removeBookButton = document.createElement("button");
		removeBookButton.textContent = "Remove Book";
		removeBookButton.addEventListener("click", () => {
			myLibrary.splice(index, 1); // Remove book by index
			saveLibrary();
			displayBooks();
		});

		bookCard.appendChild(bookTitle);
		bookCard.appendChild(bookAuthor);
		bookCard.appendChild(bookPages);
		bookCard.appendChild(bookRead);
		bookCard.appendChild(toggleReadBookButton);
		bookCard.appendChild(removeBookButton);
		bookCardsContainer.appendChild(bookCard);
	});
};

const addNewBook = () => {
	const modal = document.createElement("div");
	modal.classList.add("modal");
	modal.style.display = "none";

	const overlay = document.createElement("div");
	overlay.classList.add("overlay");
	overlay.style.display = "none";

	const userInput = document.createElement("div");
	userInput.classList.add("new-book-form");

	const titleLabel = document.createElement("label");
	titleLabel.textContent = "Title";
	const titleInput = document.createElement("input");
	titleInput.setAttribute("type", "text");
	titleInput.setAttribute("placeholder", "Enter book title");
	titleInput.setAttribute("required", true);

	const authorLabel = document.createElement("label");
	authorLabel.textContent = "Author";
	const authorInput = document.createElement("input");
	authorInput.setAttribute("type", "text");
	authorInput.setAttribute("placeholder", "Enter author's name");
	authorInput.setAttribute("required", true);

	const pagesLabel = document.createElement("label");
	pagesLabel.textContent = "Pages";
	const pagesInput = document.createElement("input");
	pagesInput.setAttribute("type", "number");
	pagesInput.setAttribute("placeholder", "Number of pages");
	pagesInput.setAttribute("required", true);

	const isReadLabel = document.createElement("label");
	isReadLabel.textContent = "Have you read the book?";

	const radioContainer = document.createElement("div");
	radioContainer.classList.add("radio-container");

	const isReadYes = document.createElement("input");
	isReadYes.setAttribute("type", "radio");
	isReadYes.setAttribute("name", "isRead");
	isReadYes.setAttribute("value", "true");
	isReadYes.setAttribute("id", "isReadYes");

	const isReadYesLabel = document.createElement("label");
	isReadYesLabel.setAttribute("for", "isReadYes");
	isReadYesLabel.textContent = "Yes";

	const isReadNo = document.createElement("input");
	isReadNo.setAttribute("type", "radio");
	isReadNo.setAttribute("name", "isRead");
	isReadNo.setAttribute("value", "false");
	isReadNo.setAttribute("id", "isReadNo");

	const isReadNoLabel = document.createElement("label");
	isReadNoLabel.setAttribute("for", "isReadNo");
	isReadNoLabel.textContent = "No";

	radioContainer.appendChild(isReadYes);
	radioContainer.appendChild(isReadYesLabel);
	radioContainer.appendChild(isReadNo);
	radioContainer.appendChild(isReadNoLabel);

	const submitBookBtn = document.createElement("button");
	submitBookBtn.textContent = "Add Book";
	submitBookBtn.setAttribute("type", "submit");

	const errorMessage = document.createElement("p");
	errorMessage.classList.add("error-message");
	errorMessage.style.display = "none";

	userInput.appendChild(titleLabel);
	userInput.appendChild(titleInput);
	userInput.appendChild(authorLabel);
	userInput.appendChild(authorInput);
	userInput.appendChild(pagesLabel);
	userInput.appendChild(pagesInput);
	userInput.appendChild(isReadLabel);
	userInput.appendChild(radioContainer);
	userInput.appendChild(submitBookBtn);
	userInput.appendChild(errorMessage);

	modal.appendChild(userInput);
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

	const openModal = () => {
		modal.style.display = "block";
		overlay.style.display = "block";
	};

	const closeModal = () => {
		modal.style.display = "none";
		overlay.style.display = "none";
	};

	overlay.addEventListener("click", closeModal);

	submitBookBtn.addEventListener("click", (e) => {
		e.preventDefault();

		const title = titleInput.value;
		const author = authorInput.value;
		const pages = pagesInput.value;
		const isRead = document.querySelector(
			'input[name="isRead"]:checked'
		)?.value;

		if (!title || !author || !pages || isRead === undefined) {
			errorMessage.textContent = "All fields are required.";
			errorMessage.style.display = "block";
			return;
		}

		addBookToLibrary(title, author, parseInt(pages), isRead === "true");
		saveLibrary();
		displayBooks();

		titleInput.value = "";
		authorInput.value = "";
		pagesInput.value = "";
		document.querySelector('input[name="isRead"]:checked').checked = false;
		errorMessage.style.display = "none";

		closeModal();
	});

	const newBookButton = document.getElementById("new-book-button");
	newBookButton.addEventListener("click", openModal);
};

loadLibrary();
displayBooks();
addNewBook();
