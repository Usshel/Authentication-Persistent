import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoggedInComponent } from './logged-in.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [MatCardModule, CommonModule],
  declarations: [LoggedInComponent],
  providers: [],
  exports: [LoggedInComponent]
})
export class LoggedInComponentModule {
}
