import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HostService } from '../services/host.service';

@Component({
  selector: 'app-modif-compte-orga',
  templateUrl: './modif-compte-orga.component.html',
  styleUrls: ['./modif-compte-orga.component.css']
})
export class ModifCompteOrgaComponent implements OnInit {

  connectedAccount: any;
  user: any;
  msg: any;

  regexTel = new RegExp('(0|\\+33|0033)[1-9][0-9]{8}?$');
  regexMail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  regexPw = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\.!@#$%^&*])(?=.{8,})");

  msgTelIncorrect = "Le format du numéro de téléphone est incorrect";
  msgEmailIncorrect = "Le format de l'email est incorrect";
  msgPSWIncorrect = "Le format du mot de passe est incorrect : il doit contenir au moins 8 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial";

  constructor(private http: HttpClient, private route: Router, public authService: AuthService, private host: HostService) { }

  ngOnInit(): void {
    if(!this.authService.isConnected()){
      this.route.navigateByUrl('login');
      this.authService.msgErr = "Veuillez vous connecter";
    } else {
    this.connectedAccount = this.authService.getUserSession();
    }
  }

  modificationOrganisateur() {

    this.connectedAccount = this.authService.getUserSession();

    if (!this.regexTel.test(this.connectedAccount.tel)) {
      this.authService.msgErr = this.msgTelIncorrect;
    }
    if (!this.regexMail.test(this.connectedAccount.email)) {
      this.authService.msgErr = this.msgEmailIncorrect;
    }
    if (!this.regexPw.test(this.connectedAccount.password)) {
      this.authService.msgErr = this.msgPSWIncorrect;
    }

    if (this.regexTel.test(this.connectedAccount.tel) &&
      this.regexMail.test(this.connectedAccount.email) &&
      this.regexPw.test(this.connectedAccount.password)) {
      this.http.put(this.host.myDevHost + 'modif/orga/' + this.authService.getUserSession().login, this.connectedAccount).subscribe({
        next: (data) => {
          this.authService.setUserInSession(this.connectedAccount);
          this.authService.msgErr = "";
          this.authService.msgOK = "Modification réussie";
        },
      })
    }

  };
}
