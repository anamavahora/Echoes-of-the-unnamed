const rooms = [
  {
    title: "The Backward Clock",
    description: "You see a clock ticking in reverse. Time feels... fluid.",
    fragments: ["A burnt photo", "A broken watch", "A name scratched out"]
  },
  {
    title: "The Mirror Hall",
    description: "Each mirror reflects a different version of you.",
    fragments: ["A child’s drawing", "A whisper in your head", "The 'Other' stares at you"]
  },
  {
    title: "The Static Garden",
    description: "Flowers buzz with static. Nothing is natural here.",
    fragments: ["A glitched butterfly", "A red key", "A memory loop"]
  }
];

const endings = {
  trueSelf: {
    title: "You Remember",
    text: "You were never lost. You were buried in too many versions of yourself."
  },
  forgotten: {
    title: "Memory Wiped",
    text: "You chose the wrong fragments. Your identity dissolves into the grid."
  },
  shadowMerge: {
    title: "You Are the Other",
    text: "You were the voice whispering lies all along..."
  }
};

let currentRoom = 0;
let foundFragments = [];

function startGame() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("room").classList.remove("hidden");
  document.getElementById("bgAudio").play();
  loadRoom();
}

function loadRoom() {
  const room = rooms[currentRoom];
  document.getElementById("roomTitle").innerText = room.title;
  document.getElementById("roomDescription").innerText = room.description;
  const container = document.getElementById("fragments");
  container.innerHTML = "";
  room.fragments.forEach((frag, i) => {
    const btn = document.createElement("button");
    btn.innerText = frag;
    btn.onclick = () => collectFragment(frag, btn);
    container.appendChild(btn);
  });
  document.getElementById("nextButton").classList.add("hidden");
}

function collectFragment(frag, btn) {
  foundFragments.push(frag);
  btn.disabled = true;
  btn.style.opacity = "0.5";
  if (document.querySelectorAll("#fragments button:disabled").length >= 2) {
    document.getElementById("nextButton").classList.remove("hidden");
  }
}

function nextRoom() {
  currentRoom++;
  if (currentRoom >= rooms.length) {
    showEnding();
  } else {
    loadRoom();
  }
}

function showEnding() {
  document.getElementById("room").classList.add("hidden");
  document.getElementById("ending").classList.remove("hidden");

  let ending;
  if (foundFragments.includes("A name scratched out") && foundFragments.includes("The 'Other' stares at you")) {
    ending = endings.shadowMerge;
  } else if (foundFragments.length >= 6) {
    ending = endings.trueSelf;
  } else {
    ending = endings.forgotten;
  }

  document.getElementById("endingTitle").innerText = ending.title;
  document.getElementById("endingText").innerText = ending.text;
}
