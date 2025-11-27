/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as initExampleController from '@/api/internal/init-example/controller';
import * as carController from '@/api/internal/car/controller';
import * as contactController from '@/api/internal/contact/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Init-Example routes - /api/internal/init-example
 */
router.get('/init-example', initExampleController.listHandler);
router.post('/init-example', initExampleController.createHandler);
router.get('/init-example/:id', initExampleController.getHandler);
router.put('/init-example/:id', initExampleController.updateHandler);
router.delete('/init-example/:id', initExampleController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Car routes - /api/internal/car
 */
router.get('/car/filters', carController.filtersHandler);
router.get('/car', carController.listHandler);
router.get('/car/:id', carController.getHandler);
router.get('/car/:id/similar', carController.getSimilarHandler);

/**
 * @rule {be-route-configuration}
 * Contact routes - /api/internal/contact
 */
router.post('/contact', contactController.createHandler);
router.get('/contact', contactController.listHandler);
router.get('/contact/:id', contactController.getHandler);
router.put('/contact/:id', contactController.updateHandler);

export default router;
