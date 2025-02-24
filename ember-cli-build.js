'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [
        require.resolve("ember-concurrency/async-arrow-task-transform"),
        ...require('ember-cli-code-coverage').buildBabelPlugin({
          embroider: true,
        }),
      ],
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },

    // Add options here
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack);
};
