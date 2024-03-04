'use strict';

/**
 * slider controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::slider.slider', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany('api::slider.slider', {
      populate: ['slides', 'slides.event', 'slides.event.image'],
    });

    return { data };
  },
}));
