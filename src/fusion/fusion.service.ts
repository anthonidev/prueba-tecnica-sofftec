import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosInstance, default as axios } from 'axios';
import { DynamoDBService } from '../dynamodb.service';

@Injectable()
export class FusionService {
  private swapiUrl = 'https://swapi.dev/api';
  private weatherApiUrl = 'https://api.weatherapi.com/v1/current.json';
  private weatherApiKey = 'ed5db9fed266406186c40502242111'; // Obtén una API key de WeatherAPI

  constructor(private dynamoDBService: DynamoDBService) {}

  async getFusionData() {
    const characters = await this.fetchStarWarsCharacters();
    const weatherData = await this.fetchWeather('Tatooine'); // Ejemplo con Tatooine

    // Fusionar los datos
    const fusionData = characters.map((character) => ({
      name: character.name,
      homeworld: character.homeworld,
      current_weather: weatherData,
    }));

    // Guardar en DynamoDB
    await this.dynamoDBService.saveData('FusionData', {
      id: { S: new Date().toISOString() },
      data: { S: JSON.stringify(fusionData) },
    });

    return fusionData;
  }

  private async fetchStarWarsCharacters() {
    try {
      const response = await axios.get(`${this.swapiUrl}/people`);
      return response.data.results;
    } catch (error) {
      throw new HttpException(
        'Error fetching Star Wars data',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private async fetchWeather(location: string) {
    try {
      const response = await axios.get(`${this.weatherApiUrl}`, {
        params: { key: this.weatherApiKey, q: location },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching weather data',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
