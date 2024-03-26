import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { lucideArrowRight, lucideAudioWaveform, lucideMenu } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'uis-home',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  viewProviders: [provideIcons({ lucideAudioWaveform, lucideArrowRight, lucideMenu })]
})
export class HomeComponent {}
