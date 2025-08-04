import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TiendaComponent } from './tienda.component';
import { CarritoModalComponent } from './carrito-modal.component';

@NgModule({
  declarations: [TiendaComponent, CarritoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: TiendaComponent }])
  ]
})
export class TiendaModule { }
