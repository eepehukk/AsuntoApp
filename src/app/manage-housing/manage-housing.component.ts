import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-housing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section>
      <h2>Hallinnoi asuntoja</h2>
      <button class="primary" (click)="showEditList()">Muokkaa asuntoja</button>
      <button class="primary" style="margin-left:5px" (click)="showAddHouseForm()">Lisää asuntoja</button>

      <div *ngIf="showList">
        <h3>Valitse asunto muokattavaksi:</h3>
        <table class="housing-table">
          <thead>
            <tr>
              <th>Nimi</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let house of housingLocationList" (click)="selectHouse(house)">
              <td>{{ house.name }}</td>
              <td>{{ house.id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Asunnon tietojen muokkaus "ikkuna" 
        Huomioitavaa! br käyttäminen rivien välittämiseen ei ole hyvä tapa mutten jaksanut kikkailla css kanssa-->
    <section *ngIf="selectedHouse">
      <h4>Muokkaa valittua asuntoa:</h4>
      <form (ngSubmit)="saveChanges()">
        <label for="houseName">Nimi:</label>
        <input id="houseName" [(ngModel)]="selectedHouse.name" name="name" required />     <br><br>
        
        <label for="houseCity">Kaupunki:</label>
        <input id="houseCity" [(ngModel)]="selectedHouse.city" name="city" required />     <br><br>
        
        <label for="houseState">Maakunta:</label>
        <input id="houseState" [(ngModel)]="selectedHouse.state" name="state" required /> <br><br>

        <label for="houseUnits">Vapaana olevat asunnot:</label>
        <input type="number" id="houseUnits" [(ngModel)]="selectedHouse.availableUnits" name="availableUnits" required /> <br><br>

        <label for="houseWifi">Wi-Fi:</label>
        <input type="checkbox" id="houseWifi" [(ngModel)]="selectedHouse.wifi" name="wifi" /> <br><br>

        <label for="houseLaundry">Pyykinpesumahdollisuus:</label>
        <input type="checkbox" id="houseLaundry" [(ngModel)]="selectedHouse.laundry" name="laundry" /> <br><br>

        <button type="submit" class="primary">Tallenna muutokset</button>
        <button type="button" class="primary" style="margin-left:5px" (click)="cancelChanges()">Peruuta</button>
        <button type="button" class="primary" style="margin-left:5px" (click)="deleteHouse()">Poista asunto</button>
      </form>
    </section>

    <!-- Ikkuna uuden asunnon lisäämiseen -->
    <section *ngIf="showAddHouse">
      <h4>Lisää uusi asunto:</h4>
      <form (ngSubmit)="addHouse()">
        <label for="houseName">Nimi:</label>
        <input id="houseName" [(ngModel)]="newHouse.name" name="name" required /> <br><br>
        
        <label for="houseCity">Kaupunki:</label>
        <input id="houseCity" [(ngModel)]="newHouse.city" name="city" required /> <br><br>
        
        <label for="houseState">Maakunta:</label>
        <input id="houseState" [(ngModel)]="newHouse.state" name="state" required /> <br><br>

        <label for="houseUnits">Vapaana olevat asunnot:</label>
        <input type="number" id="houseUnits" [(ngModel)]="newHouse.availableUnits" name="availableUnits" required /> <br><br>

        <label for="houseWifi">Wi-Fi:</label>
        <input type="checkbox" id="houseWifi" [(ngModel)]="newHouse.wifi" name="wifi" /> <br><br>

        <label for="houseLaundry">Pyykinpesumahdollisuus:</label>
        <input type="checkbox" id="houseLaundry" [(ngModel)]="newHouse.laundry" name="laundry" /> <br><br>

        <button type="submit" class="primary">Tallenna uusi asunto</button>
        <button type="button" class="primary" style="margin-left:5px" (click)="cancelAdd()">Peruuta</button>
      </form>
    </section>


    <br><br>
    <button class="primary" style="margin-top:5px" (click)="goBack()">Takaisin</button>
  `,
  styleUrls: ['./manage-housing.component.css'],
})

export class ManageHousingComponent {
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  showList: boolean = false;
  selectedHouse: HousingLocation | null = null; // Valitun asunnon tallennus
  showAddHouse: boolean = false;  // Kontrolloidaan lomakkeen näkyvyyttä
  newHouse: HousingLocation = {
    id: 0,
    name: '',
    city: '',
    state: '',
    photo: '/assets/r-architecture-GGupkreKwxA-unsplash.jpg',
    availableUnits: 0,
    wifi: false,
    laundry: false
  }; // Tarvittava data uuden asunnon lisäämiseen


  constructor() {
    this.loadHousingLocations();
  }

  async loadHousingLocations() {
    this.housingLocationList = await this.housingService.getAllHousingLocations();
  }

  showEditList() {
    this.showAddHouse = false;  // Hide the "Add House" form
    this.showList = true;       // Show the edit list form
  }

  showAddHouseForm() {
    this.showList = false;  // Hide the edit list form
    this.showAddHouse = true;  // Show the "Add House" form
  }

  cancelAdd() {
    this.showAddHouse = false;  // Piilotetaan uuden asunnon lomake
    this.newHouse = {
      id: 0,
      name: '',
      city: '',
      state: '',
      photo: '',
      availableUnits: 0,
      wifi: false,
      laundry: false
    };
  }

  selectHouse(house: HousingLocation) {
    this.selectedHouse = { ...house }; // Välitallennus valitulle asunnolle mahdollista peruutusta varten
    console.log('Valittu asunto:', this.selectedHouse);
  }

  async saveChanges() {
    if (this.selectedHouse) {
      // serviceen viedään muokatun asunnon uudet tiedot
      try {
        await this.housingService.updateHousingLocation(this.selectedHouse);
        alert('Muutokset tallennettu!');
      } catch (error) {
        console.error('Virhe tallennettaessa muutoksia:', error);
        alert('Virhe tallennettaessa muutoksia');
      }
    }
  }

  cancelChanges() {
    if (this.selectedHouse) {
      this.selectedHouse = null;
    }
  }

  async addHouse() {
    // Etsitään vapaa id asunnolle
    const maxId = Math.max(...this.housingLocationList.map(house => house.id));
    const newId = maxId + 1;
    this.newHouse.id = newId;

    try {
      await this.housingService.addHousingLocation(this.newHouse);
      alert('Uusi asunto lisätty!');
      this.loadHousingLocations(); // Ladataan uusi lista asunnon lisäämisen jälkeen
      this.cancelAdd();  // Lisäämisen jälkeen suljetaan lisäyslomake
    } catch (error) {
      console.error('Virhe uuden asunnon lisäämisessä:', error);
      alert('Virhe uuden asunnon lisäämisessä');
    }
  }

  async deleteHouse() {
    if (this.selectedHouse) {
      const confirmDelete = confirm(`Oletko varma, että haluat poistaa asunnon: ${this.selectedHouse.name}?`);
      if (confirmDelete) {
        try {
          await this.housingService.deleteHousingLocation(this.selectedHouse.id);
          alert('Asunto poistettu!');
          this.loadHousingLocations(); // Listan uudelleen lataaminen poiston jälkeen
          this.selectedHouse = null; // Tyhjennetään välimuistista valittu asunto
        } catch (error) {
          console.error('Virhe poistaessa asuntoa:', error);
          alert('Virhe poistaessa asuntoa');
        }
      }
    }
  }

  goBack() {
    history.back();
  }
}
