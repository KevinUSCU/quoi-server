// exports.seed = function(knex, Promise) {
//   return knex('tips').insert([
//     { id: 1, tip: '== performs a type conversion on the items being compared; === does not!', used: false },
//     { id: 2, tip: 'Undefined, null, 0, false, NaN and empty strings are all falsey', used: false },
//     { id: 3, tip: 'Use ternary notation! Instead of:\nif (x % 2 === 0) do this;\nelse do that;\nWrite: x % 2 ? this : that', used: false },
//     { id: 4, tip: "parseInt('2A', 16) converts the hex value 2A to it's decimal equivalent", used: false },
//     { id: 5, tip: 'IIFE (immediately invoking function expression): (function() { code })()', used: false }
//   ])
//   .then(() => {
//     return knex.raw(`SELECT setval('tips_id_seq', (SELECT MAX(id) FROM tips));`)
//   })
// }