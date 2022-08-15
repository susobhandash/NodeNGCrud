import { Component } from '@angular/core';
import { UtilService } from './util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Node-Crud';

  constructor (
    private util: UtilService
  ) {
    this.getAllRecords();
  }

  getAllRecords() {
    this.util.getAll().subscribe(res => {
      console.log(res);
    });
  }
}
