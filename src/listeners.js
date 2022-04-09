document.getElementById("more-btn").addEventListener("click", () => {
    document.getElementById("more-menu").classList.toggle("hidden");
    // add 'animate-bounce' class for 2 seconds
    document.getElementById("more-menu").classList.add("animate-bounce");
    setTimeout(() => {
        document.getElementById("more-menu").classList.remove("animate-bounce");
    }, 550);
});