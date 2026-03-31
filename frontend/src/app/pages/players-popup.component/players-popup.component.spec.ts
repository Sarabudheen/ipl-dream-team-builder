import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersPopupComponent } from './players-popup.component';
import { TEAMS } from '../../models/ipl-team.model';
import { getTeamPlayers } from '../../models/players.model';

describe('PlayersPopupComponent', () => {
  let component: PlayersPopupComponent;
  let fixture: ComponentFixture<PlayersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display team information when team is provided', () => {
    component.selectedTeam = TEAMS[0];
    component.selectedTeamSquad = getTeamPlayers(TEAMS[0].abbr);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.popup-header')).toBeTruthy();
  });

  it('should not display popup when no team is selected', () => {
    component.selectedTeam = null;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.players-popup-container')).toBeFalsy();
  });
});
