const QuoteView = require('./views/quoteView');
const Request = require('./services/request.js');

const quoteView = new QuoteView();
const request = new Request("http://localhost:3000/api/quotes")

const app = function(){
  const deleteButton = document.querySelector('#deleteButton');
  deleteButton.addEventListener('click', deleteButtonClicked);

  const createQuoteButton = document.querySelector('#submit-quote');
  createQuoteButton.addEventListener('click', createButtonClicked);

  request.get(getQuotesRequestComplete);
}

const getQuotesRequestComplete = function(allQuotes)  {
  allQuotes.forEach(function(quote) {
    quoteView.addQuote(quote);
  });
}

const createButtonClicked = function(e) {
  e.preventDefault();
  console.log('form submit clicked');
  const nameInputValue = document.querySelector('#name').value;
  const quoteInputValue = document.querySelector('#quote').value;

  const body = {
    name: nameInputValue,
    quote: quoteInputValue
  };

  const createRequestComplete = function(quote) {
   quoteView.addQuote(quote);
  };

  request.post(createRequestComplete, body);

};

const deleteButtonClicked = function(e){
  e.preventDefault();
  console.log('form submit clicked');

  const deleteRequestComplete = function() {
    quoteView.clear();
  }
    request.delete(deleteRequestComplete);
};



document.addEventListener('DOMContentLoaded', app);
