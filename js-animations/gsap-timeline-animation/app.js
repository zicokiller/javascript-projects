const allRonds = document.querySelectorAll(".rond");
const allBoxes = document.querySelectorAll(".box");

// Création du container pour l'anim au scroll
const controller = new ScrollMagic.Controller();

allBoxes.forEach(box => {
// ici, chaque box itère sur les ronds
    for (i = 0; i < allRonds.length; i++) {
    // pour check celui qui a le même attribut que lui
        if (allRonds[i].getAttribute("data-anim") === box.getAttribute("data-anim")) {
        // si oui, l'anim se lance et display la box
            let tween = gsap.from(box, {y: -50, opacity: 0, duration: 0.5})
        // création de la scène
            let scene = new ScrollMagic.Scene({
                triggerElement: allRonds[i],
                reverse: true
            })
            .setTween(tween) // déclenche l'anim tween
            .addIndicators() // fais voir des indications
            .addTo(controller)
        }
    }
})

