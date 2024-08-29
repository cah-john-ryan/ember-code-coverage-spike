import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-code-coverage-spike/tests/helpers';
import { render } from '@ember/test-helpers';

import Weather from "ember-code-coverage-spike/components/weather";

module('Integration | Component | weather', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Weather /></template>);

    assert.dom().hasText('Weather Get current forecast');
  });
});
