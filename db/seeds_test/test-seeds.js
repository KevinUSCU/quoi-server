exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users_questions').del())
    .then(() => knex('users_daily_questions').del())
    .then(() => knex('daily_questions').del())
    .then(() => knex('questions').del())
    .then(() => knex('auth').del())
    .then(() => knex('infopedia').del())
    .then(() => knex('tips').del())
    
    .then(() => knex('tips').insert([
      { id: 1, tip: '== performs a type conversion on the items being compared; === does not!', used: false },
      { id: 2, tip: 'Undefined, null, 0, false, NaN and empty strings are all falsey', used: false },
      { id: 3, tip: 'Use ternary notation! Instead of:\nif (x % 2 === 0) do this;\nelse do that;\nWrite: x % 2 ? this : that', used: false },
      { id: 4, tip: "parseInt('2A', 16) converts the hex value 2A to it's decimal equivalent", used: false },
      { id: 5, tip: 'IIFE (immediately invoking function expression): (function() { code })()', used: false }
    ]))
    .then(() => knex.raw(`SELECT setval('tips_id_seq', (SELECT MAX(id) FROM tips));`))
    
    .then(() => knex('users').insert([
      { id: 1, firstname: 'Admin', lastname: 'Istrator', role: 'admin' },
      { id: 2, firstname: 'Lorem', lastname: 'Ipsum' },
      { id: 3, firstname: 'John', lastname: 'Doe' },
      { id: 4, firstname: 'Jane', lastname: 'Grey' }
    ]))
    .then(() => knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`))
    
    .then(() => knex('auth').insert([
      { user_id: 1, email: 'admin@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' },
      { user_id: 2, email: 'lorem@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' },
      { user_id: 3, email: 'john@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' },
      { user_id: 4, email: 'jane@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' }
    ]))
    .then(() => knex('questions').insert([
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
    ]))
    .then(() => knex.raw(`SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));`))

    .then(() => knex('infopedia').insert([
      { 
        id: 1,
        category: 'Functions',
        title: 'Function declaration',
        description: 'A function declaration in JavaScript follows the format: function x(y) { return y + 1 }.',
      },
      { 
        id: 2,
        category: 'Functions',
        title: 'Function expression',
        description: 'A function expression in JavaScript follows the format: const x = function(y) { return y + 1 }.',
      },
      { 
        id: 3,
        category: 'Arrays',
        title: 'Array',
        description: 'An array is a global object in JavaScript which contains values ordered by an index number starting at 0.',
      }
    ]))
    .then(() => knex.raw(`SELECT setval('infopedia_id_seq', (SELECT MAX(id) FROM infopedia));`))

    .then(() => knex('daily_questions').insert([
      { id: 1, date: '2018-01-27T05:15:50.118Z', question_id: 2 },
      { id: 2, date: '2018-01-28T05:15:50.118Z', question_id: 1 }
    ]))
    .then(() => knex.raw(`SELECT setval('daily_questions_id_seq', (SELECT MAX(id) FROM daily_questions));`))

    .then(() => knex('users_questions').insert([
      { id: 1, user_id: 1, question_id: 2, answer_history: '[false,false,true]', considers_relevant: false },
      { id: 2, user_id: 2, question_id: 2, answer_history: '[true]', considers_relevant: true },
      { id: 3, user_id: 1, question_id: 3, answer_history: '[false,false]', considers_relevant: true }
    ]))
    .then(() => knex.raw(`SELECT setval('users_questions_id_seq', (SELECT MAX(id) FROM users_questions));`))

    .then(() => knex('users_daily_questions').insert([
      { id: 1, user_id: 1, daily_question_id: 1, got_correct: false },
      { id: 2, user_id: 2, daily_question_id: 1, got_correct: true }
    ]))
    .then(() => knex.raw(`SELECT setval('users_daily_questions_id_seq', (SELECT MAX(id) FROM users_daily_questions));`))
}