const slider = document.querySelector('.slider');
let isDown = false;
let startX;
let scrollLeft;

// Maus-Down-Event, um das Ziehen zu starten
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    document.body.style.userSelect = "none"; // Verhindert Textmarkierung während des Ziehens
});

// Maus-Leave oder Maus-Up-Event, um das Ziehen zu stoppen
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    document.body.style.userSelect = "auto"; // Wieder Textmarkierung zulassen
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    document.body.style.userSelect = "auto"; // Wieder Textmarkierung zulassen
});

// Maus-Bewegung, um die Produktauswahl im Slider zu verschieben
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // Wenn nicht gedrückt, keine Bewegung
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Geschwindigkeit des Scrollens
    slider.scrollLeft = scrollLeft - walk; // Verschiebe die Produkte nach links oder rechts
});
