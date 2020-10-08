import { Component, AfterViewInit,Renderer2,AfterContentChecked } from '@angular/core';
import { AuthenticationService } from './authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,AfterContentChecked {
  constructor(public auth: AuthenticationService,private renderer: Renderer2) { }
  ngAfterViewInit() {
    // console.log("indisde")
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');

  }
  ngAfterContentChecked() {
    // console.log("indisde2")
    // let loader = this.renderer.selectRootElement('#loader');
    // this.renderer.setStyle(loader, 'display', 'none');

  }
}
