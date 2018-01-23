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
      Model.all()
      .then(response => res.status(200).json({ [`${name}s`]: response }))
      .catch(next)
    }

    static show (req, res, next) {
      Model.find(req.params.id)
      .then(response => {
        if (!response) throw new Error(`noSuch${name}`)
        return res.status(200).json({ [name]: response })
      })
      .catch(next)
    }

    static create (req, res, next) {
      Model.create(req.body)
      .then(response => res.status(201).json({ [name]: response }))
      .catch(next)
    }

    static update (req, res, next) {
      Model.update(req.params.id, req.body)
      .then(response => res.status(200).json({ [name]: response }))
      .catch(next)
    }

    static destroy (req, res, next) {
      Model.destroy(req.params.id)
      .then(response => res.status(204).json()) //no response body with 204
      .catch(next)
    }
  }

  return Controller
}
