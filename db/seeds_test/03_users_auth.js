exports.seed = function(knex, Promise) {
  // Plain text password for all sample users is 'password'
  return knex('auth').insert([
    { user_id: 1, email: 'admin@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' },
    { user_id: 2, email: 'lorem@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' },
    { user_id: 3, email: 'john@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' },
    { user_id: 4, email: 'jane@email.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' }
  ])
}
