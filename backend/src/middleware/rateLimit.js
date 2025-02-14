import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false
})

export default limiter