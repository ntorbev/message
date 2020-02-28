import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ErrorComponent } from './error/error.component';
import { MessageRoomComponent } from './message-room/message-room.component';


const routes: Routes = [
  {path: '', component: MessageRoomComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorComponent},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
