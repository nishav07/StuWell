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
        "text-amber-400",
        "scale-110",
        "-translate-y-1"
      );
    });

    item.classList.add(
      "text-amber-400",
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



//-------------------------------------------------- modal verification page----------------------------------------------------------------------------

  let currentStep = 0;
  const steps = document.querySelectorAll("#steps .step");
  const progress = document.getElementById("progress");

  function updateUI() {
    steps.forEach((step, index) => {
      step.classList.remove(
        "translate-x-full",
        "-translate-x-full",
        "opacity-0"
      );

      if (index === currentStep) {
        step.classList.add("translate-x-0");
      } else if (index < currentStep) {
        step.classList.add("-translate-x-full", "opacity-0");
      } else {
        step.classList.add("translate-x-full", "opacity-0");
      }
    });

    progress.style.width =
      ((currentStep + 1) / steps.length) * 100 + "%";
  }

  function nextStep() {
    const el = steps[currentStep].querySelector("input","select");
     if (!el) {
    return alert("No input/select found in this step 😅"); // debug
  }
    const val = el.value;
    if(!val){
      return alert("input bhar na bhaiiiiii");
    }
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateUI();
    }
  }

  function backStep() {
    if (currentStep > 0) {
      currentStep--;
      updateUI();
    }
  }

  function closeProfileModal() {
    document.getElementById("profile-modal-overlay").remove();
  }

  function submitData() {
    const data = {
      age: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      weight: document.getElementById("weight").value,
      class: document.getElementById("userClass").value,

    };

    console.log("Profile Data:", data);
    alert("Profile saved successfully ✅");
    closeProfileModal();
  }

  updateUI();