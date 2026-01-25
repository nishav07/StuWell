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

function loadPage(page) {
    fetch(`/components/${page}`)
      .then(res => res.text())
      .then(html => {
        document.getElementById("content").innerHTML = html;
        initPage(page);
      });
  }

  function initPage(p){
    if(p == "home"){
      funx();
    }
}


document.querySelectorAll("a[data-page]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.currentTarget.getAttribute("data-page");
    loadPage(page);
  });
});



document.addEventListener("DOMContentLoaded" , () => {
  loadPage("home");

  if(document.getElementById("profile-modal-overlay") ) {
    initProfileModal()
  }
});


function loadPage(page) {
  fetch(`/components/${page}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      initPage(page);
    });
}

function initPage(p){
  if(p == "home"){
    funx();
    return
  } else {
   
  }
}

//-------------------------------------------------- modal verification page----------------------------------------------------------------------------

function showToast(message, type = "success", time = 2000) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-msg");

  msg.innerText = message;


  toast.classList.remove("hidden", "opacity-100", "-translate-y-1/2");
  toast.classList.add("opacity-0", "-translate-y-20");


  toast.classList.remove("bg-green-600", "bg-red-600");
  toast.classList.add(type === "success" ? "bg-teal-600" : "bg-amber-600");


  toast.offsetHeight;


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
let steps;
let progress;
function initProfileModal(){
  currentStep = 0;
  steps = document.querySelectorAll("#steps .step");
   progress = document.getElementById("progress");
  updateUI();
}

  // let currentStep = 0;
  // const steps = document.querySelectorAll("#steps .step");
  // const progress = document.getElementById("progress");

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


  //  async function submitDailyData() {
  //   const data = {
  //     water: document.getElementById("water").value,
  //     junkFood: document.getElementById("junkFood").value,
  //     foodTye: document.getElementById("foodType").value,
  //     studyHr: document.getElementById("studyHr").value,
  //     mood: document.getElementById("mood").value,
  //     symptoms: document.getElementById("symptoms").value,
  //     sleepHr: document.getElementById("sleepHr").value,
  //     screenTime: document.getElementById("screentime").value,
  //   };

  //   console.log(data);
    
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

  //    updateUI();
    
  // }


  





  //-----------------------------------------------------Set Up for input modal-----------------------------------------------------------------------------------------

  let DcurrentStep = 0;
  let daily = [];
  let Dprogress;


  
  
  function funx(){

  DcurrentStep = 0;  
  daily = document.querySelectorAll("#dailyInput .daily");
  Dprogress = document.getElementById("Dprogress");

    if(!daily.length || !Dprogress) {
    console.log("Daily modal not found (already submitted today)");
    return; 
  }

  DupdateUI();
   }


     function DupdateUI() {

        if(!daily.length || !Dprogress) {
    console.log("Daily modal not found (already submitted today)");
    return; 
  }


    daily.forEach((step, index) => {
      step.classList.remove(
        "translate-x-full",
        "-translate-x-full",
        "opacity-0"
      );

      if (index === DcurrentStep) {
        step.classList.add("translate-x-0");
      } else if (index < DcurrentStep) {
        step.classList.add("-translate-x-full", "opacity-0");
      } else {
        step.classList.add("translate-x-full", "opacity-0");
      }
    });

    Dprogress.style.width =
      ((DcurrentStep + 1) / daily.length) * 100 + "%";
  }


   function DnextStep() {
  const stepEl = daily[DcurrentStep];
  
  if (!stepEl) {
    return console.error("Step element not found:", DcurrentStep);
  }

  const el = stepEl.querySelector("input, select");

  if (!el) {
    return console.error("No input or select found in step", DcurrentStep);
  }

  const val = el.value;

  if (!val) {
    showToast("Input can't be empty",'err');
    return
  }

  if (DcurrentStep < daily.length - 1) {
    DcurrentStep++;
    DupdateUI();
  }
}

   function DbackStep() {
    if (DcurrentStep > 0) {
      DcurrentStep--;
       showToast("Input can't be empty");
      DupdateUI();
    }
  }
   
  function DcloseProfileModal() {
    document.getElementById("D-profile-modal-overlay").remove();
  }


    async function submitDailyData() {
    const data = {
      water: document.getElementById("water").value,
      junkFood: document.getElementById("junkFood").value,
      foodType: document.getElementById("foodType").value,
      studyHr: document.getElementById("studyHr").value,
      mood: document.getElementById("mood").value,
      symptoms: document.getElementById("symptoms").value,
      sleepHr: document.getElementById("sleepHr").value,
      screenTime: document.getElementById("screentime").value,
    };

    console.log(data);
    
showLoader();

const res =  await fetch("/input", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        water:data.water,
        junkFood: data.junkFood,
        foodType: data.foodType,
        studyHr : data.studyHr,
        mood: data.mood,
        symptoms: data.symptoms,
        sleepHr: data.sleepHr,
        screenTime: data.screenTime
      })
    });

     console.log("Profile Data:", data);
   
    DcloseProfileModal();

    if(res.status === 200){
      hideLoader();
      showToast("data submitted");
      
      setTimeout(() => {
      window.location.href = "/dashboard";
      },500);
    }

   
    
  }