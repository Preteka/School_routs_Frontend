/**
 * SCHOOLROUTE — BLOG DETAIL JAVASCRIPT
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 *
 * Architecture:
 *   - Reads ?id=<slug> from URL via URLSearchParams
 *   - Looks up the matching post in the blogPosts data object
 *   - Dynamically renders: Hero, Article Body, Author Sidebar, Categories,
 *     Recent Posts, Related Articles — all into the static HTML shell
 *   - Mirrors the same pattern used by service-detail.js
 *   - Vanilla JavaScript (No Frameworks / No jQuery)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. BLOG POSTS DATA REPOSITORY
     All 9 articles — id must match the slugs used in blog.js and blog.html
     ========================================================================== */
  const blogPosts = {
    'school-bus-safety': {
      id: 'school-bus-safety',
      category: 'Safety',
      title: '7 Ways to Make School Bus Journeys Safer',
      excerpt: 'Simple safety practices that schools and parents can use to create safer and more organized student transportation.',
      image: 'assets/images/blog/blog-safety.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'September 12, 2026',
      readTime: '5 min read',
      tags: ['Safety', 'School Bus', 'Students', 'Best Practices'],
      content: {
        intro: `School bus journeys are a daily reality for millions of students and their families. While modern school buses are among the safest vehicles on the road, ensuring that every journey is as safe as possible requires consistent effort from schools, parents, drivers, and students alike. Here are seven practical approaches that can make a real difference.`,
        sections: [
          {
            title: 'Establish Clear Boarding & Alighting Protocols',
            body: `Creating and enforcing consistent boarding and alighting procedures is the single most impactful safety step a school can take. Students should approach the bus only after it has fully stopped, remain in a designated waiting zone, and board in an orderly manner. Similarly, students should wait until the bus moves away before crossing — and always cross in front, never behind.`
          },
          {
            title: 'Use Real-Time Tracking Technology',
            body: `GPS tracking systems allow schools, parents, and administrators to know exactly where every bus is at any moment during the school day. When parents can see live bus locations and receive automated arrival notifications, they are less likely to leave students unattended at bus stops, and schools can respond faster when a bus is delayed or diverts from its assigned route.`
          },
          {
            title: 'Verify Drivers and Conduct Regular Training',
            body: `Driver verification is a non-negotiable element of student safety. Every driver should undergo thorough background checks before taking the wheel, with follow-up checks conducted annually. Regular safety training sessions on emergency procedures, student behaviour management, and vehicle maintenance protocols help drivers maintain the highest standard of care throughout the year.`
          },
          {
            title: 'Ensure All Students Are Accounted For',
            body: `A digital boarding and alighting check — using RFID cards, mobile apps, or barcode scanning — ensures every student is accounted for at every stage of the journey. This eliminates the risk of a student being left on board or not reaching their intended stop without the school knowing immediately.`
          }
        ],
        keyPoints: {
          title: 'Core Safety Principles',
          items: [
            'Establish designated waiting zones at all bus stops',
            'Use GPS tracking for live journey visibility',
            'Verify all drivers with background and health checks',
            'Implement digital check-in for boarding and alighting',
            'Keep emergency contact information updated and accessible',
            'Train students regularly on bus safety behaviour',
            'Conduct routine vehicle maintenance and safety inspections'
          ]
        },
        stats: [
          { num: '90%', label: 'Reduction in Incidents' },
          { num: '3x', label: 'Faster Emergency Response' },
          { num: '99%', label: 'Parent Satisfaction' }
        ],
        pullQuote: 'Real-time visibility and driver accountability are the two most powerful tools available for making school transportation safer for every child, every day.',
        tips: [
          {
            title: 'Morning Alerts',
            desc: 'Send automated pickup notifications 10 minutes before the bus arrives at each stop.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
          },
          {
            title: 'Driver Check-In',
            desc: 'Require digital vehicle inspection sign-off before each journey begins.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
          },
          {
            title: 'Parent App',
            desc: 'Give parents a mobile app to track bus location and receive instant notifications.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
          },
          {
            title: 'Emergency Plan',
            desc: 'Keep updated emergency contacts and medical notes linked to every student profile.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
          }
        ],
        conclusion: {
          title: 'Safety Is a System, Not a Single Step',
          text: 'Making school bus journeys safer is not about any one action — it is about building a connected system where technology, people, and processes work together consistently every day.'
        }
      }
    },

    'gps-school-transportation': {
      id: 'gps-school-transportation',
      category: 'Technology',
      title: 'How GPS Tracking Is Changing School Transportation',
      excerpt: 'Discover how real-time location technology gives parents and schools better visibility throughout the daily bus journey.',
      image: 'assets/images/blog/blog-gps-tracking.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'September 8, 2026',
      readTime: '6 min read',
      tags: ['GPS', 'Technology', 'School Transportation', 'Real-Time Tracking'],
      content: {
        intro: `A decade ago, the only way a parent could know whether the school bus was running on time was to stand at the stop and wait. Today, GPS technology has fundamentally changed this experience — giving schools, parents, and administrators live, accurate visibility into every bus journey in real time.`,
        sections: [
          {
            title: 'From Paperwork to Real-Time Data',
            body: `Traditional school transportation management relied on paper manifests, walkie-talkies, and manual check-ins. Delays, missed stops, and route deviations were all difficult to detect until a parent called to report them. Modern GPS systems replace this uncertainty with a live digital map that shows every bus, its speed, its current stop, and its estimated arrival time — updated every few seconds.`
          },
          {
            title: 'Automated Arrival Notifications',
            body: `One of the most immediate benefits of GPS integration is automated push notifications. Parents receive an alert when the bus is 10 minutes away, arrives at the stop, and confirms pickup. This single capability reduces the number of missed pickups, eliminates unnecessary wait times at stops, and gives parents confidence they cannot get from a scheduled timetable alone.`
          },
          {
            title: 'Geofencing for Automatic Triggers',
            body: `Geofencing technology creates invisible digital boundaries around schools, stops, and other key locations. When a bus enters or exits a geofenced zone, the system automatically triggers notifications to relevant parties — alerting staff that a bus has arrived at school, or informing parents that the bus is approaching their neighborhood. This automation reduces manual coordination and human error.`
          },
          {
            title: 'Data Analytics for Route Optimisation',
            body: `GPS data is not just useful in the moment — it is also a valuable historical record. Transportation managers can analyse journey time data to identify consistently delayed routes, adjust timings, or combine stops to reduce fuel consumption and journey times. Over a full academic year, these improvements can lead to meaningful cost savings and a significantly better daily experience for students.`
          }
        ],
        keyPoints: {
          title: 'GPS Benefits at a Glance',
          items: [
            'Live bus location on parent and school dashboards',
            'Automated push notifications for pickup and arrival',
            'Geofencing alerts for school and stop boundaries',
            'Speed monitoring and route deviation alerts',
            'Historical journey data for route analysis',
            'Reduced administrative coordination workload',
            'Faster emergency response with precise location data'
          ]
        },
        stats: [
          { num: '60%', label: 'Fewer Missed Pickups' },
          { num: '15%', label: 'Fuel Cost Reduction' },
          { num: '4.8★', label: 'Parent Satisfaction' }
        ],
        pullQuote: 'GPS tracking does not just tell you where a bus is — it gives every parent the peace of mind that their child is on the right route, on time, and safe.',
        tips: [
          {
            title: 'Live Dashboard',
            desc: 'Provide administrators with a live fleet map showing all active buses.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
          },
          {
            title: 'Parent App',
            desc: 'Let parents see bus location on their phone without calling the school.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
          },
          {
            title: 'Speed Alerts',
            desc: 'Trigger automatic alerts when a driver exceeds the designated speed limit.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
          },
          {
            title: 'Journey Reports',
            desc: 'Generate weekly reports of journey times, delays, and route adherence.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
          }
        ],
        conclusion: {
          title: 'The Future Is Already Here',
          text: 'GPS technology in school transportation is not an emerging trend — it is the new standard. Schools that adopt it today give students a safer journey and give parents the visibility they deserve.'
        }
      }
    },

    'parent-guide-bus-tracking': {
      id: 'parent-guide-bus-tracking',
      category: 'Parents',
      title: "A Parent's Guide to School Bus Tracking",
      excerpt: 'Learn how transportation tracking can help parents stay informed about pickup, travel, and arrival times.',
      image: 'assets/images/blog/blog-parent-tracking.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'September 4, 2026',
      readTime: '5 min read',
      tags: ['Parents', 'Tracking', 'School Bus', 'Notifications'],
      content: {
        intro: `As a parent, knowing whether your child has boarded the school bus safely and is on their way home is one of the most important pieces of information you need each day. Modern school bus tracking systems are designed to give parents exactly that — and much more. This guide walks you through what to expect and how to get the most out of these tools.`,
        sections: [
          {
            title: 'What Does Bus Tracking Tell You?',
            body: `A good bus tracking system gives parents access to real-time information about the bus their child is travelling on. This typically includes the current GPS location of the bus, estimated time of arrival at each stop, confirmation that the student boarded or alighted, and any alerts about delays or route changes. Some systems also show driving behaviour metrics like speed and braking, giving parents additional peace of mind.`
          },
          {
            title: 'How Notifications Work',
            body: `Most tracking platforms allow parents to set up personalised notifications. You can receive a push notification when the bus is a set number of minutes away from your stop, when your child boards or exits the bus, and when there is an unexpected delay or route change. These automated alerts eliminate the need to manually check an app throughout the day and ensure you are informed exactly when it matters.`
          },
          {
            title: 'Accessing the Parent Dashboard',
            body: `Tracking platforms are typically available as both a mobile app and a web browser dashboard. Once your school has registered you and your child on the system, you will receive login credentials and can immediately view your child's assigned bus, route, and schedule. Most platforms are designed to be intuitive and require no technical setup beyond entering your login details.`
          },
          {
            title: 'What to Do in an Emergency',
            body: `If you notice something unusual on the tracking map — such as the bus stopping for an extended period or deviating from its route — contact your school's transportation office directly. The platform itself will typically alert administrators automatically, and most have built-in emergency escalation protocols. Having the school and transportation office contact numbers saved in your phone ensures you can act quickly if needed.`
          }
        ],
        keyPoints: {
          title: 'What Parents Can Expect',
          items: [
            'Live bus location visible on a map at all times',
            'Automated notifications before the bus reaches your stop',
            'Boarding and alighting confirmation for each journey',
            'Route change and delay alerts sent in real time',
            'Direct link to school communication tools',
            'Access via mobile app and web browser',
            'Secure login with privacy protections for student data'
          ]
        },
        stats: [
          { num: '87%', label: 'Stress Reduction' },
          { num: '2 min', label: 'Avg Notification Lead Time' },
          { num: '100%', label: 'Journey Visibility' }
        ],
        pullQuote: 'When parents can see exactly where their child is, they are not just informed — they are empowered to make better decisions every day.',
        tips: [
          {
            title: 'Enable Notifications',
            desc: 'Allow push notifications from the SchoolRoute app for instant updates.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
          },
          {
            title: 'Update Contacts',
            desc: 'Keep your contact number and emergency contacts updated in your parent profile.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
          },
          {
            title: 'Check the Schedule',
            desc: 'Review your child\'s assigned bus, route, and stop times at the start of each term.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
          },
          {
            title: 'Report Issues',
            desc: 'Use the app to report any concerns directly to your school\'s transport team.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
          }
        ],
        conclusion: {
          title: 'Knowledge Is Peace of Mind',
          text: 'A bus tracking system gives you the visibility and reassurance you need to go about your day confidently, knowing your child\'s journey is being monitored every step of the way.'
        }
      }
    },

    'student-boarding-updates': {
      id: 'student-boarding-updates',
      category: 'Student Monitoring',
      title: 'Why Student Boarding Updates Matter',
      excerpt: 'Better boarding and drop-off visibility can help parents and schools maintain a clearer record of student journeys.',
      image: 'assets/images/blog/blog-student-monitoring.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'August 29, 2026',
      readTime: '5 min read',
      tags: ['Student Monitoring', 'Boarding', 'Safety', 'Attendance'],
      content: {
        intro: `Knowing exactly when a student boards and alights a school bus sounds simple — but for many schools, this information is still manually recorded or not tracked at all. Digital boarding updates are one of the most effective tools available for keeping students safer and giving parents clear, reliable information about their child's daily journey.`,
        sections: [
          {
            title: 'The Problem with Manual Attendance',
            body: `Manual bus attendance — a driver calling names or counting students — is prone to error, especially on busy routes with many stops. A student can be missed, recorded incorrectly, or not counted at all when alight at the wrong stop. Digital systems that automatically log each boarding and alighting event eliminate these gaps and provide an accurate, time-stamped record of every student's presence on the bus.`
          },
          {
            title: 'How Digital Check-In Works',
            body: `Modern student monitoring systems use RFID cards, QR codes, or mobile-based check-in tools to record when each student boards and leaves the bus. A simple tap or scan triggers an instant notification to the parent and a logged entry in the school's transportation management system. This happens in seconds, without interrupting the boarding flow or adding workload for the driver.`
          },
          {
            title: 'Immediate Parent Notifications',
            body: `When digital check-in is in place, parents receive an automatic notification the moment their child boards or alights. If a child is expected on the afternoon bus but does not board within a set time window, the system can automatically alert both the parent and the school. This proactive approach removes uncertainty and enables a faster response when something unexpected happens.`
          },
          {
            title: 'Integration with School Attendance Records',
            body: `Transportation monitoring data can be integrated with the school's wider attendance management system. If a student is marked present at school but does not board the afternoon bus, an alert is generated. If a student boards the morning bus but is not recorded at school, that discrepancy is flagged. This cross-referencing creates a much stronger safeguarding net than either system could provide independently.`
          }
        ],
        keyPoints: {
          title: 'Benefits of Digital Boarding Updates',
          items: [
            'Time-stamped record of every boarding and alighting event',
            'Instant parent notification when child boards or exits',
            'Automatic alert if expected boarding is missed',
            'Integration with school attendance management',
            'Eliminates manual driver counting errors',
            'Supports faster emergency response with precise records',
            'Reduces parental phone calls to the school office'
          ]
        },
        stats: [
          { num: '100%', label: 'Boarding Accuracy' },
          { num: '8 sec', label: 'Average Notification Speed' },
          { num: '40%', label: 'Fewer Office Calls' }
        ],
        pullQuote: 'When every boarding event is automatically recorded and every parent is instantly notified, the school bus becomes one of the safest parts of the school day.',
        tips: [
          {
            title: 'RFID Cards',
            desc: 'Issue every student a unique RFID card for fast, accurate bus check-in.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`
          },
          {
            title: 'Auto Alerts',
            desc: 'Set missed boarding alerts to trigger after a configurable time window.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
          },
          {
            title: 'Daily Reports',
            desc: 'Generate automated daily boarding reports for school administrators.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
          },
          {
            title: 'Cross-Reference',
            desc: 'Link bus records with school attendance data to detect discrepancies automatically.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 8 16 13"></polyline><line x1="21" y1="8" x2="9" y2="8"></line><polyline points="8 21 3 16 8 11"></polyline><line x1="3" y1="16" x2="15" y2="16"></line></svg>`
          }
        ],
        conclusion: {
          title: 'Small Data, Big Safety Impact',
          text: 'Knowing exactly when a student boards and alights is a small piece of data — but it is one that can make an enormous difference in keeping every child safe and every parent informed.'
        }
      }
    },

    'smarter-routes-school-transport': {
      id: 'smarter-routes-school-transport',
      category: 'Route Management',
      title: 'How Smarter Routes Can Improve School Transportation',
      excerpt: 'Explore how organised route planning can reduce unnecessary delays and create a smoother daily transportation experience.',
      image: 'assets/images/blog/blog-route-management.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'August 22, 2026',
      readTime: '6 min read',
      tags: ['Route Management', 'School Transportation', 'Efficiency', 'Planning'],
      content: {
        intro: `Route planning is at the heart of every school transportation system. An inefficient route means longer journey times for students, higher fuel costs for schools, and more stress for drivers. Smarter route planning — backed by data and technology — can transform a chaotic transport network into a smooth, predictable, and cost-effective operation.`,
        sections: [
          {
            title: 'Why Route Design Matters More Than You Think',
            body: `A poorly designed bus route can add 20–30 minutes to a student's daily commute unnecessarily. Over an academic year, this accumulates into hours of lost time and significant additional stress. Beyond the student experience, inefficient routes consume more fuel, put more wear on vehicles, and make it harder for drivers to stay on schedule when traffic conditions change. Good route design addresses all of these issues simultaneously.`
          },
          {
            title: 'Data-Driven Route Optimisation',
            body: `Modern route management platforms analyse historical journey time data, traffic patterns, student stop locations, and school start times to suggest optimal routes. These platforms can automatically recalculate routes when a new student is added, when a stop is temporarily closed, or when road conditions change. The result is a living route plan that adapts to real-world conditions rather than staying fixed regardless of what is happening on the ground.`
          },
          {
            title: 'Reducing Multi-Bus Overlap',
            body: `In schools with multiple bus routes, overlap is common — two buses serving the same neighbourhood at slightly different times, or buses that pass the same road twice on the same journey. Route management tools can identify and eliminate these inefficiencies, consolidating stops and balancing student loads across vehicles to make every bus journey as efficient as possible.`
          },
          {
            title: 'Communicating Changes to Parents',
            body: `Route changes — even temporary ones — need to be communicated clearly and quickly to affected parents. Digital platforms allow schools to push route update notifications to specific parent groups instantly, with maps showing the revised stop locations and updated time estimates. This eliminates confusion and ensures that no family is caught off-guard by a route adjustment.`
          }
        ],
        keyPoints: {
          title: 'Route Management Essentials',
          items: [
            'Analyse historical journey data to identify delays',
            'Use automated tools to suggest optimal stop sequences',
            'Balance student loads across all available vehicles',
            'Adapt routes in real time when conditions change',
            'Push instant notifications to parents when routes change',
            'Track fuel consumption data per route for cost analysis',
            'Review and update routes at the start of each term'
          ]
        },
        stats: [
          { num: '22%', label: 'Shorter Journey Times' },
          { num: '18%', label: 'Fuel Savings' },
          { num: '35%', label: 'Fewer Parent Complaints' }
        ],
        pullQuote: 'A well-planned route is not just more efficient — it is safer, more reliable, and creates a better experience for every student on board.',
        tips: [
          {
            title: 'Stop Analysis',
            desc: 'Review stop locations annually to match changes in student enrolment.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`
          },
          {
            title: 'Traffic Data',
            desc: 'Integrate real-time traffic data to avoid known congestion points.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"></path></svg>`
          },
          {
            title: 'Route Alerts',
            desc: 'Send instant notifications to parents when a route is temporarily modified.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
          },
          {
            title: 'Cost Reports',
            desc: 'Generate monthly cost reports per route to identify the highest-cost journeys.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
          }
        ],
        conclusion: {
          title: 'Route Efficiency Is Student Wellbeing',
          text: 'Every minute saved on a bus route is a minute returned to a student\'s day. Smarter route planning is one of the most impactful investments a school can make in its transportation programme.'
        }
      }
    },

    'connected-school-transport-system': {
      id: 'connected-school-transport-system',
      category: 'School Transportation',
      title: 'Building a More Connected School Transport System',
      excerpt: 'See how communication, route visibility, monitoring, and digital tools can work together to improve school transportation.',
      image: 'assets/images/blog/blog-school-transport.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'August 15, 2026',
      readTime: '7 min read',
      tags: ['School Transportation', 'Digital Tools', 'Communication', 'Integration'],
      content: {
        intro: `A school transportation system is only as strong as its weakest link. Route management, student monitoring, driver communication, parent notifications, and payment handling are all part of the same operation — but in many schools, these functions operate in silos, leading to miscommunication, delays, and gaps in safety coverage. Connecting these elements into a unified digital system changes everything.`,
        sections: [
          {
            title: 'Why Disconnected Systems Fail',
            body: `When transportation managers use spreadsheets for routes, drivers use radio for communication, parents receive paper letters for updates, and payments are handled separately in cash, the system is fragile. Any breakdown in one component creates a cascade of problems. A driver does not receive a route change notification. A parent does not know a bus is late. A student is assigned to the wrong bus because the spreadsheet was not updated. A connected system eliminates these failure points.`
          },
          {
            title: 'The Four Pillars of a Connected System',
            body: `An effective, connected school transportation system rests on four pillars: real-time tracking (where is every bus right now?), student monitoring (who is on each bus?), communication (how are all parties informed?), and administration (how are routes, payments, and records managed?). When these four pillars share the same platform and data, the entire operation becomes dramatically more efficient and reliable.`
          },
          {
            title: 'Parent-School Communication in Real Time',
            body: `One of the most visible improvements from a connected system is the quality of parent communication. Instead of weekly newsletters or reactive phone calls, parents receive proactive, relevant notifications throughout the day — bus departure, arrival, student boarding, and any delays or changes. Schools can also send group announcements to all parents on a specific route or to parents of students on a particular bus, making targeted communication effortless.`
          },
          {
            title: 'Centralised Administration',
            body: `A unified platform gives administrators a single view of the entire transportation operation. Route assignments, student rosters, driver schedules, vehicle maintenance records, and payment histories are all accessible from one dashboard. This reduces the administrative burden significantly and makes audits, compliance reporting, and end-of-term reviews much faster and more accurate.`
          }
        ],
        keyPoints: {
          title: 'Key Integration Points',
          items: [
            'Unified platform for routes, tracking, and communication',
            'Real-time parent notifications with no manual effort',
            'Driver mobile app for route updates and check-ins',
            'Student RFID or QR check-in linked to parent notifications',
            'Centralised admin dashboard for all transport records',
            'Integration with school attendance and payment systems',
            'Automated compliance and journey reports'
          ]
        },
        stats: [
          { num: '50%', label: 'Less Admin Time' },
          { num: '95%', label: 'Parent Engagement' },
          { num: '30%', label: 'Faster Issue Resolution' }
        ],
        pullQuote: 'A connected transportation system is not a luxury — it is the infrastructure that every modern school needs to keep students safe and parents informed.',
        tips: [
          {
            title: 'Single Platform',
            desc: 'Consolidate routes, tracking, and communication into one unified tool.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
          },
          {
            title: 'Driver App',
            desc: 'Give drivers a mobile app with their route, student list, and alert functions.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
          },
          {
            title: 'Auto Reports',
            desc: 'Schedule automated weekly reports to administrators and school leadership.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`
          },
          {
            title: 'Group Alerts',
            desc: 'Send targeted alerts to parents on specific routes or buses with one click.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
          }
        ],
        conclusion: {
          title: 'Connected Systems Create Safer Schools',
          text: 'The most effective school transportation systems are not built from individual tools — they are built from integrated platforms where every component shares data and every stakeholder has the visibility they need.'
        }
      }
    },

    'digital-transportation-management': {
      id: 'digital-transportation-management',
      category: 'Technology',
      title: 'From Paper Records to Digital Transportation Management',
      excerpt: 'Learn how digital tools can simplify transportation records, notifications, payments, and parent communication.',
      image: 'assets/images/blog/blog-digital-management.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'August 8, 2026',
      readTime: '5 min read',
      tags: ['Technology', 'Digital Tools', 'Administration', 'School Management'],
      content: {
        intro: `For decades, school transportation management relied on physical binders, handwritten attendance sheets, and phone-based communication. While these systems worked, they were slow, error-prone, and difficult to scale. The shift to digital transportation management is not just a technological upgrade — it is a fundamental improvement in how schools operate, communicate, and keep students safe.`,
        sections: [
          {
            title: 'The Hidden Cost of Paper Systems',
            body: `Paper-based transportation records carry hidden costs that are easy to overlook. Every manual entry is a potential error. Every physical file takes time to retrieve. Every phone call to inform a parent of a delay costs staff time. Over an academic year, these small inefficiencies add up to significant wasted resources. A digital system eliminates most of these costs by automating the repetitive tasks that consume staff time every day.`
          },
          {
            title: 'Digital Payment and Fee Management',
            body: `Handling transportation fees in cash or by cheque creates administrative burden for school offices and inconvenience for parents. Digital payment platforms allow parents to pay transportation fees online, view payment history, and receive receipts automatically. Schools benefit from automated fee tracking, reduced cash handling, and easier end-of-term reconciliation. Overdue accounts can be flagged automatically, reducing the manual follow-up workload.`
          },
          {
            title: 'Paperless Record Keeping',
            body: `Digital transportation management platforms store every route, student, journey record, and incident report in a searchable, secure database. When a parent calls to query a past journey, an administrator can retrieve the exact details in seconds rather than searching through physical files. When a school inspector needs transport records for compliance, they can be generated and exported in minutes.`
          },
          {
            title: 'Scaling With Your School\'s Growth',
            body: `Paper systems become exponentially harder to manage as student numbers grow. A digital platform scales effortlessly — adding new students, new routes, or new buses takes minutes rather than days. The system grows with the school, without requiring additional administrative staff or physical storage space.`
          }
        ],
        keyPoints: {
          title: 'What Digital Management Replaces',
          items: [
            'Manual attendance registers with automated digital check-in',
            'Paper route maps with live digital route management',
            'Phone-based parent communication with automated notifications',
            'Cash fee collection with secure digital payment processing',
            'Physical filing with searchable cloud-based record keeping',
            'Manual compliance reports with automated report generation',
            'Email newsletters with real-time targeted push notifications'
          ]
        },
        stats: [
          { num: '70%', label: 'Admin Time Saved' },
          { num: '0', label: 'Lost Paper Records' },
          { num: '98%', label: 'Payment Accuracy' }
        ],
        pullQuote: 'Going digital is not just about convenience — it is about building a transportation system that is accurate, accountable, and built for the future.',
        tips: [
          {
            title: 'Cloud Storage',
            desc: 'Store all transport records in a secure, backed-up cloud system.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path></svg>`
          },
          {
            title: 'Online Payments',
            desc: 'Offer parents multiple digital payment options for transport fees.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`
          },
          {
            title: 'Audit Trails',
            desc: 'Maintain an automatic, time-stamped audit trail for every transport record.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`
          },
          {
            title: 'Export Reports',
            desc: 'Generate and export transport reports in PDF or CSV format for inspections.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`
          }
        ],
        conclusion: {
          title: 'The Paper Era Is Over',
          text: 'Schools that make the transition to digital transportation management do not just save time and money — they build a safer, more reliable, and more professional operation that benefits every student, parent, and staff member.'
        }
      }
    },

    'what-parents-look-for-school-transport': {
      id: 'what-parents-look-for-school-transport',
      category: 'Safety',
      title: 'What Parents Should Look for in a School Transport Service',
      excerpt: 'A practical checklist covering driver verification, journey monitoring, communication, and student safety.',
      image: 'assets/images/blog/blog-driver-safety.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'August 1, 2026',
      readTime: '5 min read',
      tags: ['Safety', 'Parents', 'School Transport', 'Driver Verification'],
      content: {
        intro: `Choosing or evaluating a school transport service is one of the most important decisions a parent can make. Whether your child is starting school for the first time or you are reconsidering an existing arrangement, knowing what to look for can help you make an informed decision that puts your child\'s safety first.`,
        sections: [
          {
            title: 'Driver Verification and Credentials',
            body: `The most fundamental requirement of any school transport service is driver verification. Every driver should hold the appropriate commercial licence for the vehicle they operate, have undergone a comprehensive background check, and have a clean driving record. Ask the service provider for their driver vetting policy and whether checks are repeated annually. A reputable provider will have clear, documented procedures and be happy to share them.`
          },
          {
            title: 'Real-Time Tracking and Parent Notifications',
            body: `A professional school transport service should offer real-time GPS tracking of every bus, accessible to parents through a mobile app or web portal. You should be able to see where your child\'s bus is at any moment during the school day, receive notifications when the bus is approaching your stop, and receive confirmation when your child boards and alights. If a service cannot offer this level of visibility, it is a significant gap.`
          },
          {
            title: 'Vehicle Safety and Maintenance Standards',
            body: `Ask about the age and condition of the vehicles in the fleet. All vehicles should undergo regular safety inspections, and records of these inspections should be maintained. Modern buses should be equipped with seatbelts, emergency exits, first aid kits, and fire extinguishers. Older vehicles without these features represent an unnecessary safety risk.`
          },
          {
            title: 'Communication and Incident Response',
            body: `Find out how the service communicates with parents when something unexpected happens — a delay, a route change, or an incident. A good service has a clear communication protocol that ensures parents are notified promptly and accurately. There should also be a direct line to a transportation coordinator who can answer questions or respond to concerns in real time.`
          }
        ],
        keyPoints: {
          title: 'Parent Safety Checklist',
          items: [
            'Verified drivers with background checks and annual renewals',
            'Real-time GPS tracking accessible to parents',
            'Automated boarding and alighting notifications',
            'Regular vehicle safety inspections with documented records',
            'Clear emergency communication protocol for incidents',
            'Direct contact line to transportation coordinator',
            'Student behaviour and conduct policy during journeys'
          ]
        },
        stats: [
          { num: '93%', label: 'Parents Prioritise Driver Checks' },
          { num: '88%', label: 'Want Real-Time Tracking' },
          { num: '76%', label: 'Prefer App-Based Updates' }
        ],
        pullQuote: 'A school transport service earns trust not through promises, but through transparent processes, verified drivers, and real-time visibility that parents can see for themselves.',
        tips: [
          {
            title: 'Ask for Records',
            desc: 'Request documentation of driver checks and vehicle inspections before enrolment.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`
          },
          {
            title: 'Test the App',
            desc: 'Ask for a demo of the parent tracking app before committing to the service.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
          },
          {
            title: 'Check Reviews',
            desc: 'Ask other parents at the school for their experience with the service.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
          },
          {
            title: 'Emergency Contact',
            desc: 'Save the transport coordinator\'s direct number in your phone before day one.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`
          }
        ],
        conclusion: {
          title: 'Your Questions Are Your Child\'s Safety',
          text: 'Never hesitate to ask a transport provider the hard questions. A service that cannot answer them clearly is not one that deserves your trust — or your child\'s safety.'
        }
      }
    },

    'future-smarter-school-transportation': {
      id: 'future-smarter-school-transportation',
      category: 'School Updates',
      title: "What's Next for Smarter School Transportation?",
      excerpt: 'An overview of how connected technology can help schools create more visible and efficient transportation experiences.',
      image: 'assets/images/blog/blog-future-transport.jpg',
      fallbackImage: 'assets/images/blog/blog-hero.jpg',
      author: 'SchoolRoute Team',
      authorInitials: 'SR',
      date: 'July 25, 2026',
      readTime: '6 min read',
      tags: ['School Updates', 'Technology', 'Future', 'Innovation'],
      content: {
        intro: `School transportation is entering a new era. The combination of GPS technology, connected mobile platforms, AI-driven route optimisation, and real-time communication is creating transportation experiences that would have seemed impossible just five years ago. Understanding where these trends are heading can help schools plan smarter investments today.`,
        sections: [
          {
            title: 'AI-Powered Route Optimisation',
            body: `Artificial intelligence is beginning to make route planning dramatically smarter. Instead of manually reviewing and adjusting routes each term, AI-powered systems can analyse thousands of variables — traffic data, student locations, school start times, fuel costs, and vehicle capacity — to generate optimal routes automatically. As conditions change throughout the year, the system continuously re-evaluates and improves, learning from each day's journey data.`
          },
          {
            title: 'Predictive Maintenance for School Fleets',
            body: `Modern vehicles generate continuous data about engine performance, tyre pressure, brake wear, and fuel efficiency. Predictive maintenance platforms analyse this data to identify which vehicles are at risk of breaking down before they actually do, allowing schools to schedule maintenance proactively rather than reactively. The result is fewer breakdowns, more reliable service, and longer vehicle lifetimes.`
          },
          {
            title: 'Enhanced Parent Engagement Platforms',
            body: `The next generation of parent communication tools goes beyond simple notifications. Parents will be able to submit absence notifications that automatically adjust the bus manifest, communicate directly with transportation coordinators through the app, and access a full history of their child's journeys, payments, and school transport records. The boundary between transportation management and parent engagement is disappearing.`
          },
          {
            title: 'Integration With School-Wide Platforms',
            body: `Transportation systems of the future will not operate independently of the rest of the school's digital infrastructure. They will integrate with student information systems, school apps, learning management platforms, and parent portals — creating a single, unified experience for every family. When a student is absent, the transport system automatically adjusts. When a school event changes timing, routes are updated automatically.`
          }
        ],
        keyPoints: {
          title: 'Trends Shaping the Future',
          items: [
            'AI and machine learning for dynamic route optimisation',
            'Predictive fleet maintenance using vehicle sensor data',
            'Two-way parent communication built into transport apps',
            'Integration with student information and school systems',
            'Real-time carbon emissions tracking for sustainability reports',
            'Automated compliance reporting for transport regulations',
            'Expanded geofencing with intelligent alert customisation'
          ]
        },
        stats: [
          { num: '2027', label: 'AI Route Tools Mainstream' },
          { num: '40%', label: 'Predicted Efficiency Gains' },
          { num: '5★', label: 'Parent Experience Target' }
        ],
        pullQuote: 'The schools that invest in smarter transportation today are building the infrastructure that will define student safety, parent trust, and operational excellence for the next decade.',
        tips: [
          {
            title: 'Plan Ahead',
            desc: 'Review your transport technology roadmap annually with your provider.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
          },
          {
            title: 'Pilot New Tools',
            desc: 'Test new features with a small group of routes before a full rollout.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`
          },
          {
            title: 'Train Staff',
            desc: 'Invest in regular training for staff on new platform features each term.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
          },
          {
            title: 'Collect Feedback',
            desc: 'Survey parents and staff on transport experience at the end of each term.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
          }
        ],
        conclusion: {
          title: 'The Future Is Being Built Now',
          text: 'The schools that lead in transportation technology today are creating a safer, smarter, and more trusted environment for students and families — not just for next year, but for the decade ahead.'
        }
      }
    }
  };

  /* ==========================================================================
     2. DOM REFERENCES
     ========================================================================== */
  const detailWrapper = document.getElementById('blog-detail-wrapper');
  const notFoundWrap = document.getElementById('blog-detail-not-found');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');

  /* ==========================================================================
     3. READ URL PARAMETER & FIND POST
     ========================================================================== */
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id') || '';
  const post = blogPosts[postId];

  /* ==========================================================================
     4. HANDLE NOT-FOUND STATE
     ========================================================================== */
  if (!post) {
    if (detailWrapper) detailWrapper.style.display = 'none';
    if (notFoundWrap) notFoundWrap.style.display = 'block';
    document.title = 'Article Not Found | SchoolRoute';
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.setAttribute('content', 'The requested blog article could not be found. Browse all SchoolRoute insights instead.');
    initScrollReveal();
    return;
  }

  /* ==========================================================================
     5. UPDATE HEAD METADATA
     ========================================================================== */
  document.title = `${post.title} | SchoolRoute Blog`;
  const metaDesc = document.getElementById('meta-description');
  if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

  /* ==========================================================================
     6. RENDER: BREADCRUMB CURRENT PAGE
     ========================================================================== */
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = post.title.length > 45
      ? post.title.substring(0, 45) + '…'
      : post.title;
  }

  /* ==========================================================================
     7. RENDER: ARTICLE HERO
     ========================================================================== */
  function renderArticleHero() {
    const heroInner = document.getElementById('article-hero-inner');
    if (!heroInner) return;

    heroInner.innerHTML = `
      <div class="article-hero-category">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>
        ${escapeHtml(post.category)}
      </div>
      <h1 class="article-hero-title">${escapeHtml(post.title)}</h1>
      <p class="article-hero-excerpt">${escapeHtml(post.excerpt)}</p>
      <div class="article-hero-meta">
        <span class="article-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          ${escapeHtml(post.author)}
        </span>
        <span class="article-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          ${escapeHtml(post.date)}
        </span>
        <span class="article-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ${escapeHtml(post.readTime)}
        </span>
      </div>
      <div class="article-hero-image-wrap">
        <img
          src="${post.image}"
          alt="${escapeHtml(post.title)}"
          class="article-hero-img"
          width="840"
          height="420"
          loading="eager"
          onerror="this.onerror=null; this.src='${post.fallbackImage}';"
        >
      </div>
    `;
  }

  /* ==========================================================================
     8. RENDER: ARTICLE MAIN CONTENT
     ========================================================================== */
  function renderArticleContent() {
    const articleMainCol = document.getElementById('article-main-content');
    if (!articleMainCol || !post.content) return;

    const { intro, sections, keyPoints, stats, pullQuote, tips, conclusion } = post.content;

    let html = '';

    // --- Intro Paragraph ---
    if (intro) {
      html += `
        <div class="article-section">
          <p class="article-paragraph" style="font-size: 1.08rem; font-weight: 500; color: var(--dark-text);">${escapeHtml(intro)}</p>
        </div>
      `;
    }

    // --- Body Sections ---
    if (sections && sections.length) {
      sections.forEach((section, i) => {
        html += `
          <div class="article-section reveal-up" style="--anim-delay: ${i * 80}ms;">
            <h2 class="article-section-title">${escapeHtml(section.title)}</h2>
            <p class="article-paragraph">${escapeHtml(section.body)}</p>
          </div>
        `;
        // Insert pull quote after section 1
        if (i === 1 && pullQuote) {
          html += `
            <div class="article-pull-quote reveal-up">
              <p>${escapeHtml(pullQuote)}</p>
            </div>
          `;
        }
        // Insert stats after section 2
        if (i === 2 && stats && stats.length) {
          html += `
            <div class="article-highlight-card reveal-scale">
              ${stats.map(s => `
                <div class="article-stat-item">
                  <span class="article-stat-num">${escapeHtml(s.num)}</span>
                  <span class="article-stat-label">${escapeHtml(s.label)}</span>
                </div>
              `).join('')}
            </div>
          `;
        }
      });
    }

    // --- Key Points Box ---
    if (keyPoints) {
      html += `
        <div class="article-key-points reveal-up">
          <p class="article-key-points-title">${escapeHtml(keyPoints.title)}</p>
          <ul class="article-key-points-list">
            ${keyPoints.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // --- Tips Grid ---
    if (tips && tips.length) {
      html += `
        <div class="article-section reveal-up">
          <h2 class="article-section-title">Practical Guidance</h2>
          <div class="article-tips-grid">
            ${tips.map(tip => `
              <div class="article-tip-card">
                <div class="article-tip-icon">${tip.icon}</div>
                <h3 class="article-tip-title">${escapeHtml(tip.title)}</h3>
                <p class="article-tip-desc">${escapeHtml(tip.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // --- Conclusion Box ---
    if (conclusion) {
      html += `
        <div class="article-conclusion-box reveal-up">
          <h3 class="article-conclusion-title">${escapeHtml(conclusion.title)}</h3>
          <p class="article-conclusion-text">${escapeHtml(conclusion.text)}</p>
          <a href=\"contact.html\" class="btn btn-primary">
            Get Started with SchoolRoute <span class="btn-arrow">→</span>
          </a>
        </div>
      `;
    }

    // --- Tags Row ---
    if (post.tags && post.tags.length) {
      html += `
        <div class="article-tags-row">
          <span class="article-tags-label">Tags:</span>
          ${post.tags.map(tag => `<span class="article-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      `;
    }

    // --- Share Row ---
    html += `
      <div class="article-share-row">
        <span class="article-share-label">Share:</span>
        <button class="share-btn" id="share-twitter-btn" aria-label="Share on Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          Twitter
        </button>
        <button class="share-btn" id="share-linkedin-btn" aria-label="Share on LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          LinkedIn
        </button>
        <button class="share-btn" id="share-copy-btn" aria-label="Copy link to clipboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          Copy Link
        </button>
      </div>
    `;

    articleMainCol.innerHTML = html;
    initShareButtons();
  }

  /* ==========================================================================
     9. RENDER: SIDEBAR
     ========================================================================== */
  function renderSidebar() {
    renderSidebarAuthor();
    renderSidebarCategories();
    renderSidebarRecentPosts();
  }

  function renderSidebarAuthor() {
    const authorCard = document.getElementById('sidebar-author-card');
    if (!authorCard) return;

    authorCard.innerHTML = `
      <div class="author-avatar-wrap">
        <div class="author-avatar" aria-hidden="true">${escapeHtml(post.authorInitials)}</div>
        <div>
          <p class="author-info-name">${escapeHtml(post.author)}</p>
          <p class="author-info-role">School Transportation Expert</p>
        </div>
      </div>
      <p class="author-bio">The SchoolRoute Team creates expert insights on student safety, smart transportation technology, and school bus management best practices.</p>
    `;
  }

  function renderSidebarCategories() {
    const catList = document.getElementById('sidebar-categories-list');
    if (!catList) return;

    // Count posts per category
    const categoryCounts = {};
    Object.values(blogPosts).forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

    catList.innerHTML = categories.map(([cat, count]) => `
      <li>
        <a href="blog.html" class="sidebar-category-item" aria-label="Browse ${escapeHtml(cat)} articles">
          <span>${escapeHtml(cat)}</span>
          <span class="sidebar-category-count">${count}</span>
        </a>
      </li>
    `).join('');
  }

  function renderSidebarRecentPosts() {
    const recentList = document.getElementById('sidebar-recent-list');
    if (!recentList) return;

    // Show 4 most recent posts, excluding current
    const recentPosts = Object.values(blogPosts)
      .filter(p => p.id !== post.id)
      .slice(0, 4);

    recentList.innerHTML = recentPosts.map(p => `
      <li class="sidebar-recent-item">
        <a href="blog-detail.html?id=${encodeURIComponent(p.id)}" class="sidebar-recent-img-wrap" tabindex="-1" aria-hidden="true">
          <img
            src="${p.image}"
            alt="${escapeHtml(p.title)}"
            class="sidebar-recent-img"
            width="58"
            height="58"
            loading="lazy"
            onerror="this.onerror=null; this.src='${p.fallbackImage}';"
          >
        </a>
        <div class="sidebar-recent-content">
          <a href="blog-detail.html?id=${encodeURIComponent(p.id)}" class="sidebar-recent-title">${escapeHtml(p.title)}</a>
          <p class="sidebar-recent-date">${escapeHtml(p.date)}</p>
        </div>
      </li>
    `).join('');
  }

  /* ==========================================================================
     10. RENDER: RELATED ARTICLES
     ========================================================================== */
  function renderRelatedArticles() {
    const relatedGrid = document.getElementById('related-articles-grid');
    if (!relatedGrid) return;

    // Pick 3 related posts: same category first, then others
    const sameCat = Object.values(blogPosts).filter(p => p.id !== post.id && p.category === post.category);
    const others = Object.values(blogPosts).filter(p => p.id !== post.id && p.category !== post.category);
    const related = [...sameCat, ...others].slice(0, 3);

    if (!related.length) {
      const relatedSection = document.getElementById('related-articles');
      if (relatedSection) relatedSection.style.display = 'none';
      return;
    }

    relatedGrid.innerHTML = related.map((rp, index) => `
      <article class="related-article-card reveal-up" style="--anim-delay: ${index * 100}ms;">
        <a href="blog-detail.html?id=${encodeURIComponent(rp.id)}" class="related-card-img-wrap" aria-hidden="true" tabindex="-1">
          <img
            src="${rp.image}"
            alt="${escapeHtml(rp.title)}"
            class="related-card-img"
            width="400"
            height="225"
            loading="lazy"
            onerror="this.onerror=null; this.src='${rp.fallbackImage}';"
          >
        </a>
        <div class="related-card-body">
          <span class="related-card-category">${escapeHtml(rp.category)}</span>
          <h3 class="related-card-title">
            <a href="blog-detail.html?id=${encodeURIComponent(rp.id)}">${escapeHtml(rp.title)}</a>
          </h3>
          <p class="related-card-date">${escapeHtml(rp.date)}</p>
          <a href="blog-detail.html?id=${encodeURIComponent(rp.id)}" class="related-card-link" aria-label="Read: ${escapeHtml(rp.title)}">
            Read Article <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    `).join('');
  }

  /* ==========================================================================
     11. SHARE BUTTON HANDLERS
     ========================================================================== */
  function initShareButtons() {
    const twitterBtn = document.getElementById('share-twitter-btn');
    const linkedinBtn = document.getElementById('share-linkedin-btn');
    const copyBtn = document.getElementById('share-copy-btn');

    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(post.title);

    if (twitterBtn) {
      twitterBtn.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`, '_blank', 'noopener');
      });
    }

    if (linkedinBtn) {
      linkedinBtn.addEventListener('click', () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, '_blank', 'noopener');
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          const originalText = copyBtn.querySelector('svg').outerHTML + ' Copied!';
          copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          copyBtn.style.borderColor = 'var(--primary-green)';
          copyBtn.style.color = 'var(--primary-green)';
          setTimeout(() => {
            copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> Copy Link`;
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
          }, 2500);
        } catch {
          copyBtn.textContent = 'Copy Link';
        }
      });
    }
  }

  /* ==========================================================================
     12. SCROLL REVEAL OBSERVER
     ========================================================================== */
  function initScrollReveal() {
    const revealSelectors = '.reveal-up, .reveal-left, .reveal-right, .reveal-scale';
    const revealElements = document.querySelectorAll(revealSelectors);
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });
      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  }

  /* ==========================================================================
     13. UTILITY: HTML ESCAPE
     ========================================================================== */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     14. INITIALISE ALL RENDERS
     ========================================================================== */
  renderArticleHero();
  renderArticleContent();
  renderSidebar();
  renderRelatedArticles();
  initScrollReveal();

});
