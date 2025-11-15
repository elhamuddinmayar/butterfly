document.addEventListener('DOMContentLoaded', function() {
    const butterflies = document.querySelectorAll('.butterfly');
    const backgroundContainer = document.querySelector('.background-container');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update butterfly positions with different offsets
        butterflies.forEach((butterfly, index) => {
            const offsetX = (index - 1) * 100; // Spread butterflies horizontally
            const offsetY = Math.sin(Date.now() * 0.001 + index) * 50; // Vertical oscillation
            
            const targetX = mouseX + offsetX;
            const targetY = mouseY + offsetY;
            
            // Smooth movement with slight delay for each butterfly
            setTimeout(() => {
                butterfly.style.left = targetX + 'px';
                butterfly.style.top = targetY + 'px';
                
                // Rotate butterfly based on movement direction
                const deltaX = targetX - (butterfly.offsetLeft || window.innerWidth / 2);
                const rotation = Math.atan2(deltaX, 50) * (180 / Math.PI) * 0.1;
                butterfly.style.transform = `rotate(${rotation}deg)`;
            }, index * 100);
        });
    });
    
    // Create dynamic background particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.setProperty('--size', (Math.random() * 4 + 2) + 'px');
        
        backgroundContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
    
    // Add click effect - butterflies scatter then return
    document.addEventListener('click', function(e) {
        butterflies.forEach((butterfly, index) => {
            const scatterX = e.clientX + (Math.random() - 0.5) * 300;
            const scatterY = e.clientY + (Math.random() - 0.5) * 300;
            
            butterfly.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            butterfly.style.left = scatterX + 'px';
            butterfly.style.top = scatterY + 'px';
            butterfly.style.transform = `rotate(${Math.random() * 360}deg) scale(1.2)`;
            
            // Return to mouse position
            setTimeout(() => {
                butterfly.style.transition = 'all 0.3s ease-out';
            }, 1000);
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
    });
});
