/**
 * @summary
 * Validation schemas for Contact entity operations.
 * Centralizes Zod validation logic.
 *
 * @module services/contact/contactValidation
 */

import { z } from 'zod';
import {
  CONTACT_STATUS,
  CONTACT_SUBJECTS,
  CONTACT_PREFERENCES,
  CONTACT_BEST_TIMES,
} from '@/constants/contact';
import { zEmail } from '@/utils/validation';

/**
 * Schema for creating a new contact request.
 * Implements validation rules from FC-001, FC-002, FC-003.
 */
export const contactCreateSchema = z.object({
  carId: z.string().min(1, 'ID do veículo é obrigatório'),

  // Personal Data
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .refine((val) => val.trim().split(' ').length >= 2, 'Deve conter nome e sobrenome'),

  email: zEmail,

  phone: z
    .string()
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .regex(/^[0-9()\-\s]+$/, 'Telefone contém caracteres inválidos'),

  preference: z.enum([
    CONTACT_PREFERENCES.PHONE,
    CONTACT_PREFERENCES.EMAIL,
    CONTACT_PREFERENCES.WHATSAPP,
  ]),

  bestTime: z
    .enum([
      CONTACT_BEST_TIMES.MORNING,
      CONTACT_BEST_TIMES.AFTERNOON,
      CONTACT_BEST_TIMES.NIGHT,
      CONTACT_BEST_TIMES.ANY,
    ])
    .optional()
    .default(CONTACT_BEST_TIMES.ANY),

  // Message Data
  subject: z.enum([
    CONTACT_SUBJECTS.GENERAL,
    CONTACT_SUBJECTS.TEST_DRIVE,
    CONTACT_SUBJECTS.NEGOTIATION,
    CONTACT_SUBJECTS.FINANCING,
    CONTACT_SUBJECTS.OTHER,
  ]),

  message: z
    .string()
    .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres'),

  financing: z.boolean().optional().default(false),

  // Legal
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'É necessário aceitar os termos de privacidade' }),
  }),

  newsletter: z.boolean().optional().default(false),

  captcha: z.string().min(1, 'Captcha é obrigatório'),
});

/**
 * Schema for updating a contact request.
 */
export const contactUpdateSchema = z.object({
  status: z
    .enum([
      CONTACT_STATUS.NEW,
      CONTACT_STATUS.IN_PROGRESS,
      CONTACT_STATUS.COMPLETED,
      CONTACT_STATUS.CANCELED,
    ])
    .optional(),
  consultantId: z.string().optional(),
  notes: z.string().optional(),
});

/**
 * Schema for ID parameter validation
 */
export const contactParamsSchema = z.object({
  id: z.string().min(1),
});

export type ContactCreateInput = z.infer<typeof contactCreateSchema>;
export type ContactUpdateInput = z.infer<typeof contactUpdateSchema>;
export type ContactParamsInput = z.infer<typeof contactParamsSchema>;
