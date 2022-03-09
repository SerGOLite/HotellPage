import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const bookings: Booking[] = [
      {
         id: 1,
         name: "Sergej Kukshausen",
         roomNumber: 100,
         startDate: new Date(),
         endDate: new Date("2022-07-21")
      },
      {
         id: 2,
         name: "Stiven Lagasu",
         roomNumber: 100,
         startDate: new Date(),
         endDate: new Date("2022-07-21")
      },
      {
         id: 3,
         name: "Leon Petersen",
         roomNumber: 100,
         startDate: new Date(),
         endDate: new Date("2022-07-21")
      },
      {
         id: 4,
         name: "Robert Mansur",
         roomNumber: 100,
         startDate: new Date(),
         endDate: new Date("2022-07-21")
      }
    ]
    return {bookings};
  }
  constructor() { }
}
