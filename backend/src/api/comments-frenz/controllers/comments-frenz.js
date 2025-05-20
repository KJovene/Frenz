'use strict';

/**
 * comments-frenz controller
 */


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comments-frenz.comments-frenz', ({ strapi }) => ({
  async create(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized('Vous n\'êtes pas connecté.');
    }
    const userId = ctx.state.user.id;
    ctx.request.body.data.author = userId;
    return await super.create(ctx);
  },

  async delete(ctx) {
    const userId = ctx.state.user.id; // ID de l'utilisateur connecté
    const commentId = ctx.params.id; // ID du comment à supprimer

    // Récupérer le comment avec son ID
    const comment = await strapi.entityService.findOne('api::comments-frenz.comments-frenz', commentId, { populate: 'author' });    
    // Vérifier si le post existe
    if (!comment) {
      return ctx.notFound('Commentaire pas trouvé.');
    }

    // Vérifier si l'utilisateur est l'auteur du post
    if (comment.author.id !== userId) {
      return ctx.forbidden('Vous ne pouvez pas supprimer ce commentaire.');
    }

    // Supprimer le post
    return await strapi.entityService.delete('api::comments-frenz.comments-frenz', commentId);
  },

  async update(ctx){
    const userId = ctx.state.user.id;
    const commentId = ctx.params.id

    const comment = await strapi.entityService.findOne('api::comments-frenz.comments-frenz', commentId, { populate: 'author' });  

    if (!comment) {
      return ctx.notFound('Commentaire pas trouvé.');
    }

    if (comment.author.id !== userId) {
      return ctx.forbidden('Vous ne pouvez pas éditer ce commentaire.');
    }

    const updatedComment = await strapi.entityService.update('api::comments-frenz.comments-frenz', commentId, {
      data: ctx.request.body.data,
    });
    return updatedComment;
  }


}));
