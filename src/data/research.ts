export type Film = {
  src: string;
  poster: string;
  caption: string;
};

export type Still = {
  src: string;
  alt: string;
  caption: string;
};

export type Block = {
  title: string;
  href?: string;
  meta?: string;
  note?: string;
  text: string;
  films?: Film[];
  stills?: Still[];
};

export type Stat = {
  value: string;
  label: string;
};

export type StoryBeat = {
  heading: string;
  take?: string;
  paras?: string[];
  points?: string[];
  stats?: Stat[];
  film?: Film;
  still?: Still;
  stills?: Still[];
};

export type Cite = {
  title: string;
  href?: string;
  meta: string;
  note?: string;
};

export type Area = {
  slug: string;
  title: string;
  lede: string;
  story?: StoryBeat[];
  cites?: Cite[];
  blocks?: Block[];
};

export const areas: Area[] = [
  {
    slug: "crash-risk",
    title: "Real-time Crash Risk Estimation",
    lede: "Crash risk over minutes, from the tail of near-misses, not from a yearly crash count.",
    story: [
      {
        heading: "What I have done",
        take: "A Bayesian hierarchical extreme-value model turns the worst conflict in a short block into a return level you can put in a router or a signal.",
        stats: [
          { value: "2 → 38", label: "of 47 Athens sites hazardous: average vs peak" },
          { value: "~¾", label: "of site-level variation is spatial spillover" },
          { value: "84%", label: "of cyclist crash risk at intersections, Boston AV probes" },
        ],
        points: [
          "Sites that look fine on a yearly map can be the ones you would treat in the next twenty minutes.",
          "Neighbouring intersections are not independent; ranking a network as if they were changes who you treat first.",
          "Autonomous-vehicle probes can stand in for a camera grid. The clip is one of those probes.",
        ],
        film: {
          src: "/research/probes.mp4",
          poster: "/research/probes.jpg",
          caption: "Boston AV probe. Trajectories around the vehicle are scored for short-term crash risk.",
        },
      },
      {
        heading: "Why it matters",
        take: "Safety becomes a live input, not a post-hoc audit.",
        points: [
          "Crashes are tail events. Averaging conflicts washes out the part that matters.",
          "A return level on a link or a signal can be minimized by a router or put in a controller reward.",
          "Drones, cameras, and AV fleets already produce the trajectories. The missing piece is a calibrated tail, not more video.",
        ],
      },
      {
        heading: "Where this is going",
        take: "A crash-risk object a fleet, a city, or an AV stack can query at the timescale they actually control on.",
        points: [
          "Network-wide, multi-horizon forecasting with Niu, Haque, and Sayed: not only where risk is, but where it is going.",
          "Routing and signals are the first two consumers. Perception is how conflicts get into the model.",
        ],
      },
    ],
    cites: [
      {
        title: "Dynamic identification of short-term and longer-term hazardous locations using a conflict-based real-time extreme value safety model",
        href: "https://doi.org/10.1016/j.amar.2022.100262",
        meta: "Ghoul, Sayed, and Fu. Analytic Methods in Accident Research, 2023.",
      },
      {
        title: "Cyclist safety assessment using autonomous vehicles",
        href: "https://doi.org/10.1016/j.aap.2025.107923",
        meta: "Ghoul and Sayed. Accident Analysis and Prevention, 2025.",
      },
      {
        title: "Incorporating spatial effects into Bayesian extreme value models for network crash risk estimation",
        href: "https://doi.org/10.1080/23249935.2026.2669212",
        meta: "Ghoul, Niu, and Sayed. Transportmetrica A: Transport Science, 2026.",
      },
      {
        title: "Network-wide multi-horizon probabilistic crash risk forecasting: A Bayesian hierarchical marked point process model with spatial dependence",
        href: "https://doi.org/10.1016/j.amar.2026.100441",
        meta: "Niu, Ghoul, Haque, and Sayed. Analytic Methods in Accident Research, 2026.",
      },
    ],
  },
  {
    slug: "routes",
    title: "Routing & Navigation",
    lede: "An ordinary router can look for the safest path, not only the fastest, if crash risk is a link cost.",
    story: [
      {
        heading: "What I have done",
        take: "Route crash risk is the time-weighted sum of the crash risk on the links. No new solver. A honest risk map.",
        stats: [
          { value: "22.8%", label: "safer: safest vs fastest, Athens, every OD, every 20 min" },
          { value: "11%", label: "faster: fastest vs safest on the same set" },
        ],
        points: [
          "A forecast route scores each link at the time the vehicle is expected to reach it.",
          "A rolling route re-plans at intersections. In the clip, the direct street’s risk rises and the plan turns.",
        ],
        film: {
          src: "/research/navigate.mp4",
          poster: "/research/navigate.jpg",
          caption: "Red is the abandoned plan. Blue is the route the vehicle takes.",
        },
      },
      {
        heading: "Why it matters",
        take: "Fleets, AV stacks, and navigation products already have a fastest route. They need a cost that means crash risk.",
        points: [
          "You pay for the minutes you spend on a link, at the risk that link has while you are on it.",
          "A static snapshot understates that. Forecast plus rolling replan is what you would ship.",
          "If an AV fleet estimates cyclist risk as it drives, you do not need a city-wide camera program to offer a safer bike route.",
        ],
      },
      {
        heading: "Where this is going",
        take: "Treat it as a fleet problem, and as a cost for cyclists and pedestrians.",
        points: [
          "The safest path for one vehicle is not independent of the others.",
          "The rolling plan has to be cheap enough to recompute at every junction.",
        ],
      },
    ],
    cites: [
      {
        title: "Real-time safest route identification: Examining the trade-off between safest and fastest routes",
        href: "https://doi.org/10.1016/j.amar.2023.100277",
        meta: "Ghoul, Sayed, and Fu. Analytic Methods in Accident Research, 2023.",
      },
      {
        title: "Cyclist safety assessment using autonomous vehicles",
        href: "https://doi.org/10.1016/j.aap.2025.107923",
        meta: "Ghoul and Sayed. Accident Analysis and Prevention, 2025.",
      },
    ],
  },
  {
    slug: "signals",
    title: "Signal Optimization",
    lede: "Most urban delay, and a large share of urban crashes, sit at intersections. A return level over minutes lets you change the light, the speed, or the lane in the same loop.",
    story: [
      {
        heading: "Why intersections",
        take: "ITS is how you cut delay and crash risk without pouring asphalt. Yearly crash counts cannot sit in a controller. A return level can.",
        stats: [
          { value: "78%", label: "of 947 urban areas had more delay in 2023 (INRIX)" },
          { value: "42 h", label: "lost to congestion by the typical U.S. driver" },
          { value: "1.19 M", label: "road deaths a year (WHO)" },
          { value: "45%", label: "of BC collisions occur at intersections" },
        ],
        points: [
          "A signal, a variable speed limit, a GLOSA advisory, and a counterflow lane are all decisions: they assign time or space for the next few minutes.",
          "In the EU, 19% of 2023 road fatalities were at junctions.",
        ],
      },
      {
        heading: "What I have done",
        take: "Soft actor-critic on a three-signal UBC corridor, reward = delay + return level.",
        stats: [
          { value: "−19%", label: "delay, multi-agent vs existing plan" },
          { value: "−14%", label: "return level, same comparison" },
          { value: "9–23%", label: "fewer conflicts, 2021 speed-advisory tests" },
        ],
        points: [
          "2021: coupled signal and vehicle, then GLOSA-style speed advisories at isolated intersections.",
          "PhD: cameras from Rogers, calibrated Wesbrook Mall model, University / Agronomy / Thunderbird.",
          "Industry: camera-based multi-agent control with Rogers and the BC Ministry of Transportation.",
        ],
        still: {
          src: "/research/corridor.jpg",
          alt: "Map of Wesbrook Mall at UBC with three numbered signalized intersections and photos of each approach.",
          caption: "The paper corridor: Wesbrook Mall at University Boulevard, Agronomy Road, and Thunderbird Boulevard.",
        },
      },
      {
        heading: "Architecture",
        take: "Cameras → trajectories → EVT return level → SAC. The action is 120 seconds of green extensions, not a phase menu.",
        points: [
          "Single-agent: one policy, one corridor reward. Coordination is implicit.",
          "Multi-agent: shared state, a policy and a local reward at each light. Better on this corridor; can also dump delay onto a neighbour.",
          "SAC because the action is continuous and the reward is noisy.",
        ],
        stills: [
          {
            src: "/research/signal-sarl.png",
            alt: "Single soft actor-critic agent writing a 120-second plan for three signals, scored by one shared reward.",
            caption: "Single-agent SAC.",
          },
          {
            src: "/research/signal-marl.png",
            alt: "Three soft actor-critic agents sharing corridor state, each with its own reward.",
            caption: "Multi-agent SAC.",
          },
        ],
      },
      {
        heading: "GLOSA, speed limits, and counterflow",
        take: "The light assigns time. Speed advisories and reversible lanes assign speed and space. Same return level can score all three.",
        points: [
          "GLOSA: tell the vehicle how fast to arrive for the green.",
          "Variable speed limits: change the approach speed from the infrastructure side. That is the 2021 trajectory paper, not a separate topic.",
          "Counterflow lanes: borrow a lane in the peak direction. Cities already flip them on a clock. They could flip them on a live delay and safety score.",
        ],
      },
      {
        heading: "Scaling the network",
        take: "Three signals are a corridor. A city is hundreds. Wesbrook does not copy-paste.",
        points: [
          "Non-stationarity: every agent is part of every other agent’s environment. Credit for a delay two lights downstream is muddy.",
          "Partial observability: cameras occlude; the return level is a posterior, not a meter.",
          "Action space: continuous greens × speed limits × lane reversals. Continuous control and MAPPO (with Sahu) are the papers that try to leave the toy action space.",
          "Next: one loop over signals, GLOSA or VSL, and reversible lanes, so a new intersection can share a policy without poisoning the rest.",
        ],
      },
    ],
    cites: [
      {
        title: "Real-time signal-vehicle coupled control: An application of connected vehicle data to improve intersection safety",
        href: "https://doi.org/10.1016/j.aap.2021.106389",
        meta: "Ghoul and Sayed. Accident Analysis and Prevention, 2021.",
      },
      {
        title: "Real-time safety optimization of connected vehicle trajectories using reinforcement learning",
        href: "https://doi.org/10.3390/s21113864",
        meta: "Ghoul and Sayed. Sensors, 2021.",
      },
      {
        title: "Real-time safety optimization for signalized corridors using real-time crash risk and reinforcement learning",
        href: "https://doi.org/10.3138/csce-2025-0612",
        meta: "Ghoul and Sayed. CSCE Winnipeg 2025 proceedings, 2026.",
      },
      {
        title: "Corridor-level signal optimization with maximum a posteriori policy optimisation",
        meta: "Sahu, Ghoul, and Sayed.",
        note: "Under review",
      },
      {
        title: "Continuous-control reinforcement learning for safety-based signal optimization",
        meta: "Ghoul and Sayed.",
        note: "Under review",
      },
    ],
  },
  {
    slug: "perception",
    title: "Computer vision and perception",
    lede: "Computer vision is used to extract data from videos. This includes data augmentation techniques using DCGANs as well as 3D scene reconstruction, automatic homography, and vision-language models for scene understanding.",
    blocks: [
      {
        title: "Helmet violations",
        href: "https://doi.org/10.3390/a17050202",
        meta: "Enforcing traffic safety: a deep learning approach for detecting motorcyclists’ helmet violations using YOLOv8 and deep convolutional generative adversarial network-generated images. Shoman, Ghoul, Lanzaro, Alsharif, Gargoum, and Sayed. Algorithms, 2024.",
        text: "A detector for motorcyclists without helmets, trained with generated images where real examples were scarce.",
      },
      {
        title: "Proactive safety assessment",
        meta: "UBC Bureau of Intelligent Transportation Systems and Mobility.",
        text: "A pipeline pulls road-user trajectories out of video and scores near misses with PET, MTTC, TTC, and DRAC. Provincial agencies and the BC Centre for Disease Control have used the tools in safety audits.",
      },
    ],
  },
  {
    slug: "air-mobility",
    title: "Advanced air mobility",
    lede: "The same extreme-value idea, off the road: airborne collision risk for eVTOL aircraft in dense airspace.",
    blocks: [
      {
        title: "eVTOL airborne collision risk in dense airspace using a simulation-based extreme value framework",
        meta: "Ghoul and Sayed. In preparation, 2026.",
        note: "Not yet published",
        text: "A working paper with Sayed. The figures are from that draft.",
        stills: [
          {
            src: "/research/evt-aircraft.jpg",
            alt: "A white air-taxi aircraft with four rotors on a pad, in front of a block model of a city.",
            caption: "The air-taxi used to fly candidate trajectories in the working paper.",
          },
          {
            src: "/research/evt-city.jpg",
            alt: "A grey block model of a city from two angles, beside a pale overhead map of the same streets.",
            caption: "The city model the trajectories are flown through.",
          },
          {
            src: "/research/evt-zones.jpg",
            alt: "A map of the western University of British Columbia campus divided into eight numbered zones.",
            caption: "Eight zones on the study area used to place the flights.",
          },
          {
            src: "/research/evt-separation.jpg",
            alt: "A line chart of value at risk against strategic separation distance, with a band for a shorter release interval.",
            caption: "How value at risk changes as the required separation between aircraft grows.",
          },
        ],
      },
    ],
  },
];
