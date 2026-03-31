import { Routes } from '@angular/router';
import { SpinWheelComponent } from './pages/spin-wheel.component/spin-wheel.component';

export const routes: Routes = [
  { path: '', component: SpinWheelComponent },
  { path: 'spin', component: SpinWheelComponent }
];
