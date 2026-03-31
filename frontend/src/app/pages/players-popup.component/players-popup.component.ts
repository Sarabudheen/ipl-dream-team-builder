import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSquad } from '../../models/players.model';
import { IplTeam } from '../../models/ipl-team.model';

@Component({
  selector: 'app-players-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-popup.component.html',
  styleUrl: './players-popup.component.scss',
})
export class PlayersPopupComponent {
  @Input() selectedTeam: IplTeam | null = null;
  @Input() selectedTeamSquad: TeamSquad | null = null;
}
