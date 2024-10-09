const toggleIcon = document.querySelector('.toggle-icon');

toggleIcon.addEventListener('click',()=> {
    toggleIcon.classList.toggle(' bx-sun');
    document.body.classList.toggle('dark-mode');
})

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.5// Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.visibility = 'visible'; // Change visibility to visible
                card.style.opacity = '1'; // Make the card visible
                card.style.animationDelay = `${0.3 * card.style.getPropertyValue('--i')}s`; // Set animation delay
                observer.unobserve(card); // Stop observing the card after it has appeared
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card); // Observe each card
    });
});

// design crousel
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-card');
let currentIndex = 0;
const totalCards = cards.length;

// Clone the first and last cards for a continuous effect
const firstCardClone = cards[0].cloneNode(true);
const lastCardClone = cards[totalCards - 1].cloneNode(true);

// Append the clones
track.appendChild(firstCardClone);
track.insertBefore(lastCardClone, track.firstChild);

// Function to move carousel
function moveCarousel() {
    currentIndex++;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * 320}px)`;

    // When the last (cloned) card is reached, reset the position without transition for seamless loop
    if (currentIndex === totalCards + 1) {
        setTimeout(() => {
            track.style.transition = 'none';
            track.style.transform = `translateX(-320px)`; // Move to the first original card
            currentIndex = 1;
        }, 500);
    }
}

// Start auto-sliding every 3 seconds (3000 milliseconds)
setInterval(moveCarousel, 3000);

// Start at the first card (since the first visible card is a clone of the last card)
track.style.transform = `translateX(-320px)`;


