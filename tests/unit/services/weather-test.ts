import { module, test } from 'qunit';
import { setupTest } from 'ember-code-coverage-spike/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Service | weather', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:weather');
    assert.ok(service);
  });

  test('getForecast works', async function (assert) {
    const service = this.owner.lookup('service:weather');
    assert.ok(service);
    const actualResult = await service.getForecast(39.7456, -97.0892);
    assert.equal(
      actualResult?.detailedForecast,
      "It's gonna be cold, it's gonna be grey, and it's gonna last you for the rest of your life.",
      'Results can be obtained',
    );
  });
});
