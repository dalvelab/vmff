'use strict';

/**
 * about controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about.about', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany('api::about.about', {
      populate: ['images'],
    });

    return { data };
  },
}));
