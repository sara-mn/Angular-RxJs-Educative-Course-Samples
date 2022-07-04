import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpService} from './services/http.service';
import {IPhoto} from './types';

@Injectable({
  providedIn: 'root' //Providing a service in root means that the entire application can access a single, shared instance of this service (and is the default option).
})
export class PhotoService {
  api_endpoint: string = 'photos';
  latestPhotos = new BehaviorSubject<IPhoto[]>([]);

  constructor(private httpService: HttpService) {
  }

  getAllPhotos(): Observable<IPhoto[]> {
    return this.httpService.get<IPhoto[]>(this.api_endpoint);
  }

  getPhotoById(id: string): Observable<any> {
    return this.httpService.get<any>(`${this.api_endpoint}/${id}`);
  }

  searchPhotos(key: string): Observable<IPhoto[]> {
    return this.httpService.get<IPhoto[]>(`${this.api_endpoint}/search/${key}`);
  }

  getSavedPhotos() {
    return this.httpService.get<IPhoto[]>(`${this.api_endpoint}/saved/all`);
  }

  editPhoto(id: number, cmd: IPhoto) {
    return this.httpService.put<string>(`${this.api_endpoint}/${id}`, cmd);
  }
}
