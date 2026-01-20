import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterImports } from '@libs/ui/sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecrfab';
}
