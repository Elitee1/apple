document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("snowCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let snowflakes = [];

    function createSnowflakes(count) {
        snowflakes = [];
        for (let i = 0; i < count; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 4 + 1, // Snowflake size
                speedY: Math.random() * 3 + 1, // Falling speed
                speedX: Math.random() * 2 - 1, // Sideways movement
                opacity: Math.random() * 0.5 + 0.5 // Vary opacity
            });
        }
    }
    createSnowflakes(100);

    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.beginPath();

        for (let flake of snowflakes) {
            ctx.globalAlpha = flake.opacity; // Apply opacity
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        }

        ctx.fill();
        moveSnowflakes();
    }

    function moveSnowflakes() {
        for (let flake of snowflakes) {
            flake.y += flake.speedY;
            flake.x += flake.speedX;

            // Reset snowflake when it reaches bottom
            if (flake.y > canvas.height) {
                flake.y = 0;
                flake.x = Math.random() * canvas.width;
            }
        }
    }

    function animateSnow() {
        drawSnowflakes();
        requestAnimationFrame(animateSnow);
    }

    animateSnow();
});
