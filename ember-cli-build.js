'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [...require('ember-cli-code-coverage').buildBabelPlugin()],
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },

    // Add options here
  });

  return app.toTree();
};
