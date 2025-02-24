import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type WeatherService from 'ember-code-coverage-spike/services/weather';
import { task } from "ember-concurrency";

// Template imports
import { on } from "@ember/modifier";

export interface WeatherSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class Weather extends Component<WeatherSignature> {
  <template>
    <div data-test-weather>
      <h2>Weather</h2>
      <button
        type="button"
        {{on "click" this.getCurrentForecastTask.perform}}
        data-test-weather-button
      >
        Get current forecast
      </button>
      {{#if this.getCurrentForecastTask.isRunning}}
        <p data-test-weather-loading>Loading...</p>
      {{/if}}
      {{#if this.timeOfForecast}}
        <div>{{this.timeOfForecast}}</div>
      {{/if}}
      {{#if this.currentForecast}}
        <p data-test-weather-current-forecast>{{this.currentForecast}}</p>
      {{/if}}
    </div>
  </template>

  @service('weather')
  weatherService: WeatherService;


  @tracked
  timeOfForecast: null | string = null;
  @tracked
  currentForecast: null | string = null;

  getCurrentForecastTask = task({drop: true}, async () => {
    const response = await this.weatherService.getForecast(
      40.1073,
      -83.2667,
    );
    this.timeOfForecast = response?.startTime;
    this.currentForecast = response?.detailedForecast;
  });

}
