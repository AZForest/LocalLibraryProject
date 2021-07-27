//It returns a number that represents the number 
//of book objects inside of the array.
function getTotalBooksCount(books) {
  return books.reduce((acc, book) => acc + 1, 0);
}

//It returns a number that represents the number 
//of account objects inside of the array.
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//It returns a number that represents the number of books
// _that are currently checked out of the library._ 
//This number can be found by looking at the first transaction 
//in the `borrows` key of each book. 
//If the transaction says the book has 
//not been returned (i.e. `returned: false`), the book has been borrowed.
function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    return !book.borrows[0].returned ? acc + 1 : acc + 0;
  }, 0)
}

//It returns an array containing five objects or fewer t
//hat represents the most common occurring genres, 
//ordered from most common to least.
//Each object in the returned array has two keys:
//- The `name` key which represents the name of the genre.
//- The `count` key which represents the number of times the genre occurs.
//If more than five genres are present, only the top five should be returned.
function getMostCommonGenres(books) {
  const hashTable = {};
  books.forEach(book => {
    hashTable[book.genre] !== undefined ? hashTable[book.genre] += 1 : hashTable[book.genre] = 1;
  })

  let result = convertHashandSort(hashTable);

  if (result.length > 5) return result.slice(0,5);
  else return result;
}

function getMostPopularBooks(books) {
  const hashTable = {}
  books.forEach(book => hashTable[book.title] = book.borrows.length);

  let result = convertHashandSort(hashTable);

  if (result.length > 5) return result.slice(0, 5);
  else return result;
}

function getMostPopularAuthors(books, authors) {
  const hashTable = {};
  authors.forEach(author => {
    const { id } = author;
    let totalBorrowCount = 0;
    books.forEach(book => {
      if (book.authorId === id) totalBorrowCount += book.borrows.length;
    });
    hashTable[`${author.name.first} ${author.name.last}`] = totalBorrowCount;
  });

  let result = convertHashandSort(hashTable);

  if (result.length > 5) return result.slice(0, 5);
  else return result;
}

//Helper function
function convertHashandSort(hashTable) {
  let hashArray = Object.entries(hashTable);
  hashArray.sort((entry1, entry2) => entry1[1] > entry2[1] ? -1 : 1);
  const result = hashArray.map(entry => {
    return {
      "name": entry[0],
      "count": entry[1]
    }
  })
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
