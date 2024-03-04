import type { Schema, Attribute } from '@strapi/strapi';

export interface CommonGallery extends Schema.Component {
  collectionName: 'components_common_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
  };
}

export interface CommonSocial extends Schema.Component {
  collectionName: 'components_common_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    type: Attribute.Enumeration<['vk', 'telegram']> & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface EventTicket extends Schema.Component {
  collectionName: 'components_event_tickets';
  info: {
    displayName: 'Ticket';
  };
  attributes: {
    date: Attribute.DateTime;
    title: Attribute.String;
    link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'common.gallery': CommonGallery;
      'common.social': CommonSocial;
      'event.ticket': EventTicket;
    }
  }
}
