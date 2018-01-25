exports.seed = function(knex, Promise) {
  return knex('questions').insert([
    { 
      id: 1,
      question: 'Which of the following is an example of a function declaration?',
      choices: 'function x(y) { return y + 1 }, var x = function(y) { return y + 1 }, x = (y) => y + 1',
      answer: '1',
      explanation: 'An advantage to a function declaration in JavaScript is that it can be hoisted; you can use the function before you declare it.',
      infopedia_id: 1,
      image_url: null
    },
    { 
      id: 2,
      question: 'What is the default return value of a function in JavaScript?',
      choices: 'true, 0, undefined, false, NaN',
      answer: '3',
      explanation: "Keep in mind that some functions may have side effects in addition to a return value. For example, a function which calls console.log(x) might return 'undefined,' but will also print the value of 'x' to the console.",
      infopedia_id: null,
      image_url: null
    },
    { 
      id: 3,
      question: 'Which of the following is NOT a native JavaScript string method?',
      choices: '.slice(), .replace(), .substr(), .toUpperCase(), .splice()',
      answer: '5',
      explanation: null,
      infopedia_id: null,
      image_url: null
    },
    
  ])
  .then(() => {
    return knex.raw(`SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));`)
  })
}
