const flash = document.getElementById("flash");

  if (flash) {
    setTimeout(() => {
      flash.classList.remove("opacity-0", "translate-y-6");
    }, 50);


    setTimeout(() => {
      flash.classList.add("opacity-0", "translate-y-6");
    }, 3000);
  }