import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stripe, loadStripe, Appearance } from '@stripe/stripe-js';
import { environment } from 'environments/environment';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  stripe!: Stripe | null;
  cardElement: any;
  elements!: any;
  displayError: any;
  isFormValid: boolean = false;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: number; clientSecret: string; amount: number; email: string },
    private dialogRef: MatDialogRef<CheckoutComponent>,
    private reservationService: ReservationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublishableKey);

    if (this.stripe) {
      this.setupStripePaymentForm();
    } else {
      console.error('Stripe failed to load.');
    }
  }

  private setupStripePaymentForm() {
    const appearance: Appearance = {
      theme: 'flat',
      labels: 'floating',
    };
    this.elements = this.stripe!.elements({ appearance });
    this.cardElement = this.elements.create('card');
    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event: any) => {
      this.displayError = document.getElementById('card-errors');
      if (event.error) {
        this.displayError.textContent = event.error.message;
        this.isFormValid = false;
      } else {
        this.displayError.textContent = '';
        this.isFormValid = true;
      }
    });
  }

  payBill(): void {
    if (!this.isFormValid) {
      return;
    }

    this.isLoading = true;

    this.stripe!.confirmCardPayment(this.data.clientSecret, {
      payment_method: {
        card: this.cardElement,
        billing_details: {
          email: this.data.email,
        },
      },
    }).then((result) => {
      this.isLoading = false;

      if (result.error) {
        this.displayError.textContent = result.error.message;
      } else {
        this.reservationService.confirmPayment(this.data.reservationId, result.paymentIntent.id).subscribe(
          (response: any) => {
            console.log('Payment confirmed:', response.message); 
            this.dialogRef.close('paymentSuccess');
          },
          (error) => {
            console.error('Error confirming payment:', error);
          }
        );
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close('paymentCanceled');
  }
}
