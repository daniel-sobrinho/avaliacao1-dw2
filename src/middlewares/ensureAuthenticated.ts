import { NextFunction, Request, Response } from 'express'

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.session.user) {
    return response.redirect('/login')
  }
  return next()
}
