# 🚀 DOCUMENTACIÓN COMPLETA: PANEL DE CONTROL BOOST AGENCY

## 📋 **DESCRIPCIÓN DEL PROYECTO**

Crear un **Panel de Control Administrativo** con **Angular 20** (versión más reciente) para administrar completamente el proyecto Boost Agency, permitiendo editar textos, botones, imágenes y contenido de todas las páginas desde una interfaz web profesional.

### **⚠️ ALCANCE DEL PROYECTO:**
- ✅ **CREAR**: Panel de Control Angular 20 (Frontend)
- ✅ **CONECTAR**: A las 3 APIs existentes del backend
- ❌ **NO CREAR**: Backend, APIs, ni base de datos
- ❌ **NO CREAR**: Servidores ni configuraciones de servidor

### **🔗 Lo que nos proporciona el backend:**
1. **3 URLs de conexión** para las APIs
2. **Endpoints específicos** para consumir
3. **Sistema de autenticación** JWT configurado
4. **Base de datos** MongoDB funcionando
5. **Documentación** de los endpoints disponibles

---

## 🎯 **OBJETIVOS DEL PANEL DE CONTROL**

### **Funcionalidades Principales:**
- ✅ **Gestión de Contenido**: Editar textos de todas las páginas
- ✅ **Administración de Imágenes**: Subir, cambiar y gestionar imágenes
- ✅ **Personalización de Botones**: Cambiar estilos, colores y comportamientos
- ✅ **Gestión de Temas**: Cambiar colores, fuentes y estilos globales
- ✅ **Control de Usuarios**: Sistema de roles y permisos
- ✅ **Dashboard Analítico**: Estadísticas del sitio
- ✅ **Vista Previa en Tiempo Real**: Ver cambios antes de publicar

---

## 🛠️ **TECNOLOGÍAS UTILIZADAS (VERSIÓN MÁS RECIENTE)**

### **Frontend - Panel de Control:**
- **Angular 20** - Framework principal (última versión)
- **Angular Material 20** - Componentes UI profesionales
- **Tailwind CSS 3.4** - Framework CSS moderno
- **TypeScript 5.3** - Tipado estático avanzado
- **RxJS 8** - Programación reactiva

### **Backend - API (YA EXISTE):**
- **Node.js 22** - Runtime de JavaScript
- **Express.js 5** - Framework web
- **MongoDB 8** - Base de datos NoSQL
- **Mongoose 9** - ODM para MongoDB
- **JWT** - Autenticación segura
- **⚠️ IMPORTANTE**: El backend ya está creado y funcionando

### **Herramientas de Desarrollo:**
- **Angular CLI 20** - Herramientas de desarrollo
- **ESLint 9** - Linting de código
- **Prettier 4** - Formateo de código
- **Husky** - Git hooks
- **Commitizen** - Commits estandarizados

---

## 🏗️ **ARQUITECTURA DEL PROYECTO**

### **Estructura de Carpetas:**
```
boost-agency-admin/
├── frontend/                    # Panel de Control Angular 20
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Componentes reutilizables
│   │   │   ├── pages/         # Páginas del panel
│   │   │   ├── services/      # Servicios de API
│   │   │   ├── models/        # Interfaces y tipos
│   │   │   ├── guards/        # Guardias de autenticación
│   │   │   ├── pipes/         # Pipes personalizados
│   │   │   └── shared/        # Componentes compartidos
│   │   ├── assets/            # Imágenes y recursos
│   │   └── styles/            # Estilos globales
│   ├── package.json
│   └── angular.json
# ⚠️ IMPORTANTE: NO CREAMOS BACKEND
# El backend ya existe y nos proporcionará:
# - 3 URLs de conexión para las APIs
# - Endpoints específicos para consumir
# - Autenticación y autorización
# - Base de datos configurada
└── docs/                      # Documentación
```

---

## 🚀 **INSTALACIÓN Y CONFIGURACIÓN**

### **⚠️ IMPORTANTE: SOLO CREAMOS EL FRONTEND**
**El backend ya existe y nos proporcionará las URLs de conexión**

### **1. Crear el Proyecto Frontend (Angular 20)**

```bash
# Crear nuevo proyecto Angular 20
ng new boost-agency-admin --routing --style=scss --skip-git --package-manager=npm

# Navegar al directorio
cd boost-agency-admin

# Instalar dependencias principales
npm install @angular/material @angular/cdk @angular/flex-layout
npm install @angular/forms @angular/common @angular/router
npm install @angular/animations @angular/platform-browser

# Instalar dependencias de UI y utilidades
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography
npm install @headlessui/react @heroicons/react
npm install chart.js @types/chart.js
npm install sweetalert2 @types/sweetalert2
npm install moment @types/moment
npm install lodash @types/lodash

# Instalar dependencias de desarrollo
npm install -D @angular-eslint/builder @angular-eslint/eslint-plugin
npm install -D prettier husky lint-staged
npm install -D @commitizen/cz-conventional-changelog
```

### **2. Configurar Angular Material**

```bash
# Agregar Angular Material
ng add @angular/material

# Seleccionar:
# - Choose a prebuilt theme: Custom
# - Set up global Angular Material typography styles: Yes
# - Set up browser animations for Angular Material: Yes
# - Include the Angular animations module: Yes
```

### **3. Configurar Tailwind CSS**

```bash
# Inicializar Tailwind CSS
npx tailwindcss init

# Configurar tailwind.config.js
```

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          500: '#f05f02',
          600: '#d85400',
          700: '#b34500',
          900: '#7a2f00',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

---

## 🎨 **COMPONENTES PRINCIPALES DEL PANEL**

### **1. Dashboard Principal**

```typescript
// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  stats = {
    totalPages: 0,
    totalImages: 0,
    totalUsers: 0,
    recentChanges: [],
    systemStatus: 'online'
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
    });
  }
}
```

### **2. Editor de Contenido WYSIWYG**

```typescript
// src/app/components/content-editor/content-editor.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html'
})
export class ContentEditorComponent {
  
  @Input() content: any;
  @Output() contentChange = new EventEmitter<any>();
  
  contentForm: FormGroup;
  editorConfig = {
    toolbar: [
      'bold', 'italic', 'underline', 'strikethrough',
      '|', 'fontSize', 'fontFamily', 'color',
      '|', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
      '|', 'indent', 'outdent',
      '|', 'insertLink', 'insertImage', 'insertTable',
      '|', 'undo', 'redo'
    ]
  };

  constructor(private fb: FormBuilder) {
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      seoDescription: [''],
      keywords: [''],
      isActive: [true]
    });
  }

  saveContent() {
    if (this.contentForm.valid) {
      this.contentChange.emit(this.contentForm.value);
    }
  }
}
```

### **3. Gestor de Imágenes**

```typescript
// src/app/components/image-manager/image-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html'
})
export class ImageManagerComponent implements OnInit {
  
  images: any[] = [];
  selectedImage: any = null;
  uploadProgress = 0;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.loadImages();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    this.imageService.uploadImage(file).subscribe(
      (progress) => {
        this.uploadProgress = progress;
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  deleteImage(imageId: string) {
    this.imageService.deleteImage(imageId).subscribe(() => {
      this.loadImages();
    });
  }
}
```

### **4. Editor de Temas y Colores**

```typescript
// src/app/components/theme-editor/theme-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html'
})
export class ThemeEditorComponent implements OnInit {
  
  currentTheme: any = {
    colors: {
      primary: '#f05f02',
      secondary: '#64748b',
      accent: '#10b981',
      background: '#ffffff',
      text: '#1f2937'
    },
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 16,
      lineHeight: 1.6
    },
    components: {
      buttonStyle: 'rounded',
      cardStyle: 'shadow',
      inputStyle: 'outlined'
    }
  };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.loadCurrentTheme();
  }

  updateTheme() {
    this.themeService.updateTheme(this.currentTheme).subscribe(() => {
      this.applyTheme();
    });
  }

  private applyTheme() {
    // Aplicar tema al DOM
    document.documentElement.style.setProperty('--primary-color', this.currentTheme.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', this.currentTheme.colors.secondary);
    // ... más propiedades
  }
}
```

---

## 🔧 **SERVICIOS PRINCIPALES**

### **1. Servicio de Contenido (CONECTAR A API EXISTENTE)**

```typescript
// src/app/services/content.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  
  // ⚠️ IMPORTANTE: Esta URL la proporciona el backend existente
  private apiUrl = `${environment.contentApiUrl}/content`;

  constructor(private http: HttpClient) {}

  // Obtener todo el contenido
  getAllContent(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener contenido por página
  getContentByPage(pageId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/page/${pageId}`);
  }

  // Actualizar contenido
  updateContent(id: string, content: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, content);
  }

  // Crear nuevo contenido
  createContent(content: any): Observable<any> {
    return this.http.post(this.apiUrl, content);
  }

  // Eliminar contenido
  deleteContent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Publicar cambios
  publishChanges(changes: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/publish`, { changes });
  }
}
```

### **2. Servicio de Imágenes**

```typescript
// src/app/services/image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  private apiUrl = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {}

  // Subir imagen
  uploadImage(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          return Math.round((100 * event.loaded) / event.total);
        }
        return 0;
      })
    );
  }

  // Obtener todas las imágenes
  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Eliminar imagen
  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${imageId}`);
  }

  // Optimizar imagen
  optimizeImage(imageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${imageId}/optimize`, {});
  }
}
```

### **3. Servicio de Temas**

```typescript
// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private currentTheme = new BehaviorSubject<any>({
    colors: {
      primary: '#f05f02',
      secondary: '#64748b',
      accent: '#10b981',
      background: '#ffffff',
      text: '#1f2937'
    },
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 16,
      lineHeight: 1.6
    }
  });

  constructor(private http: HttpClient) {}

  getCurrentTheme(): Observable<any> {
    return this.currentTheme.asObservable();
  }

  updateTheme(newTheme: any) {
    this.currentTheme.next(newTheme);
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  }

  private applyTheme(theme: any) {
    const root = document.documentElement;
    
    // Aplicar colores
    Object.keys(theme.colors).forEach(key => {
      root.style.setProperty(`--${key}-color`, theme.colors[key]);
    });

    // Aplicar tipografía
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    root.style.setProperty('--font-size', `${theme.typography.fontSize}px`);
    root.style.setProperty('--line-height', theme.typography.lineHeight);
  }

  private saveTheme(theme: any) {
    localStorage.setItem('boost-agency-theme', JSON.stringify(theme));
  }
}
```

---

## 🗄️ **MODELOS DE DATOS (INTERFACES PARA CONSUMIR APIs EXISTENTES)**

**⚠️ IMPORTANTE: Estos modelos son interfaces TypeScript para consumir las APIs del backend existente**

### **1. Modelo de Contenido**

```typescript
// src/app/models/content.model.ts
export interface Content {
  id?: string;
  pageId: string;
  sectionId: string;
  type: 'text' | 'image' | 'button' | 'video' | 'form';
  title: string;
  content: string;
  metadata: {
    seoDescription?: string;
    keywords?: string[];
    altText?: string;
    linkUrl?: string;
  };
  styling: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    shadow?: string;
  };
  position: {
    order: number;
    x?: number;
    y?: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface PageContent {
  pageId: string;
  pageName: string;
  sections: Content[];
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  isPublished: boolean;
  publishedAt?: Date;
}
```

### **2. Modelo de Imagen**

```typescript
// src/app/models/image.model.ts
export interface Image {
  id?: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  url: string;
  thumbnailUrl: string;
  altText: string;
  caption?: string;
  tags: string[];
  category: string;
  usage: {
    pages: string[];
    components: string[];
  };
  optimization: {
    isOptimized: boolean;
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
  };
  uploadedBy: string;
  uploadedAt: Date;
  lastModified: Date;
}
```

### **3. Modelo de Tema**

```typescript
// src/app/models/theme.model.ts
export interface Theme {
  id?: string;
  name: string;
  description?: string;
  isActive: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    headings: {
      h1: { fontSize: number; fontWeight: number; lineHeight: number; };
      h2: { fontSize: number; fontWeight: number; lineHeight: number; };
      h3: { fontSize: number; fontWeight: number; lineHeight: number; };
      h4: { fontSize: number; fontWeight: number; lineHeight: number; };
      h5: { fontSize: number; fontWeight: number; lineHeight: number; };
      h6: { fontSize: number; fontWeight: number; lineHeight: number; };
    };
  };
  components: {
    button: {
      style: 'rounded' | 'square' | 'pill';
      padding: string;
      borderRadius: string;
      shadow: string;
    };
    card: {
      style: 'shadow' | 'border' | 'minimal';
      borderRadius: string;
      shadow: string;
      border: string;
    };
    input: {
      style: 'outlined' | 'filled' | 'underlined';
      borderRadius: string;
      border: string;
      focusRing: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
```

---

## 🔐 **SISTEMA DE AUTENTICACIÓN Y AUTORIZACIÓN**

### **1. Guardia de Autenticación**

```typescript
// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const requiredRole = route.data['role'];
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
```

### **2. Servicio de Autenticación**

```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(response => {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user && user.roles && user.roles.includes(role);
  }
}
```

---

## 📱 **INTERFACES DEL PANEL DE CONTROL**

### **1. Dashboard Principal**

```html
<!-- src/app/pages/dashboard/dashboard.component.html -->
<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <img class="h-8 w-auto" src="assets/logo.svg" alt="Boost Agency">
          <h1 class="ml-3 text-2xl font-semibold text-gray-900">Panel de Control</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
            Vista Previa
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Publicar Cambios
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Páginas Activas</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.totalPages }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <!-- Más tarjetas de estadísticas... -->
    </div>

    <!-- Quick Actions -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Acciones Rápidas</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button class="relative group bg-white p-6 border-2 border-gray-300 rounded-lg hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400 group-hover:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 class="mt-4 text-sm font-medium text-gray-900">Editar Contenido</h3>
              <p class="mt-2 text-xs text-gray-500">Modificar textos y elementos</p>
            </div>
          </button>
          <!-- Más botones de acción... -->
        </div>
      </div>
    </div>

    <!-- Recent Changes -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Cambios Recientes</h3>
        <div class="flow-root">
          <ul class="-mb-8">
            <li *ngFor="let change of stats.recentChanges; let i = index" class="relative pb-8">
              <div class="relative flex space-x-3">
                <div>
                  <span class="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center ring-8 ring-white">
                    <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p class="text-sm text-gray-500">{{ change.description }}</p>
                  </div>
                  <div class="text-right text-sm whitespace-nowrap text-gray-500">
                    <time>{{ change.timestamp | date:'short' }}</time>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</div>
```

### **2. Editor de Contenido**

```html
<!-- src/app/components/content-editor/content-editor.component.html -->
<div class="bg-white shadow rounded-lg">
  <div class="px-4 py-5 sm:p-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sidebar de Páginas -->
      <div class="lg:col-span-1">
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Páginas</h3>
          <nav class="space-y-2">
            <a *ngFor="let page of pages" 
               (click)="selectPage(page)"
               class="block px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
               [class]="selectedPage?.id === page.id ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'">
              {{ page.name }}
            </a>
          </nav>
        </div>
      </div>

      <!-- Editor Principal -->
      <div class="lg:col-span-2">
        <div class="space-y-6">
          <!-- Selección de Sección -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Sección</label>
            <select [(ngModel)]="selectedSection" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
              <option *ngFor="let section of sections" [value]="section.id">
                {{ section.name }}
              </option>
            </select>
          </div>

          <!-- Editor de Texto -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Contenido</label>
            <div class="mt-1">
              <textarea
                [(ngModel)]="contentText"
                rows="6"
                class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Escribe tu contenido aquí..."></textarea>
            </div>
          </div>

          <!-- Opciones de Estilo -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Tamaño de Fuente</label>
              <select [(ngModel)]="fontSize" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
                <option value="32">32px</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Color de Texto</label>
              <input type="color" [(ngModel)]="textColor" class="mt-1 block w-full h-10 border-gray-300 rounded-md">
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex justify-end space-x-3">
            <button
              (click)="previewContent()"
              class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
              Vista Previa
            </button>
            <button
              (click)="saveContent()"
              class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🗄️ **BASE DE DATOS MONGODB**

### **1. Esquema de Contenido**

```javascript
// backend/src/models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true,
    index: true
  },
  sectionId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'button', 'video', 'form'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  metadata: {
    seoDescription: String,
    keywords: [String],
    altText: String,
    linkUrl: String
  },
  styling: {
    fontSize: Number,
    fontWeight: String,
    color: String,
    backgroundColor: String,
    padding: String,
    margin: String,
    borderRadius: String,
    shadow: String
  },
  position: {
    order: {
      type: Number,
      default: 0
    },
    x: Number,
    y: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Índices para optimización
contentSchema.index({ pageId: 1, sectionId: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ isActive: 1 });

module.exports = mongoose.model('Content', contentSchema);
```

### **2. Esquema de Imágenes**

```javascript
// backend/src/models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  dimensions: {
    width: Number,
    height: Number
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: String,
  altText: {
    type: String,
    required: true
  },
  caption: String,
  tags: [String],
  category: {
    type: String,
    default: 'general'
  },
  usage: {
    pages: [String],
    components: [String]
  },
  optimization: {
    isOptimized: {
      type: Boolean,
      default: false
    },
    originalSize: Number,
    optimizedSize: Number,
    compressionRatio: Number
  },
  uploadedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Índices para optimización
imageSchema.index({ filename: 1 });
imageSchema.index({ category: 1 });
imageSchema.index({ tags: 1 });
imageSchema.index({ uploadedBy: 1 });

module.exports = mongoose.model('Image', imageSchema);
```

---

## 🚀 **API ENDPOINTS (BACKEND EXISTENTE)**

**⚠️ IMPORTANTE: Estas son las APIs que ya existen en el backend. Solo necesitamos conectarnos a ellas.**

### **1. Rutas de Contenido**

```javascript
// backend/src/routes/content.js
const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');

// Obtener todo el contenido
router.get('/', auth, async (req, res) => {
  try {
    const content = await Content.find({ isActive: true })
      .sort({ 'position.order': 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener contenido por página
router.get('/page/:pageId', auth, async (req, res) => {
  try {
    const content = await Content.find({ 
      pageId: req.params.pageId, 
      isActive: true 
    }).sort({ 'position.order': 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener contenido por sección
router.get('/section/:sectionId', auth, async (req, res) => {
  try {
    const content = await Content.find({ 
      sectionId: req.params.sectionId, 
      isActive: true 
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear nuevo contenido
router.post('/', auth, async (req, res) => {
  try {
    const content = new Content({
      ...req.body,
      createdBy: req.user.id
    });
    const newContent = await content.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar contenido
router.put('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar contenido (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }
    res.json({ message: 'Contenido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Publicar cambios
router.post('/publish', auth, async (req, res) => {
  try {
    const { changes } = req.body;
    // Lógica para publicar cambios
    res.json({ message: 'Cambios publicados correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

### **2. Rutas de Imágenes**

```javascript
// backend/src/routes/images.js
const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

// Configuración de Multer para subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB máximo
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

// Obtener todas las imágenes
router.get('/', auth, async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener imagen por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Subir nueva imagen
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
    }

    // Procesar imagen con Sharp
    const processedImage = await sharp(req.file.buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Crear thumbnail
    const thumbnail = await sharp(req.file.buffer)
      .resize(300, 300, { fit: 'cover' })
      .jpeg({ quality: 70 })
      .toBuffer();

    // Generar nombres únicos
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const thumbnailFilename = `thumb-${filename}`;

    // Guardar en sistema de archivos o cloud storage
    // Aquí implementarías la lógica para guardar en tu storage preferido

    const image = new Image({
      filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: processedImage.length,
      dimensions: { width: 1920, height: 1080 },
      url: `/uploads/${filename}`,
      thumbnailUrl: `/uploads/thumbnails/${thumbnailFilename}`,
      altText: req.body.altText || req.file.originalname,
      tags: req.body.tags ? req.body.tags.split(',') : [],
      category: req.body.category || 'general',
      uploadedBy: req.user.id
    });

    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar imagen
router.put('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar imagen
router.delete('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    // Aquí implementarías la lógica para eliminar archivos del storage
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Optimizar imagen
router.post('/:id/optimize', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    // Lógica de optimización
    res.json({ message: 'Imagen optimizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### **3. Rutas de Temas**

```javascript
// backend/src/routes/themes.js
const express = require('express');
const router = express.Router();
const Theme = require('../models/Theme');
const auth = require('../middleware/auth');

// Obtener todos los temas
router.get('/', auth, async (req, res) => {
  try {
    const themes = await Theme.find().sort({ createdAt: -1 });
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener tema activo
router.get('/active', auth, async (req, res) => {
  try {
    const theme = await Theme.findOne({ isActive: true });
    if (!theme) {
      return res.status(404).json({ message: 'No hay tema activo' });
    }
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener tema por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear nuevo tema
router.post('/', auth, async (req, res) => {
  try {
    const theme = new Theme({
      ...req.body,
      createdBy: req.user.id
    });
    const newTheme = await theme.save();
    res.status(201).json(newTheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar tema
router.put('/:id', auth, async (req, res) => {
  try {
    const theme = await Theme.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!theme) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    res.json(theme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Activar tema
router.post('/:id/activate', auth, async (req, res) => {
  try {
    // Desactivar todos los temas
    await Theme.updateMany({}, { isActive: false });
    
    // Activar el tema seleccionado
    const theme = await Theme.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    
    if (!theme) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar tema
router.delete('/:id', auth, async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }
    
    if (theme.isActive) {
      return res.status(400).json({ message: 'No se puede eliminar un tema activo' });
    }
    
    await Theme.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tema eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

---

## 🏗️ **ESTRUCTURA DE LAS 3 APIS EXISTENTES (CONECTAR DESDE FRONTEND)**

**⚠️ IMPORTANTE: Estas APIs ya existen en el backend. Solo necesitamos conectarnos a ellas desde nuestro panel de control.**

### **API 1: CONTENT API (Gestión de Contenido)**
**Puerto: 3001**
**Base URL: `http://localhost:3001/api/content`**

#### **Endpoints:**
- `GET /` - Obtener todo el contenido
- `GET /page/:pageId` - Obtener contenido por página
- `GET /section/:sectionId` - Obtener contenido por sección
- `POST /` - Crear nuevo contenido
- `PUT /:id` - Actualizar contenido
- `DELETE /:id` - Eliminar contenido
- `POST /publish` - Publicar cambios

#### **Responsabilidades:**
- ✅ Gestión de textos de todas las páginas
- ✅ Administración de secciones y contenido
- ✅ Control de versiones y cambios
- ✅ Publicación de contenido

### **API 2: MEDIA API (Gestión de Imágenes y Archivos)**
**Puerto: 3002**
**Base URL: `http://localhost:3002/api/media`**

#### **Endpoints:**
- `GET /` - Obtener todas las imágenes
- `GET /:id` - Obtener imagen por ID
- `POST /upload` - Subir nueva imagen
- `PUT /:id` - Actualizar metadatos de imagen
- `DELETE /:id` - Eliminar imagen
- `POST /:id/optimize` - Optimizar imagen

#### **Responsabilidades:**
- ✅ Subida y gestión de imágenes
- ✅ Optimización automática de archivos
- ✅ Generación de thumbnails
- ✅ Almacenamiento en cloud storage
- ✅ Gestión de metadatos y tags

### **API 3: THEME API (Gestión de Temas y Estilos)**
**Puerto: 3003**
**Base URL: `http://localhost:3003/api/themes`**

#### **Endpoints:**
- `GET /` - Obtener todos los temas
- `GET /active` - Obtener tema activo
- `GET /:id` - Obtener tema por ID
- `POST /` - Crear nuevo tema
- `PUT /:id` - Actualizar tema
- `POST /:id/activate` - Activar tema
- `DELETE /:id` - Eliminar tema

#### **Responsabilidades:**
- ✅ Gestión de colores y paletas
- ✅ Control de tipografías
- ✅ Estilos de componentes
- ✅ Aplicación de temas en tiempo real
- ✅ Presets de diseño

---

## 🔌 **CONFIGURACIÓN DE CONEXIÓN A APIs EXISTENTES**

**⚠️ IMPORTANTE: Aquí es donde configuramos la conexión a las 3 APIs que ya existen en el backend.**

### **📍 PUNTOS CLAVE A CAMBIAR EN EL PANEL DE CONTROL:**

1. **Variables de Entorno** - Configurar las 3 URLs del backend
2. **Servicios de API** - Conectar a endpoints existentes
3. **Interfaces TypeScript** - Basarse en modelos del backend
4. **Autenticación** - Usar JWT del backend existente
5. **Manejo de Errores** - Adaptar a respuestas del backend

### **1. Variables de Entorno del Frontend**

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  // ⚠️ IMPORTANTE: Estas URLs las proporciona el backend existente
  contentApiUrl: 'http://localhost:3001/api/content', // CAMBIAR POR URL REAL
  mediaApiUrl: 'http://localhost:3002/api/media',     // CAMBIAR POR URL REAL
  themeApiUrl: 'http://localhost:3003/api/themes',    // CAMBIAR POR URL REAL
  authApiUrl: 'http://localhost:3001/api/auth'        // CAMBIAR POR URL REAL
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  contentApiUrl: 'https://api-content.boostagency.com/api/content',
  mediaApiUrl: 'https://api-media.boostagency.com/api/media',
  themeApiUrl: 'https://api-theme.boostagency.com/api/themes',
  authApiUrl: 'https://api-content.boostagency.com/api/auth'
};
```

### **2. Servicios de Conexión**

```typescript
// src/app/services/api-connection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  // Content API
  getContentApi() {
    return {
      baseUrl: environment.contentApiUrl,
      http: this.http,
      headers: this.headers
    };
  }

  // Media API
  getMediaApi() {
    return {
      baseUrl: environment.mediaApiUrl,
      http: this.http,
      headers: this.headers
    };
  }

  // Theme API
  getThemeApi() {
    return {
      baseUrl: environment.themeApiUrl,
      http: this.http,
      headers: this.headers
    };
  }

  constructor(private http: HttpClient) {}
}
```

---

## 🗄️ **ESQUEMAS DE BASE DE DATOS (REFERENCIA DEL BACKEND EXISTENTE)**

**⚠️ IMPORTANTE: Estos esquemas ya existen en el backend. Solo los usamos como referencia para crear las interfaces TypeScript.**

### **1. Esquema de Usuario**

```javascript
// backend/src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer'
  },
  permissions: {
    canEditContent: { type: Boolean, default: false },
    canUploadImages: { type: Boolean, default: false },
    canManageThemes: { type: Boolean, default: false },
    canManageUsers: { type: Boolean, default: false },
    canPublish: { type: Boolean, default: false }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  avatar: String
}, {
  timestamps: true
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### **2. Esquema de Páginas**

```javascript
// backend/src/models/Page.js
const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true,
    unique: true
  },
  pageName: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  publishedBy: String,
  seo: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String,
    canonicalUrl: String
  },
  sections: [{
    sectionId: String,
    sectionName: String,
    sectionType: String,
    isRequired: Boolean,
    order: Number
  }],
  createdBy: {
    type: String,
    required: true
  },
  lastModifiedBy: String
}, {
  timestamps: true
});

// Índices para optimización
pageSchema.index({ pageId: 1 });
pageSchema.index({ route: 1 });
pageSchema.index({ isActive: 1 });
pageSchema.index({ isPublished: 1 });

module.exports = mongoose.model('Page', pageSchema);
```

---

## 🚀 **CONFIGURACIÓN DE SERVIDORES (REFERENCIA DEL BACKEND EXISTENTE)**

**⚠️ IMPORTANTE: Estos servidores ya están corriendo en el backend. Solo los usamos como referencia para entender la estructura.**

### **1. Servidor Content API (Puerto 3001)**

```javascript
// backend/content-api/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por ventana
});
app.use(limiter);

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Conexión a MongoDB
mongoose.connect(process.env.CONTENT_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('✅ Conectado a MongoDB - Content API');
});

// Rutas
app.use('/api/content', require('./routes/content'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pages', require('./routes/pages'));

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Content API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Content API corriendo en puerto ${PORT}`);
});
```

### **2. Servidor Media API (Puerto 3002)**

```javascript
// backend/media-api/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

// Rate limiting específico para uploads
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50 // máximo 50 uploads por ventana
});

// Rate limiting general
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});

app.use('/api/media/upload', uploadLimiter);
app.use('/api/media', generalLimiter);

// Middleware de parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Conexión a MongoDB
mongoose.connect(process.env.MEDIA_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('✅ Conectado a MongoDB - Media API');
});

// Rutas
app.use('/api/media', require('./routes/images'));
app.use('/api/files', require('./routes/files'));

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Media API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Media API corriendo en puerto ${PORT}`);
});
```

### **3. Servidor Theme API (Puerto 3003)**

```javascript
// backend/theme-api/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150
});
app.use(limiter);

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Conexión a MongoDB
mongoose.connect(process.env.THEME_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('✅ Conectado a MongoDB - Theme API');
});

// Rutas
app.use('/api/themes', require('./routes/themes'));
app.use('/api/design', require('./routes/design'));

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Theme API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Theme API corriendo en puerto ${PORT}`);
});
```

---

## 🔧 **ARCHIVOS DE CONFIGURACIÓN (REFERENCIA DEL BACKEND EXISTENTE)**

**⚠️ IMPORTANTE: Estos archivos ya existen en el backend. Solo los usamos como referencia para entender la configuración.**

### **1. Variables de Entorno (.env)**

```bash
# Content API (.env)
NODE_ENV=development
PORT=3001
CONTENT_MONGODB_URI=mongodb://localhost:27017/boost_agency_content
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
FRONTEND_URL=http://localhost:4200
CORS_ORIGIN=http://localhost:4200

# Media API (.env)
NODE_ENV=development
PORT=3002
MEDIA_MONGODB_URI=mongodb://localhost:27017/boost_agency_media
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
FRONTEND_URL=http://localhost:4200
CORS_ORIGIN=http://localhost:4200
CLOUD_STORAGE_BUCKET=boost-agency-media
CLOUD_STORAGE_KEY=tu_clave_cloud_storage
CLOUD_STORAGE_SECRET=tu_secreto_cloud_storage

# Theme API (.env)
NODE_ENV=development
PORT=3003
THEME_MONGODB_URI=mongodb://localhost:27017/boost_agency_themes
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
FRONTEND_URL=http://localhost:4200
CORS_ORIGIN=http://localhost:4200
```

### **2. Package.json de cada API**

```json
// backend/content-api/package.json
{
  "name": "boost-agency-content-api",
  "version": "1.0.0",
  "description": "API para gestión de contenido de Boost Agency",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint .",
    "build": "npm run lint && npm test"
  },
  "dependencies": {
    "express": "^5.0.0",
    "mongoose": "^9.0.0",
    "cors": "^2.8.5",
    "helmet": "^8.0.0",
    "express-rate-limit": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.0.0",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.0.0",
    "eslint": "^9.0.0",
    "supertest": "^6.0.0"
  }
}
```

---

## 📋 **CHECKLIST DE IMPLEMENTACIÓN**

### **Fase 1: Configuración de Base**
- [ ] Crear proyecto Angular 20
- [ ] Configurar Angular Material
- [ ] Configurar Tailwind CSS
- [ ] Crear estructura de carpetas
- [ ] Configurar routing del panel

### **Fase 2: Conexión a APIs Existentes**
- [ ] Obtener URLs de conexión del backend
- [ ] Configurar variables de entorno con las URLs
- [ ] Probar conexión a cada API
- [ ] Verificar autenticación JWT
- [ ] Crear interfaces TypeScript basadas en los modelos existentes
- [ ] Implementar servicios para consumir endpoints

### **Fase 3: Frontend - Panel de Control**
- [ ] Implementar sistema de autenticación
- [ ] Crear dashboard principal
- [ ] Implementar editor de contenido
- [ ] Crear gestor de imágenes
- [ ] Implementar editor de temas
- [ ] Crear sistema de roles y permisos

### **Fase 4: Integración y Testing**
- [ ] Conectar frontend con las 3 APIs existentes
- [ ] Implementar manejo de errores de conexión
- [ ] Crear tests unitarios de servicios
- [ ] Crear tests de integración con APIs
- [ ] Testing de conexión y rendimiento

### **Fase 5: Despliegue**
- [ ] Configurar variables de producción con URLs del backend
- [ ] Desplegar solo el panel de control (Angular)
- [ ] Configurar monitoreo de conexión a APIs
- [ ] Documentación final de conexión

---

## 🎯 **RESUMEN FINAL**

### **Lo que se va a crear:**

1. **Panel de Control Angular 20** - Interfaz web para administrar todo
2. **Conexión a Content API existente** - Gestión de textos y contenido
3. **Conexión a Media API existente** - Gestión de imágenes y archivos
4. **Conexión a Theme API existente** - Gestión de colores y estilos

### **Funcionalidades principales:**
- ✅ **Edición de textos** de todas las páginas
- ✅ **Gestión de imágenes** con optimización automática
- ✅ **Personalización de temas** en tiempo real
- ✅ **Sistema de usuarios** con roles y permisos
- ✅ **Dashboard analítico** completo
- ✅ **Vista previa** de cambios antes de publicar

### **Tecnologías utilizadas:**
- **Frontend**: Angular 20 + Angular Material + Tailwind CSS
- **Backend**: Ya existe (Node.js + Express + MongoDB)
- **APIs**: 3 APIs existentes con responsabilidades específicas
- **Base de datos**: Ya configurada en el backend

## 🔧 **RESUMEN DE CAMBIOS NECESARIOS EN EL PANEL DE CONTROL**

### **1. Configuración Inicial:**
- [ ] Crear proyecto Angular 20
- [ ] Configurar Angular Material y Tailwind CSS
- [ ] Crear estructura de carpetas del panel

### **2. Conexión a APIs Existentes:**
- [ ] **CAMBIAR**: Variables de entorno con URLs reales del backend
- [ ] **CAMBIAR**: Servicios para consumir endpoints existentes
- [ ] **CAMBIAR**: Interfaces basadas en modelos del backend
- [ ] **CAMBIAR**: Autenticación JWT del backend existente

### **3. Funcionalidades del Panel:**
- [ ] Dashboard principal con estadísticas
- [ ] Editor de contenido WYSIWYG
- [ ] Gestor de imágenes conectado a Media API
- [ ] Editor de temas conectado a Theme API
- [ ] Sistema de usuarios y permisos

### **4. Despliegue:**
- [ ] Configurar URLs de producción del backend
- [ ] Desplegar solo el panel de control
- [ ] Verificar conexión a APIs en producción

---

**¿Te parece clara y completa esta documentación actualizada? ¿Ahora está claro que solo creamos el frontend y nos conectamos a APIs existentes?**
 