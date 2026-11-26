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
  { href: "/teaching", label: "Teaching" },
  { href: "/talks", label: "Talks" },
  { href: "/awards", label: "Awards" },
];

// Home-page video reel. Add a 3MT entry here once a public recording URL exists.
export const reel = [
  {
    title: "From video to near misses",
    text: "A 3D digital twin of an intersection. Every road user is tracked in metres and conflicts are scored by PET and TTC.",
    src: "/research/roadally.mp4",
    poster: "/research/roadally.jpg",
    sound: true,
    href: "/research/perception",
  },
  {
    title: "An autonomous vehicle as a safety sensor",
    text: "Playback of the Boston AV perception data used to estimate cyclist crash risk.",
    src: "/research/av-probe.mp4",
    poster: "/research/av-probe.jpg",
    href: "/research/crash-risk",
  },
  {
    title: "Multi-agent signal control",
    text: "Reinforcement-learning agents set signal timing across a corridor using safety and mobility.",
    src: "/research/signal-multi.mp4",
    poster: "/research/signal-multi.jpg",
    href: "/research/signals",
  },
];

export const demos = [
  { href: "/demos#conflict", title: "Conflict playground", text: "Brake a car before a crosswalk and watch TTC, PET, and DRAC respond." },
  { href: "/demos#evt", title: "Average risk hides the peaks", text: "Extreme-value crash risk across twelve sites and a full day." },
  { href: "/demos#routes", title: "Safest or fastest route?", text: "Trade travel time against crash-risk exposure on a live network." },
  { href: "/demos#signal", title: "Run the intersection", text: "Play the traffic lights yourself against a safety-aware controller." },
];

export const teaching = [
  { code: "CIVL 582", title: "Transportation Engineering Impacts and Empirical Bayes", level: "Graduate, 4–12 students", years: "2021–present", role: "Senior teaching assistant. Delivered lectures on Bayesian statistics and traffic safety; grading and office hours." },
  { code: "CIVL 340", title: "Transportation Engineering I", level: "Undergraduate, 145–160 students", years: "2021–22, 2023–24", role: "Guest lectures, grading, and office hours." },
  { code: "CIVL 445 / 446", title: "Engineering Capstone Project", level: "Undergraduate, 112–160 students", years: "2020–2026", role: "Assessment of presentations and deliverables; transportation design advising, including independent advising during a faculty sabbatical." },
  { code: "URSY 540", title: "Urban Systems Project Delivery and Economics", level: "Master of Engineering Leadership, 9 students", years: "2021–2022", role: "Course support, project grading, and feedback." },
];

export const teachingTopics = ["Bayesian statistics", "Empirical Bayes methods", "Traffic safety", "Road design", "Risk management"];

export const funding = [
  { year: "2024–2025", title: "Mitacs Accelerate, CAD $60,000", text: "Rogers Communications partnership. Primary contributor to the proposal for a computer vision and reinforcement learning pipeline for corridor-level signal optimization." },
];

export const awards = [
  { year: "2026", title: "ITE Canada Doctoral Transportation Scholarship" },
  { year: "2025, 2026", title: "Three Minute Thesis: Civil Engineering winner; university top-five finalist" },
  { year: "2025", title: "BPOC Graduate Excellence Award" },
  { year: "2021–2025", title: "President’s Academic Excellence Initiative PhD Award" },
  { year: "2022", title: "British Columbia Graduate Scholarship" },
  { year: "2022", title: "TAC Foundation IBI Group Scholarship" },
  { year: "2021", title: "Civil Engineering Excellence Scholarship (CIV EX)" },
  { year: "2026", title: "IMC Prosperity Quantitative Finance Challenge, 267th of about 13,000 (top 2%)" },
];

export const service = [
  { year: "2024–2026", title: "UBC Civil Engineering Equity, Diversity and Inclusion Committee" },
  { year: "2025", title: "UBC Civil Engineering Department Head Reappointment Committee" },
  { year: "2024–2026", title: "CEGSS Equity, Diversity and Inclusion Student Representative" },
  { year: "2023–present", title: "Guest speaker, graduate student orientation" },
  { year: "2018–2026", title: "UBC ITE Student Chapter: President (2020), Treasurer (2019), VP Continuity (2021–2026). Secured over CAD $50,000 in sponsorship; coached Traffic Bowl teams to chapter wins in 2021, 2023, 2024, 2025, and 2026; 2021 Student Chapter of the Year; STEM outreach in high schools." },
  { year: "Reviewer", title: "Accident Analysis and Prevention; IEEE Transactions on Intelligent Transportation Systems; Scientific Reports; IEEE ITSC; TRB Annual Meeting; CSCE Annual Conference" },
];

export const directions = [
  {
    title: "Decision-making for Infrastructure",
    text: "Five network-level levers, from signals and speed advisories to fleet routing and virtual infrastructure for AVs, and world models that predict what new infrastructure will do before it is built.",
    href: "/research/decision-making",
    media: "/research/levers.jpg",
  },
  {
    title: "Resilience",
    text: "Future work: keeping people safe and moving through earthquakes, floods, storms, and incidents, and measuring how fast safety and mobility recover.",
    href: "/research/resilience",
    media: "/research/risk-map.gif",
  },
];

export const interests = [
  {
    title: "Real-time Crash Risk Estimation",
    text: "Predicting crashes over short time intervals using road-user trajectories obtained from autonomous vehicles, drones, and traffic cameras.",
    href: "/research/crash-risk",
    media: "/research/cyclist.mp4",
    poster: "/research/cyclist.jpg",
    focus: "left",
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

export const projectGroups = [
  {
    id: "industry",
    title: "Industry and government",
    projects: [
      {
        title: "BC passing-distance law",
        where: "Province of British Columbia, 2024",
        text: "This project used survival analysis of vehicle–cyclist interactions to produce a technical report on factors that affect safety during a lateral pass. The Province used the report as advice on a minimum passing distance, and the 1.5 m and 1 m recommendations were adopted in the 2024 Motor Vehicle Act amendments.",
      },
      {
        id: "perception",
        title: "Near-miss detection",
        where: "UBC Bureau of Intelligent Transportation Systems and Mobility",
        text: "This computer-vision pipeline extracts road-user trajectories from video and scores near misses using PET, MTTC, TTC, and DRAC. Provincial transportation authorities and the BC Centre for Disease Control used the tools in safety audits.",
      },
      {
        id: "signals",
        title: "Camera-based corridor-level signal optimization",
        where: "Rogers Communications and the BC Ministry of Transportation, 2024–2025",
        text: "This was a proof of concept for multi-agent reinforcement learning on a corridor, covering vehicles and pedestrians. The work was supported by a Mitacs Accelerate award of CAD $60,000, and I was the primary contributor to the proposal.",
      },
      {
        title: "Applications of Emerging Data",
        where: "Transport Canada",
        text: "This Applications of Emerging Data report for Transport Canada reviewed traditional and emerging sensing technologies, their safety applications, and practice in other jurisdictions. It also addresses the role of strategy and AI in how that data is collected and used.",
      },
      {
        title: "Rural road safety audit",
        where: "An Indigenous community in British Columbia",
        text: "This audit used conflict analysis on a remote road, then implemented countermeasures and evaluated them in a before-and-after study of safety and speeding.",
      },
      {
        title: "Pavement marking evaluation",
        where: "Provincial report, British Columbia",
        text: "Computer vision was used to measure how certain pavement markings affect safety, to help guide provincial investments.",
      },
    ],
  },
  {
    id: "research",
    title: "Research",
    projects: [
      {
        title: "Network crash-risk forecasting",
        where: "Analytic Methods in Accident Research, 2026",
        href: "https://doi.org/10.1016/j.amar.2026.100441",
        text: "This paper develops a Bayesian hierarchical marked point process with spatial dependence to forecast crash risk across a network and across future time horizons. It estimates where risk is high now, where it may rise, and how uncertain that forecast is.",
      },
      {
        title: "Spatial crash-risk models",
        where: "Transportmetrica A: Transport Science, 2026",
        href: "https://doi.org/10.1080/23249935.2026.2669212",
        text: "This paper does not treat neighboring sites as independent. The hierarchical extreme-value model shares information across the network, which matters when local observations are sparse. In the studied network, about three-quarters of site-level variation was associated with spatial effects.",
      },
      {
        title: "Corridor signal optimization",
        where: "CSCE Winnipeg 2025 proceedings, 2026",
        text: "This paper uses camera trajectories, extreme-value crash risk, and reinforcement learning to set signal timing along a corridor rather than at one intersection. On Wesbrook Mall, a soft actor-critic controller extends green time using both mobility and safety.",
      },
      {
        title: "Real-time crash risk",
        where: "PhD thesis, University of British Columbia, 2026",
        href: "https://doi.org/10.14288/1.0456953",
        text: "The dissertation develops real-time crash-risk models from traffic conflicts and applies those models to routing and signal control.",
      },
      {
        title: "Cyclist safety from AVs",
        where: "Accident Analysis and Prevention, 2025",
        href: "https://doi.org/10.1016/j.aap.2025.107923",
        text: "This paper uses an autonomous vehicle in Boston as a moving sensor. Observations of nearby road users are turned into cyclist crash-risk estimates, and about 84% of that estimated risk was associated with intersections.",
      },
      {
        title: "Helmet-violation detection",
        where: "Algorithms, 2024",
        href: "https://doi.org/10.3390/a17050202",
        text: "This paper trains a YOLOv8 detector for riders without helmets. Generated images fill in the cases where real examples of the violation were scarce.",
      },
      {
        title: "Crash risk for urban ITS",
        where: "CSCE Annual Conference proceedings, 2024",
        text: "This paper treats short-term crash risk as an input to urban intelligent transportation systems, including routing and signal control. The alternative is a statistic that is only available after crashes accumulate.",
      },
      {
        id: "routes",
        title: "Safest versus fastest routes",
        where: "Analytic Methods in Accident Research, 2023",
        href: "https://doi.org/10.1016/j.amar.2023.100277",
        text: "This paper shows that routing can minimize modeled crash risk instead of travel time alone. On the Athens network, the safest routes were about 22.8% lower in modeled risk than the fastest routes, which were about 11% quicker. That comparison is of estimated risk, not of observed crashes.",
      },
      {
        title: "Hazardous location identification",
        where: "Analytic Methods in Accident Research, 2023",
        href: "https://doi.org/10.1016/j.amar.2022.100262",
        text: "This paper uses conflict-based extreme-value models to flag hazardous locations over short intervals, not only from multi-year averages. In Athens, 2 of 47 locations looked hazardous on average risk, and 38 did once short-term peaks were included.",
      },
      {
        title: "Signal-vehicle coupled control",
        where: "Accident Analysis and Prevention, 2021",
        href: "https://doi.org/10.1016/j.aap.2021.106389",
        text: "This paper optimizes signal timing and connected-vehicle trajectories together, so the signal and the approaching vehicles are not treated as separate problems. The aim is fewer severe conflicts while operations stay acceptable.",
      },
      {
        title: "Connected-vehicle intersection safety",
        where: "MASc thesis, University of British Columbia, 2021",
        href: "https://doi.org/10.14288/1.0401847",
        text: "The thesis applies connected-vehicle data to real-time safety optimization at a single signalized intersection.",
      },
    ],
  },
  {
    id: "other",
    title: "Other",
    projects: [
      {
        id: "rag",
        title: "ITE Traffic Bowl retrieval",
        where: "Presented at ITE Canada, Victoria, 2026",
        image: "/research/searchite.gif",
        poster: "/research/searchite.jpg",
        imageAlt: "SearchITE answering a transportation question from retrieved wiki passages",
        text: "Traffic Bowl is ITE’s quiz competition. Clues are short, and answers are scored on the exact transportation term. I used the 2024 set of 94 questions as a retrieval test for models that run locally, with no cloud API. A local Qwen 9B scored 22 of 94 from memory. With a transportation wiki, hybrid search (embeddings and BM25), MMR, and HyDE, it scored 57 of 94. Other local models on the first hybrid setup stayed in the low 20s. Frontier models as of 2025 already scored 61 to 91 without this pipeline; they are a comparison, not the system.",
      },
    ],
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
