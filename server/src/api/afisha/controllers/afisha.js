'use strict';

/**
 * afisha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::afisha.afisha', () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    if (!data || data.length === 0) {
      return { data, meta };
    }

    const sortedData = data
      .map((event) => {
        return {
          ...event,
          tickets: {
            ...event.tickets,
            date: new Date(event.attributes.tickets.date).toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })
          }
        }
      })
      .sort((a, b) => new Date(a.attributes.tickets.date) - new Date(b.attributes.tickets.date))

    return { data: sortedData, meta };
  },
}));
