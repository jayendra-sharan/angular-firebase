import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appTitle = "Jay XI Dot Com"

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
