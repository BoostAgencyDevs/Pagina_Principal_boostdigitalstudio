import { Component, OnInit, AfterViewInit } from '@angular/core';

// Interfaces para tipos de contenido social
interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
  type: string;
  likes: string;
  comments: string;
}

interface FacebookPost {
  id: string;
  message: string;
  createdTime: string;
  permalinkUrl: string;
  attachments?: any;
  likes: string;
  comments: string;
  shares: string;
}



@Component({
  selector: 'app-boostcast',
  templateUrl: './boostcast.component.html',
  styleUrls: ['./boostcast.component.css']
})
export class BoostcastComponent implements OnInit, AfterViewInit {
  private audioContext: AudioContext | null = null;
  private speechSynthesis: SpeechSynthesis | null = null;
  isLoaded = false;
  showWelcomeMessage = false;
  currentPodcast = 0;
  podcasts = [
    { title: 'DIGITAL FWD', speaker: 'Derek Grey', duration: '45:32', listeners: '2.4K' },
    { title: 'AI Marketing Trends', speaker: 'Sarah Chen', duration: '38:15', listeners: '1.8K' },
    { title: 'Growth Strategies', speaker: 'Mike Johnson', duration: '52:08', listeners: '3.1K' }
  ];

  // Configuración de redes sociales
  socialMedia = {
    instagram: {
      username: '@boostagency',
      followers: '15.2K',
      reels: '24',
      url: 'https://instagram.com/boostagency',
      // Configuración para API de Instagram
      apiKey: '', // Tu Instagram Basic Display API Key
      accessToken: '', // Tu Instagram Access Token
      userId: '' // Tu Instagram User ID
    },
    facebook: {
      username: 'Boost Agency',
      followers: '8.9K',
      posts: '156',
      url: 'https://facebook.com/boostagency',
      // Configuración para API de Facebook
      appId: '', // Tu Facebook App ID
      accessToken: '', // Tu Facebook Access Token
      pageId: '' // Tu Facebook Page ID
    }
  };

  // Contenido en tiempo real de redes sociales
  socialContent = {
    instagram: {
      reels: [] as InstagramPost[],
      stories: [] as InstagramPost[],
      posts: [] as InstagramPost[],
      isLoading: false
    },
    facebook: {
      posts: [] as FacebookPost[],
      videos: [] as FacebookPost[],
      stories: [] as FacebookPost[],
      isLoading: false
    }
  };

  // Estado para mostrar feeds sociales
  showSocialFeed = false;
  activeSocialTab = 'instagram';

  constructor() {
    this.initAudio();
    this.initSpeech();
  }

  ngOnInit() {
    // Simular carga inicial
    setTimeout(() => {
      this.isLoaded = true;
      this.playWelcomeSound();
      this.speakWelcomeMessage();
    }, 500);
    
    // Iniciar auto-refresh del contenido social
    this.startSocialAutoRefresh();
  }

  ngAfterViewInit() {
    this.initializeScrollAnimations();
    this.initializeCustomCursor();
  }

  private initAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API no disponible');
    }
  }

  private initSpeech() {
    this.speechSynthesis = window.speechSynthesis;
  }

  private playWelcomeSound() {
    if (!this.audioContext) return;

    try {
      // Crear sonido de bienvenida futurista
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 1.5);
      filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(660, this.audioContext.currentTime + 0.3);
      oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.6);
      oscillator.frequency.exponentialRampToValueAtTime(1100, this.audioContext.currentTime + 0.9);
      oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 1.2);
      oscillator.frequency.exponentialRampToValueAtTime(660, this.audioContext.currentTime + 1.5);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5);
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 1.5);
      
    } catch (error) {
      console.log('Error reproduciendo sonido de bienvenida');
    }
  }

  private speakWelcomeMessage() {
    if (!this.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = "Bienvenido a Boostcast. Tu fuente de insights digitales y estrategias de marketing. Explora el futuro del marketing digital con nosotros.";
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    // Seleccionar voz femenina si está disponible
    const voices = this.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.lang.includes('es') && voice.name.includes('female'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    this.showWelcomeMessage = true;
    this.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setTimeout(() => {
        this.showWelcomeMessage = false;
      }, 2000);
    };
  }

  private initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.playHoverSound();
        }
      });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
  }

  private playHoverSound() {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
      
    } catch (error) {
      console.log('Error reproduciendo sonido hover');
    }
  }

  playPodcast(index: number) {
    this.currentPodcast = index;
    this.playPodcastSound();
  }

  private playPodcastSound() {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(659.25, this.audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(783.99, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
      
    } catch (error) {
      console.log('Error reproduciendo sonido podcast');
    }
  }

  onCardHover() {
    this.playHoverSound();
  }

  // Métodos para redes sociales
  toggleSocialFeed() {
    this.showSocialFeed = !this.showSocialFeed;
    this.playHoverSound();
    
    // Cargar contenido cuando se abre el feed
    if (this.showSocialFeed) {
      this.loadSocialContent(this.activeSocialTab);
    }
  }

  changeSocialTab(tab: string) {
    this.activeSocialTab = tab;
    this.playHoverSound();
  }

  openSocialMedia(platform: string) {
    const url = this.socialMedia[platform as keyof typeof this.socialMedia]?.url;
    if (url) {
      window.open(url, '_blank');
      this.playHoverSound();
    }
  }

  // Simular carga de contenido social
  loadSocialContent(platform: string) {
    this.playHoverSound();
    this.socialContent[platform as keyof typeof this.socialContent].isLoading = true;
    
    try {
      switch (platform) {
        case 'instagram':
          this.loadInstagramContent();
          break;
        case 'facebook':
          this.loadFacebookContent();
          break;
      }
    } catch (error) {
      console.error(`Error cargando contenido de ${platform}:`, error);
      this.loadFallbackContent(platform);
    } finally {
      this.socialContent[platform as keyof typeof this.socialContent].isLoading = false;
    }
  }

  // Cargar contenido de Instagram
  private async loadInstagramContent() {
    const config = this.socialMedia.instagram;
    
    if (!config.accessToken) {
      this.loadFallbackContent('instagram');
      return;
    }

    try {
      const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${config.accessToken}&limit=10`);
      const data = await response.json();
      
      if (data.data) {
        this.socialContent.instagram.posts = data.data.map((post: any) => ({
          id: post.id,
          caption: post.caption,
          mediaUrl: post.media_url,
          thumbnailUrl: post.thumbnail_url,
          permalink: post.permalink,
          timestamp: post.timestamp,
          type: post.media_type,
          likes: 'N/A', // No disponible en la API actual
          comments: 'N/A' // No disponible en la API actual
        }));
      }
    } catch (error) {
      console.error('Error cargando Instagram:', error);
      this.loadFallbackContent('instagram');
    }
  }

  // Cargar contenido de Facebook
  private async loadFacebookContent() {
    const config = this.socialMedia.facebook;
    
    if (!config.accessToken || !config.pageId) {
      this.loadFallbackContent('facebook');
      return;
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${config.pageId}/posts?fields=id,message,created_time,permalink_url,attachments&access_token=${config.accessToken}&limit=10`);
      const data = await response.json();
      
      if (data.data) {
        this.socialContent.facebook.posts = data.data.map((post: any) => ({
          id: post.id,
          message: post.message,
          createdTime: post.created_time,
          permalinkUrl: post.permalink_url,
          attachments: post.attachments,
          likes: 'N/A', // No disponible en la API actual
          comments: 'N/A', // No disponible en la API actual
          shares: 'N/A' // No disponible en la API actual
        }));
      }
    } catch (error) {
      console.error('Error cargando Facebook:', error);
      this.loadFallbackContent('facebook');
    }
  }

  // Contenido de respaldo si fallan las APIs
  private loadFallbackContent(platform: string) {
    if (platform === 'instagram') {
      this.socialContent.instagram.posts = [
        {
          id: '1',
          caption: 'Tips de marketing digital en 60 segundos 🚀 #MarketingDigital #Tips #BoostAgency',
          mediaUrl: 'assets/images/global/hero-image.svg',
          permalink: 'https://instagram.com/p/example1',
          timestamp: new Date().toISOString(),
          type: 'VIDEO',
          likes: '2.4K',
          comments: '156'
        },
        {
          id: '2',
          caption: 'Estrategias de crecimiento para tu negocio 📈 #Crecimiento #Negocios #Estrategia',
          mediaUrl: 'assets/images/nosotros/foto_grupal.png',
          permalink: 'https://instagram.com/p/example2',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          type: 'IMAGE',
          likes: '1.8K',
          comments: '89'
        }
      ];
    } else if (platform === 'facebook') {
      this.socialContent.facebook.posts = [
        {
          id: '1',
          message: '¿Sabías que el 78% de los consumidores investigan en línea antes de comprar? 🎯 Aprende cómo optimizar tu presencia digital con nosotros.',
          createdTime: new Date().toISOString(),
          permalinkUrl: 'https://facebook.com/post1',
          likes: '890',
          comments: '45',
          shares: '23'
        },
        {
          id: '2',
          message: 'El futuro del marketing está aquí. IA, automatización y personalización. ¿Estás listo para el cambio? 🤖',
          createdTime: new Date(Date.now() - 172800000).toISOString(),
          permalinkUrl: 'https://facebook.com/post2',
          likes: '1.2K',
          comments: '67',
          shares: '34'
        }
      ];
    }
  }

  // Auto-refresh del contenido social
  startSocialAutoRefresh() {
    setInterval(() => {
      if (this.showSocialFeed) {
        this.loadSocialContent(this.activeSocialTab);
      }
    }, 300000); // Actualizar cada 5 minutos
  }

  private initializeCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Efectos especiales en hover de elementos interactivos
    const interactiveElements = document.querySelectorAll('button, .podcast-card, .topic-card, a');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'radial-gradient(circle, rgba(240, 95, 2, 1) 0%, transparent 70%)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'radial-gradient(circle, rgba(240, 95, 2, 0.8) 0%, transparent 70%)';
      });
    });
  }
}
