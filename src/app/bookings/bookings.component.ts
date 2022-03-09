import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  // über den Construktor kann man den service verwenden
  constructor(private bookingService:BookingService) { }
  
  // HIer wird die Array mit null wert initialisiert
   
  bookings : Booking[] = [];

  
// LifeCycle Hook
  ngOnInit(): void {
    this.bookingService.getBookings().subscribe((result) => {
      this.bookings = result;
    });
  }

// Übernimmt das Komando von Button klick, löscht selbst die Datesätze nicht, sondern übergibt das komando an service 
  deleteBooking(booking: Booking) : void {
    this.bookingService.deleteBooking(booking).subscribe();
    
    // !!! hier ist eine Möglichkeit mit Filter zu löschen
    this.bookings = this.bookings.filter(b => b != booking)

    //  !!! Löschen Alternative mit splice
    // var index = this.bookings.indexOf(booking)
    // this.bookings.splice(index,1)
  }

}
