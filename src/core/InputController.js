import { App } from './App.js';

export class InputController {
    constructor() {
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;
        this.minSwipeDistance = 80;
        this.element = null;
        
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        
        this.init();
    }

    init() {
        const app = document.getElementById('app');
        
        app.addEventListener('mousedown', this.onStart);
        app.addEventListener('mousemove', this.onMove);
        window.addEventListener('mouseup', this.onEnd);

        app.addEventListener('touchstart', this.onStart, { passive: false });
        app.addEventListener('touchmove', this.onMove, { passive: false });
        window.addEventListener('touchend', this.onEnd);
    }

    getActiveElement() {
        return App.router.getCurrentElement();
    }

    onStart(e) {
        if (e.target.closest('a') || e.target.closest('button')) return;
        this.isDragging = true;
        this.element = this.getActiveElement();
        this.touchStartX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        
        if (this.element) {
            this.element.style.transition = 'none';
        }
    }

    onMove(e) {
        if (!this.isDragging || !this.element) return;
        
        if(e.cancelable) e.preventDefault();

        const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const diff = currentX - this.touchStartX;

        const maxDistance = 300;
        const progress = Math.min(Math.abs(diff) / maxDistance, 1);
        const scale = 1 - (progress * 0.2);

        const rotate = diff / 20; 
        
        requestAnimationFrame(() => {
            this.element.style.transform = `translateX(${diff}px) rotateY(${rotate}deg) scale(${scale})`;
            this.element.style.opacity = 1 - (progress * 0.5);
        });
    }

    onEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;

        const currentX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
        const diff = currentX - this.touchStartX;

        if (!this.element) return;

        this.element.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';

        if (Math.abs(diff) > this.minSwipeDistance) {
            const direction = diff > 0 ? -1 : 1;
            const screenWidth = window.innerWidth;
            
            this.element.style.transform = `translateX(${direction === 1 ? -screenWidth : screenWidth}px) rotateY(${direction * 45}deg) scale(0.5)`;
            this.element.style.opacity = '0';
            
            setTimeout(() => {
                App.router.navigateRelative(direction);
            }, 300);

        } else {
            this.element.style.transform = 'translateX(0) rotateY(0) scale(1)';
            this.element.style.opacity = '1';
        }
        
        this.element = null;
    }
}