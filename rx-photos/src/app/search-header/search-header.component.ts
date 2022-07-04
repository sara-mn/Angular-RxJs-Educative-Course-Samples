import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {catchError, debounceTime, filter, switchMap,tap } from 'rxjs';
import { PhotoService } from '../photo.service';
import { IPhoto } from '../types';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

  searchQuery = new FormControl();
  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(333),
        filter(Boolean),
        tap( (r:any) => console.log(r)),
        switchMap((key) => this.photoService.searchPhotos(key)),
        catchError((err, obs$) => obs$)
      )
      .subscribe((photoList: IPhoto[]) => this.photoService.latestPhotos.next(photoList));
  }

}
