import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private bookindService:BookingService,
    private formbuilder : FormBuilder) { }

  booking: Booking = {
    id: 100,
    name: "Ihre Name",
    roomNumber: 100,
    startDate: new Date(),
    endDate: new Date()
  }

  // für die Validierung der Felder
  bookingForm = this.formbuilder.group({
    id:['', Validators.required],
    name:['', Validators.compose([Validators.required, Validators.minLength(5)])],
    roomNumber:['', Validators.required],
    startDate:['', Validators.required],
    endDate:['', Validators.required]
  });

  // Hollt aus der Id die Daten und setzt es in Felder für editieren ein
    ngOnInit(): void {
    if(this.router.url != '/create'){
    var id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookindService.getBookingById(id).subscribe((result) => {
      this.booking = result;
      this.bookingForm.setValue(
        {
          id: this.booking.id,
          roomNumber: this.booking.roomNumber,
          name: this.booking.name,
          startDate: this.booking.roomNumber,
          endDate: this.booking.endDate 
        }
      );
    });
    
    }
  }
// Dependency Injection (DI)
// Methode sendet ein Auftrag an servise neu Datesatz ins Demo Daten LIste zu speichern 
// und danach leitet den benutzer (mit this.router.... zur Liste zurück) 
  save(): void {

    // hier weisen wir den bookingForm die vorausgesetzte Werte zu
    this.booking.id = this.bookingForm.get('id')?.value
    this.booking.name = this.bookingForm.get('name')?.value
    this.booking.roomNumber = this.bookingForm.get('roomNumber')?.value
    this.booking.startDate = this.bookingForm.get('startDate')?.value
    this.booking.endDate = this.bookingForm.get('endDate')?.value

    // hiermit wird das komando puschen an servise weitergeleitet.
    this.bookindService.addBooking(this.booking).subscribe();    
    this.router.navigate(['bookings']);
}

// Dependency Injection
// Methode beim Edit setzt neu Datum wenn es geändert wurde.
  dateChanged(event: Event, isStart: boolean){
    var val = (event.target as HTMLInputElement).value;

    if(isStart){
      this.booking.startDate = new Date(val);
      } else{
        this.booking.endDate = new Date(val);
      } 
  }   

}
