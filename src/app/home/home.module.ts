import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePageRoutingModule } from './home-routing.module';
import { ClickOutsideDirective } from '../directive/click-outside.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
   DragDropModule
  ],
  declarations: [HomePage, ClickOutsideDirective]
})
export class HomePageModule {}
