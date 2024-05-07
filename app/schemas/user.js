const Joi = require('joi');

const user_by_id_schema_optional = Joi.object({
  id: Joi.string().uuid(),
});

const user_by_id_schema = Joi.object({
  id: Joi.string().uuid().required(),
});

const post_user_schema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().alphanum().min(3).max(10).required(),
  lastname: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

const update_user_schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10),
  lastname: Joi.string().alphanum().min(3).max(10),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

module.exports = {
  user_by_id_schema,
  post_user_schema,
  update_user_schema,
  user_by_id_schema_optional,
};
