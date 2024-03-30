import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isFaculty: boolean;
  selectedBar: string = '1';
  accountPath: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.accountPath = this.route.snapshot.url[0].path;
    this.isFaculty = this.accountPath === "faculty";
  }

  ngOnInit() {
    console.log("I am at the navbar");
  }

  onSelect(index: number) {
    this.selectedBar = index + "";
    console.log(this.selectedBar);
  }


  logout() {
    this.auth.flushToken();
    this.router.navigate(['/']);
    this.messageService.sendMessage("Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3'03' tall and 63.9 pounds. this means they're large enough to be able to handle human dicks, and with their impressive Base stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there's no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll eyes, Captivate, Charm and Tail Whip along with not having fur to hide nipples, so it'd be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close with this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat + high HP pool + Acid Armor means it can take cock all day, all shapes and sizes and still come for more.", 1)
  }
}
