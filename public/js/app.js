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

function showToast(message, type = "success", time = 2000) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-msg");

  msg.innerText = message;

  // reset
  toast.classList.remove("hidden", "opacity-100", "-translate-y-1/2");
  toast.classList.add("opacity-0", "-translate-y-20");

  // bg color
  toast.classList.remove("bg-green-600", "bg-red-600");
  toast.classList.add(type === "success" ? "bg-teal-600" : "bg-amber-600");

  // force repaint
  toast.offsetHeight;

  // show
  toast.classList.remove("opacity-0", "-translate-y-20");
  toast.classList.add("opacity-100", "-translate-y-1/2");

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0", "-translate-y-20");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 500);
  }, time);
}



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
  const stepEl = steps[currentStep];
  
  if (!stepEl) {
    return console.error("Step element not found:", currentStep);
  }

  const el = stepEl.querySelector("input, select");

  if (!el) {
    return console.error("No input or select found in step", currentStep);
  }

  const val = el.value;

  if (!val) {
    showToast("Input can't be empty",'err');
    return
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    updateUI();
  }
}


  function backStep() {
    if (currentStep > 0) {
      currentStep--;
       showToast("Input can't be empty");
      updateUI();
    }
  }

  function closeProfileModal() {
    document.getElementById("profile-modal-overlay").remove();
  }

  async function submitData() {
    const data = {
      age: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      weight: document.getElementById("weight").value,
      class: document.getElementById("userClass").value,

    };

    
showLoader();

const res =  await fetch("/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        DOB:data.age,
        gender:data.gender,
        weight:data.weight,
        academic:data.class
      })
    });

     console.log("Profile Data:", data);
   
    closeProfileModal();

    if(res.status === 200){
      hideLoader();
      showToast("data submitted");
      
      setTimeout(() => {
      window.location.href = "/dashboard";
      },500);
    }

   
    
  }


   async function submitDailyData() {
    const data = {
      water: document.getElementById("water").value,
      junkFood: document.getElementById("junkFood").value,
      foodTye: document.getElementById("foodType").value,
      studyHr: document.getElementById("studyHr").value,
      mood: document.getElementById("mood").value,
      symptoms: document.getElementById("symptoms").value,
      sleepHr: document.getElementById("sleepHr").value,
      screenTime: document.getElementById("screentime").value,
    };

    console.log(data);
    
// showLoader();

// const res =  await fetch("/update", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         DOB:data.age,
//         gender:data.gender,
//         weight:data.weight,
//         academic:data.class
//       })
//     });

    //  console.log("Profile Data:", data);
   
    // closeProfileModal();

    // if(res.status === 200){
    //   hideLoader();
    //   showToast("data submitted");
      
    //   setTimeout(() => {
    //   window.location.href = "/dashboard";
    //   },500);
    // }

   
    
  }


  

  updateUI();

