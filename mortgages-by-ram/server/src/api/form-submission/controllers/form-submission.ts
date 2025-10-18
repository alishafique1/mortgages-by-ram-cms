/**
 * form-submission controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::form-submission.form-submission', ({ strapi }) => ({
  // Public endpoint for form submissions (no authentication required)
  async createPublic(ctx) {
    try {
      const { name, email, phone, message, propertyValue, downPayment, employmentStatus, formType } = ctx.request.body;

      // Validate required fields
      if (!name || !email) {
        return ctx.badRequest('Name and email are required');
      }

      // Create the form submission
      const submission = await strapi.entityService.create('api::form-submission.form-submission', {
        data: {
          name,
          email,
          phone: phone || null,
          message: message || null,
          propertyValue: propertyValue || null,
          downPayment: downPayment || null,
          employmentStatus: employmentStatus || null,
          formType: formType || 'contact',
          status: 'new',
          publishedAt: new Date(), // Auto-publish since draftAndPublish is false
        },
      });

      // Return success response
      return ctx.send({
        success: true,
        message: 'Form submitted successfully',
        data: {
          id: submission.id,
        },
      });
    } catch (error) {
      console.error('Form submission error:', error);
      return ctx.internalServerError('An error occurred while submitting the form');
    }
  },
}));
