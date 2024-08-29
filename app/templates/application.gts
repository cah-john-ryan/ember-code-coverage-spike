import RouteTemplate from "ember-route-template";
import { pageTitle } from "ember-page-title";
import Weather from "ember-code-coverage-spike/components/weather";

export default RouteTemplate(
  <template>
    {{pageTitle "EmberCodeCoverageSpike"}}

    <Weather />
  </template>
);



