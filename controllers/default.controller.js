module.exports = name => {
  const Model = require('../models')[`${name}Model`]

  class Controller {
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
      const payload = req.fields ? payloadBuilder(req) : null
      Model.create(payload || req.body)
      .then(response => res.status(201).json({ [name]: response }))
      .catch(next)
    }

    static update (req, res, next) {
      const payload = req.fields ? payloadBuilder(req) : null
      Model.update(req.params.id, payload || req.body)
      .then(response => {
        if (!response) throw new Error(`noSuch${name}`)
        res.status(200).json({ [name]: response })
      })
      .catch(next)
    }

    static destroy (req, res, next) {
      Model.destroy(req.params.id)
      .then(response => res.status(204).json()) //no response body with 204
      .catch(next)
    }
  }

  function payloadBuilder(req) {
    const { required, optional } = req.fields
    const payload = {}
    required.forEach(field => {
      if (!req.body[field]) {
        const capitalized = field.replace(/^\w/, letter => letter.toUpperCase())
        throw new Error(`missing${capitalized}`)
      }
      payload[field] = req.body[field]
    })
    optional.forEach(field => {
      if (req.body[field]) payload[field] = req.body[field]
    })
    return payload
  }

  return Controller
}
