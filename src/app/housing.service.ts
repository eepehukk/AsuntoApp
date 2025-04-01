import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';
  
  constructor() { }
  
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }
  
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
  
  // PUT metodi muokattujen tietojen asettamiseksi serverille
  async updateHousingLocation(house: HousingLocation): Promise<HousingLocation> {
    const response = await fetch(`${this.url}/${house.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(house), 
    });

    if (!response.ok) {
      throw new Error('Serverin päivittäminen epäonnistui');
    }
    return await response.json();
  }

    // POST metodi asuntojen lisäämiseen
  async addHousingLocation(house: HousingLocation): Promise<HousingLocation> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(house),
    });

    if (!response.ok) {
      throw new Error('Uuden asunnon lisääminen epäonnistui');
    }
    return await response.json();
  }

  // DELETE metodi asuntojen poistamiseen.
  async deleteHousingLocation(id: number): Promise<void> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Asunnon poistaminen epäonnistui');
    }
  }

}


