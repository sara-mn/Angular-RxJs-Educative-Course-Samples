import {Component, OnInit} from '@angular/core';
import {mergeMap, switchMap} from 'rxjs';
import {PhotoService} from '../photo.service';
import {IPhoto} from '../types';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {
  photos: IPhoto[] = [];

  constructor(public photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.photoService.latestPhotos
      .subscribe((photos: IPhoto[]) => this.photos = photos)
  }

  onSaveClick(photo: IPhoto, tagName?: string): void {
    const cmd: IPhoto = {
      url: photo.url,
      id: photo.id,
      tags: photo?.tags || []
    };

    if (tagName) {
      // @ts-ignore
      cmd?.tags.push(tagName)
    }

    this.photoService.editPhoto(photo.id, cmd)
      .subscribe()
  }

  hasSavedTag(photo: any) {
    return !(!photo.tags || !photo.tags.length || !photo.tags.includes('savedTag'))
  }
}
