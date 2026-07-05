import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service'; // Ajusté la ruta según tu estructura
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/models/auth.interface';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  cargando = false;
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required], // Cambiado 'contrasena' por 'password' para que coincida con el DTO
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    // Preparamos el objeto según la interfaz LoginRequest
    const credenciales: LoginRequest = this.loginForm.value;

    this.authService.login(credenciales).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.cargando = false;

        // El token ya se guardó en el Service gracias al 'tap'

        this.mensaje = '¡Bienvenido!';
        setTimeout(() => {
          this.router.navigate(['/gestion']);
        }, 500);
      },
      error: (error) => {
        this.cargando = false;
        // Tu backend devuelve error.message según vimos en el controlador
        this.mensaje = error.error.message || 'Error al conectar con el servidor';
      },
    });
  }
}
