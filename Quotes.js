class Quotes {
	fetchQuotes = () => {
		fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
			.then(response => response.json())
			.then(data => {
				this.quotes = data.quotes;
				document.getElementById('quote').innerHTML = this.quotes[0].quote;
				document.getElementById('quote-author').innerHTML = '- ' + this.quotes[0].author;
				setInterval(() => this.getRandomQuote(this.quotes.length), 5000);
			});
	}

	getRandomQuote = (n) => {
		let random = Math.floor(Math.random() * n);
		document.getElementById('quote').innerHTML = this.quotes[random].quote;
		document.getElementById('quote-author').innerHTML = '- ' + this.quotes[random].author;
	}
}