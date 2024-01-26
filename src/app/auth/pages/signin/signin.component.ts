import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { APP_NAME } from '@shared/contants';
// Services
import { CredentialsService } from '@app/auth/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
// Components
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerComponent, InputErrorComponent } from '@shared/components';
import { OauthComponent, NavigateComponent } from '@app/auth/components';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerComponent,
    OauthComponent,
    NavigateComponent,
    InputErrorComponent
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(
    private credentialsService: CredentialsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  name = APP_NAME;
  isLoading = false;

  signInForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
    password: new FormControl({ value: '', disabled: false }, [Validators.required])
  });

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  show(severity: string, summary: string, message: string): void {
    this.messageService.add({ severity, summary, detail: message });
  }

  disableAllInputs() {
    this.isLoading = true;
    this.signInForm.get('email')?.disable();
    this.signInForm.get('password')?.disable();
  }

  enableAllInputs() {
    this.isLoading = false;
    this.signInForm.get('email')?.enable();
    this.signInForm.get('password')?.enable();
  }

  async onSubmit(): Promise<void> {
    if (!this.signInForm.invalid) {
      const { email, password } = this.signInForm.value;
      this.disableAllInputs();
      const { error, successfulMessage } = await this.credentialsService.signInWithCredentials({
        email: email!,
        password: password!
      });
      if (error) this.show('error', 'Error', error);
      if (successfulMessage) {
        this.show('success', 'Success', successfulMessage);
        this.router.navigate(['/']);
      }
      this.enableAllInputs();
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
