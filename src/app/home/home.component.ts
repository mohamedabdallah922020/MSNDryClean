import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../_services/user.service';
import { Area } from '../_services/area';


interface Country {
  CountryId: string;
  CountryName: string;
}
interface State {
  StateId: string;
  StateName: string;
  CountryId: string;
}
interface City {
  Cityid: string;
  CityName: string;
  StateId: string;
  CountryId: string;
}
interface DryClean {
  arabicArea: string;
  englishArea: string;
  arabicName: string;
  englishName: string;
  arabicAddress: string;
  englishAddress: string;
  mobileNumber: string;
  latitude: string;
  longitude: string;
  areaId: Number;
  id:Number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSaved = false;
  DryCleanForm: any;
   dataSource!: MatTableDataSource<DryClean>;
  employeeIdUpdate = null;
  massage = null;
   allAreas!: Observable<Area[]>;
   areaFilter = "0";

  
  areaId = 0;
  StateId = null;
  CityId = null;
  SelectedDate = null;
  isMale = true;
  isFeMale = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['ArabicArea','EnglishArea','ArabicName','EnglishName','ArabicAddress','EnglishAddress','MobileNumber','Latitude','Longitude','Edit','Delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dryCleanIdUpdate: Number = 0;


  constructor(private formbulider: FormBuilder,private userService:UserService,private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.userService.getPublicContent().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.area.id == filter;
             };
    });
  }

  ngOnInit() {
    this.DryCleanForm = this.formbulider.group({
      areaId: ['', [Validators.required]],
      arabicName: ['', [Validators.required]],
      englishName: ['', [Validators.required]],
      arabicAddress: ['', [Validators.required]],
      englishAddress: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
    });
    this.FillAreaDDL();
    this.loadAllData();
   
  }

 
  applyFilter(filterValue:Number) {
    if(+filterValue)
    {
    this.dataSource.filter = filterValue.toString();
  }
  else
  {
    this.dataSource.filter = '';
  }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllData() {
    this.areaFilter = "0";
    this.userService.getPublicContent().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.area.id == filter;
       };
    });
  }
  onFormSubmit() {
    this.dataSaved = false;
    const dryClean = this.DryCleanForm.value;
    this.createLaundry(dryClean);
  }
  loadLaundryToEdit(laundryId: string) {
    this.userService.getLaundryById(laundryId).subscribe(laundry => {
      this.massage = null;
      this.dataSaved = false;
      this.dryCleanIdUpdate = laundry.id;
      this.DryCleanForm.controls['arabicName'].setValue(laundry.arabicName);
      this.DryCleanForm.controls['englishName'].setValue(laundry.englishName);
      this.DryCleanForm.controls['arabicAddress'].setValue(laundry.arabicAddress);
      this.DryCleanForm.controls['englishAddress'].setValue(laundry.englishAddress);
      this.DryCleanForm.controls['mobileNumber'].setValue(laundry.mobileNumber);
      this.DryCleanForm.controls['latitude'].setValue(laundry.latitude);
      this.DryCleanForm.controls['longitude'].setValue(laundry.longitude);
      this.DryCleanForm.controls['areaId'].setValue(laundry.areaId);
      window.scroll(0,0);
    });

  }
  createLaundry(dryClean: DryClean) {
    if (!this.dryCleanIdUpdate) {
      this.userService.createLaundry(dryClean).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(1);
          this.loadAllData();
          this.dryCleanIdUpdate = 0;
          this.DryCleanForm.reset();
        }
      );
    } else {
      dryClean.id = this.dryCleanIdUpdate;
      this.userService.updateLaundry(dryClean).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(0);
        this.loadAllData();
        this.dryCleanIdUpdate = 0;
        this.DryCleanForm.reset();
      });
    }
  }
  deleteById(lauadryId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.userService.deleteById(lauadryId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadAllData();
        this.employeeIdUpdate = null;
        this.DryCleanForm.reset();

      });
    }

  }

  FillAreaDDL() {
    this.allAreas = this.userService.getAreas();
  
  }


  resetForm() {
    this.DryCleanForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllData();
  }

  SavedSuccessful(isUpdate:Number) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}