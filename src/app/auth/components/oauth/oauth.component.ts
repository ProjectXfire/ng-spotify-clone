import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
// Services
import { OauthService } from '@app/auth/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
// Components
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-oauth',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './oauth.component.html',
  styleUrl: './oauth.component.css'
})
export class OauthComponent {
  constructor(
    private oauthService: OauthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  @Input() isLoading: boolean = false;

  show(severity: string, summary: string, message: string): void {
    this.messageService.add({ severity, summary, detail: message });
  }

  async withGoogle() {
    const { error, successfulMessage } = await this.oauthService.signInWithGoogle();
    if (error) this.show('error', 'Error', error);
    if (successfulMessage) {
      this.show('success', 'Success', successfulMessage);
      this.router.navigate(['/']);
    }
  }

  async withGithub() {
    const { error, successfulMessage } = await this.oauthService.signInWithGithub();
    if (error) this.show('error', 'Error', error);
    if (successfulMessage) {
      this.show('success', 'Success', successfulMessage);
      this.router.navigate(['/']);
    }
  }
}
