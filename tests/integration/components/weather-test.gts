import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-code-coverage-spike/tests/helpers';
import { render } from '@ember/test-helpers';
import { create, text } from 'ember-cli-page-object';

import Weather from "ember-code-coverage-spike/components/weather";

const page = create({
  scope: '[data-test-weather]',
  title: text('h2')
});

module('Integration | Component | weather', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Weather /></template>);

    assert.strictEqual(page.title, "Weather");
  });
});
