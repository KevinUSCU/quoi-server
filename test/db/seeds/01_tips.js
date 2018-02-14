exports.seed = function(knex, Promise) {
  return knex('tips').insert([
    { id: 1, tip: "In JavaScript, '==' performs a type conversion on the items being compared, but '===' does not!", used: false },
    { id: 2, tip: 'In JavaScript, undefined, null, 0, false, NaN and empty strings are all falsey.', used: false },
    { id: 3, tip: 'Use ternary notation! Instead of:\n    if (x % 2 === 0) do this;\n    else do that;\nWrite:\n    x % 2 ? this : that', used: false },
    { id: 4, tip: "In JavaScript,\n    parseInt('2A', 16)\nconverts the hex value 2A to it's decimal equivalent.", used: false },
    { id: 5, tip: 'IIFE (immediately invoking function expression):\n    (function() { code })()', used: false }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('tips_id_seq', (SELECT MAX(id) FROM tips));`)
  })
}