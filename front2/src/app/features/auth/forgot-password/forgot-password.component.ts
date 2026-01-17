import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
    email: string = '';
    loading: boolean = false;
    submitted: boolean = false;
    errorMessage: string = '';

    constructor(private http: HttpClient) { }

    onSubmit() {
        if (!this.email) return;

        this.loading = true;
        this.errorMessage = '';

        // Mock API call - this should be your Spring Boot endpoint
        this.http.post('http://localhost:9002/sahtek_db/sahtek_db/api/users/forgot-password', { email: this.email })
            .subscribe({
                next: () => {
                    this.loading = false;
                    this.submitted = true;
                },
                error: (err) => {
                    this.loading = false;
                    this.errorMessage = "Une erreur est survenue ou l'email est inconnu. Veuillez réesayer.";
                    console.error('Forgot password error', err);
                }
            });
    }
}
