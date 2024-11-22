import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DynamoDBService } from '../dynamodb.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { randomZipCodePeru } from 'src/lib/zipcode';

@Injectable()
export class FusionService {
  private swapiUrl = 'https://swapi.dev/api';
  private weatherApiUrl = 'http://api.weatherapi.com/v1/current.json';
  private weatherApiKey = process.env.WEATHER_API_KEY;

  constructor(
    private dynamoDBService: DynamoDBService,
    private httpService: HttpService,
  ) {}

  async getFusionData() {
    const planet = await this.fetchStarWarsData();

    const weatherData = await this.fetchWeather();

    const fusionData = {
      name: planet.name,
      terrain: planet.terrain,
      climate: planet.climate,
      region: weatherData.location.region,
      is_day: weatherData.current.is_day,
      condition: weatherData.current.condition.text,
    };

    await this.dynamoDBService.saveData('api-nest-rimac', {
      id: { S: new Date().toISOString() },
      data: { S: JSON.stringify(fusionData) },
    });

    return fusionData;
  }

  private async fetchStarWarsData() {
    try {
      const planetRandom = Math.floor(Math.random() * 60) + 1;

      const response = await firstValueFrom(
        this.httpService.get(`${this.swapiUrl}/planets/${planetRandom}/`),
      );
      return response.data as IPlanet;
    } catch (error) {
      throw new HttpException(
        'Error fetching Star Wars data',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private async fetchWeather() {
    const zip_code = randomZipCodePeru();
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.weatherApiUrl}?key=${this.weatherApiKey}&q=${zip_code}`,
        ),
      );
      return response.data as IWeather;
    } catch (error) {
      throw new HttpException(
        'Error fetching weather data',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
