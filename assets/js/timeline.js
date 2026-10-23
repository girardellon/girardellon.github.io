/**
 * Timeline data and behaviour (home page).
 *
 * Each key of TL matches a data-tl attribute in index.html.
 * Hovering (desktop) or tapping (touch) a block shows its details in #tl-panel.
 */

/* Timeline entries: education, experience and projects */
var TL = {
  "diploma": {
    "title": "Technical Diploma (Electronics &amp; Automation)",
    "sub": "ITIS Alessandro Rossi, Italy",
    "dates": "Sep 2018 — Jun 2023",
    "desc": "Specialization in electronics, electrotechnics and industrial automation.",
    "projects": [
      {
        "name": "Smart Warehouse: Automated Material Dispensing",
        "href": "projects/smart-warehouse.html"
      },
      {
        "name": "BerryBot: Automated Strawberry Harvesting System",
        "href": "projects/berrybot.html"
      },
      {
        "name": "ChessBot: Automated 3-Axis Chess-Playing Robot",
        "href": "projects/chessbot.html"
      }
    ]
  },
  "crete": {
    "title": "Erasmus+ Exchange Program",
    "sub": "Heraklion, Greece",
    "dates": "Jul 2022",
    "desc": "Short-term technical exchange program. Completed a professional internship at Dimitriadis Marine Service, gaining practical experience in an international environment.",
    "projects": []
  },
  "bsc": {
    "title": "BSc Automation and Systems Engineering",
    "sub": "University of Padua, Italy",
    "dates": "Sep 2023 — Jul 2026",
    "desc": "Focused on control systems, robotics, and machine learning, with strong foundations in mathematics, electronics, and computer engineering.",
    "projects": [
      {
        "name": "Redundancy Resolution: Kinematic Control for Franka Panda",
        "href": "projects/redundancy-control.html"
      },
      {
        "name": "Tactile-to-Visual Representation Learning for VLA Models",
        "href": "projects/bsc-thesis.html"
      }
    ]
  },
  "bcn": {
    "title": "Erasmus+ Exchange Program",
    "sub": "UPC Barcelona, Spain",
    "dates": "Sep 2025 — Jan 2026",
    "desc": "Semester focused on robotics and control engineering, with practical experience in mobile robotics and MATLAB applications.",
    "projects": [
      {
        "name": "Multi-Robot Warehouse Optimization Simulator",
        "href": "projects/warehouse-simulator.html"
      }
    ]
  },
  "msc": {
    "title": "MSc Control Systems Engineering",
    "sub": "University of Padua, Italy",
    "dates": "Sep 2026 — Jul 2028",
    "desc": "Focused on advanced robot control, reinforcement learning, computer vision, and deep learning.",
    "projects": []
  },
  "mep": {
    "title": "Technical Office Specialist",
    "sub": "MEP Solution Srl, Italy",
    "dates": "Nov 2023 — Present",
    "desc": "Worked on the design and technical documentation of electrical and photovoltaic systems. Involved in technical analysis and cost estimation.",
    "projects": []
  },
  "robotac": {
    "title": "Robotics Research Intern",
    "sub": "RoboTac, Italy",
    "dates": "Feb 2026",
    "desc": "Worked on ROS2-based robotic systems in a research environment. Contributed to robot system integration, motion planning, and experimental validation.",
    "projects": []
  },
  "p-smart-warehouse": {
    "title": "Smart Warehouse: Automated Material Dispensing",
    "sub": "Institutional SCRUM Project · ITIS Alessandro Rossi",
    "dates": "Apr 2021 — May 2021",
    "desc": "An automated carousel and dosing system designed to streamline raw material selection and eliminate human error through an integrated Archimedes screw.",
    "projects": [],
    "open": "projects/smart-warehouse.html"
  },
  "p-berrybot": {
    "title": "BerryBot: Automated Strawberry Harvesting System",
    "sub": "Siemens Automation Olympics 2022",
    "dates": "Jan 2022 — May 2022",
    "desc": "An automated greenhouse robotic system that leverages computer vision and an anthropomorphic arm to delicately harvest strawberries.",
    "projects": [],
    "open": "projects/berrybot.html"
  },
  "p-chessbot": {
    "title": "ChessBot: Automated 3-Axis Chess-Playing Robot",
    "sub": "Personal Project",
    "dates": "Oct 2022 — Nov 2022",
    "desc": "A 3-axis Cartesian robot seamlessly integrating a Siemens PLC with a Python-based chess engine, translating game logic into precise movements.",
    "projects": [],
    "open": "projects/chessbot.html"
  },
  "p-warehouse-simulator": {
    "title": "Multi-Robot Warehouse Optimization Simulator",
    "sub": "Course \"MATLAB and its application in engineering\" · UPC Barcelona",
    "dates": "Dec 2025",
    "desc": "A comprehensive MATLAB simulation framework featuring custom-built path planning algorithms, priority-based collision avoidance, and energy management.",
    "projects": [],
    "open": "projects/warehouse-simulator.html"
  },
  "p-redundancy-control": {
    "title": "Redundancy Resolution: Kinematic Control for Franka Panda",
    "sub": "Course \"Introduction to Robotics\" · University of Padua",
    "dates": "Jun 2026",
    "desc": "Kinematic control framework leveraging CLIK and null-space projection to optimize internal arm posture without disturbing end-effector tracking.",
    "projects": [],
    "open": "projects/redundancy-control.html"
  },
  "p-bsc-thesis": {
    "title": "Tactile-to-Visual Representation Learning for VLA Models",
    "sub": "BSc Thesis Project · University of Padua",
    "dates": "Jul 2026",
    "desc": "A multimodal representation framework projecting DIGIT optical tactile signals into the frozen visual latent space of a Vision-Language-Action model.",
    "projects": [],
    "open": "projects/bsc-thesis.html"
  }
};

(function () {
  "use strict";

  var panel = document.getElementById("tl-panel");
  var items = document.querySelectorAll("[data-tl]");
  var scroller = document.getElementById("tl-scroll");

  // True only on devices with a precise, hover-capable pointer (mouse / trackpad)
  var canHover = window.matchMedia &&
    window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* Render the details of an item in the panel and mark it as active */
  function show(el) {
    var d = TL[el.getAttribute("data-tl")];
    if (!d || !panel) return;

    var html = "<h3>" + d.title + "</h3>" +
      '<p class="tl-sub">' + d.sub + " · " + d.dates + "</p>" +
      "<p>" + d.desc + "</p>";

    // Related projects (education blocks)
    if (d.projects && d.projects.length) {
      html += '<div class="tl-rel"><strong>Related Projects</strong>';
      d.projects.forEach(function (p) {
        html += '<a href="' + p.href + '">' + p.name + " →</a>";
      });
      html += "</div>";
    }

    // Direct link to the project page (project dots)
    if (d.open) {
      html += '<div class="tl-rel"><a href="' + d.open + '">Open project →</a></div>';
    }

    panel.innerHTML = html;

    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("is-active");
    }
    el.classList.add("is-active");
  }

  /* Wire up every timeline item */
  for (var i = 0; i < items.length; i++) {
    (function (el) {
      // Hover opens the panel on desktop only
      if (canHover) {
        el.addEventListener("mouseenter", function () { show(el); });
      }

      // Keyboard focus opens the panel too
      el.addEventListener("focus", function () { show(el); });

      // Desktop: project dots navigate normally.
      // Touch: the first tap shows the panel instead of following the link.
      el.addEventListener("click", function (ev) {
        if (el.tagName === "A" && canHover) return;
        ev.preventDefault();
        show(el);
      });
    })(items[i]);
  }

  /* Initial hint text */
  if (panel) {
    panel.innerHTML = '<p class="tl-hint">' + (canHover
      ? "Hover over a timeline block to see details and related projects."
      : "Tap a timeline block to see details and related projects.") + "</p>";
  }

  /* Scroll the timeline so the recent years are centred on small screens */
  if (scroller) {
    scroller.scrollLeft = scroller.scrollWidth * 0.55 - scroller.clientWidth / 2;
  }
})();
