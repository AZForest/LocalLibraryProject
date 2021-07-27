function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) => {
    if (acc1["name"]["last"] < acc2["name"]["last"]) return -1;
    else return 1;
  })
}

function getTotalNumberOfBorrows(account, books) {
  const { id } = account;
  let count = 0;
  books.forEach(book => {
    book.borrows.forEach(borrow => {
      if (borrow.id === id) count++;
    })
  })
  return count;

}

function getBooksPossessedByAccount(account, books, authors) {
  const { id } = account;
  const bookArray = [];
  books.forEach(book => {
    book.borrows.forEach(borrow => {
      if (borrow.id === id && !borrow.returned) {
        bookArray.push(book);
      }
    })
  })

  const result = bookArray.map(book => {
    const authorEntry = authors.find(author => author.id === book.authorId);
    let newBookFormat = { ...book };
    newBookFormat["author"] = authorEntry;
    return newBookFormat;
  })
  //console.log(result);
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
