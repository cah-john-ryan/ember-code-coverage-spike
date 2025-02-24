import {
  discoverEmberDataModels,
  // applyEmberDataSerializers,
} from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    // Remove discoverEmberDataModels if you do not want ember-cli-mirage to auto discover the ember models
    models: {
      ...discoverEmberDataModels(config.store),
      ...config.models,
    },
    // uncomment to opt into ember-cli-mirage to auto discover ember serializers
    // serializers: applyEmberDataSerializers(config.serializers),
    routes,
  };

  return createServer(finalConfig);
}

function routes() {
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://miragejs.com/docs/getting-started/overview/
  */

  /*
     I realize that this normally would this this applications own backend but
     I am using api.weather.gov to save on any further setup
    */
  this.urlPrefix = 'https://api.weather.gov';

  this.get('/points/:location', (schema, request) => {
    let location = request.params.location;
    return {
      id: `${this.urlPrefix}/points/${location}`,
      properties: {
        forecast: `${this.urlPrefix}/gridpoints/fakeGridLocation/forecast`,
      },
    };
  });

  this.get('/gridpoints/:gridLocation/forecast', () => {
    return {
      properties: {
        periods: [
          {
            detailedForecast: "It's gonna be cold, it's gonna be grey, and it's gonna last you for the rest of your life."
          },
        ],
      },
    };
  });
}
