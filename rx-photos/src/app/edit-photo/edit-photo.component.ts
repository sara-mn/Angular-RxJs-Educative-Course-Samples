import {Component, Input, OnInit} from '@angular/core';
import {catchError, Observable, switchMap, tap, throwError} from 'rxjs';
import {PhotoService} from '../photo.service';
import {IPhoto} from '../types';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit {
  photo$: Observable<any> = new Observable();
  tagInput: string = '';
  saving: boolean = false;
  obs$: Observable<any> = new Observable();

  constructor(private photosService: PhotoService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.photo$ = this.route.paramMap.pipe(
      tap(console.log),
      switchMap((params: ParamMap) => {
        console.log(params);
        const id = params.get('photoId');
        if (id)
          this.obs$ = this.photosService.getPhotoById(id);
        return this.obs$;
      }),
      catchError((err, obs$) => obs$)
    )
  }

  addTag(photo:any) {
    photo.tags.push(this.tagInput);
    this.tagInput = '';
  }

  savePhoto(photo: IPhoto) {
    this.saving = true;
    this.photosService.editPhoto(photo.id, photo)
      .subscribe({
        complete: () => this.saving = false
      });
  }

}
