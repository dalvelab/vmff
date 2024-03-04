'use strict';

/**
 * afisha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::afisha.afisha', ({strapi}) => ({
  async find(ctx) {
    const { meta } = await super.find(ctx);

    const data = await strapi.entityService.findMany('api::afisha.afisha', {
      populate: ['tickets', 'event', 'location', 'event.image'],
    });

    if (!data || data.length === 0) {
      return { data, meta };
    }

    const sortedData = data.sort((a, b) => new Date(a.tickets.date) - new Date(b.tickets.date))

    return { data: sortedData, meta };
  },
}));
