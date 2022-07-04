import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {PhotoService} from '../photo.service';
import {IPhoto} from '../types';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.scss']
})
export class SavedListComponent implements OnInit {
  photos$: Observable<IPhoto[]> = new Observable();

  constructor(public photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.photos$ = this.photoService.getSavedPhotos();
  }

}
