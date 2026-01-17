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


const profileBtn = document.getElementById("profile");
const logoutBtn = document.getElementById("logout-section");

profileBtn.addEventListener("click", () => {
  logoutBtn.classList.toggle("hidden");
})


//--------------------------- single page application code --------------------------------------------------------------------------

document.querySelectorAll("a[data-page]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.currentTarget.getAttribute("data-page");
    loadPage(page);
  });
});



document.addEventListener("DOMContentLoaded" , () => {
  loadPage("home");
});


function loadPage(page) {
  fetch(`/components/${page}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
    //   initPage(page);
    });
}

