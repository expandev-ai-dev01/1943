/**
 * @summary
 * Business logic for Contact entity.
 * Handles creation, listing, and management of contact requests.
 *
 * @module services/contact/contactService
 */

import { contactStore, carStore } from '@/instances';
import { ServiceError } from '@/utils';
import { CONTACT_STATUS } from '@/constants/contact';
import { ContactEntity, ContactListResponse } from './contactTypes';
import { contactCreateSchema, contactUpdateSchema, contactParamsSchema } from './contactValidation';

/**
 * @summary
 * Creates a new contact request.
 * Validates input, checks car existence, generates protocol, and simulates email sending.
 *
 * @function contactCreate
 * @module services/contact
 *
 * @param {unknown} body - Request body
 * @param {string} ipAddress - User IP address
 * @returns {Promise<ContactEntity>} Created contact entity
 */
export async function contactCreate(body: unknown, ipAddress: string): Promise<ContactEntity> {
  const validation = contactCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Dados inválidos', 400, validation.error.errors);
  }

  const data = validation.data;

  // Validate Car existence
  const car = carStore.getById(data.carId);
  if (!car) {
    throw new ServiceError('NOT_FOUND', 'Veículo não encontrado', 404);
  }

  // Mock Captcha Validation
  // In a real scenario, we would verify data.captcha with Google API here
  if (data.captcha === 'invalid') {
    throw new ServiceError('VALIDATION_ERROR', 'Captcha inválido', 400);
  }

  const now = new Date().toISOString();

  // Create Contact
  const contact = contactStore.add({
    carId: data.carId,
    carModel: `${car.brand} ${car.model} (${car.year})`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    preference: data.preference,
    bestTime: data.bestTime,
    subject: data.subject,
    message: data.message,
    financing: data.subject === 'Financiamento' ? true : data.financing,
    termsAccepted: data.termsAccepted,
    newsletter: data.newsletter,
    ipAddress,
    status: CONTACT_STATUS.NEW,
    dateCreated: now,
    dateModified: now,
  });

  // Simulate Email Sending (Async)
  console.log(`[EMAIL] Sending confirmation to ${contact.email} for protocol ${contact.protocol}`);
  console.log(`[EMAIL] Sending notification to sales team for lead ${contact.id}`);

  return contact;
}

/**
 * @summary
 * Lists all contact requests.
 *
 * @function contactList
 * @module services/contact
 *
 * @returns {Promise<ContactListResponse>} List of contacts
 */
export async function contactList(): Promise<ContactListResponse> {
  const contacts = contactStore.getAll();

  // Sort by date desc
  contacts.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

  return {
    data: contacts,
    metadata: {
      total: contacts.length,
      count: contacts.length,
    },
  };
}

/**
 * @summary
 * Retrieves a specific contact by ID.
 *
 * @function contactGet
 * @module services/contact
 *
 * @param {unknown} params - Request parameters
 * @returns {Promise<ContactEntity>} Contact details
 */
export async function contactGet(params: unknown): Promise<ContactEntity> {
  const validation = contactParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'ID inválido', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const contact = contactStore.getById(id);

  if (!contact) {
    throw new ServiceError('NOT_FOUND', 'Contato não encontrado', 404);
  }

  return contact;
}

/**
 * @summary
 * Updates a contact request (status, notes, consultant).
 *
 * @function contactUpdate
 * @module services/contact
 *
 * @param {unknown} params - Request parameters
 * @param {unknown} body - Request body
 * @returns {Promise<ContactEntity>} Updated contact
 */
export async function contactUpdate(params: unknown, body: unknown): Promise<ContactEntity> {
  const paramsValidation = contactParamsSchema.safeParse(params);
  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'ID inválido', 400, paramsValidation.error.errors);
  }

  const bodyValidation = contactUpdateSchema.safeParse(body);
  if (!bodyValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Dados inválidos', 400, bodyValidation.error.errors);
  }

  const { id } = paramsValidation.data;
  const contact = contactStore.getById(id);

  if (!contact) {
    throw new ServiceError('NOT_FOUND', 'Contato não encontrado', 404);
  }

  const updated = contactStore.update(id, bodyValidation.data);

  if (!updated) {
    throw new ServiceError('INTERNAL_ERROR', 'Falha ao atualizar contato', 500);
  }

  return updated;
}
