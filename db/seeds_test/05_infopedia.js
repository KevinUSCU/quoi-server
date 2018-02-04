exports.seed = function(knex, Promise) {
  return knex('infopedia').insert([
    { 
      id: 1,
      category: 'Functions',
      title: 'Declaration',
      description: 'A function declaration in JavaScript follows the format:\n\n    function x(y) {\n        return y + 1\n    }',
    },
    { 
      id: 2,
      category: 'Functions',
      title: 'Expression',
      description: 'A function expression in JavaScript follows the format:\n\n    const x = function(y) {\n        return y + 1\n    }',
    },
    { 
      id: 3,
      category: 'Objects',
      title: 'Array',
      description: 'An array is a global object in JavaScript which contains values ordered by an index number starting at 0.',
    },
    {
      id: 4,
      category: 'Code Execution',
      title: 'Short-Circuit Evaluation',
      description: "Short-circuit evaluation in a programming language means that a Boolean operation will only evaluate the second condition if the first condition is not sufficient to determine the value of the expression.\n\nFor example, when using the && operator, if the first condition evaluates as 'false', the second condition will be ignored as the entire expression is now guaranteed to be 'false.' The same is true for the || operator if the first condition evaluates to be 'true.'"
    }
    
  ])
  .then(() => {
    return knex.raw(`SELECT setval('infopedia_id_seq', (SELECT MAX(id) FROM infopedia));`)
  })
}
