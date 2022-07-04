import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRequest} from './http.type';
import {_Object} from '../types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  main_url: string = 'http://localhost:8002';
  options = {};

  constructor(private http: HttpClient) {
  }

  get<T>(url: string, data?: any, options?: IRequest): Observable<T> {
    this.options = {
      params: this.getParams(data),
      headers: this.getHeaders(options?.headers)
    }
    return this.http.get<T>(`${this.main_url}/${url}`, options)
  }

  post<T>(url: string, data: any, options?: IRequest): Observable<T> {
    this.options = {
      params: {},
      headers: this.getHeaders(options?.headers),
    };
    return this.http.post<T>(`${this.main_url}/${url}`, data, this.options);
  }

  put<T>(url: string, data: any, options?: IRequest): Observable<T> {
    this.options = {
      params: {},
      headers: this.getHeaders(options?.headers),
      body: data,
    };
    return this.http.put<T>(`${this.main_url}/${url}`, data, this.options);
  }

  delete<T>(url: string, options?: IRequest): Observable<T> {
    this.options = {
      params: {},
      headers: this.getHeaders(options?.headers),
    };
    return this.http.delete<T>(`${this.main_url}/${url}`, this.options)
  }

  getHeaders(headers?: _Object) {
    const _headers = new HttpHeaders(headers);
    _headers.append("access-control-allow-credentials", "true");
    _headers.append("cross-origin-resource-policy", "cross-origin");
    return _headers;
  }

  getParams(params?: any) {
    return new HttpParams(Object.assign({}, params));
  }
}

interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  params?: HttpParams | { [param: string]: string | number | boolean | readonly(string | number | boolean)[] };
  context?: HttpContext;
  observe?: "body" | "events" | "response";
  reportProgress?: boolean;
  responseType?: "arraybuffer" | "blob" | "text" | "json";
  withCredentials?: boolean;
}
