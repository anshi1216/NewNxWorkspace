import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterModule, FormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'bookingApplication';
  booking = { name: '', event: '', date: '' };
  successMessage = '';
  bookings: any[] = [];
  apiUrl = 'http://localhost:3000/api/tickets'; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getBookingHistory();
  }

  onSubmit() {
    this.http.post(this.apiUrl, this.booking).subscribe({
      next: () => {
        this.successMessage = 'Ticket booked successfully!';
        this.booking = { name: '', event: '', date: '' };
        this.getBookingHistory();
      },
      error: () => {
        this.successMessage = 'Booking failed. Please try again.';
      }
    });
  }

  getBookingHistory() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.bookings = data,
      error: () => this.bookings = []
    });
  }
}
