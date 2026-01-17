 function showLoader() {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    loader.classList.add("opacity-100");
  }

  function hideLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
  }



const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", () => {


    navItems.forEach(i => {
      i.classList.remove(
        "text-teal-400",
        "scale-110",
        "-translate-y-1"
      );
    });

    item.classList.add(
      "text-teal-400",
      "scale-110",
      "-translate-y-1"
    );
  });
});
