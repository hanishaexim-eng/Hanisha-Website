import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// In dev, ng serve proxies /api to http://localhost:3000. Backend must be running (cd server && npm start).
const API_URL = '/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  navOpen = false;
  formSuccess = false;
  formError = '';
  formSubmitting = false;
  contact = { name: '', email: '', subject: '', message: '' };
  whyUsExpanded = true;
  currentLang = 'en';
  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'es', label: 'Español' },
    { code: 'ar', label: 'العربية' },
    { code: 'zh', label: '中文' },
    { code: 'fr', label: 'Français' },
  ];

  constructor(
    public translate: TranslateService,
    private http: HttpClient
  ) {
    const saved = localStorage.getItem('lang');
    const lang = saved || 'en';
    this.currentLang = lang;
    translate.use(lang);
    document.documentElement.lang = lang;
    if (lang === 'ar') document.documentElement.setAttribute('dir', 'rtl');
  }

  setLang(code: string): void {
    this.currentLang = code;
    this.translate.use(code);
    localStorage.setItem('lang', code);
    document.documentElement.lang = code;
    document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
    this.closeNav();
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.closeNav();
  }

  onSubmit(form: NgForm): void {
    if (form.valid !== true) return;
    this.formError = '';
    this.formSubmitting = true;
    this.http.post<{ ok: boolean; error?: string }>(`${API_URL}/send`, this.contact).subscribe({
      next: () => {
        this.formSuccess = true;
        this.contact = { name: '', email: '', subject: '', message: '' };
        form.resetForm();
        this.formSubmitting = false;
        setTimeout(() => (this.formSuccess = false), 5000);
      },
      error: (err) => {
        this.formSubmitting = false;
        this.formError = err?.error?.error || err?.message || 'contact.error_msg';
      },
    });
  }
}
