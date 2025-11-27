/**
 * @summary
 * Default values and constants for Contact entity.
 * Defines status, subjects, preferences, and other enumerations.
 *
 * @module constants/contact/contactDefaults
 */

/**
 * @interface ContactStatusType
 * @description Status of the contact request.
 */
export const CONTACT_STATUS = {
  NEW: 'Novo',
  IN_PROGRESS: 'Em atendimento',
  COMPLETED: 'Concluído',
  CANCELED: 'Cancelado',
} as const;

/**
 * @interface ContactSubjectsType
 * @description Available subjects for the contact form.
 */
export const CONTACT_SUBJECTS = {
  GENERAL: 'Informações gerais',
  TEST_DRIVE: 'Agendamento de test drive',
  NEGOTIATION: 'Negociação de preço',
  FINANCING: 'Financiamento',
  OTHER: 'Outro',
} as const;

/**
 * @interface ContactPreferencesType
 * @description Preferred communication channels.
 */
export const CONTACT_PREFERENCES = {
  PHONE: 'Telefone',
  EMAIL: 'E-mail',
  WHATSAPP: 'WhatsApp',
} as const;

/**
 * @interface ContactBestTimesType
 * @description Preferred times for contact.
 */
export const CONTACT_BEST_TIMES = {
  MORNING: 'Manhã',
  AFTERNOON: 'Tarde',
  NIGHT: 'Noite',
  ANY: 'Qualquer horário',
} as const;

export type ContactStatus = (typeof CONTACT_STATUS)[keyof typeof CONTACT_STATUS];
export type ContactSubject = (typeof CONTACT_SUBJECTS)[keyof typeof CONTACT_SUBJECTS];
export type ContactPreference = (typeof CONTACT_PREFERENCES)[keyof typeof CONTACT_PREFERENCES];
export type ContactBestTime = (typeof CONTACT_BEST_TIMES)[keyof typeof CONTACT_BEST_TIMES];
