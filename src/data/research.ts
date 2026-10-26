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
  heading?: string;
  level?: 2 | 3;
  take?: string;
  paras?: string[];
  points?: string[];
  stats?: Stat[];
  wide?: boolean;
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
    lede: "Estimating crash risk over minutes rather than years, using vehicle trajectories, extreme-value statistics, and Bayesian probabilistic models.",
    story: [
      {
        paras: [
          "Road crashes are rare events, making them difficult to predict using historical crash records alone. Traditional safety assessments aggregate crashes over several years, identifying locations with persistent safety problems but often missing how risk changes throughout the day.",
          "My research takes a different approach: estimate the probability of severe events from the interactions that precede them.",
          "Vehicle trajectories reveal near-misses, abrupt braking, and potentially dangerous interactions long before they result in a recorded collision. By modeling the statistical extremes of these interactions, we can estimate crash risk over short time intervals and identify when and where intervention may be most valuable.",
          "The objective is to move road safety from retrospective analysis toward probabilistic risk estimation that can inform real-time decisions.",
        ],
      },
      {
        heading: "From Traffic Conflicts to Crash Risk",
        paras: [
          "A traffic conflict occurs when two road users approach a potentially dangerous interaction without necessarily colliding. Measures derived from their trajectories, such as time-to-collision, provide information about the severity of these encounters.",
          "However, simply counting conflicts or averaging their severity can obscure the rare interactions that matter most.",
          "I use **extreme-value theory (EVT)** to model the tail of the conflict severity distribution. Instead of modeling an average interaction, the approach focuses on the most severe conflicts observed within short time intervals.",
          "These extreme observations are used to estimate *return levels*, statistical measures describing the severity of events associated with a specified recurrence frequency or return period.",
          "Combined with a probabilistic model, this provides a way to quantify crash-related risk even when observed crashes are too infrequent to support reliable short-term estimates.",
          "The resulting estimates can be evaluated over intervals relevant to traffic operations, rather than being restricted to annual safety assessments.",
        ],
      },
      {
        heading: "When Average Risk Hides Dangerous Conditions",
        stats: [{ value: "2 → 38", label: "of 47 Athens locations identified as hazardous when comparing average and peak short-term risk" }],
        paras: [
          "In a study of 47 locations in Athens, Greece, we compared hazardous-location identification using average risk against estimates that account for short-term peaks.",
          "Only 2 locations were classified as hazardous under the average-risk assessment, compared with 38 when peak short-term conditions were considered.",
          "The difference is important because a location's average risk can appear relatively low while its risk increases substantially during specific periods.",
          "A location that is not consistently hazardous may still experience short intervals of elevated danger. Those intervals can be particularly relevant to operational decisions, such as adjusting signal timing, managing speeds, or selecting alternative routes.",
          "The results demonstrate why the time horizon matters. A model intended to identify long-term infrastructure priorities does not necessarily identify the locations requiring attention over the next twenty minutes.",
        ],
      },
      {
        heading: "Modeling Risk Across a Network",
        take: "Approximately 75% of site-level variation was associated with spatial effects in the studied Bayesian model.",
        paras: [
          "Risk at neighboring intersections and road segments is not independent. Traffic conditions, demand, and driver interactions can create spatial patterns that extend beyond individual locations.",
          "Treating each site independently ignores this structure, especially when observations are sparse.",
          "To address this, our research incorporates spatial dependence into Bayesian hierarchical extreme-value models.",
          "The hierarchical formulation allows risk estimates to reflect both local observations and information shared across related locations. Spatial effects represent geographic structure that would otherwise be missed by independent site-level models.",
          "In the studied network, approximately three-quarters of the modeled site-level variation was associated with spatial effects.",
          "This has implications for network-wide safety assessment. A ranking based only on independent locations can differ substantially from one that accounts for their spatial relationships.",
          "It also provides a statistical framework for estimating risk in areas with limited observations, while explicitly representing uncertainty.",
        ],
      },
      {
        heading: "Autonomous Vehicles as Mobile Safety Sensors",
        wide: true,
        stats: [{ value: "84%", label: "of the estimated cyclist crash risk in the Boston AV-probe study was associated with intersections" }],
        paras: [
          "Fixed traffic cameras can provide detailed vehicle trajectories, but installing and maintaining continuous camera coverage across an entire road network is expensive.",
          "Autonomous vehicles offer a different source of observations.",
          "As an autonomous vehicle moves through the network, its perception system observes surrounding vehicles, cyclists, and pedestrians. These observations can be used to reconstruct interactions and assess potential conflicts.",
          "In our Boston study, we investigated the use of autonomous-vehicle trajectory observations to estimate cyclist safety.",
          "Rather than relying on cameras installed at fixed intersections, the approach uses the vehicle as a moving observation platform.",
          "The analysis found that approximately 84% of the estimated cyclist crash risk was associated with intersections, highlighting the importance of interactions at these locations.",
          "The broader contribution is methodological: observations collected by mobile sensing platforms can support probabilistic safety assessment.",
          "This creates opportunities for combining fixed infrastructure data with observations from autonomous vehicles or connected fleets, although spatial coverage, observation bias, and uncertainty remain important considerations.",
        ],
        film: {
          src: "/research/cyclist.gif",
          poster: "/research/cyclist.jpg",
          caption: "Boston autonomous-vehicle probe. Surrounding cyclists and vehicles are observed as the vehicle travels through the network, allowing potentially hazardous interactions to be evaluated.",
        },
      },
      {
        heading: "From Risk Estimation to Risk Forecasting",
        paras: [
          "Estimating current risk is only part of the problem.",
          "A navigation system needs to know the risk a vehicle may encounter when it reaches a particular road segment. A traffic controller needs to understand how risk could evolve in response to changing conditions.",
          "This motivates network-wide, multi-horizon probabilistic forecasting.",
          "Our subsequent research with Niu, Haque, and Sayed investigates Bayesian hierarchical marked point process models with spatial dependence to forecast crash risk across locations and future time horizons.",
          "Rather than asking only where risk is elevated now, the objective is to estimate where risk may increase and how uncertain those predictions are.",
          "This extends short-term safety assessment toward predictive decision-making.",
        ],
      },
      {
        heading: "Applications to Autonomous Mobility and Traffic Systems",
        paras: [
          "The central idea behind this research is that safety can be represented as a time-varying probabilistic quantity rather than a static label assigned to a road or intersection.",
          "That creates several possible applications.",
        ],
        points: [
          "**Autonomous driving:** Trajectory-based risk estimates could complement other representations of risk and uncertainty used in prediction, planning, and safety assessment.",
          "**Navigation and fleet operations:** Link-level risk estimates and forecasts could be incorporated into route selection alongside travel time and distance.",
          "**Traffic management:** Short-term risk estimates could be used to evaluate control actions, including signal timing and speed management.",
        ],
      },
      {
        paras: [
          "These applications require additional consideration of calibration, sensor coverage, computational latency, distribution shift, and how risk changes in response to decisions.",
          "The research provides a statistical foundation for these applications, rather than claiming that the models have already been integrated into production systems.",
        ],
      },
      {
        heading: "Research Direction",
        paras: [
          "The next challenge is connecting probabilistic risk estimation more directly to decision-making.",
          "A useful model must do more than identify potentially hazardous conditions. Its estimates should be reliable across locations, interpretable under uncertainty, and available at the temporal resolution of the decisions they are meant to inform.",
          "My ongoing research focuses on the connection between trajectory observations, probabilistic forecasting, and risk-aware optimization.",
          "The broader objective is to make crash risk something a planning or control system can evaluate, rather than a statistic available only after an incident occurs.",
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
    lede: "Routing that considers not only how long a journey takes, but also the crash risk encountered along the way.",
    story: [
      {
        paras: [
          "Most navigation systems optimize travel time or distance. Safety, when considered, is often represented through static information such as road classifications, historical crash records, or predefined route preferences.",
          "But crash risk changes over time.",
          "A road that is relatively safe at one moment may become more hazardous as traffic conditions change. Similarly, the safest route when a trip begins may not remain the safest route when the vehicle reaches a particular intersection.",
          "My research investigates how probabilistic, time-varying crash risk can be incorporated into routing algorithms, allowing routes to be evaluated and updated using safety information alongside travel time.",
          "The objective is not to replace conventional routing algorithms. It is to provide them with a meaningful, dynamically updated safety cost.",
        ],
      },
      {
        heading: "Making Crash Risk a Routing Cost",
        paras: [
          "Routing algorithms operate by assigning costs to road links and identifying paths that minimize an objective.",
          "Travel time is a natural link cost. Crash risk is more complicated because it varies across both space and time.",
          "Our approach represents route-level risk using the risk associated with each traversed link and the time spent traveling along it.",
          "The formulation makes it possible to compare alternative paths using both their expected travel times and their modeled crash risk.",
          "This allows us to investigate questions such as:",
        ],
        points: [
          "How much additional travel time is associated with selecting a safer route?",
          "How different are the safest and fastest paths across a network?",
          "How does the preferred route change when risk varies over time?",
        ],
      },
      {
        paras: [
          "The routing formulation builds on the probabilistic crash-risk estimation methods developed in my other research.",
          "Rather than treating safety as a fixed attribute of a road, it uses estimates derived from observed traffic interactions.",
        ],
      },
      {
        heading: "The Safety–Travel Time Trade-off",
        stats: [
          { value: "22.8%", label: "lower modeled crash risk for safest routes compared with fastest routes" },
          { value: "11%", label: "travel-time advantage for fastest routes over safest routes in the corresponding comparison" },
        ],
        paras: [
          "We evaluated risk-aware routing on the Athens road network, comparing safest and fastest routes across origin-destination pairs and recurring 20-minute time intervals.",
          "The results showed a measurable trade-off.",
          "Routes selected to minimize modeled crash risk were approximately 22.8% lower in risk than the corresponding fastest routes. Conversely, fastest routes provided an approximately 11% travel-time advantage over the safest alternatives.",
          "These findings illustrate the potential value of including safety explicitly in route selection.",
          "They do not mean that observed crashes were reduced by 22.8%. The comparison concerns estimated crash risk under the studied model and network conditions.",
          "The result also shows why the routing objective matters. Two routes between the same origin and destination may differ substantially in both travel time and estimated safety.",
          "Which route is preferable depends on the desired trade-off between those objectives.",
        ],
      },
      {
        heading: "Why a Static Risk Map Is Not Enough",
        wide: true,
        paras: [
          "A route can traverse many road segments over an extended period. The traffic conditions on the final segment may be different by the time the vehicle reaches it.",
          "A routing algorithm that evaluates every link using risk at the departure time ignores this evolution.",
          "To address this problem, we investigated routing approaches that account for when a vehicle is expected to traverse each segment.",
        ],
        points: [
          "**Static risk-aware routing** evaluates routes using the currently available risk estimates.",
          "**Forecast-based routing** evaluates each link using the risk predicted for the vehicle's expected arrival time.",
          "**Rolling routing** updates the selected path as new information becomes available during the journey.",
        ],
        still: {
          src: "/research/route-compare.png",
          alt: "Two Athens network maps comparing a static risk-aware route with a forecast-based route between the same origin and destination.",
          caption: "Static versus forecast routing on the Athens network. The same origin and destination, evaluated with current risk versus predicted risk at arrival.",
        },
      },
      {
        paras: [
          "These approaches represent increasingly adaptive ways of using risk information.",
          "Forecast-based routing incorporates anticipated changes before departure, while rolling routing allows the plan to respond to conditions that differ from earlier predictions.",
        ],
      },
      {
        heading: "Dynamic Replanning",
        wide: true,
        paras: [
          "A useful route is not necessarily one that remains unchanged from origin to destination.",
          "Suppose a vehicle begins with a relatively direct route through the network. As it approaches an intersection, the predicted risk along the planned path increases.",
          "A rolling routing algorithm can reassess the available alternatives and select a different path if the updated costs justify changing the original plan.",
          "In our routing demonstration, the vehicle initially follows a planned path but subsequently changes direction as the relative risk of alternative roads evolves.",
        ],
        film: {
          src: "/research/navigate.mp4",
          poster: "/research/navigate.jpg",
          caption: "Dynamic risk-aware routing. Red shows the original route, which is abandoned after changing risk conditions. Blue shows the updated route followed by the vehicle.",
        },
      },
      {
        paras: [
          "The demonstration illustrates the difference between selecting a route once and treating routing as a sequential decision process.",
          "It also introduces practical questions: how frequently should a route be updated, when is a change significant enough to justify replanning, and how do we prevent unnecessary switching between alternatives?",
          "These considerations become increasingly important when the routing method is applied in an operating navigation system.",
        ],
      },
      {
        heading: "Applications to Navigation and Autonomous Fleets",
        paras: [
          "The same general framework can support several types of mobility systems.",
        ],
        points: [
          "**Vehicle navigation.** Time-varying risk estimates can provide an additional routing objective, allowing travel time and safety to be evaluated explicitly rather than assuming that the fastest route is also an acceptable choice in every situation.",
          "**Autonomous-vehicle fleets.** Autonomous vehicles can potentially contribute observations about surrounding traffic conditions as they move through a network. Combining mobile observations with probabilistic crash-risk models creates the possibility of updating routing costs using information gathered by the fleet itself.",
          "**Cyclist and pedestrian navigation.** The appropriate definition of safety depends on the road user. For cyclists, interactions with turning vehicles, intersection geometry, and exposure to traffic may be especially important. For pedestrians, crossings and vehicle interactions introduce different risk considerations.",
        ],
      },
      {
        paras: [
          "Our autonomous-vehicle cyclist safety research provides a potential source of observations for developing more road-user-specific risk estimates.",
          "Extending the routing framework to vulnerable road users would require risk measures calibrated to their particular interactions and exposure.",
        ],
      },
      {
        heading: "From Individual Routes to Fleet-Wide Optimization",
        paras: [
          "Optimizing a route for one vehicle is different from optimizing the behavior of an entire fleet.",
          "When many vehicles respond to the same information, their routing decisions can change congestion patterns and potentially redistribute risk.",
          "A road selected as a safer alternative for one vehicle may become less attractive when many vehicles are directed toward it.",
          "This creates a coupled decision problem in which the cost of a route can depend on the routing decisions of other vehicles.",
          "Fleet-level optimization must therefore consider more than a collection of independently optimal paths.",
          "There is also a computational challenge. Rolling replanning requires repeated optimization as vehicle locations, traffic conditions, and risk estimates change.",
          "For practical use, the routing process must be efficient enough to update decisions within the available operational time.",
        ],
      },
      {
        heading: "Research Direction",
        paras: [
          "The next step is extending risk-aware navigation beyond independent vehicles and static assumptions.",
          "I am interested in routing systems that combine short-horizon probabilistic forecasts, computationally efficient replanning, and objectives that account for interactions across a network.",
          "An important part of this is understanding how uncertainty in predicted risk should affect routing decisions.",
          "A lower estimated risk is not necessarily more reliable if it is supported by sparse observations. A robust routing system should consider the confidence in its estimates, not only their expected values.",
          "The broader goal is to connect probabilistic safety modeling with scalable route optimization so that safety can be considered as conditions evolve.",
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
    lede: "Using reinforcement learning and probabilistic safety models to optimize traffic signals, vehicle movements, and network operations.",
    story: [
      {
        paras: [
          "Traffic signals determine how vehicles move through an urban network. Their timing influences queues, delays, intersection conflicts, and how congestion propagates from one location to another.",
          "Traditional signal control primarily focuses on mobility objectives such as delay, queue length, and throughput. Safety is often addressed separately through signal design standards or long-term collision analysis.",
          "My research investigates how mobility and safety can be optimized together.",
          "The central idea is to use vehicle trajectory observations to estimate short-term crash risk, then incorporate that risk directly into traffic control objectives.",
          "This connects probabilistic safety modeling with reinforcement learning and optimization, allowing signal decisions to be evaluated using both their operational and safety consequences.",
          "The research has progressed from coordinating individual vehicle trajectories with traffic signals to reinforcement-learning-based corridor control and investigations of network-wide multi-agent optimization.",
        ],
      },
      {
        heading: "Coordinating Traffic Signals and Vehicle Movements",
        paras: [
          "A traffic signal and an approaching vehicle influence the same interaction.",
          "The signal determines when a movement receives right of way. The vehicle's speed determines when it arrives, how it approaches the intersection, and the interactions it may encounter.",
          "Optimizing these decisions independently can overlook opportunities to improve safety.",
          "Our early research investigated **coupled signal-vehicle control**, in which traffic signal timing and connected-vehicle trajectories are optimized together.",
          "The objective is to identify combinations of vehicle movement and signal timing that reduce severe traffic conflicts while maintaining acceptable traffic operations.",
        ],
      },
      {
        heading: "Surrey: Connected-Vehicle Safety Optimization",
        level: 3,
        stats: [{ value: "9–23%", label: "fewer traffic conflicts across the evaluated Surrey scenarios in the 2021 research" }],
        paras: [
          "In the 2021 Surrey studies, we investigated how coordinated signal and vehicle control could reduce conflicts at signalized intersections.",
          "The work examined connected-vehicle trajectory information and reinforcement-learning-based safety optimization.",
          "Across the evaluated scenarios, the research reported reductions in traffic conflicts ranging from approximately 9% to 23%.",
          "These results established the potential of using traffic-interaction information as an optimization objective rather than relying exclusively on conventional mobility measures.",
          "The studies were research evaluations, not field deployments of an operational signal control system.",
        ],
      },
      {
        heading: "From Individual Intersections to Corridor Control",
        paras: [
          "Optimizing a single intersection is only part of the traffic control problem.",
          "A signal can reduce its own queue by releasing vehicles quickly, while increasing congestion at the next intersection. Similarly, changing green time at one location may alter the interactions and risks experienced elsewhere.",
          "Effective corridor control requires considering these dependencies.",
          "In our subsequent work, we investigated reinforcement learning for coordinated traffic signal optimization using real-time safety estimates.",
          "The approach combines camera-derived vehicle trajectories, probabilistic crash-risk modeling, and continuous-action reinforcement learning.",
          "This allows the controller to evaluate both mobility and safety within a common decision-making framework.",
        ],
      },
      {
        heading: "UBC Wesbrook Corridor: Safety-Aware Reinforcement Learning",
        paras: [
          "The UBC study focused on a three-intersection corridor along Wesbrook Mall in Vancouver, British Columbia:",
        ],
        points: ["University Boulevard", "Agronomy Road", "Thunderbird Boulevard"],
        still: {
          src: "/research/corridor.jpg",
          alt: "Map of Wesbrook Mall at UBC with three numbered signalized intersections and photos of each approach.",
          caption: "Wesbrook Mall corridor at University Boulevard, Agronomy Road, and Thunderbird Boulevard. Rogers cameras on this corridor.",
        },
      },
      {
        paras: [
          "Vehicle trajectory information was derived from Rogers camera observations associated with the corridor.",
          "The research investigated a control architecture in which traffic observations support crash-risk estimation, and both risk and mobility measures contribute to reinforcement-learning-based signal optimization.",
          "The control framework follows four connected stages.",
        ],
        points: [
          "**1. Traffic observation.** Cameras provide information about vehicle movements and interactions across the corridor.",
          "**2. Safety estimation.** Trajectory-derived conflict measures are processed using extreme-value methods to estimate short-term crash-related risk.",
          "**3. Reinforcement learning.** A soft actor-critic (SAC) controller evaluates traffic conditions and selects signal-control actions using a reward that incorporates mobility and safety.",
          "**4. Signal control.** The controller produces continuous green-time extension decisions over 120-second control intervals.",
        ],
      },
      {
        paras: [
          "The use of continuous actions is important because green-time adjustments are not naturally limited to choosing among a small set of predefined options.",
        ],
      },
      {
        heading: "Single-Agent and Multi-Agent Reinforcement Learning",
        wide: true,
        paras: [
          "A central question in corridor control is how multiple intersections should coordinate their decisions.",
          "We investigated both single-agent and multi-agent SAC formulations.",
        ],
        points: [
          "**Single-agent control.** One policy controls the corridor using a shared representation of the traffic state and a common reward. The controller evaluates the corridor as a combined system rather than treating each intersection as a separate optimization problem. This provides a relatively direct formulation for coordinated control, although the state and action spaces become more complex as the number of intersections increases.",
          "**Multi-agent control.** Intersections are represented by separate agents with access to shared information and local control objectives. Each agent makes decisions for its own intersection while operating within a network influenced by the actions of the others. This formulation can distribute decision-making across locations, but it introduces additional challenges.",
        ],
        stills: [
          {
            src: "/research/signal-sarl.png",
            alt: "Single soft actor-critic agent writing a 120-second plan for three signals, scored by one shared reward.",
            caption: "UBC Wesbrook corridor, single-agent SAC. One policy, one corridor reward.",
          },
          {
            src: "/research/signal-marl.png",
            alt: "Three soft actor-critic agents sharing corridor state, each with its own reward.",
            caption: "UBC Wesbrook corridor, multi-agent SAC. Shared state, a local reward at each light.",
          },
        ],
      },
      {
        paras: [
          "The traffic environment seen by one agent changes as neighboring agents update their policies. Local rewards may also encourage decisions that benefit one intersection while increasing delay or risk elsewhere.",
          "Coordination therefore matters as much as the performance of any individual policy.",
        ],
      },
      {
        heading: "UBC Corridor Results",
        stats: [
          { value: "19%", label: "reduction in delay, multi-agent SAC versus the existing plan" },
          { value: "14%", label: "reduction in the modeled safety return level" },
        ],
        paras: [
          "In the UBC corridor evaluation, the multi-agent SAC approach achieved approximately 19% lower delay and a 14% lower safety return level compared with the existing signal plan.",
          "These results suggest that optimizing mobility and safety together can improve both objectives within the studied conditions.",
          "The safety improvement refers to the modeled extreme-value return level, not a measured 14% reduction in crashes.",
          "The results were obtained in the research evaluation setting and should not be interpreted as the outcome of a live field deployment.",
          "The comparison also illustrates the potential advantages of coordinating control decisions across intersections, while leaving open important questions about generalization to larger and more heterogeneous networks.",
        ],
      },
      {
        heading: "Scaling From Three Intersections to a Network",
        paras: [
          "A three-intersection corridor is a useful environment for developing and testing coordinated control methods. A city-wide network introduces a different level of complexity.",
          "Several challenges become especially important as the number of controlled intersections increases.",
        ],
        points: [
          "**Non-stationarity.** In multi-agent reinforcement learning, each agent changes the environment experienced by other agents. Policies trained under one combination of neighboring behaviors may become less effective as those behaviors change.",
          "**Credit assignment.** A signal adjustment can influence traffic conditions several intersections downstream. Determining which actions contributed to an improvement or deterioration becomes difficult when effects are distributed across the network.",
          "**Partial observability.** Traffic cameras do not provide perfect information. Vehicles can be occluded, observations may be incomplete, and risk estimates are uncertain. A controller must operate using imperfect estimates of the underlying traffic state.",
          "**Continuous and constrained actions.** Practical traffic control involves decisions such as green-time adjustments, approach speed recommendations, and capacity allocation. These actions are constrained by signal operation requirements, vehicle dynamics, and interactions between neighboring locations.",
          "**Scalability and generalization.** A network-wide controller must manage large state and action spaces while making decisions frequently enough to respond to changing traffic conditions. Training a separate policy for every intersection may also be impractical, motivating approaches that share information or policy structure across locations.",
        ],
      },
      {
        paras: [
          "Our ongoing work investigates continuous-control reinforcement learning and multi-agent approaches, including MAPPO-related research with Sahu, to address aspects of these challenges.",
          "The objective is to move beyond small corridor experiments toward control methods that can coordinate decisions across larger networks.",
        ],
      },
      {
        heading: "Beyond Signal Timing: Speed and Road Capacity",
        paras: [
          "Signals are only one mechanism for influencing traffic movement.",
          "Traffic management systems can also modify vehicle approach speeds and allocate road capacity dynamically.",
          "These decisions interact with signal timing and can be evaluated using related safety and mobility objectives.",
        ],
        points: [
          "**Green Light Optimal Speed Advisory (GLOSA).** GLOSA systems recommend approach speeds that help vehicles arrive during an available green interval. Rather than changing only the signal, this approach also considers the vehicle's trajectory. It connects naturally with the coupled signal-vehicle control problem investigated in our earlier research.",
          "**Variable speed limits.** Variable speed limits modify the speeds permitted or recommended along road segments in response to changing conditions. Speed influences travel time, vehicle interactions, and the severity of potential conflicts. Coordinating speed management with signal timing provides another way to influence both mobility and safety.",
          "**Reversible and counterflow lanes.** Reversible lanes change the direction in which road capacity is allocated, often to accommodate directional differences in demand. Conventional implementations frequently follow predetermined schedules. A more adaptive approach could evaluate lane allocation using current and predicted network conditions, including delay and safety estimates.",
        ],
      },
      {
        paras: [
          "Unlike a signal extension, lane reversal involves substantial operational constraints and transition requirements. It is therefore a related but distinct control problem.",
          "Together, these mechanisms motivate a broader view of traffic management in which timing, speed, and road-space allocation are coordinated rather than optimized independently.",
        ],
      },
      {
        heading: "Research Direction: Network-Wide Safety and Mobility Optimization",
        paras: [
          "My current research interests extend from individual signal and corridor control toward network-level optimization.",
          "The goal is to develop decision-making methods that coordinate traffic operations across multiple locations while accounting for both mobility and safety.",
          "This includes investigating larger networks such as Athens, Greece, and Songdo-dong, South Korea, as research environments for scalable optimization.",
          "The underlying technical problems have applications beyond traffic signals: sequential decision-making under uncertainty, multi-agent coordination, continuous and constrained control, and policies that must generalize across different operating conditions.",
          "Ultimately, the challenge is not simply to make one intersection perform better.",
          "It is to develop control systems that account for the consequences of their decisions across the network, using safety and mobility information at the timescale those decisions are made.",
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
