const myLibrary = [];

function Book(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status || "Want to Read"; // Default to "Want to Read" if no status is provided
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
	};
}

const addBookToLibrary = (title, author, pages, status) => {
	const newBook = new Book(title, author, pages, status);
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
				new Book(book.title, book.author, book.pages, book.status)
			);
		});
	} else {
		// Add all initial books
		addBookToLibrary(
			"The Hobbit", 
			"J.R.R. Tolkien", 
			295, 
			"Want to Read"
		);
		addBookToLibrary(
			"1984", 
			"George Orwell", 
			328, 
			"Read"
		);
		addBookToLibrary(
			"The War of the Worlds", 
			"H.G. Wells", 
			192, 
			"Read"
		);
		addBookToLibrary(
			"The Princess Bride",
			"William Goldman",
			429,
			"Want to Read"
		);
		addBookToLibrary(
			"2001: A Space Odyssey",
			"Arthur C. Clarke",
			297,
			"Read"
		);
		addBookToLibrary(
			"Foundation",
			"Isaac Asimov",
			244,
			"Currently Reading"
		);
		addBookToLibrary(
			"A Game of Thrones",
			"George R.R. Martin",
			819,
			"Want to Read"
		);
		addBookToLibrary(
			"Red Mars",
			"Kim Stanley Robinson",
			572,
			"Currently Reading"
		);
		addBookToLibrary(
			"Frankenstein", 
			"Mary Shelley", 
			260, 
			"Read"
		);
		saveLibrary(); // Save initial books to localStorage
	}
};

const bookCardsContainer = document.querySelector(".book-cards");

const displayBooks = () => {
	bookCardsContainer.innerHTML = "";

	myLibrary.forEach((book, index) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("card");

		const removeBookIcon = document.createElement("span");
		removeBookIcon.classList.add(
			"material-symbols-outlined",
			"remove-book-icon"
		);
		removeBookIcon.textContent = "close";
		removeBookIcon.addEventListener("click", () => {
			myLibrary.splice(index, 1);
			saveLibrary();
			displayBooks();
		});

		const bookTitle = document.createElement("h3");
		bookTitle.textContent = book.title;

		const bookAuthor = document.createElement("h4");
		bookAuthor.textContent = `By ${book.author}`;

		const bookPages = document.createElement("p");
		bookPages.textContent = `${book.pages} pages`;

		const statusContainer = document.createElement("div");
		statusContainer.classList.add("status-container");

		const statusDropdown = document.createElement("select");
		const statuses = ["Want to Read", "Currently Reading", "Read"];

		statuses.forEach((status) => {
			const option = document.createElement("option");
			option.value = status;
			option.textContent = status;
			if (status === book.status) {
				option.selected = true;
			}
			statusDropdown.appendChild(option);
		});

		statusDropdown.addEventListener("change", (e) => {
			book.status = e.target.value;
			saveLibrary();
			displayBooks(); // Refresh the display
		});

		statusContainer.appendChild(statusDropdown);

		bookCard.appendChild(removeBookIcon);
		bookCard.appendChild(bookTitle);
		bookCard.appendChild(bookAuthor);
		bookCard.appendChild(bookPages);
		bookCard.appendChild(statusContainer);
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

	const addNewBookLabel = document.createElement("h2");
	addNewBookLabel.textContent = "Add New Book";

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
	isReadLabel.textContent = "Status";

	const newBookStatusContainer = document.createElement("div");
	newBookStatusContainer.classList.add("new-book-status-container");

	const statusDropdown = document.createElement("select");
	statusDropdown.setAttribute("name", "status");
	statusDropdown.setAttribute("required", true);

	const statuses = ["Want to Read", "Currently Reading", "Read"];
	statuses.forEach((status) => {
		const option = document.createElement("option");
		option.value = status;
		option.textContent = status;
		statusDropdown.appendChild(option);
	});

	newBookStatusContainer.appendChild(statusDropdown);

	const submitBookBtn = document.createElement("button");
	submitBookBtn.textContent = "Add Book";
	submitBookBtn.setAttribute("type", "submit");

	const errorMessage = document.createElement("p");
	errorMessage.classList.add("error-message");
	errorMessage.style.display = "none";

	userInput.appendChild(addNewBookLabel);
	userInput.appendChild(titleLabel);
	userInput.appendChild(titleInput);
	userInput.appendChild(authorLabel);
	userInput.appendChild(authorInput);
	userInput.appendChild(pagesLabel);
	userInput.appendChild(pagesInput);
	userInput.appendChild(isReadLabel);
	userInput.appendChild(newBookStatusContainer);
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
		const selectedStatus = statusDropdown.value;

		if (!title || !author || !pages || !selectedStatus) {
			errorMessage.textContent = "All fields are required.";
			errorMessage.style.display = "block";
			return;
		}

		addBookToLibrary(title, author, parseInt(pages), selectedStatus);

		saveLibrary();
		displayBooks();

		titleInput.value = "";
		authorInput.value = "";
		pagesInput.value = "";
		statusDropdown.value = statuses[0];
		errorMessage.style.display = "none";

		closeModal();
	});

	const newBookButton = document.getElementById("new-book-button");
	newBookButton.addEventListener("click", openModal);
};

loadLibrary();
displayBooks();
addNewBook();