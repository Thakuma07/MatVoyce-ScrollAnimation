document.addEventListener("DOMContentLoaded", () => {

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cardPositions = [
        { top: "30%", left: "55%" },
        { top: "20%", left: "25%" },
        { top: "50%", left: "10%" },
        { top: "60%", left: "40%" },
        { top: "30%", left: "30%" },
        { top: "60%", left: "60%" },
        { top: "20%", left: "50%" },
        { top: "60%", left: "10%" },
        { top: "20%", left: "40%" },
        { top: "45%", left: "55%" },
    ];

    // Cache DOM elements
    const titlesContainer = document.querySelector(".titles");
    const imagesContainer = document.querySelector(".images");
    const moveDistance = window.innerWidth * 3;

    // Create cards
    for (let i = 1; i <= 10; i++) {
        const card = document.createElement("div");
        card.className = `card card-${i}`;

        const img = document.createElement("img");
        img.src = `./assets/img${i}.jpg`;
        img.alt = `Image ${i}`;
        card.appendChild(img);

        const position = cardPositions[i - 1];
        card.style.top = position.top;
        card.style.left = position.left;

        imagesContainer.appendChild(card);
    }

    // Cache elements AFTER creation
    const cards = document.querySelectorAll(".card");
    const titleElements = document.querySelectorAll(".title");

    // Cache title children once
    const titleData = [];
    titleElements.forEach(title => {
        titleData.push({
            title1: title.querySelector(".title-1"),
            title2: title.querySelector(".title-2"),
            title3: title.querySelector(".title-3")
        });
    });

    // Initialize cards
    cards.forEach(card => {
        gsap.set(card, {
            z: -50000,
            scale: 0
        });
    });

    // Pre-calculate staggers
    const staggers = [];
    for (let i = 0; i < cards.length; i++) {
        staggers.push(i * 0.075);
    }

    ScrollTrigger.create({
        trigger: ".sticky",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        scrub: 1,

        onUpdate: (self) => {
            // Move titles container
            gsap.set(titlesContainer, {
                x: -moveDistance * self.progress
            });

            const velocity = self.getVelocity ? self.getVelocity() : 0;
            const normalizedVelocity = velocity / Math.abs(velocity) || 0;
            const currentSpeed = Math.min(Math.abs(velocity / 500), 30);
            const isAtEdge = self.progress <= 0 || self.progress >= 1;

            // Update titles (using cached data)
            for (let i = 0; i < titleData.length; i++) {
                const { title1, title2, title3 } = titleData[i];

                if (isAtEdge) {
                    gsap.to([title1, title2], {
                        xPercent: -50,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                    });
                } else {
                    const baseOffset = normalizedVelocity * currentSpeed;

                    gsap.to(title1, {
                        xPercent: -50,
                        x: baseOffset * 4,
                        duration: 0.2,
                        overwrite: "auto"
                    });

                    gsap.to(title2, {
                        xPercent: -50,
                        x: baseOffset * 2,
                        duration: 0.2,
                        overwrite: "auto"
                    });
                }

                gsap.set(title3, {
                    xPercent: -50,
                    x: 0
                });
            }

            // Update cards (using cached staggers)
            cards.forEach((card, index) => {
                const progress = Math.max(0, Math.min(1, (self.progress - staggers[index]) * 3));
                const targetZ = index === cards.length - 1 ? 1500 : 2000;

                gsap.set(card, {
                    z: -50000 + (targetZ + 50000) * progress,
                    scale: Math.min(1, progress * 10)
                });
            });
        }
    });
});
