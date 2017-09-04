'use strict';

module.exports = function(Product) {
  // remote method before hook
  Product.beforeRemote('create', (context, unused, next) => {
    const container = Product.app.models.container;
    container.createContainer({name: 'products'}, (error, container) => {
      if (error) {
        next(new Error(error.message));
      } else if (container) {
        next();
      }
    });
  });

  // remote method after hook
  Product.afterRemote('create', (context, product, next) => {
    console.log(product);
    next();
  });
};
