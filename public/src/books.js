function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}


//The first array contains books _that have been loaned out, 
//and are not yet returned_ while the second array contains 
//books _that have been returned._ 
//You can check for the return status by looking at the 
//first transaction in the `borrows` array.
function partitionBooksByBorrowedStatus(books) {
  const notReturnedArr = books.filter(book => !book.borrows[0].returned);
  const returnedArr = books.filter(book => book.borrows[0].returned);
  return [notReturnedArr, returnedArr];
}

//It should return an array of all the transactions f
//rom the book's `borrows` key. However, each transaction 
//should include the related account information and the `returned` key.
function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  let result = borrows.map(transaction => {
    const account = accounts.find(acc => acc.id === transaction.id);
    return {
      ...transaction, ...account
    }
  })
  if (result.length > 10) {
    result = result.slice(0, 10);
  }
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
