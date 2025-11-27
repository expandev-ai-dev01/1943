/**
 * @summary
 * Centralized service instances exports.
 * Provides single import point for all service configurations and instances.
 *
 * @module instances
 */

/**
 * InitExample instances
 */
export { initExampleStore, type InitExampleRecord } from './initExample';

/**
 * Car instances
 */
export { carStore, type CarRecord } from './car';

/**
 * Contact instances
 */
export { contactStore } from './contact';
