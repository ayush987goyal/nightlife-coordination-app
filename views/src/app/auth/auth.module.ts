import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

// import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    // AuthRoutingModule,
    HttpModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class AuthModule { }
