const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let showBouquet = false;
let fireworkCount = 0;

function createFirework(x, y) {
    const particles = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 3 + 1,
            color: 'hsl(' + Math.random() * 360 + ', 100%, 50%)',
            velocity: {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10
            },
            life: Math.random() * 60 + 30
        });
    }
    return particles;
}

function drawParticles(particles) {
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.life--;
    });
}

function drawBouquet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const roseCount = 5; // Number of roses in the bouquet
    const baseX = canvas.width / 2; // Centered horizontally
    const baseY = canvas.height / 2 - 50; // Adjusted to center vertically

    for (let i = 0; i < roseCount; i++) {
        const offsetX = (Math.random() - 0.5) * 50; // Random horizontal offset for a natural look
        const offsetY = i * 40; // Vertical spacing between roses
        drawRose(baseX + offsetX, baseY + offsetY);
    }
}

function drawRose(x, y) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 0; i < 8; i++) {
        ctx.bezierCurveTo(
            x + 20 * Math.cos((i * Math.PI) / 4),
            y + 20 * Math.sin((i * Math.PI) / 4),
            x + 20 * Math.cos((i * Math.PI) / 4 + Math.PI / 8),
            y + 20 * Math.sin((i * Math.PI) / 4 + Math.PI / 8),
            x,
            y
        );
    }
    ctx.fill();

    // Draw stems
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 40); // Length of the stem
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (fireworks.length) {
        fireworks.forEach((fw, index) => {
            drawParticles(fw);
            if (!fw.length) {
                fireworks.splice(index, 1);
            }
        });
    } else if (showBouquet) {
        drawBouquet();
    }
    
    requestAnimationFrame(animate);
}

// Set a timer to trigger fireworks and transition to the bouquet
setInterval(() => {
    if (!showBouquet) {
        fireworks.push(createFirework(Math.random() * canvas.width, Math.random() * canvas.height / 2));

        // Show bouquet after a set number of fireworks
        if (fireworks.length >= 10) { // After 10 fireworks
            showBouquet = true;
            fireworks = []; // Clear fireworks array
        }
    }
}, 1000);

animate();
