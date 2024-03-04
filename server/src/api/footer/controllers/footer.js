'use strict';

/**
 * footer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::footer.footer', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany('api::footer.footer', {
      populate: ['locations', 'socials'],
    });

    return { data };
  },
}));
