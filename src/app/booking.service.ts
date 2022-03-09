import { Injectable } from '@angular/core';
import { Bookings } from './mock-bookings';
import { Booking } from './booking';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Booking ist interface für die Datensätze und liegt bei booking.ts
// Bookings ist die const für Mockdaten und liegt bei mock-bookings.ts

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient:HttpClient) { }

  // ---------------- C.R.U.D OPERATIONEN

//BEI DEM ECHTEM SERVER DER LINK ÄNDERN AUF = "https://www.mein-sewrver.de/api/bookings"
  bookingsUrl :string ="/api/bookings";

// hollt alle Datensätze in dem Fall aus dem Server (imitiertem Server) / Observable sendet an supscribe beim bookings.component
  getBookings() : Observable<Booking[]>{
    var response = this.httpClient.get<Booking[]>(this.bookingsUrl);
    // console.log(response);
    return response;
  }

  // Löscht die Datesätze
  deleteBooking(booking: Booking): Observable<Booking>{
    var response = this.httpClient.delete<Booking>(this.bookingsUrl + "/" + booking.id);
    console.log(response);
    return response;

    var index = Bookings.indexOf(booking);
    // console.log(index, booking.id);
    Bookings.splice(index,1);
  }

  // such ein Datensatz nach id
  getBookingById(id: number) : Observable<Booking> {
    var response = this.httpClient.get<Booking>(this.bookingsUrl + "/" + id);
    return response;
  }

  // Neu Datensatz hinzufügen
  addBooking(booking:Booking) : Observable<Booking> {
    var response = this.httpClient.post<Booking>(this.bookingsUrl, booking);
    return response;
  }

  // Das Update rausgenohmen, weil es 
  // // Datesatz editieren/Update
  // updateBooking(booking: Booking) : void {
  //   //  var currentBooking = this.getBookingById(booking.id);
  //   //  currentBooking = booking;
  // }

  // ----------------ENDE C.R.U.D OPERATIONEN
}
