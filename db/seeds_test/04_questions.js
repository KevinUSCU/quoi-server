exports.seed = function(knex, Promise) {
  return knex('questions').insert([
    { 
      id: 1,
      question: 'Which of the following is an example of a function declaration in JavaScript?',
      choices: '["function x(y) { return y + 1 }", "var x = function(y) { return y + 1 }", "x = (y) => y + 1", "x += 3"]',
      answer: 0,
      explanation: 'An advantage to a function declaration in JavaScript is that it is hoisted; it can be declared after it has been used.',
      infopedia_id: 1,
      image_url: null
    },
    { 
      id: 2,
      question: 'What is the default return value of a function in JavaScript?',
      choices: '["true", "0", "undefined", "false"]',
      answer: 2,
      explanation: "Keep in mind that some functions may have side effects in addition to a return value. For example, a function which calls console.log(x) might return 'undefined,' but will also print the value of 'x' to the console.",
      infopedia_id: null,
      image_url: null
    },
    { 
      id: 3,
      question: 'Which of the following is NOT a native JavaScript String method?',
      choices: '[".slice()", ".replace()", ".substr()", ".splice()"]',
      answer: 3,
      explanation: ".splice() is a native Array method, but is not a member of String.",
      infopedia_id: null,
      image_url: null
    },
    { 
      id: 4,
      question: 'Which of the following is NOT a valid way to declare a variable in JavaScript?',
      choices: '["var", "const", "static", "let"]',
      answer: 2,
      explanation: "Unlike some languages, JavaScript does not have the concept of a static variable. Methods of a class can be static, however.",
      infopedia_id: null,
      image_url: null
    },
    { 
      id: 5,
      question: 'Which of the following HTML tags is self-closing?',
      choices: '["<img>", "<a>", "<html>", "<label>"]',
      answer: 0,
      explanation: "Self-closing tags are also called void-elements.",
      infopedia_id: null,
      image_url: null
    },
    { 
      id: 6,
      question: 'In JavaScript, what is the return value of the Array.reduce() method?',
      choices: '["another array", "any value defined by the reduce function", "undefined", "the length of the array"]',
      answer: 1,
      explanation: "Don't forget to provide an initial value for the reduce function. However, if no initial value is supplied, the first element in the array will be used as the initial value.",
      infopedia_id: null,
      image_url: null
    },
    { 
      id: 7,
      question: 'What is the WORST case Big-O for searching a binary search tree?',
      choices: '["O(log(n))", "O(n log(n))", "O(n)", "O(n^2)"]',
      answer: 2,
      explanation: "The average search time is O(log(n)), however the worst case is O(n).",
      infopedia_id: null,
      image_url: null
    }
    
  ])
  .then(() => {
    return knex.raw(`SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));`)
  })
}
