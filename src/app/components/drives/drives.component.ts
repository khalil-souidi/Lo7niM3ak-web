import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drive } from 'src/app/models/Drives';
import { DrivesService } from 'src/app/services/drives-service.service';

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrls: ['./drives.component.css']
})
export class DrivesComponent implements OnInit {
  drives: Drive[] = [];
  filteredDrives: Drive[] = [];
  depart: string = '';
  destination: string = '';

  constructor(private drivesService: DrivesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.depart = params['depart'] || '';
      this.destination = params['destination'] || '';
      this.fetchDrives();
    });
  }

  fetchDrives(): void {
    this.drivesService.getAllDrives().subscribe(drives => {
      this.drives = drives;
      this.filterDrives();
    });
  }

  filterDrives(): void {
    this.filteredDrives = this.drives.filter(drive =>
      drive.pickup.toLowerCase() === this.depart.toLowerCase() &&
      drive.destination.toLowerCase() === this.destination.toLowerCase()
    );
  }
}
