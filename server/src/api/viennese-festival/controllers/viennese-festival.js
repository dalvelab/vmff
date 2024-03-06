'use strict';

/**
 * viennese-festival controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::viennese-festival.viennese-festival', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany('api::viennese-festival.viennese-festival', {
      populate: ['banner', 'galleries', 'galleries.images', 'image_about'],
    });

    return { data };
  },
}));
