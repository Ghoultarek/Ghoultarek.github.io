export const profile = {
  name: "Tarek Ghoul",
  email: "tarek.ghoul@ubc.ca",
  scholar: "https://scholar.google.com/citations?user=-vy503AAAAAJ&hl=en",
  linkedin: "https://www.linkedin.com/in/tarek-ghoul/",
  cv: "/Ghoul_Tarek_Academic_CV.pdf",
  location: "Vancouver",
};

export const nav = [
  { href: "/papers", label: "Publications" },
  { href: "/projects", label: "Projects" },
  { href: "/talks", label: "Talks" },
  { href: "/demos", label: "Demos" },
];

export const interests = [
  {
    title: "Real-time Crash Risk Estimation",
    text: "Predicting crashes over short time intervals using road-user trajectories obtained from autonomous vehicles, drones, and traffic cameras.",
    href: "/research/crash-risk",
    media: "/research/probes-card.mp4",
    poster: "/research/probes-card.jpg",
  },
  {
    title: "Routing & Navigation",
    text: "Applying real-time crash risk techniques to identify the safest and fastest routes within a network.",
    href: "/research/routes",
    media: "/research/navigate-card.mp4",
    poster: "/research/navigate-card.jpg",
  },
  {
    title: "Signal Optimization",
    text: "Signal timing can affect safety. Reinforcement learning, among other techniques, is used to optimize traffic signal timing to improve safety, mobility, and emissions.",
    href: "/research/signals",
    media: "/research/signal-card.mp4",
    poster: "/research/signal-card.jpg",
  },
];

export const news = [
  {
    when: "Mar 12, 2026",
    title: "UBC Three Minute Thesis finalist",
    text: "Named among the finalists for “Transportation Before the Crash: Real Time Crash Risk and Its Applications.”",
    href: "https://3mt.grad.ubc.ca/news/ubc-grad-students-prepare-for-3mt-finals/",
    image: "/news/3mt.jpg",
  },
  {
    when: "Apr 4, 2025",
    title: "From reaction to prevention",
    text: "UBC Civil Engineering Q&A on the 2025 Three Minute Thesis and real-time crash risk.",
    href: "https://civil.ubc.ca/from-reaction-to-prevention-reimagining-road-safety-through-data/",
    image: "/news/civil.jpg",
  },
  {
    when: "Sep 26, 2023",
    title: "Global News",
    text: "Traffic Tips on the safest-route algorithm.",
    href: "https://globalnews.ca/video/9986078/traffic-tips-new-algorithm-maps-safest-routes-for-city-drivers",
    image: "/news/global.jpg",
  },
  {
    when: "Jul 27, 2023",
    title: "Popular Science",
    text: "A mapping algorithm that steers drivers toward the safest route.",
    href: "https://www.popsci.com/technology/map-safest-route-algorithm/",
    image: "/news/popsci.jpg",
  },
  {
    when: "Jul 25, 2023",
    title: "UBC News",
    text: "New algorithm maps safest routes for city drivers.",
    href: "https://news.ubc.ca/2023/07/new-algorithm-maps-safest-routes-for-city-drivers/",
    image: "/news/ubc.jpg",
  },
];

export type Paper = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  detail?: string;
  href?: string;
  note?: string;
};

export const papers: { id?: string; heading: string; items: Paper[] }[] = [
  {
    heading: "Journal articles",
    items: [
      {
        authors: "Niu, D., Ghoul, T., Haque, Md. M., Sayed, T.",
        year: "2026",
        title: "Network-wide multi-horizon probabilistic crash risk forecasting: A Bayesian hierarchical marked point process model with spatial dependence",
        venue: "Analytic Methods in Accident Research",
        detail: "51, 100441",
        href: "https://doi.org/10.1016/j.amar.2026.100441",
      },
      {
        authors: "Ghoul, T., Niu, D., Sayed, T.",
        year: "2026",
        title: "Incorporating spatial effects into Bayesian extreme value models for network crash risk estimation",
        venue: "Transportmetrica A: Transport Science",
        detail: "1-26",
        href: "https://doi.org/10.1080/23249935.2026.2669212",
      },
      {
        authors: "Ghoul, T., Sayed, T.",
        year: "2025",
        title: "Cyclist safety assessment using autonomous vehicles",
        venue: "Accident Analysis and Prevention",
        detail: "212, 107923",
        href: "https://doi.org/10.1016/j.aap.2025.107923",
      },
      {
        authors: "Shoman, M., Ghoul, T., Lanzaro, G., Alsharif, T., Gargoum, S., Sayed, T.",
        year: "2024",
        title: "Enforcing traffic safety: A deep learning approach for detecting motorcyclists’ helmet violations using YOLOv8 and deep convolutional generative adversarial network-generated images",
        venue: "Algorithms",
        detail: "17(5), 202",
        href: "https://doi.org/10.3390/a17050202",
      },
      {
        authors: "Ghoul, T., Sayed, T., Fu, C.",
        year: "2023",
        title: "Real-time safest route identification: Examining the trade-off between safest and fastest routes",
        venue: "Analytic Methods in Accident Research",
        detail: "39, 100277",
        href: "https://doi.org/10.1016/j.amar.2023.100277",
      },
      {
        authors: "Ghoul, T., Sayed, T., Fu, C.",
        year: "2023",
        title: "Dynamic identification of short-term and longer-term hazardous locations using a conflict-based real-time extreme value safety model",
        venue: "Analytic Methods in Accident Research",
        detail: "37, 100262",
        href: "https://doi.org/10.1016/j.amar.2022.100262",
      },
      {
        authors: "Ghoul, T., Sayed, T.",
        year: "2021",
        title: "Real-time signal-vehicle coupled control: An application of connected vehicle data to improve intersection safety",
        venue: "Accident Analysis and Prevention",
        detail: "162, 106389",
        href: "https://doi.org/10.1016/j.aap.2021.106389",
      },
      {
        authors: "Ghoul, T., Sayed, T.",
        year: "2021",
        title: "Real-time safety optimization of connected vehicle trajectories using reinforcement learning",
        venue: "Sensors",
        detail: "21(11), 3864",
        href: "https://doi.org/10.3390/s21113864",
      },
    ],
  },
  {
    heading: "Conference papers",
    items: [
      {
        authors: "Ghoul, T., Sayed, T.",
        year: "2026",
        title: "Real-time safety optimization for signalized corridors using real-time crash risk and reinforcement learning",
        venue: "CSCE Winnipeg 2025 proceedings",
        detail: "Volume 4, 355-364. University of Toronto Press",
      },
      {
        authors: "Ghoul, T., Sayed, T.",
        year: "2024",
        title: "Exploring the potential of real-time crash risk-based intelligent transportation systems on urban networks",
        venue: "Proceedings of the Canadian Society for Civil Engineering Annual Conference 2024",
        detail: "15, 297-309",
      },
    ],
  },
  {
    heading: "Theses",
    items: [
      {
        authors: "Ghoul, T.",
        year: "2026",
        title: "Real-time crash risk modelling and its applications in intelligent transportation systems",
        venue: "PhD thesis, University of British Columbia",
        href: "https://doi.org/10.14288/1.0456953",
      },
      {
        authors: "Ghoul, T.",
        year: "2021",
        title: "Exploring the applications of connected vehicle data to real-time safety optimization at isolated intersections",
        venue: "MASc thesis, University of British Columbia",
        href: "https://doi.org/10.14288/1.0401847",
      },
    ],
  },
];

export const projects = [
  {
    id: "rag",
    title: "Traffic Bowl retrieval",
    where: "AutomateITE",
    text: "A retrieval pipeline over traffic-engineering questions, scored against the same models answering with no retrieval.",
    image: "/research/rag.png",
    imageAlt: "Bar chart comparing hybrid retrieval and no retrieval across language models on Traffic Bowl questions",
  },
  {
    id: "perception",
    title: "Proactive safety assessment tool",
    where: "UBC Bureau of Intelligent Transportation Systems and Mobility",
    text: "A computer-vision pipeline that pulls road-user trajectories out of video and scores near misses with PET, MTTC, TTC, and DRAC. Provincial agencies and the BC Centre for Disease Control used the tools in safety audits.",
  },
  {
    id: "signals",
    title: "Camera-based corridor signal optimization",
    where: "Rogers Communications and the BC Ministry of Transportation, 2024–2025",
    text: "A proof of concept for multi-agent reinforcement learning on a corridor, covering vehicles and pedestrians. Mitacs Accelerate award of CAD $60,000. Primary contributor to the proposal.",
  },
  {
    id: "routes",
    title: "Safest-route identification",
    where: "Published, Analytic Methods in Accident Research, 2023",
    text: "A real-time routing method that looks for the route with the lower crash risk and sets that against travel time. The fastest route and the safest route are reported as different choices.",
  },
  {
    title: "Cyclist passing distance",
    where: "Province of British Columbia",
    text: "Survival analysis of vehicle-cyclist interactions, and technical advice on minimum passing distance. The 1.5 m and 1 m recommendations were passed into the Motor Vehicle Act amendments in 2024.",
  },
  {
    title: "Improving data collection",
    where: "Transport Canada",
    text: "A technical report and presentation on traditional and emerging sensing technologies, safety applications, and practices in other jurisdictions.",
  },
  {
    title: "Rural road safety audit",
    where: "An Indigenous community in British Columbia",
    text: "Conflict analysis and a before-and-after study. Countermeasures were implemented and evaluated for safety and speeding.",
  },
  {
    title: "Pavement marking evaluation",
    where: "Provincial report",
    text: "Computer vision used to evaluate how certain pavement markings relate to safety, in support of infrastructure investment and maintenance.",
  },
];

export const talks = [
  { year: "2026", kind: "Talk", where: "ITE Canada, Victoria", title: "Can an LLM beat UBC at Traffic Bowl? The applications of large language models in transportation engineering practice." },
  { year: "2025", kind: "Poster", where: "ITE Canada, Halifax", title: "Beyond crash data: computer vision and AI for real-time traffic safety and risk prediction." },
  { year: "2025", kind: "Poster", where: "TRB Annual Meeting, Washington, DC", title: "Cyclist safety assessment using autonomous vehicles." },
  { year: "2024", kind: "Talk", where: "TAC Conference, Vancouver", title: "Real-time dynamic crash risk estimation: a departure from reactive safety approaches." },
  { year: "2024", kind: "Posters", where: "Union of BC Municipalities Conference and Rogers Communications Symposium, Vancouver", title: "Real-time proactive road safety monitoring and optimization." },
  { year: "2024", kind: "Talk", where: "CSCE, Niagara", title: "Exploring the potential of real-time crash risk-based ITS on urban networks." },
  { year: "2024", kind: "Talk", where: "ITE Canada, Hamilton", title: "Safest route or fastest route? An application of real-time dynamic crash risk." },
  { year: "2023", kind: "Talk", where: "ITE Canada, Winnipeg", title: "Real-time dynamic hazardous location identification and network monitoring system." },
  { year: "2022", kind: "Talk", where: "ITE Canada, Vancouver", title: "Real-time signal-vehicle coupled control using connected vehicle data." },
];
