import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car';
import { Document } from 'src/app/models/Document';
import { CarService } from 'src/app/services/car/car.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-driver-documents',
  templateUrl: './driver-documents.component.html',
  styleUrls: ['./driver-documents.component.css'],
})
export class DriverDocumentsComponent implements OnInit {
  car: Partial<Car> = {};
  selectedFile: File | null = null;
  cars: Car[] = [];
  documents: Document[] = [];
  user: User | null = null;
  errorMessage = '';
  isLoading = true;

  constructor(
    private carService: CarService,
    private documentService: DocumentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadConnectedUser();
  }

  private loadConnectedUser(): void {
    this.isLoading = true;
    this.userService.getUserByMail().subscribe(
      (user: User) => {
        this.user = user;
        if (this.user?.id) {
          this.loadUserCars(this.user.id);
          this.loadUserDocuments(this.user.id);
        } else {
          this.handleError('User ID is missing.');
        }
      },
      (err: HttpErrorResponse) => this.handleError('Failed to fetch user.', err)
    );
  }

  private loadUserCars(userId: number): void {
    this.carService.getCarByUserId(userId).subscribe(
      (cars: Car[]) => {
        this.cars = cars;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => this.handleError('Failed to fetch cars.', err)
    );
  }

  private loadUserDocuments(userId: number): void {
    this.documentService.getDocumentsByUserId(userId).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => this.handleError('Failed to fetch documents.', err)
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadDocument(): void {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    if (!this.user || !this.user.id) {
      alert('Utilisateur introuvable.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', 'Permis de conduire');
    formData.append('userId', this.user.id.toString());

    this.documentService.uploadDocument(formData).subscribe({
      next: () => {
        alert('Document téléchargé avec succès !');
        this.loadUserDocuments(this.user!.id); // Reload documents after successful upload
        this.selectedFile = null; // Reset file after successful upload
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 200) {
          alert('Document téléchargé avec succès.');
          this.loadUserDocuments(this.user!.id);
          this.selectedFile = null;
        } else {
          this.handleError('Échec du téléchargement du document.', err);
        }
      },
    });
  }

  downloadDocument(documentId: number, title: string): void {
    this.documentService.downloadDocument(documentId).subscribe({
      next: (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${title}.pdf`;
        link.click();
        window.URL.revokeObjectURL(link.href);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to download document.', err);
        this.errorMessage = 'Failed to download document.';
      },
    });
  }
  
  addCar(): void {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs de la voiture.');
      return;
    }

    if (!this.user || !this.user.id) {
      alert('Utilisateur introuvable.');
      return;
    }

    this.car.user = this.user;

    this.carService.createCar(this.car as Car).subscribe(
      () => {
        alert('Voiture ajoutée avec succès !');
        this.loadUserCars(this.user!.id);
        this.car = {};
      },
      (err: HttpErrorResponse) => this.handleError('Échec de l’ajout de la voiture.', err)
    );
  }

  isFormValid(): boolean {
    return !!(
      this.car.manufacturer &&
      this.car.model &&
      this.car.number_of_seats &&
      this.car.color &&
      this.car.licence_plate
    );
  }

  private handleError(message: string, error?: HttpErrorResponse): void {
    console.error(message, error || '');
    this.errorMessage = message;
    this.isLoading = false;
  }
}
