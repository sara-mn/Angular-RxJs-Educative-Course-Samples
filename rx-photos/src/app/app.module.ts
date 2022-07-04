import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { SavedListComponent } from './saved-list/saved-list.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetryInterceptorService } from './services/retry-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchHeaderComponent,
    ResultsListComponent,
    SavedListComponent,
    EditPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
