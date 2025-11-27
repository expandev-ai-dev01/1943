/**
 * @summary
 * Type definitions for Contact entity and service operations.
 *
 * @module services/contact/contactTypes
 */

import {
  ContactStatus,
  ContactSubject,
  ContactPreference,
  ContactBestTime,
} from '@/constants/contact';

/**
 * @interface ContactEntity
 * @description Represents a contact request entity in the system.
 */
export interface ContactEntity {
  id: string;
  protocol: string;

  // Vehicle Info
  carId: string;
  carModel: string;

  // Personal Data
  name: string;
  email: string;
  phone: string;
  preference: ContactPreference;
  bestTime: ContactBestTime;

  // Message Data
  subject: ContactSubject;
  message: string;
  financing: boolean;

  // Meta & Legal
  termsAccepted: boolean;
  newsletter: boolean;
  ipAddress: string;

  // System Data
  status: ContactStatus;
  consultantId?: string;
  notes?: string;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface ContactCreateRequest
 * @description Payload for creating a new contact request.
 */
export interface ContactCreateRequest {
  carId: string;
  name: string;
  email: string;
  phone: string;
  preference: ContactPreference;
  bestTime?: ContactBestTime;
  subject: ContactSubject;
  message: string;
  financing?: boolean;
  termsAccepted: boolean;
  newsletter?: boolean;
  captcha: string;
}

/**
 * @interface ContactUpdateRequest
 * @description Payload for updating a contact request (admin/consultant).
 */
export interface ContactUpdateRequest {
  status?: ContactStatus;
  consultantId?: string;
  notes?: string;
}

/**
 * @interface ContactListResponse
 * @description Response structure for listing contacts.
 */
export interface ContactListResponse {
  data: ContactEntity[];
  metadata: {
    total: number;
    count: number;
  };
}
