import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { APP_NAME } from '@shared/contants';
// Services
import { CredentialsService } from '@app/auth/services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
// Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OauthComponent, NavigateComponent } from '@app/auth/components';
import { DividerComponent, InputErrorComponent } from '@shared/components';

const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    OauthComponent,
    DividerComponent,
    InputErrorComponent,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    NavigateComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private credentialsService: CredentialsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  name = APP_NAME;
  isLoading = false;

  signUpForm = new FormGroup({
    displayName: new FormControl({ value: '', disabled: false }, [Validators.required]),
    email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
    password: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.pattern(StrongPasswordRegx)
    ])
  });

  get displayName() {
    return this.signUpForm.get('displayName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  disableAllInputs() {
    this.isLoading = true;
    this.signUpForm.get('displayName')?.disable();
    this.signUpForm.get('email')?.disable();
    this.signUpForm.get('password')?.disable();
  }

  enableAllInputs() {
    this.isLoading = false;
    this.signUpForm.get('displayName')?.enable();
    this.signUpForm.get('email')?.enable();
    this.signUpForm.get('password')?.enable();
  }

  show(severity: string, summary: string, message: string): void {
    this.messageService.add({ severity, summary, detail: message });
  }

  async onSubmit(): Promise<void> {
    this.disableAllInputs();
    if (!this.signUpForm.invalid) {
      const { displayName, email, password } = this.signUpForm.value;
      const { error, successfulMessage } = await this.credentialsService.signUpWithCredentials({
        displayName: displayName!,
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
      this.signUpForm.markAllAsTouched();
    }
  }
}
