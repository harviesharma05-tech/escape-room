/* ==========================================
   ESCAPE ROOM - CONFETTI.JS
   Lightweight canvas confetti burst (no deps)
========================================== */

const Confetti = {

    canvas: null,

    ctx: null,

    particles: [],

    colors: ["#00e5ff", "#00ff88", "#ffdd00", "#ff4444", "#ffffff"],

    running: false,

    init() {

        this.canvas = document.getElementById("confettiCanvas");

        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");

        window.addEventListener("resize", () => this.resize());

        this.resize();

    },

    resize() {

        if (!this.canvas) return;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

    },

    burst(count = 140) {

        if (!this.canvas) this.init();

        if (!this.canvas) return;

        this.resize();

        this.particles = [];

        for (let i = 0; i < count; i++) {

            this.particles.push({

                x: this.canvas.width / 2,
                y: this.canvas.height / 3,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 1.4) * 14,
                size: 4 + Math.random() * 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * 360,
                spin: (Math.random() - 0.5) * 14,
                life: 0

            });

        }

        if (!this.running) {

            this.running = true;

            this.animate();

        }

    },

    animate() {

        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let alive = 0;

        this.particles.forEach(p => {

            if (p.life > 130) return;

            p.life++;

            p.vy += 0.35; // gravity

            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.spin;

            const fade = Math.max(0, 1 - p.life / 130);

            if (fade <= 0) return;

            alive++;

            this.ctx.save();
            this.ctx.globalAlpha = fade;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            this.ctx.restore();

        });

        if (alive > 0) {

            requestAnimationFrame(() => this.animate());

        } else {

            this.running = false;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        }

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Confetti.init();

});
