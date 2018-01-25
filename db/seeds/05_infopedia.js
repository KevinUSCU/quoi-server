exports.seed = function(knex, Promise) {
  return knex('infopedia').insert([
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
    },
    
  ])
  .then(() => {
    return knex.raw(`SELECT setval('infopedia_id_seq', (SELECT MAX(id) FROM infopedia));`)
  })
}
