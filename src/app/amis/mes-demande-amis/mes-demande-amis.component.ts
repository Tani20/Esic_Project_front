import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HostService } from 'src/app/services/host.service';

@Component({
  selector: 'app-mes-demande-amis',
  templateUrl: './mes-demande-amis.component.html',
  styleUrls: ['./mes-demande-amis.component.css']
})
export class MesDemandeAmisComponent implements OnInit {
  demandes: any;
  constructor(private http: HttpClient, private host: HostService, public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('login');
      this.authService.msgErr = "Veuillez vous connecter";
    } else {
      this.recupMesAmis();
    }
  }

  recupMesAmis() {
    this.http.get(this.host.myDevHost + 'amis/demande/' + this.authService.getUserSession().id).subscribe({
      next: (data) => { this.demandes = data; },
      error: (err) => { console.log(err); }
    });
  }

  returnImageMascOrFemi(u: any) {
    // let m = 'https://img.freepik.com/free-vector/man-mask-keeping-silence_74855-6562.jpg?w=1380&t=st=1666343632~exp=1666344232~hmac=88ce2e0bb747344ae4bf99f14858d9cdb4dccf9558cdfb22ce711dfdd0021fcd';
    // let f = 'https://img.freepik.com/psd-gratuit/personnage-feminin-3d-ayant-idee_23-2148938893.jpg?w=826&t=st=1666279539~exp=1666280139~hmac=41d51468588bdf4da8a522f3db6788a85e6f4bed924535ca0fbf0374e4a243a6';

    let f = "/assets/1.png";
    let m = "/assets/2.png";
    if (u.sexe == 'M') {
      return m;
    } else {
      return f;
    }
  }
  // /amis/accepter/34
  accepterDemande(val: any) {
    this.http.patch(this.host.myDevHost + 'amis/accepter/' + val.id, null).subscribe({
      next: (data) => { this.ngOnInit() },
      error: (err) => { console.log(err); }
    });
  }


}
