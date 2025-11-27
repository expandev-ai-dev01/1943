/**
 * @summary
 * API controller for Contact entity.
 * Handles contact form submission and management.
 *
 * @module api/internal/contact/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { contactCreate, contactList, contactGet, contactUpdate } from '@/services/contact';

/**
 * @api {post} /api/internal/contact Submit Contact Form
 * @apiName SubmitContact
 * @apiGroup Contact
 *
 * @apiBody {String} carId Vehicle ID
 * @apiBody {String} name User full name
 * @apiBody {String} email User email
 * @apiBody {String} phone User phone
 * @apiBody {String} preference Contact preference (Telefone, E-mail, WhatsApp)
 * @apiBody {String} [bestTime] Best time for contact
 * @apiBody {String} subject Subject of inquiry
 * @apiBody {String} message Message content
 * @apiBody {Boolean} [financing] Interest in financing
 * @apiBody {Boolean} termsAccepted Privacy terms acceptance
 * @apiBody {Boolean} [newsletter] Newsletter subscription
 * @apiBody {String} captcha Captcha token
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Created contact details
 * @apiSuccess {String} data.protocol Generated protocol number
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ip = req.ip || req.socket.remoteAddress || '0.0.0.0';
    const data = await contactCreate(req.body, ip);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/contact List Contacts
 * @apiName ListContacts
 * @apiGroup Contact
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object[]} data List of contacts
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await contactList();
    res.json(successResponse(result.data, result.metadata));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/contact/:id Get Contact Details
 * @apiName GetContact
 * @apiGroup Contact
 *
 * @apiParam {String} id Contact ID
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Contact details
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await contactGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/contact/:id Update Contact
 * @apiName UpdateContact
 * @apiGroup Contact
 *
 * @apiParam {String} id Contact ID
 * @apiBody {String} [status] New status
 * @apiBody {String} [consultantId] Assigned consultant
 * @apiBody {String} [notes] Internal notes
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Updated contact details
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await contactUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
