import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GameComponent} from './game/game.component';
import {MatrixService} from './board-item/board.service';
import {BoardItemComponent} from './board-item/board-item.component';
import {LocalStorageModule} from 'angular-2-local-storage';

@NgModule({
  declarations: [
    AppComponent,
     GameComponent,
    BoardItemComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: 'localStorage'
    })
  ],
  providers: [MatrixService],
  bootstrap: [AppComponent]
})
export class AppModule { }
