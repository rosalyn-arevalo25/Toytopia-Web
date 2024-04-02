(function () {
    
    let slides = document.querySelectorAll(".slide");
    let controls = document.querySelectorAll(".slider-control");
    let numOfSlides = slides.length;
    let slidingAT = 1300; // sync this with scss letiable
    let slidingBlocked = false;

    [].slice.call(slides).forEach(function (el, index) {
        let i = index + 1;
        el.classList.add("slide-" + i);
        el.dataset.slide = i;
    });

    [].slice.call(controls).forEach(function (el) {
        el.addEventListener("click", controlClickHandler);
    });

    function controlClickHandler() {

        if (slidingBlocked) return;
        slidingBlocked = true;

        let control = this;
        let isRight = control.classList.contains("right");
        let curActive = document.querySelector(".slide.active");
        let index = +curActive.dataset.slide;
        isRight ? index++ : index--;

        if (index < 1) index = numOfSlides;
        if (index > numOfSlides) index = 1;
        let newActive = document.querySelector(".slide-" + index);

        control.classList.add("rotation");
        curActive.classList.remove("active", "active-prev");
        document.querySelector(".slide.prev").classList.remove("prev");

        newActive.classList.add("active");
        if (!isRight) newActive.classList.add("active-prev");

        let prevIndex = index - 1;
        if (prevIndex < 1) prevIndex = numOfSlides;

        document.querySelector(".slide-" + prevIndex).classList.add("prev");

        setTimeout(function () {
            control.classList.remove("rotation");
            slidingBlocked = false;
        }, slidingAT * 0.75);
    }


})();