import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HostService } from '../services/host.service';

@Component({
  selector: 'app-mesevenements',
  templateUrl: './mesevenements.component.html',
  styleUrls: ['./mesevenements.component.css']
})
export class MesevenementsComponent implements OnInit {

  constructor(private AuthService : AuthService, private host : HostService, private http : HttpClient, private route: Router) { }

  ngOnInit(): void {
    if(!this.AuthService.isConnected()){
      this.route.navigateByUrl('login');
      this.AuthService.msgErr = "Veuillez vous connecter";
    } else {
    this.recupEventOrganisateurs();
    this.recupEventOrganisateursPast();
    }
  }
  eventsOrganisateurs : any;
  eventsOrganisateursPast : any;

  recupEventOrganisateurs() {
    this.http.get(this.host.myDevHost + 'eventorga/'+ this.AuthService.getUserSession().id).subscribe({
      next : (data) => { this.eventsOrganisateurs = data },

    });
  }

  recupEventOrganisateursPast() {
    this.http.get(this.host.myDevHost + 'eventorga/past/'+ this.AuthService.getUserSession().id).subscribe({
      next : (data) => { this.eventsOrganisateursPast = data },

    });
  }

}
