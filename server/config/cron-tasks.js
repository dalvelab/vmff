module.exports = {
    deletePastEventsFromAfisha: {
      task: async ({ strapi }) => {
        try {
          const afisha = await strapi.entityService.findMany("api::afisha.afisha", {
            populate: {   
              tickets: {
                fields: ['date'],
                sort: 'date:asc'
              }
            }
          });
  
          const currentDate = new Date();
          
          afisha.forEach((event) => {
            if (new Date(event.tickets.date) < currentDate) {
              strapi.entityService.delete("api::afisha.afisha", event.id);
            }
          });

          console.log('AFISHA IS UPDATED');
        } catch (error) {
          console.error(error);
        }
      },
      options: {
        // rule: '*/1 * * * *',
        rule: "* 22 * * *",
      },
    },
  };