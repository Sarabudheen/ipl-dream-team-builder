import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
import { TEAMS, IplTeam } from '../../models/ipl-team.model';
import { getTeamPlayers, TeamSquad } from '../../models/players.model';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-spin-wheel',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './spin-wheel.component.html',
  styleUrl: './spin-wheel.component.scss',
})
export class SpinWheelComponent implements AfterViewInit {
  @ViewChild('wheelCanvas', { static: false }) wheelCanvas!: ElementRef<HTMLCanvasElement>;

  teams = TEAMS;
  isSpinning = false;
  selectedTeam: IplTeam | null = null;
  selectedTeamSquad: TeamSquad | null = null;
  displayModal = false;
  
  private ctx: CanvasRenderingContext2D | null = null;
  private wheelRotation = 0;
  private canvasSize = 500;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called, isBrowser:', isPlatformBrowser(this.platformId));
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initializeWheel(), 100);
    }
  }

  private initializeWheel(): void {
    try {
      const canvas = this.wheelCanvas.nativeElement;
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }
      
      canvas.width = this.canvasSize;
      canvas.height = this.canvasSize;
      this.ctx = canvas.getContext('2d');
      
      console.log('✅ Spin Wheel Initialized');
      console.log('Total teams:', this.teams.length);
      
      this.drawWheel();
    } catch (error) {
      console.error('Error initializing wheel:', error);
    }
  }

  private drawWheel(): void {
    if (!this.ctx) {
      console.error('No canvas context');
      return;
    }

    const ctx = this.ctx;
    const centerX = this.canvasSize / 2;
    const centerY = this.canvasSize / 2;
    const radius = this.canvasSize / 2 - 10;
    const sliceAngle = (2 * Math.PI) / this.teams.length;

    // Clear canvas with dark background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);

    // Apply rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.wheelRotation);
    ctx.translate(-centerX, -centerY);

    // Draw each team slice
    for (let i = 0; i < this.teams.length; i++) {
      const team = this.teams[i];
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      const midAngle = (startAngle + endAngle) / 2;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = team.color;
      ctx.fill();

      // Draw border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw team abbreviation
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(midAngle);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = team.textColor || '#ffffff';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(team.abbr, radius - 40, 0);
      ctx.restore();
    }

    ctx.restore();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffd700';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }

  spinWheel(): void {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.selectedTeam = null;
    this.selectedTeamSquad = null;
    this.displayModal = false;
    this.cdr.detectChanges();

    const spinDuration = 4000 + Math.random() * 2000;
    const rotations = 5 + Math.random() * 5;
    const finalAngle = Math.random() * 2 * Math.PI;
    const totalRotation = rotations * 2 * Math.PI + finalAngle;
    
    console.log('🎡 SPIN START - Duration:', spinDuration + 'ms, Rotations:', rotations);

    let startTime: number | null = null;
    
    const animateSpin = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      this.wheelRotation = totalRotation * easeProgress;

      this.drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        this.ngZone.run(() => {
          console.log('🎡 SPIN COMPLETE');
          this.isSpinning = false;
          this.showSelectedTeam();
          this.cdr.detectChanges();
        });
      }
    };

    requestAnimationFrame(animateSpin);
  }

  private showSelectedTeam(): void {
    const normalizedRotation = ((this.wheelRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const sliceAngle = (2 * Math.PI) / this.teams.length;
    const pointerAngle = (3 * Math.PI) / 2;
    
    const rotatedPointerAngle = (pointerAngle - normalizedRotation + 2 * Math.PI) % (2 * Math.PI);
    let teamIndex = Math.floor(rotatedPointerAngle / sliceAngle) % this.teams.length;
    
    console.log('Team index:', teamIndex, 'Angle:', (normalizedRotation * 180) / Math.PI, '°');
    
    this.selectedTeam = this.teams[teamIndex];
    console.log('👑 Selected Team:', this.selectedTeam?.name, '(' + this.selectedTeam?.abbr + ')');
    
    this.selectedTeamSquad = getTeamPlayers(this.selectedTeam.abbr) || null;
    
    if (this.selectedTeamSquad) {
      console.log('✅ Squad loaded:', 
        this.selectedTeamSquad.batters?.length || 0, 'batters,',
        this.selectedTeamSquad.allRounders?.length || 0, 'all-rounders,',
        this.selectedTeamSquad.bowlers?.length || 0, 'bowlers');
    }
    
    this.displayModal = true;
  }
}

