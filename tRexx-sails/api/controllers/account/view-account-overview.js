module.exports = {


  friendlyName: 'View account overview',


  description: 'Display "Account Overview" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/account-overview',
    }

  },


  fn: async function () {

    // If billing features are enabled, include our configured Stripe.js
    // public key in the view locals.  Otherwise, leave it as undefined.
    let curso;
    if (this.req.me.curso != null) {
      [curso] = await Curso.find({ id: 1 }).limit(1);
      console.log("[curso]",curso);
    }
    return {
      curso: (curso != undefined) ? curso : { nome: undefined },
      stripePublishableKey: sails.config.custom.enableBillingFeatures ? sails.config.custom.stripePublishableKey : undefined,
    };

  }


};
