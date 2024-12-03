import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  stripe = Stripe(environment.stripePublishableKey);
    elements: any;
  paymentElement: any;
  displayError: string = '';
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clientSecret: string; amount: number; email: string },
    private dialogRef: MatDialogRef<CheckoutComponent>,
    private reservationService: ReservationService,
    private router: Router // Inject Router service for navigation
  ) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublishableKey);

    if (this.stripe) {
      this.initializePayment();
    } else {
      console.error('Stripe failed to load.');
    }
  }

  async initializePayment(): Promise<void> {
    const appearance = {
      theme: 'stripe',
    };

    this.elements = this.stripe!.elements({ appearance, clientSecret: this.data.clientSecret });

    const paymentElementOptions = {
      layout: 'tabs',
    };

    this.paymentElement = this.elements.create('payment', paymentElementOptions);
    this.paymentElement.mount('#payment-element');

    this.paymentElement.on('change', (event: any) => {
      this.displayError = event.error ? event.error.message : '';
    });
  }

  async handleSubmit(): Promise<void> {
    if (!this.stripe || !this.elements) {
      console.error('Stripe or elements not initialized.');
      return;
    }

    this.isLoading = true;

    const { error, paymentIntent } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
      },
      redirect: 'if_required', // Prevent redirection
    });

    this.isLoading = false;

    if (error) {
      this.displayError = error.message || 'An unexpected error occurred.';
    } else if (paymentIntent?.status === 'succeeded') {
      console.log('Payment processed successfully:', paymentIntent);
      this.dialogRef.close('paymentSuccess'); // Close dialog
      this.router.navigate(['/home']); // Redirect to home
    } else {
      this.displayError = 'Payment not completed. Please try again.';
    }
  }

  closeDialog(): void {
    this.dialogRef.close('paymentCanceled');
  }
}
