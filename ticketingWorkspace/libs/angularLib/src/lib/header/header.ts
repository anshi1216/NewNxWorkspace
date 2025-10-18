import { Component } from '@angular/core';
import { TEXT } from '@ticketing-workspace/shared-utilities'

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  text = TEXT
}
