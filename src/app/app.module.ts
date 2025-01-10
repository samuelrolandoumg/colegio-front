import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TareasAsignadasComponent } from './components/tareas-asignadas/tareas-asignadas.component';
import { EntregarTareaComponent } from './components/entregar-tarea/entregar-tarea.component';
import { GruposClasesComponent } from './components/grupos-clases/grupos-clases.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe'; // Asegúrate de que la ruta sea correcta
import { RevisarTareaComponent } from './components/revisar-tarea/revisar-tarea.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TareasAsignadasComponent,
    EntregarTareaComponent,
    GruposClasesComponent,
    TareasComponent,
    SafeUrlPipe,
    RevisarTareaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule, // Importa CommonModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
