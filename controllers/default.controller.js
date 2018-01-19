module.exports = name => {
  const Model = require('../models')[`${name}Model`]

  class Controller {
    static exists (req, res, next) {
      Model.find(req.params.id)
      .then(response => {
        if (!reponse) throw new Error(`noSuch${name}`)
        return next()
      })
      .catch(next)
    }

    static index (req, res, next) {
      Model.all(req.params.userId)
      .then(response => res.status(200).json({ [`${name}s`]: response }))
      .catch(next)
    }

    static show (req, res, next) {
      if (!Number(req.params.id)) throw new Error(`noSuchRoute`) //catch malformed join routes
      Model.find(req.params.id, req.params.userId)
      .then(response => {
        if (!response) throw new Error(`noSuch${name}`) //redundant if using 'exists' first in route chain
        return res.status(200).json({ [name]: response })
      })
      .catch(next)
    }

    static create (req, res, next) {
      Model.create(req.body, req.params.userId)
      .then(response => res.status(201).json({ [name]: response }))
      .catch(next)
    }

    static update (req, res, next) {
      Model.update(req.params.id, req.body, req.params.userId)
      .then(response => res.status(200).json({ [name]: response }))
      .catch(next)
    }

    static destroy (req, res, next) {
      Model.destroy(req.params.id, req.params.userId)
      .then(response => res.status(204).json()) //no response body with 204
      .catch(next)
    }
  }

  return Controller
}
