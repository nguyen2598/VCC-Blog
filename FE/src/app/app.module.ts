import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
    declarations: [AppComponent, ErrorPageComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            timeOut: 30000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }), // ToastrModule added
        // AdminModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
