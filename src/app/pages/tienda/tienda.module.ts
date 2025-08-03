import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TiendaComponent } from './tienda.component';
import { CarritoModalComponent } from './carrito-modal.component';

@NgModule({
  declarations: [TiendaComponent, CarritoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TiendaComponent }])
  ]
})
export class TiendaModule { }
