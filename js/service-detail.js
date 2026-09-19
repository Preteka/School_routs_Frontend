/**
 * SCHOOLROUTE — SERVICE DETAIL JAVASCRIPT
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Dynamic URL-driven Service Rendering & Accordion Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. MASTER SERVICE DATA ARCHITECTURE
     ========================================================================== */
  const serviceData = {
    // ------------------------------------------------------------------------
    // SERVICE 1: REAL-TIME BUS TRACKING
    // ------------------------------------------------------------------------
    'tracking': {
      id: 'tracking',
      category: 'Tracking & Visibility',
      badge: 'TRACKING & VISIBILITY',
      title: 'Real-Time Bus Tracking',
      decorativeTag: 'Safe Kids • Stronger Tomorrows',
      shortDescription: 'Know where your child\'s assigned school bus is during pickup and drop-off with live GPS location visibility and automated route alerts.',
      heroImage: 'assets/images/services-hero.jpg',
      heroFloatingCards: [
        { position: 'float-card-top-right', subtitle: 'LIVE TRACKING', title: 'Bus 128 • On Route', icon: 'location' },
        { position: 'float-card-bottom-left', subtitle: 'ACCURACY', title: '15s Live Refresh', icon: 'shield' },
        { position: 'float-card-bottom-right', subtitle: 'ETA', title: '4 mins away', icon: 'bell' }
      ],
      overview: {
        title: 'Complete Transport Clarity at Every Turn',
        paragraphs: [
          'SchoolRoute Real-Time Bus Tracking eliminates the uncertainty of daily school commutes by providing parents and school administrations with accurate, live GPS vehicle coordinates directly on an interactive map.',
          'Instead of waiting anxiously at the stop or calling the school office for updates, parents can observe vehicle progression, monitor speed, and view precise arrival estimates during active morning pickup and afternoon drop-off windows.',
          'Built with modern mapping technology and optimized data caching, the platform delivers uninterrupted visibility even across dense urban routes and suburban neighborhoods.'
        ],
        specs: {
          serviceName: 'Real-Time GPS Tracking',
          audience: 'Parents, Schools & Drivers',
          window: 'Active Pickup & Drop-off',
          status: 'Active / Live GPS'
        }
      },
      features: [
        {
          title: 'Live GPS Location',
          description: 'View the assigned bus location during active transport windows on a crisp vector map interface.',
          icon: 'location'
        },
        {
          title: 'Route Visibility',
          description: 'Follow the designated transit path and observe turn-by-turn route compliance in real time.',
          icon: 'route'
        },
        {
          title: 'Stop Information',
          description: 'See the exact pickup and drop-off stop locations, scheduled timings, and transit order.',
          icon: 'mapPin'
        },
        {
          title: 'Arrival Status',
          description: 'Stay informed as the bus approaches the assigned stop with real-time countdown estimates.',
          icon: 'clock'
        },
        {
          title: 'Real-Time Updates',
          description: 'Access instantaneous data refreshes every 15 seconds for smooth transit tracking.',
          icon: 'refresh'
        },
        {
          title: 'Parent Visibility',
          description: 'Keep track of the journey without repeatedly calling school dispatch or transport coordinators.',
          icon: 'user'
        }
      ],
      benefits: [
        'Eliminates morning wait times in extreme weather conditions',
        'Direct connection between parent app and vehicle GPS sensors',
        'Automated delay alerts in case of unexpected traffic congestion',
        'Unified multi-child dashboard for families with multiple students'
      ],
      workflow: [
        { number: '01', title: 'Sign Up', description: 'Create your SchoolRoute parent account and log in securely.' },
        { number: '02', title: 'Assign Route', description: 'View your child\'s verified bus number, driver info, and stop.' },
        { number: '03', title: 'Track Live', description: 'Open the live tracking map during active transport periods.' },
        { number: '04', title: 'Monitor Arrival', description: 'Follow the vehicle as it approaches the designated pickup point.' },
        { number: '05', title: 'Stay Informed', description: 'Receive automated boarding and journey completion alerts.' }
      ],
      pricing: {
        isTiered: false,
        title: 'Included with Your SchoolRoute Plan',
        description: 'Real-time tracking is standard across all active SchoolRoute school transport subscriptions.',
        badge: 'ALL-INCLUSIVE FEATURE',
        features: [
          'Full GPS live map access for unlimited family members',
          'Instant 15-second tracking refresh rate',
          'Automated proximity and arrival notifications',
          'Historical route playback and delay logs'
        ]
      },
      faqs: [
        {
          question: 'Can I track the school bus in real time?',
          answer: 'Yes. Parents can view the assigned bus location during supported pickup and drop-off transport windows directly from their mobile or desktop browser.'
        },
        {
          question: 'Can I see the assigned route and upcoming stops?',
          answer: 'Yes. Relevant route details, pickup zones, and intermediate stop sequences are clearly visualized alongside the active bus marker.'
        },
        {
          question: 'Will I know when the bus is near our designated stop?',
          answer: 'Yes. Proactive proximity alerts notify you when the bus is within a customizable radius (e.g., 5–10 minutes away) from your stop.'
        },
        {
          question: 'Is tracking available 24/7 or only during trips?',
          answer: 'Tracking is specifically active during designated transport schedules (morning pickup and afternoon drop-off) to optimize battery life and protect operational privacy.'
        }
      ],
      cta: {
        title: 'Ready to Track Your Child\'s Daily Journey?',
        description: 'Join thousands of parents who enjoy peace of mind with real-time SchoolRoute tracking.',
        primaryText: 'Get Started Today →',
        primaryLink: 'contact.html',
        secondaryText: 'Contact Us',
        secondaryLink: 'contact.html'
      },
      related: ['routes', 'notifications', 'student-monitoring']
    },

    // ------------------------------------------------------------------------
    // SERVICE 2: ROUTE MANAGEMENT
    // ------------------------------------------------------------------------
    'routes': {
      id: 'routes',
      category: 'Transit Operations',
      badge: 'ROUTE MANAGEMENT',
      title: 'Route Management & Planning',
      decorativeTag: 'Safe Kids • Stronger Tomorrows',
      shortDescription: 'View designated school routes, pickup zones, scheduled stops, and optimized transit paths with complete operational clarity.',
      heroImage: 'assets/images/hero-school-bus.jpg',
      heroFloatingCards: [
        { position: 'float-card-top-right', subtitle: 'ZONES', title: 'Optimized Routes', icon: 'route' },
        { position: 'float-card-bottom-left', subtitle: 'SCHEDULE', title: 'On-Time Accuracy', icon: 'clock' },
        { position: 'float-card-bottom-right', subtitle: 'STOPS', title: '18 Verified Stops', icon: 'mapPin' }
      ],
      overview: {
        title: 'Intelligent Route Planning and Schedule Control',
        paragraphs: [
          'SchoolRoute Route Management gives schools, transport managers, and parents structured visibility into transit itineraries, pickup zones, and estimated stop timings.',
          'Our algorithms assist transportation teams in mapping safe pickup corridors, minimizing student commute times, and avoiding congested traffic chokepoints during peak morning hours.',
          'Any operational adjustments—such as road maintenance diversions or revised stop timings—are updated dynamically across the parent and driver applications.'
        ],
        specs: {
          serviceName: 'Route Planning & Zones',
          audience: 'Schools, Operators & Parents',
          window: 'Annual & Daily Routes',
          status: 'Active / Optimized'
        }
      },
      features: [
        {
          title: 'Assigned Route Details',
          description: 'View the complete route geometry assigned to your student’s transportation service.',
          icon: 'route'
        },
        {
          title: 'Pickup Zones',
          description: 'Understand designated neighborhood pickup zones with exact safety coordinates.',
          icon: 'mapPin'
        },
        {
          title: 'Stop Management',
          description: 'Access clear information regarding scheduled arrival times and sequence order.',
          icon: 'clock'
        },
        {
          title: 'Route Schedules',
          description: 'Inspect morning pickup and afternoon return timetables for total daily predictability.',
          icon: 'calendar'
        },
        {
          title: 'Route Updates',
          description: 'Receive real-time alerts whenever a temporary detour or schedule modification occurs.',
          icon: 'refresh'
        },
        {
          title: 'Organized Transport',
          description: 'Streamline fleet utilization while ensuring student commutes remain concise and safe.',
          icon: 'shield'
        }
      ],
      benefits: [
        'Reduces average daily student transit duration by up to 22%',
        'Avoids hazardous left turns and high-speed intersections',
        'Instant digital notifications for seasonal route adjustments',
        'Clear documentation of student distribution across bus fleets'
      ],
      workflow: [
        { number: '01', title: 'Select Transport', description: 'Access your student\'s assigned transport profile in the portal.' },
        { number: '02', title: 'View Route', description: 'Inspect the full geographical path and designated pickup zone.' },
        { number: '03', title: 'Review Stops', description: 'Check scheduled morning pickup and afternoon return locations.' },
        { number: '04', title: 'Check Schedule', description: 'Review arrival windows calibrated for local traffic patterns.' },
        { number: '05', title: 'Stay Updated', description: 'Receive instant notifications if route alterations take place.' }
      ],
      pricing: {
        isTiered: false,
        title: 'Included with School Transport Plan',
        description: 'Comprehensive route management is included in all school and institutional partnerships.',
        badge: 'FLEET INTEGRATED',
        features: [
          'Full interactive route and stop map directory',
          'Dynamic schedule updates and timing adjustments',
          'Safe pickup zone verification records',
          'Instant driver navigation synchronization'
        ]
      },
      faqs: [
        {
          question: 'Can I view my child’s assigned route?',
          answer: 'Yes. The portal shows the specific route number, vehicle details, and the full pathway mapped between home and school.'
        },
        {
          question: 'Can I see pickup and drop-off stops?',
          answer: 'Yes. Each stop along the route is cataloged with its exact landmark description and scheduled arrival window.'
        },
        {
          question: 'How are parents notified if a route changes?',
          answer: 'If school authorities adjust a route or if roadwork requires a detour, push notifications and SMS alerts are dispatched immediately.'
        },
        {
          question: 'Can I request a change in pickup stop?',
          answer: 'Stop change requests can be submitted through the parent portal for approval by your school\'s transport office.'
        }
      ],
      cta: {
        title: 'Explore Your Child\'s School Route with Confidence',
        description: 'Gain complete clarity over routes, schedules, and designated stops.',
        primaryText: 'Explore Routes Today →',
        primaryLink: 'services.html',
        secondaryText: 'Contact Our Team',
        secondaryLink: 'contact.html'
      },
      related: ['tracking', 'notifications', 'safety']
    },

    // ------------------------------------------------------------------------
    // SERVICE 3: STUDENT MONITORING
    // ------------------------------------------------------------------------
    'student-monitoring': {
      id: 'student-monitoring',
      category: 'Student Safety',
      badge: 'STUDENT SAFETY',
      title: 'Student Monitoring & Attendance',
      decorativeTag: 'Safe Kids • Stronger Tomorrows',
      shortDescription: 'Digital boarding and alighting verification confirming exactly when and where your child steps onto and off the school bus.',
      heroImage: 'assets/images/usecase-school.jpg',
      heroFloatingCards: [
        { position: 'float-card-top-right', subtitle: 'STATUS', title: 'Boarded • 07:42 AM', icon: 'check' },
        { position: 'float-card-bottom-left', subtitle: 'VERIFIED', title: 'RFID Check-in', icon: 'shield' },
        { position: 'float-card-bottom-right', subtitle: 'STUDENTS', title: '100% Accounted', icon: 'user' }
      ],
      overview: {
        title: 'Automated Student Verification on Every Trip',
        paragraphs: [
          'SchoolRoute Student Monitoring provides digital verification of student boarding and alighting, ensuring no child is left behind or dropped off at the incorrect destination.',
          'Using contactless smart badges or conductor-assisted digital check-ins, timestamps and location coordinates are instantly logged the moment a student steps on or off the bus.',
          'Parents receive instantaneous confirmation alerts, while school administrators maintain a synchronized real-time headcount of all students in transit.'
        ],
        specs: {
          serviceName: 'Student Attendance & Check-in',
          audience: 'Parents, Schools & Attendants',
          window: 'Boarding & Alighting',
          status: 'Active / RFID Verified'
        }
      },
      features: [
        {
          title: 'Boarding Confirmation',
          description: 'Instant digital timestamp recorded the moment your child steps onto the assigned school bus.',
          icon: 'check'
        },
        {
          title: 'Alighting Confirmation',
          description: 'Verification logged when the student steps off safely at the school or return home stop.',
          icon: 'mapPin'
        },
        {
          title: 'Daily Logs',
          description: 'Review historical daily attendance and boarding records directly in your parent dashboard.',
          icon: 'calendar'
        },
        {
          title: 'Student Status',
          description: 'Know in real time whether your child is waiting, currently in transit, or arrived safely.',
          icon: 'user'
        },
        {
          title: 'Parent Visibility',
          description: 'Direct push notifications keep you informed without needing manual phone calls.',
          icon: 'bell'
        },
        {
          title: 'Record History',
          description: 'Exportable logs provide comprehensive safety and compliance records for school audits.',
          icon: 'shield'
        }
      ],
      benefits: [
        'Guarantees verified student attendance during transit',
        'Instant alerts if a student boards an incorrect bus',
        'Zero manual paperwork for bus drivers and school attendants',
        'Secure digital records compliant with child safety regulations'
      ],
      workflow: [
        { number: '01', title: 'Student Assigned', description: 'Student profile is linked to the assigned bus roster.' },
        { number: '02', title: 'Board Bus', description: 'Student badge is scanned upon boarding the morning bus.' },
        { number: '03', title: 'Journey Begins', description: 'Parent receives immediate confirmation that child is on board.' },
        { number: '04', title: 'Alight Safely', description: 'Exit scan verifies child has safely reached school campus.' },
        { number: '05', title: 'Review Log', description: 'Daily timestamps are archived in the secure parent portal.' }
      ],
      pricing: {
        isTiered: false,
        title: 'Integrated Student Safety Feature',
        description: 'Student check-in monitoring is standard with all SchoolRoute partner school fleets.',
        badge: 'CHILD SAFETY SUITE',
        features: [
          'Contactless smart badge check-in integration',
          'Instant boarding and alighting parent alerts',
          'Real-time bus manifest synchronization',
          '365-day searchable attendance history'
        ]
      },
      faqs: [
        {
          question: 'What is boarding confirmation?',
          answer: 'Boarding confirmation is an automated timestamp recorded when your child enters the school bus, confirming they have started their commute safely.'
        },
        {
          question: 'What is alighting confirmation?',
          answer: 'Alighting confirmation verifies that your child has stepped off the bus at the correct destination—either school in the morning or home stop in the afternoon.'
        },
        {
          question: 'What happens if a child forgets their smart badge?',
          answer: 'The verified bus attendant can manually check in the student on their secure terminal, triggering the same instant parent notification.'
        },
        {
          question: 'Can parents view past attendance logs?',
          answer: 'Yes. Full weekly, monthly, and semester logs are accessible in the parent portal anytime.'
        }
      ],
      cta: {
        title: 'Experience Verified Student Safety Today',
        description: 'Ensure your child’s boarding and arrival are confirmed every single day.',
        primaryText: 'Sign Up for SchoolRoute →',
        primaryLink: 'contact.html',
        secondaryText: 'Learn About Safety',
        secondaryLink: 'safety.html'
      },
      related: ['tracking', 'safety', 'notifications']
    },

    // ------------------------------------------------------------------------
    // SERVICE 4: ARRIVAL NOTIFICATIONS
    // ------------------------------------------------------------------------
    'notifications': {
      id: 'notifications',
      category: 'Smart Alerts',
      badge: 'SMART NOTIFICATIONS',
      title: 'Arrival Notifications & Alerts',
      decorativeTag: 'Safe Kids • Stronger Tomorrows',
      shortDescription: 'Timely, automated proximity alerts sent directly to your phone as the school bus approaches your child\'s designated stop.',
      heroImage: 'assets/images/usecase-parent.jpg',
      heroFloatingCards: [
        { position: 'float-card-top-right', subtitle: 'ALERT', title: 'Bus Approaching Stop', icon: 'bell' },
        { position: 'float-card-bottom-left', subtitle: 'CHANNEL', title: 'Push & SMS Alerts', icon: 'check' },
        { position: 'float-card-bottom-right', subtitle: 'PROXIMITY', title: '500m Distance Alert', icon: 'location' }
      ],
      overview: {
        title: 'Proactive Journey Alerts for Smooth Mornings',
        paragraphs: [
          'SchoolRoute Arrival Notifications keep parents effortlessly informed without requiring them to stare continuously at a map screen.',
          'Our geofencing technology calculates vehicle velocity and real-time traffic to dispatch proactive notifications when the bus is 5 to 10 minutes away from your specific pickup point.',
          'Mornings run smoother, students avoid prolonged waits outdoors, and transit schedules remain punctually on time.'
        ],
        specs: {
          serviceName: 'Proactive Smart Notifications',
          audience: 'Parents & Guardians',
          window: 'Pickup & Drop-off Proximity',
          status: 'Active / Instant Alert'
        }
      },
      features: [
        {
          title: 'Bus Arrival Alerts',
          description: 'Receive proactive alerts when the school bus is within customizable distance of your stop.',
          icon: 'bell'
        },
        {
          title: 'Stop Alerts',
          description: 'Instant notification dispatched the moment the bus halts at your child\'s pickup location.',
          icon: 'mapPin'
        },
        {
          title: 'Timely Updates',
          description: 'Automated warnings if unexpected traffic bottlenecks cause a delay beyond 5 minutes.',
          icon: 'clock'
        },
        {
          title: 'Parent Awareness',
          description: 'Gives families enough time to prepare without rushing or waiting outside in bad weather.',
          icon: 'user'
        },
        {
          title: 'Multi-Channel Support',
          description: 'Receive alerts via in-app push notifications, SMS messages, and optional email summaries.',
          icon: 'refresh'
        },
        {
          title: 'Peace of Mind',
          description: 'Eliminates stress and guesswork around school transportation timing every morning and afternoon.',
          icon: 'shield'
        }
      ],
      benefits: [
        'Customizable alert radius (5 min, 10 min, or specific distance)',
        'Supports multiple emergency guardian contacts simultaneously',
        'Early weather-delay and route diversion advisories',
        'Works reliably on all modern smartphone devices'
      ],
      workflow: [
        { number: '01', title: 'Bus Departs', description: 'Bus begins route according to the morning or afternoon schedule.' },
        { number: '02', title: 'Approaching Zone', description: 'Vehicle crosses geofence boundary before your child\'s stop.' },
        { number: '03', title: 'Notification Sent', description: 'Parent receives clear arrival alert with countdown estimate.' },
        { number: '04', title: 'Prepare for Pickup', description: 'Parent and student head to the stop comfortably on time.' },
        { number: '05', title: 'Journey Completed', description: 'Confirmation alert confirms successful pickup and departure.' }
      ],
      pricing: {
        isTiered: false,
        title: 'Included in All Parent Subscriptions',
        description: 'Unlimited SMS and push notifications are included at zero extra cost.',
        badge: 'ZERO SURCHARGES',
        features: [
          'Unlimited instant push & SMS notifications',
          'Configurable proximity geofence radius',
          'Multi-parent alert distribution list',
          'Traffic delay broadcast integration'
        ]
      },
      faqs: [
        {
          question: 'When will I receive an arrival notification?',
          answer: 'Notifications are triggered based on your chosen setting—typically 5 to 10 minutes before the bus arrives at your specific stop.'
        },
        {
          question: 'Can multiple family members receive the alerts?',
          answer: 'Yes. Parents can configure multiple phone numbers and email addresses so mothers, fathers, and authorized guardians stay synchronized.'
        },
        {
          question: 'What happens if the bus gets delayed in traffic?',
          answer: 'The system recalculates estimated arrival times continuously. If a delay exceeds 5 minutes, an automated delay notification is dispatched.'
        },
        {
          question: 'Can I silence notifications on days my child is sick?',
          answer: 'Yes. You can toggle a temporary "Absent Today" switch in the portal to pause notifications for that day.'
        }
      ],
      cta: {
        title: 'Never Miss a Bus Arrival Again',
        description: 'Receive proactive alerts and make school mornings smooth and stress-free.',
        primaryText: 'Activate Alerts →',
        primaryLink: 'contact.html',
        secondaryText: 'Contact Support',
        secondaryLink: 'contact.html'
      },
      related: ['tracking', 'routes', 'student-monitoring']
    },

    // ------------------------------------------------------------------------
    // SERVICE 5: SAFETY & DRIVER VERIFICATION
    // ------------------------------------------------------------------------
    'safety': {
      id: 'safety',
      category: 'Compliance & Safety',
      badge: 'SAFETY & COMPLIANCE',
      title: 'Safety & Driver Verification',
      decorativeTag: 'Safe Kids • Stronger Tomorrows',
      shortDescription: 'Verified drivers, rigorous vehicle inspection standards, speed compliance tracking, and emergency response protocols.',
      heroImage: 'assets/images/usecase-driver.jpg',
      heroFloatingCards: [
        { position: 'float-card-top-right', subtitle: 'DRIVER', title: '100% Background Verified', icon: 'shield' },
        { position: 'float-card-bottom-left', subtitle: 'SPEED', title: 'Speed Governed <40km/h', icon: 'check' },
        { position: 'float-card-bottom-right', subtitle: 'EMERGENCY', title: '24/7 SOS Ready', icon: 'bell' }
      ],
      overview: {
        title: 'Uncompromising Standards for Every School Journey',
        paragraphs: [
          'Safety is the foundational cornerstone of SchoolRoute. We implement rigorous background vetting, valid licensing checks, and regular behavioral training for all transport drivers and onboard attendants.',
          'Vehicles are integrated with onboard telemetry to monitor driving habits, detect harsh braking or acceleration, and enforce strict institutional speed limits.',
          'With 24/7 SOS alert infrastructure and dedicated operations support, schools and families are protected by an industry-leading transit safety net.'
        ],
        specs: {
          serviceName: 'Driver Verification & Transit Safety',
          audience: 'Schools, Operators & Families',
          window: '24/7 Standard & Trip Active',
          status: 'Active / Verified'
        }
      },
      features: [
        {
          title: 'Driver Verification',
          description: 'Complete background checks, police verification, and commercial driving certification.',
          icon: 'shield'
        },
        {
          title: 'Safety Procedures',
          description: 'Standardized boarding safety, seatbelt protocols, and emergency evacuation drills.',
          icon: 'check'
        },
        {
          title: 'Transport Monitoring',
          description: 'Live speed governors and route compliance monitoring preventing unsafe driving.',
          icon: 'clock'
        },
        {
          title: 'Emergency Support',
          description: 'Instant SOS button in vehicles and app connecting directly to central emergency dispatch.',
          icon: 'bell'
        },
        {
          title: 'Vehicle Fitness Checks',
          description: 'Regular maintenance logs, tire inspections, and fitness certifications on record.',
          icon: 'route'
        },
        {
          title: 'Parent Confidence',
          description: 'Total transparency gives parents complete reassurance throughout the school year.',
          icon: 'user'
        }
      ],
      benefits: [
        'Mandatory annual background and medical health checks for drivers',
        'Automated alerts triggered if speed exceeds defined threshold',
        'Direct emergency liaison with local hospitals and traffic authorities',
        'Digital driver credentials visible directly to parents on the app'
      ],
      workflow: [
        { number: '01', title: 'Staff Verification', description: 'Comprehensive driver vetting and licensing review completed.' },
        { number: '02', title: 'Vehicle Inspection', description: 'Vehicle fitness and telemetry hardware certified operational.' },
        { number: '03', title: 'Trip Monitoring', description: 'Journey monitored with speed governing and route compliance.' },
        { number: '04', title: 'Safety Enforcement', description: 'Automated telemetry checks ensure disciplined driving.' },
        { number: '05', title: '24/7 Support', description: 'Immediate emergency dispatch standing by for assistance.' }
      ],
      pricing: {
        isTiered: false,
        title: 'Core Platform Safety Standard',
        description: 'Verified safety compliance is integrated into all SchoolRoute transportation services.',
        badge: 'ZERO COMPROMISE',
        features: [
          'Driver identity and background verification records',
          'Real-time speed governing and violation alerts',
          'Emergency SOS panic button connectivity',
          'Routine vehicle fitness & safety checklist auditing'
        ]
      },
      faqs: [
        {
          question: 'How are SchoolRoute drivers verified?',
          answer: 'All drivers undergo thorough multi-point background checks, criminal record verification, valid heavy commercial vehicle licensing validation, and mandatory medical vision screening.'
        },
        {
          question: 'What happens if a bus exceeds the speed limit?',
          answer: 'The system automatically triggers an instant violation alarm in the central dispatch dashboard and logs a formal safety violation against the driver\'s record.'
        },
        {
          question: 'Are there emergency tools on board?',
          answer: 'Yes. All partner buses are equipped with certified first-aid kits, operational fire extinguishers, emergency exit doors, and an electronic SOS panic button.'
        },
        {
          question: 'How can parents contact support during transit?',
          answer: 'Parents can use the dedicated support hotline or in-app emergency contact button to connect instantly with the school transport coordinator.'
        }
      ],
      cta: {
        title: 'Safety is at the Heart of Every Journey',
        description: 'Discover how SchoolRoute protects students with verified standards and modern technology.',
        primaryText: 'Learn About Safety Standards →',
        primaryLink: 'safety.html',
        secondaryText: 'Contact Safety Team',
        secondaryLink: 'contact.html'
      },
      related: ['tracking', 'student-monitoring', 'routes']
    },

    // ------------------------------------------------------------------------
    // SERVICE 6: SUBSCRIPTION & PAYMENTS
    // ------------------------------------------------------------------------
    'payments': {
      id: 'payments',
      category: 'Financial Management',
      badge: 'SUBSCRIPTION & PAYMENTS',
      title: 'Subscription & Digital Payments',
      decorativeTag: 'Safe Kids • Stronger Tomorrows',
      shortDescription: 'Manage flexible school transportation plans, complete secure online payments, and download instant GST tax receipts easily.',
      heroImage: 'assets/images/hero-home2.jpg',
      heroFloatingCards: [
        { position: 'float-card-top-right', subtitle: 'SECURITY', title: '256-bit Encrypted', icon: 'shield' },
        { position: 'float-card-bottom-left', subtitle: 'PLANS', title: 'Flexible Terms', icon: 'check' },
        { position: 'float-card-bottom-right', subtitle: 'INVOICING', title: 'Instant Tax Receipts', icon: 'calendar' }
      ],
      overview: {
        title: 'Seamless Digital Billing and Parent Plan Control',
        paragraphs: [
          'SchoolRoute Subscription & Payments removes the hassle of manual cash collection, paper receipts, and delayed bank transfers for school transportation fees.',
          'Parents can choose flexible monthly, quarterly, or annual payment terms, execute secure digital transactions via UPI, cards, or net banking, and immediately access downloadable tax invoices.',
          'Automated renewal reminders and straightforward subscription management ensure continuous, uninterrupted transit coverage for your children.'
        ],
        specs: {
          serviceName: 'Digital Fee Management',
          audience: 'Parents & School Finance Teams',
          window: '24/7 Online Access',
          status: 'Active / Secure 256-bit'
        }
      },
      features: [
        {
          title: 'Digital Subscription',
          description: 'Choose and manage customized school transport subscription plans tailored to your term schedule.',
          icon: 'calendar'
        },
        {
          title: 'Online Payments',
          description: 'Complete transport fee payments digitally using UPI, debit/credit cards, and net banking.',
          icon: 'check'
        },
        {
          title: 'Plan Management',
          description: 'Review active subscription duration, renew terms, or switch pickup options easily.',
          icon: 'refresh'
        },
        {
          title: 'Payment History',
          description: 'Complete centralized audit trail showing every historical transaction and settlement.',
          icon: 'clock'
        },
        {
          title: 'Downloadable Receipts',
          description: 'Download official digital tax and GST receipts formatted for company reimbursements.',
          icon: 'route'
        },
        {
          title: 'Simple Renewal',
          description: 'Convenient one-click recurring renewal reminders prevent accidental service interruptions.',
          icon: 'shield'
        }
      ],
      benefits: [
        'Zero physical trips to the school accounts counter',
        'Secure 256-bit SSL encrypted digital payment gateway',
        'Automated payment reminders 7 days before term renewal',
        'Instant digital GST invoices for parent tax claims'
      ],
      workflow: [
        { number: '01', title: 'Choose Plan', description: 'Select a monthly, quarterly, or annual transport subscription.' },
        { number: '02', title: 'Review Details', description: 'Verify student stop information and fee breakdown.' },
        { number: '03', title: 'Make Payment', description: 'Execute payment securely through UPI, Card, or Net Banking.' },
        { number: '04', title: 'Confirmation', description: 'Receive instant confirmation and seat allocation lock.' },
        { number: '05', title: 'Download Receipt', description: 'Access and download the official payment tax receipt.' }
      ],
      pricing: {
        isTiered: true,
        title: 'Affordable Plans for Every Family',
        description: 'Transparent pricing with no hidden charges. Choose the plan that best fits your schedule.',
        plans: [
          {
            name: 'Monthly Plan',
            price: '₹999',
            period: '/ month',
            isPopular: false,
            desc: 'Flexible month-to-month transit coverage with full digital features.',
            features: [
              'Full live GPS bus tracking',
              'Instant arrival notifications',
              'RFID student check-in alerts',
              'Standard email & chat support'
            ],
            btnText: 'Choose Monthly',
            btnLink: 'contact.html'
          },
          {
            name: 'Quarterly Plan',
            price: '₹2,499',
            period: '/ 3 months',
            isPopular: true,
            desc: 'Save 17% with our most popular term-based transportation package.',
            features: [
              'Everything in Monthly Plan',
              'Priority parent support line',
              'Multi-guardian alert channels',
              'Discounted seasonal terms'
            ],
            btnText: 'Choose Quarterly',
            btnLink: 'contact.html'
          },
          {
            name: 'Yearly Plan',
            price: '₹8,999',
            period: '/ year',
            isPopular: false,
            desc: 'Best overall value for complete 10-month uninterrupted school year coverage.',
            features: [
              'Everything in Quarterly Plan',
              'Dedicated family safety concierge',
              'Guaranteed bus seat lock',
              'Free student RFID replacement badge'
            ],
            btnText: 'Choose Yearly',
            btnLink: 'contact.html'
          }
        ]
      },
      faqs: [
        {
          question: 'What payment methods are supported?',
          answer: 'We support all major payment modes including UPI (Google Pay, PhonePe, Paytm), Visa/Mastercard debit and credit cards, and Net Banking across 50+ major banks.'
        },
        {
          question: 'Can I download an official receipt for tax or reimbursement?',
          answer: 'Yes. Official GST-compliant tax invoices with student and school details are generated instantly and stored permanently in your account for download.'
        },
        {
          question: 'Can I switch or cancel my plan midway through a term?',
          answer: 'Plan modifications and refund policies are governed by your school\'s transport guidelines and can be processed via the portal.'
        },
        {
          question: 'Are there any hidden transaction convenience fees?',
          answer: 'No. All prices displayed are inclusive of standard processing fees and applicable taxes.'
        }
      ],
      cta: {
        title: 'Choose a Transparent Plan for Your Family',
        description: 'Simplify transport billing with secure digital payments and instant invoices.',
        primaryText: 'Choose a Plan →',
        primaryLink: 'pricing.html',
        secondaryText: 'Contact Finance Desk',
        secondaryLink: 'contact.html'
      },
      related: ['tracking', 'notifications', 'safety']
    }
  };

  // Alias for backward compatibility
  serviceData['monitoring'] = serviceData['student-monitoring'];

  /* ==========================================================================
     2. SVG ICON HELPER LIBRARY
     ========================================================================== */
  function getSvgIcon(iconName) {
    const icons = {
      location: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
      route: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a4.5 4.5 0 0 0 0-9H7a4.5 4.5 0 0 1 0-9H18"></path><circle cx="18" cy="5" r="3"></circle></svg>`,
      mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
      clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
      user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
      shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
      bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
      check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
      calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
    };
    return icons[iconName] || icons.shield;
  }

  /* ==========================================================================
     3. URL QUERY PARAMETER PARSING
     ========================================================================== */
  function getServiceFromURL() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('id');
    
    // Default fallback to 'tracking' if no id parameter is passed
    if (!serviceId) {
      return serviceData['tracking'];
    }

    const cleanId = serviceId.trim().toLowerCase();
    return serviceData[cleanId] || null;
  }

  /* ==========================================================================
     4. INDIVIDUAL SECTION RENDERING FUNCTIONS
     ========================================================================== */

  // A. Page Title & Meta Description
  function updatePageMeta(service) {
    document.title = `${service.title} | SchoolRoute — Safe Kids • Stronger Tomorrows`;
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) {
      metaDesc.setAttribute('content', service.shortDescription);
    }
  }

  // B. Dynamic Breadcrumb
  function updateBreadcrumb(service) {
    const currentBreadcrumb = document.getElementById('breadcrumb-current');
    if (currentBreadcrumb) {
      currentBreadcrumb.textContent = service.title;
    }
  }

  // C. Hero Section
  function renderHero(service) {
    const contentBox = document.getElementById('detail-hero-content');
    const visualBox = document.getElementById('detail-hero-visual');

    if (contentBox) {
      contentBox.innerHTML = `
        <div class="badge badge-pill badge-accent hero-badge">
          <span class="badge-dot"></span>
          ${service.badge}
        </div>
        
        <h1 class="service-hero-title">
          ${service.title.replace('Tracking', '<span class="highlight-yellow">Tracking</span>').replace('Management', '<span class="highlight-yellow">Management</span>').replace('Monitoring', '<span class="highlight-yellow">Monitoring</span>').replace('Notifications', '<span class="highlight-yellow">Notifications</span>').replace('Safety', '<span class="highlight-yellow">Safety</span>').replace('Payments', '<span class="highlight-yellow">Payments</span>')}
        </h1>

        <div class="hero-decorative-tag">
          <span class="decorative-handwriting">${service.decorativeTag}</span>
        </div>

        <p class="service-hero-desc">
          ${service.shortDescription}
        </p>

        <div class="hero-cta-group">
          <a href="${service.cta.primaryLink}" class="btn btn-primary hero-btn-main">
            ${service.cta.primaryText}
          </a>
          <a href="${service.cta.secondaryLink}" class="btn btn-secondary-hero">
            ${service.cta.secondaryText}
          </a>
        </div>
      `;
    }

    if (visualBox) {
      const cardsHtml = service.heroFloatingCards.map(c => `
        <div class="hero-floating-card ${c.position}">
          <div class="float-card-icon-box">
            ${getSvgIcon(c.icon)}
          </div>
          <div class="float-card-text">
            <span class="float-card-subtitle">${c.subtitle}</span>
            <span class="float-card-title">${c.title}</span>
          </div>
        </div>
      `).join('');

      visualBox.innerHTML = `
        <div class="service-hero-visual-card">
          <div class="service-hero-img-wrap">
            <img src="${service.heroImage}" alt="${service.title} illustration" class="service-hero-img" width="600" height="400" loading="eager">
            <div class="service-hero-img-overlay"></div>
          </div>

          <svg class="service-hero-route-svg" viewBox="0 0 540 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 50 310 Q 180 230 270 170 T 460 90" stroke="#F8C52C" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="8 8" class="service-route-path" />
            <circle cx="50" cy="310" r="7" fill="#075B46" stroke="#FFFFFF" stroke-width="2.5" class="beacon-pulse" />
            <circle cx="270" cy="170" r="6" fill="#F8C52C" stroke="#FFFFFF" stroke-width="2" />
            <circle cx="460" cy="90" r="9" fill="#075B46" stroke="#F8C52C" stroke-width="3" class="beacon-pulse" />
          </svg>

          ${cardsHtml}
        </div>
      `;
    }
  }

  // D. Overview Section & At-A-Glance Card
  function renderOverview(service) {
    const titleEl = document.getElementById('detail-overview-title');
    const textEl = document.getElementById('detail-overview-text');
    const cardEl = document.getElementById('detail-overview-card');

    if (titleEl) titleEl.textContent = service.overview.title;
    if (textEl) {
      textEl.innerHTML = service.overview.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    if (cardEl) {
      cardEl.innerHTML = `
        <div class="overview-specs-card">
          <div class="specs-card-header">
            <div class="specs-card-icon-box">
              ${getSvgIcon('shield')}
            </div>
            <h3 class="specs-card-title">At a Glance</h3>
          </div>
          <div class="specs-rows-list">
            <div class="spec-row">
              <span class="spec-label">Service</span>
              <span class="spec-value">${service.overview.specs.serviceName}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Audience</span>
              <span class="spec-value">${service.overview.specs.audience}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Window</span>
              <span class="spec-value">${service.overview.specs.window}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Status</span>
              <span class="spec-value">${service.overview.specs.status}</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  // E. Features & Benefits
  function renderFeaturesAndBenefits(service) {
    const gridEl = document.getElementById('detail-features-grid');
    const listEl = document.getElementById('detail-benefits-list');

    if (gridEl) {
      gridEl.innerHTML = service.features.map((f, idx) => `
        <article class="detail-feature-card reveal-up" style="--delay: ${idx * 90}ms;">
          <div class="detail-feature-icon-box">
            ${getSvgIcon(f.icon)}
          </div>
          <h3 class="detail-feature-title">${f.title}</h3>
          <p class="detail-feature-desc">${f.description}</p>
        </article>
      `).join('');
    }

    if (listEl) {
      listEl.innerHTML = service.benefits.map(b => `
        <div class="benefit-item">
          <div class="benefit-check-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <span>${b}</span>
        </div>
      `).join('');
    }
  }

  // F. Workflow / How It Works
  function renderWorkflow(service) {
    const stepsContainer = document.getElementById('detail-workflow-steps');
    if (stepsContainer) {
      stepsContainer.innerHTML = service.workflow.map((w, idx) => `
        <div class="workflow-step-card reveal-up" style="--delay: ${idx * 110}ms;">
          <div class="step-num-badge">${w.number}</div>
          <h3 class="step-title">${w.title}</h3>
          <p class="step-desc">${w.description}</p>
        </div>
      `).join('');
    }
  }

  // G. Pricing / Plans
  function renderPricing(service) {
    const container = document.getElementById('detail-pricing-container');
    const titleEl = document.getElementById('detail-pricing-title');
    const subtitleEl = document.getElementById('detail-pricing-subtitle');

    if (titleEl) titleEl.textContent = service.pricing.title;
    if (subtitleEl) subtitleEl.textContent = service.pricing.description;

    if (!container) return;

    if (service.pricing.isTiered) {
      // 3 Tier Pricing Cards (For Payments)
      container.innerHTML = `
        <div class="pricing-tiers-grid">
          ${service.pricing.plans.map((p, idx) => `
            <div class="pricing-tier-card ${p.isPopular ? 'popular-tier' : ''} reveal-up" style="--delay: ${idx * 120}ms;">
              ${p.isPopular ? '<div class="popular-ribbon">Most Popular</div>' : ''}
              <h3 class="tier-name">${p.name}</h3>
              <p class="tier-desc">${p.desc}</p>
              <div class="tier-price-row">
                <span class="tier-price-num">${p.price}</span>
                <span class="tier-price-period">${p.period}</span>
              </div>
              <div class="tier-features-list">
                ${p.features.map(f => `
                  <div class="tier-feature-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${f}</span>
                  </div>
                `).join('')}
              </div>
              <a href="${p.btnLink}" class="btn ${p.isPopular ? 'btn-primary' : 'btn-secondary-hero'} full-width">
                ${p.btnText}
              </a>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // Single Inclusive Plan Banner (For all other services)
      container.innerHTML = `
        <div class="pricing-included-box reveal-scale">
          <div class="pricing-included-left">
            <span class="included-badge">${service.pricing.badge}</span>
            <h3 class="included-title">${service.pricing.title}</h3>
            <p class="included-desc">${service.pricing.description}</p>
            <div class="tier-features-list" style="margin-top: 18px; margin-bottom: 0;">
              ${service.pricing.features.map(f => `
                <div class="tier-feature-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${f}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="pricing-included-right">
            <a href=\"contact.html\" class="btn btn-primary" style="padding-inline: 32px;">
              Get Started with School →
            </a>
            <a href="contact.html" class="btn btn-secondary-hero" style="padding-inline: 28px;">
              Talk to Sales
            </a>
          </div>
        </div>
      `;
    }
  }

  // H. FAQs Accordion
  function renderFAQs(service) {
    const faqsContainer = document.getElementById('detail-faqs-accordion');
    if (!faqsContainer) return;

    faqsContainer.innerHTML = service.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <button class="faq-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}" aria-controls="faq-ans-${idx}">
          <span>${faq.question}</span>
          <div class="faq-icon-box" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
        </button>
        <div class="faq-content" id="faq-ans-${idx}" role="region">
          <div class="faq-answer-inner">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Accordion Toggle Click Handlers
    const faqItems = faqsContainer.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-btn');
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs (single-open accordion behavior)
        faqItems.forEach(i => {
          i.classList.remove('active');
          const b = i.querySelector('.faq-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // I. Related Services
  function renderRelated(service) {
    const relatedContainer = document.getElementById('detail-related-grid');
    if (!relatedContainer) return;

    const relatedCards = service.related.map((relId, idx) => {
      const rel = serviceData[relId];
      if (!rel) return '';
      return `
        <article class="service-card reveal-up" style="--delay: ${idx * 120}ms;">
          <div class="service-card-header">
            <div class="service-icon-box">
              ${getSvgIcon(rel.features[0].icon || 'shield')}
            </div>
            <div class="service-status-pill">
              <span class="service-status-dot"></span>
              ${rel.overview.specs.status}
            </div>
          </div>
          <span class="service-cat-badge">${rel.category}</span>
          <h3 class="service-title">${rel.title}</h3>
          <p class="service-desc">${rel.shortDescription}</p>
          <a href="service-detail.html?id=${rel.id}" class="service-detail-link" aria-label="Learn more about ${rel.title}">
            View Details <span class="service-link-arrow">→</span>
          </a>
        </article>
      `;
    }).join('');

    relatedContainer.innerHTML = relatedCards;
  }

  // J. Dynamic CTA Section
  function renderCTA(service) {
    const ctaContent = document.getElementById('detail-cta-content');
    const ctaButtons = document.getElementById('detail-cta-buttons');

    if (ctaContent) {
      ctaContent.innerHTML = `
        <h2 class="cta-heading">
          ${service.cta.title.replace('Safer School Journey', '<span class="highlight-yellow">Safer School Journey</span>').replace('School Route', '<span class="highlight-yellow">School Route</span>')}
        </h2>
        <p class="cta-desc">
          ${service.cta.description}
        </p>
      `;
    }

    if (ctaButtons) {
      ctaButtons.innerHTML = `
        <a href="${service.cta.primaryLink}" class="btn btn-primary btn-cta-large">
          ${service.cta.primaryText}
        </a>
        <a href="${service.cta.secondaryLink}" class="btn btn-secondary-hero">
          ${service.cta.secondaryText}
        </a>
      `;
    }
  }

  // K. Service Not Found Handler
  function showServiceNotFound() {
    const contentWrapper = document.getElementById('service-content-wrapper');
    const notFoundWrapper = document.getElementById('detail-not-found');
    const currentBreadcrumb = document.getElementById('breadcrumb-current');

    if (contentWrapper) contentWrapper.style.display = 'none';
    if (notFoundWrapper) notFoundWrapper.style.display = 'block';
    if (currentBreadcrumb) currentBreadcrumb.textContent = 'Service Not Found';
    document.title = 'Service Not Found | SchoolRoute';
  }

  /* ==========================================================================
     5. INITIALIZATION & CONTROLLER EXECUTION
     ========================================================================== */
  const activeService = getServiceFromURL();

  if (activeService) {
    updatePageMeta(activeService);
    updateBreadcrumb(activeService);
    renderHero(activeService);
    renderOverview(activeService);
    renderFeaturesAndBenefits(activeService);
    renderWorkflow(activeService);
    renderPricing(activeService);
    renderFAQs(activeService);
    renderRelated(activeService);
    renderCTA(activeService);

    // Trigger IntersectionObserver for newly rendered reveal classes
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.classList.add('is-revealed');
      });
    }

    console.log(`SchoolRoute Service Detail initialized for: "${activeService.title}"`);
  } else {
    showServiceNotFound();
  }
});
