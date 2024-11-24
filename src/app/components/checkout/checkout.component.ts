// import { Component, Inject, OnInit } from '@angular/core';
// import { CheckoutService } from "../../services/checkout.service";
// import { environment } from '../../../../environments/environment';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit {
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   // stripe = Stripe(environment.stripePublishableKey);
//   // cardElement: any;
//   // displayError: any;
//   // elements!: any;
//   // otpMsg!: string;
//   // isFormValid: boolean = false; // Add a flag to track form validity

//   // constructor(
//   //   private checkoutService: CheckoutService,
//   //   public dialogRef: MatDialogRef<CheckoutComponent>,
//   //   @Inject(MAT_DIALOG_DATA) public data: {secretKey : string, phone: string},  private dialog: MatDialog,
//   // ) {}

//   // ngOnInit(): void {
//   //   console.log('phone ' + this.data.phone);
//   //   console.log('secret  ' + this.data.secretKey);
    
//   //   if (this.data.secretKey) {
//   //     this.setupStripePaymentForm();
//   //   }
//   // }

//   // private setupStripePaymentForm() {
//   //   const appearance = {
//   //     theme: 'night',
//   //     labels: 'floating'
//   //   };
//   //   this.elements = this.stripe.elements({ clientSecret: this.data.secretKey, appearance: appearance });
//   //   this.cardElement = this.elements.create('payment');
//   //   this.cardElement.mount('#card-element');
//   //   this.cardElement.on('change', (event: any) => {
//   //     this.displayError = document.getElementById('card-errors');

//   //     if (event.complete) {
//   //       this.displayError.textContent = "";
//   //       this.isFormValid = true; // Mark form as valid if complete
//   //     } else if (event.error) {
//   //       this.displayError.textContent = event.error.message;
//   //       this.isFormValid = false; // Mark form as invalid if there's an error
//   //     }
//   //   });
//   // }


//   // payBill() {
//   //   if (!this.isFormValid) {
//   //     console.log('Form is invalid. Please fix the errors before proceeding.');
//   //     return;
//   //   }

//   //   const phoneNumber = this.data.phone;
//   //   this.checkoutService.payBill({ phone: phoneNumber }).subscribe(response => {
//   //     console.log('paybill response: ' + response?.message);
//   //     this.dialog.open(OtpVerificationComponent, {
//   //       data: { stripe: this.stripe, elements: this.elements, phone: phoneNumber },
//   //       width: '800px',
//   //       height: '500px',
//   //       disableClose: true
//   //     });
//   //   });
//   // }

//   // closeDialog(){
//   //   this.dialogRef.close();
//   //   this.checkoutService.deleteBill().subscribe();
//   // }

// }
