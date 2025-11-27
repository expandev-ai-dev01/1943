/**
 * @summary
 * In-memory store instance for Contact entity.
 * Provides singleton pattern for data storage.
 *
 * @module instances/contact/contactStore
 */

import { ContactEntity } from '@/services/contact/contactTypes';

/**
 * In-memory store for Contact records
 */
class ContactStore {
  private records: Map<string, ContactEntity> = new Map();
  private sequence: number = 0;
  private lastDate: string = '';

  /**
   * Generates a protocol number in format YYYYMMDD + Sequence
   */
  private generateProtocol(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');

    if (dateStr !== this.lastDate) {
      this.sequence = 0;
      this.lastDate = dateStr;
    }

    this.sequence++;
    const seqStr = this.sequence.toString().padStart(5, '0');

    return `${dateStr}${seqStr}`;
  }

  /**
   * Get all records
   */
  getAll(): ContactEntity[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: string): ContactEntity | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: Omit<ContactEntity, 'id' | 'protocol'>): ContactEntity {
    const id = `contact-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const protocol = this.generateProtocol();

    const newRecord: ContactEntity = {
      ...record,
      id,
      protocol,
    };

    this.records.set(id, newRecord);
    return newRecord;
  }

  /**
   * Update existing record
   */
  update(id: string, data: Partial<ContactEntity>): ContactEntity | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }

    const updated = {
      ...existing,
      ...data,
      dateModified: new Date().toISOString(),
    };

    this.records.set(id, updated);
    return updated;
  }
}

/**
 * Singleton instance of ContactStore
 */
export const contactStore = new ContactStore();
