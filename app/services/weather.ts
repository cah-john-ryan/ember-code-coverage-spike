import Service from '@ember/service';

export default class WeatherService extends Service {
  async getForecast(latitude: number, longitude: number) {
    const pointsResponse = await this.getFromPointsApi(latitude, longitude);
    const forecastUrl = pointsResponse?.properties?.forecast;
    if (!forecastUrl) {
      throw new Error('No forecast URL found in points response');
    }
    const gridPointsResponse = await this.getFromGridPointsApi(forecastUrl);
    return gridPointsResponse?.properties.periods?.[0];
  }

  async getFromPointsApi(latitude: number, longitude: number) {
    const url = `https://api.weather.gov/points/${latitude},${longitude}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `getFromPointsApi error, Response status: ${response.status}`,
        );
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error?.message);
      throw new Error(`getFromPointsApi error: ${error?.message}`, { cause: error });
    }
  }

  private async getFromGridPointsApi(forecastUrl: string) {
    try {
      const response = await fetch(forecastUrl);
      if (!response.ok) {
        throw new Error(
          `getFromGridPointsApi error, Response status: ${response.status}`,
        );
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error?.message);
      throw new Error(`getFromGridPointsApi error: ${error?.message}`, { cause: error });
    }
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:weather')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('weather') declare altName: WeatherService;`.
declare module '@ember/service' {
  interface Registry {
    weather: WeatherService;
  }
}
