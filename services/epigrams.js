const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple() {
  const rows = await db.query(
    'SELECT id, quote, author FROM epigram'
  );
  const data = helper.emptyOrRows(rows);

  return data;
}

function validateCreate(epigram) {
  let messages = [];

  console.log(epigram);

  if (!epigram) {
    messages.push('No object is provided');
  }

  if (!epigram.quote) {
    messages.push('Quote is empty');
  }

  if (!epigram.author) {
    messages.push('Author is empty');
  }

  if (epigram.quote && epigram.quote.length > 255) {
    messages.push('Quote cannot be longer than 255 characters');
  }

  if (epigram.author && epigram.author.length > 255) {
    messages.push('Author name cannot be longer than 255 characters');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

async function create(epigram){
  validateCreate(epigram);

  const lastId = await db.query('select max(id) from epigram');
  const newId = lastId[0]['max'] +1;

  const result = await db.query(
    'INSERT INTO epigram(id, quote, author) VALUES ($1, $2, $3) RETURNING *',
    [newId, epigram.quote, epigram.author]
  );
  let message = 'Error in creating epigram';

  if (result.length) {
    message = 'Epigram created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
