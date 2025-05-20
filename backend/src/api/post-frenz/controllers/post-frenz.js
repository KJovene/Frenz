'use strict';

/**
 * post-frenz controller
 */


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post-frenz.post-frenz', ({ strapi }) => ({
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
    const postId = ctx.params.id; // ID du post à supprimer

    // Récupérer le post avec son ID
    const post = await strapi.entityService.findOne('api::post-frenz.post-frenz', postId, { populate: 'author' });    
    
    // Vérifier si le post existe
    if (!post) {
      return ctx.notFound('Post pas trouvé');
    }

    // Vérifier si l'utilisateur est l'auteur du post
    if (post.author.id !== userId) {
      return ctx.forbidden('Vous ne pouvez pas supprimer ce post.');
    }

    // Supprimer le post
    return await strapi.entityService.delete('api::post-frenz.post-frenz', postId);
  },
  
  async update(ctx){
    const userId = ctx.state.user.id;
    const postId = ctx.params.id

    const post = await strapi.entityService.findOne('api::post-frenz.post-frenz', postId, { populate: 'author' });  

    if (!post) {
      return ctx.notFound('Post pas trouvé.');
    }

    if (post.author.id !== userId) {
      return ctx.forbidden('Vous ne pouvez pas éditer ce post.');
    }

    const updatedPost = await strapi.entityService.update('api::post-frenz.post-frenz', postId, {
      data: ctx.request.body.data,
    });
    return updatedPost;
  }
}));
