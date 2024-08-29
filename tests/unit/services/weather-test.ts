import { module, test } from 'qunit';
import { setupTest } from 'ember-code-coverage-spike/tests/helpers';

module('Unit | Service | weather', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:weather');
    assert.ok(service);
  });

  test('getForecast works', async function (assert) {
    const service = this.owner.lookup('service:weather');
    assert.ok(service);
    const actualResult = await service.getForecast(39.7456,-97.0892);
    assert.equal(actualResult?.id, 'https://api.weather.gov/points/39.7456,-97.0892', 'Results can be obtained');
  });
});
