export const personalInfo = {
    fullName: 'Prahlad Yadav',
    firstName: 'Prahlad',
    role: 'Full-Stack Engineer',
    email: 'prahlad.yadav.off@gmail.com',
    location: 'Delhi, India',
    resumeUrl: 'https://drive.google.com/file/d/1Igjw5KDPoXfMwAvsrA46lQSuS4cOE6WH/view?usp=drive_link',
    availability: 'Open to full-time SDE roles and impactful projects',
    intro:
        'Full-stack engineer. I build fast APIs, solve hard problems, and ship reliable code that scales.',
    summary:
        'Strong at backend systems, databases, and low-level design. I enjoy taking messy problems and turning them into clean, production-ready solutions.',
    socialLinks: {
        linkedin: 'https://linkedin.com/in/prahlad-yadav-07',
        github: 'https://github.com/Prahlad-07',
        instagram: 'https://instagram.com/prahlad_07',
    },
};

export const navLinks = [
    { id: 1, name: 'Home', href: '#home' },
    { id: 2, name: 'Experience', href: '#experience' },
    { id: 3, name: 'Skills', href: '#skills' },
    { id: 4, name: 'Projects', href: '#projects' },
    { id: 5, name: 'Recommendations', href: '#recommendations' },
    { id: 6, name: 'Contact', href: '#contact' },
];

export const heroMetrics = [
    {
        id: 1,
        value: 'Top 1%',
        label: 'Competitive Programmer',
        detail: 'Solved 3000+ problems across LeetCode, Codeforces, CodeChef, and HackerRank.',
    },
    {
        id: 2,
        value: '5+',
        label: 'Full-Stack Products',
        detail: 'Built and shipped real products with 10,000+ lines of production code.',
    },
    {
        id: 3,
        value: '2500+',
        label: 'GitHub Commits',
        detail: 'Consistent shipping for 12+ months straight.',
    },
    {
        id: 4,
        value: '4',
        label: 'Mobile Apps',
        detail: 'Android apps used by 1000+ students on campus.',
    },
];

export const aboutHighlights = [
    {
        id: 1,
        title: 'Fast Shipping',
        text: 'I turn ideas into working code quickly. No over-engineering, just solutions that work.',
    },
    {
        id: 2,
        title: 'Clean Code',
        text: 'My code is readable, maintainable, and documented. Other developers can jump in and understand it.',
    },
    {
        id: 3,
        title: 'Problem Solver',
        text: 'I solve hard problems by breaking them down. Competitive programming trained me to think clearly under pressure.',
    },
];

export const achievements = [
    'AIR 311 in ICPC Kanpur - one of India\'s top programming contests.',
    'Ranked 1446 out of 25,000+ teams in Amazon ML Challenge 2025.',
    'LeetCode Guardian (max 2150+), Codeforces Expert (max 1680+), CodeChef 4-star.',
    'Built and shipped 5+ full-stack products used by real users.',
];

export const skillGroups = [
    {
        id: 1,
        title: 'Backend & APIs',
        description: 'Where I shine. Spring Boot, REST APIs, databases, and system design.',
        accent: '#0f766e',
        items: [
            'Java',
            'Spring Boot',
            'Spring Security',
            'Hibernate',
            'REST APIs',
            'JWT',
            'Microservices',
            'Low-Level Design',
        ],
    },
    {
        id: 2,
        title: 'Frontend & UI',
        description: 'React and modern CSS. I build interfaces that users love.',
        accent: '#c2410c',
        items: [
            'React',
            'JavaScript',
            'Tailwind CSS',
            'HTML & CSS',
            'Responsive Design',
            'Component Design',
        ],
    },
    {
        id: 3,
        title: 'DevOps & Tools',
        description: 'Git, Docker, AWS, and everything needed to ship fast.',
        accent: '#1d4ed8',
        items: [
            'Git & GitHub',
            'AWS',
            'Docker',
            'Maven & Gradle',
            'Postman',
            'Linux',
        ],
    },
    {
        id: 4,
        title: 'Fundamentals',
        description: 'Data structures, algorithms, OS, networking - the deep stuff.',
        accent: '#7c3aed',
        items: [
            'Data Structures',
            'Algorithms',
            'Operating Systems',
            'Databases (SQL)',
            'System Design',
            'C/C++',
        ],
    },
];

export const codingProfiles = [
    {
        id: 1,
        platform: 'LeetCode',
        handle: 'Prahlad_07',
        url: 'https://leetcode.com/u/Prahlad_07/',
        highlight: 'Guardian badge with 2150+ max rating.',
        badge: '2150+ Max',
        color: '#d97706',
        icon: '/assets/codingProfiles/Leetcode.png',
    },
    {
        id: 2,
        platform: 'GitHub',
        handle: 'Prahlad-07',
        url: 'https://github.com/Prahlad-07',
        highlight: '2500+ commits in a single year.',
        badge: '2500+ Commits',
        color: '#312e81',
        icon: '/assets/codingProfiles/Github.png',
    },
    {
        id: 3,
        platform: 'Codeforces',
        handle: 'CenterNewHero',
        url: 'https://codeforces.com/profile/CenterNewHero',
        highlight: 'Expert title with a 1610+ max rating.',
        badge: 'Expert',
        color: '#0369a1',
        icon: '/assets/codingProfiles/codforces.png',
    },
    {
        id: 4,
        platform: 'GeeksforGeeks',
        handle: 'prahlad_07',
        url: 'https://www.geeksforgeeks.org/profile/prahlad_07',
        highlight: '4-star consistency across problem-solving tracks.',
        badge: '4 Star',
        color: '#15803d',
        icon: '/assets/codingProfiles/geekforgeeks.png',
    },
    {
        id: 5,
        platform: 'HackerRank',
        handle: 'Mr_Encrypt',
        url: 'https://www.hackerrank.com/profile/Mr_Encrypt',
        highlight: '6-star in problem solving.',
        badge: '6 Star',
        color: '#16a34a',
        icon: '/assets/codingProfiles/hackerrank.png',
    },
    {
        id: 6,
        platform: 'CodeChef',
        handle: 'mr_shyyy_07',
        url: 'https://www.codechef.com/users/mr_shyyy_07',
        highlight: '4-star rating with strong contest discipline.',
        badge: '4 Star',
        color: '#ea580c',
        icon: '/assets/codingProfiles/codechef.png',
    },
];

export const myProjects = [
    {
        id: 1,
        title: 'BookMySalon',
        mark: 'BM',
        category: 'Salon booking platform',
        year: '2026',
        repoState: 'Public repo',
        repoUrl: 'https://github.com/Prahlad-07/BookMySalon',
        repoLabel: 'View Repository',
        summary:
            'A real salon booking app. Salon owners can manage bookings, customers can discover and book salons nearby.',
        description:
            'Full-stack with secure login, booking system, real-time chat, and location search. Built with Java, Spring Boot, React, and MySQL.',
        impact: [
            'JWT auth + Google login. Real-time chat with WebSocket.',
            'Booking logic with time-slot validation and role-based access control.',
            'Mapbox integration for salon discovery. Dockerized backend.',
        ],
        availabilityNote: 'Real product, real users, production code.',
        theme: {
            primary: '#0f766e',
            secondary: '#d97706',
        },
        tags: [
            { id: 1, name: 'Java', path: '/assets/file-java-color-green-icon.svg' },
            { id: 2, name: 'Spring Boot', path: '/assets/icons8-spring-boot.svg' },
            { id: 3, name: 'React', path: '/assets/react.svg' },
            { id: 4, name: 'MySQL', path: '/assets/mysql-icon.svg' },
            { id: 5, name: 'Docker' },
            { id: 6, name: 'Mapbox' },
        ],
        images: [
            {
                id: 1,
                src: '/assets/Projects-Images/BookMySalon/firstImage.png',
                alt: 'BookMySalon landing screen screenshot',
            },
            {
                id: 2,
                src: '/assets/Projects-Images/BookMySalon/img.png',
                alt: 'BookMySalon booking interface screenshot',
            },
            {
                id: 3,
                src: '/assets/Projects-Images/BookMySalon/img_1.png',
                alt: 'BookMySalon salon details screen screenshot',
            },
            {
                id: 4,
                src: '/assets/Projects-Images/BookMySalon/img_2.png',
                alt: 'BookMySalon management flow screenshot',
            },
            {
                id: 5,
                src: '/assets/Projects-Images/BookMySalon/secondImage.png',
                alt: 'BookMySalon dashboard screenshot',
            },
        ],
    },
    {
        id: 2,
        title: 'GEC-B App',
        mark: 'GA',
        category: 'Campus communication app',
        year: '2025',
        repoState: 'Private repo',
        repoUrl: 'https://github.com/Prahlad-07/GECB_APP',
        repoLabel: 'Repository Link',
        summary:
            'Official Android app for my college. Notices, timetables, faculty info, events, and clubs - all in one place.',
        description:
            'Before this, students had to check multiple groups and websites. This app unified everything into one clean, fast app. Built with Kotlin and Firebase.',
        impact: [
            'Admin and student dashboards for managing notices, timetables, and events.',
            'Firebase for auth, messaging, and offline support so it works even without internet.',
            '1000+ college students are using this app daily.',
        ],
        availabilityNote: 'Real product, real users, production code.',
        theme: {
            primary: '#c2410c',
            secondary: '#0f766e',
        },
        tags: [
            { id: 1, name: 'Kotlin' },
            { id: 2, name: 'Jetpack Compose' },
            { id: 3, name: 'Firebase' },
            { id: 4, name: 'MVVM' },
            { id: 5, name: 'FCM' },
            { id: 6, name: 'Android' },
        ],
        images: [
            {
                id: 1,
                src: '/assets/Projects-Images/GEC-B%20App/1.png',
                alt: 'GEC-B App home screen screenshot',
            },
            {
                id: 2,
                src: '/assets/Projects-Images/GEC-B%20App/2.png',
                alt: 'GEC-B App timetable interface screenshot',
            },
            {
                id: 3,
                src: '/assets/Projects-Images/GEC-B%20App/image.png',
                alt: 'GEC-B App notice interface screenshot',
            },
            {
                id: 4,
                src: '/assets/Projects-Images/GEC-B%20App/image%20copy.png',
                alt: 'GEC-B App student dashboard screenshot',
            },
            {
                id: 5,
                src: '/assets/Projects-Images/GEC-B%20App/image%20copy%202.png',
                alt: 'GEC-B App admin interface screenshot',
            },
            {
                id: 6,
                src: '/assets/Projects-Images/GEC-B%20App/image%20copy%203.png',
                alt: 'GEC-B App faculty directory screenshot',
            },
            {
                id: 7,
                src: '/assets/Projects-Images/GEC-B%20App/image%20copy%204.png',
                alt: 'GEC-B App event screen screenshot',
            },
            {
                id: 8,
                src: '/assets/Projects-Images/GEC-B%20App/image%20copy%205.png',
                alt: 'GEC-B App community screen screenshot',
            },
            {
                id: 9,
                src: '/assets/Projects-Images/GEC-B%20App/image%20copy%206.png',
                alt: 'GEC-B App additional mobile workflow screenshot',
            },
        ],
    },
    {
        id: 3,
        title: 'Structify',
        mark: 'ST',
        category: 'Interactive DSA platform',
        year: '2025',
        repoState: 'Public repo',
        repoUrl: 'https://github.com/Prahlad-07/Structify.io-',
        repoLabel: 'View Repository',
        summary:
            'Platform for learning data structures visually. See how algorithms actually work.',
        description:
            'Interactive visualizations of algorithms, progress tracking, and structured learning paths. Full-stack with Spring Boot backend and React frontend.',
        impact: [
            'Real-time algorithm visualizations. You can see code running.',
            'Role-based access, JWT auth, and secure learning workflows.',
            'Docker containerized for easy deployment.',
        ],
        availabilityNote: 'Full-stack learning platform. Real product, real code.',
        theme: {
            primary: '#1d4ed8',
            secondary: '#7c3aed',
        },
        tags: [
            { id: 1, name: 'Java', path: '/assets/file-java-color-green-icon.svg' },
            { id: 2, name: 'Spring Boot', path: '/assets/icons8-spring-boot.svg' },
            { id: 3, name: 'React', path: '/assets/react.svg' },
            { id: 4, name: 'MySQL', path: '/assets/mysql-icon.svg' },
            { id: 5, name: 'Docker' },
            { id: 6, name: 'JWT' },
        ],
        images: [
            {
                id: 1,
                src: '/assets/Projects-Images/Structify/firstImage.png',
                alt: 'Structify home screen screenshot',
            },
            {
                id: 2,
                src: '/assets/Projects-Images/Structify/image%20copy.png',
                alt: 'Structify learning interface screenshot',
            },
            {
                id: 3,
                src: '/assets/Projects-Images/Structify/image%20copy%202.png',
                alt: 'Structify visualization screen screenshot',
            },
            {
                id: 4,
                src: '/assets/Projects-Images/Structify/image%20copy%203.png',
                alt: 'Structify dashboard screenshot',
            },
        ],
    },
    {
        id: 4,
        title: 'CodeSiksha',
        mark: 'CS',
        category: 'Cross-platform DSA app',
        year: '2025',
        repoState: 'Public repo',
        repoUrl: 'https://github.com/Prahlad-07/CodeSiksha',
        repoLabel: 'View Repository',
        summary:
            'Mobile app for daily DSA practice. Problem reminders, streaks, progress tracking.',
        description:
            'A study companion. Daily problems, contest updates, progress dashboards. Built with Flutter so it works on iOS and Android.',
        impact: [
            'Daily problem reminders and streak systems to keep people practicing.',
            'Firebase sync so your data is always up to date across devices.',
            'Clean BLoC architecture for maintainable mobile code.',
        ],
        availabilityNote: 'Real mobile product. Used by actual students.',
        theme: {
            primary: '#0f766e',
            secondary: '#1d4ed8',
        },
        tags: [
            { id: 1, name: 'Flutter' },
            { id: 2, name: 'Dart' },
            { id: 3, name: 'Firebase' },
            { id: 4, name: 'BLoC' },
            { id: 5, name: 'SQLite' },
        ],
        images: [
            {
                id: 1,
                src: '/assets/Projects-Images/CodeSiksha/1.png',
                alt: 'CodeSiksha home screen screenshot',
            },
            {
                id: 2,
                src: '/assets/Projects-Images/CodeSiksha/2.png',
                alt: 'CodeSiksha practice screen screenshot',
            },
            {
                id: 3,
                src: '/assets/Projects-Images/CodeSiksha/3.png',
                alt: 'CodeSiksha dashboard screenshot',
            },
        ],
    },
    {
        id: 5,
        title: 'Bg-Removal AI SaaS',
        mark: 'BG',
        category: 'AI-powered SaaS product',
        year: '2025',
        repoState: 'Repository on request',
        repoUrl: '',
        repoLabel: 'Repository on Request',
        summary:
            'AI SaaS: Upload a photo, background gets removed. Paid with credits. Learned monetization.',
        description:
            'Payment integration, auth, credit-based usage model. Backend handles payments and AI API calls cleanly.',
        impact: [
            'Stripe + Razorpay payments integrated. Users buy credits to use the service.',
            'Clean backend APIs around AI integration. Error handling that works.',
            'Built it to understand how SaaS monetization actually works.',
        ],
        availabilityNote: 'Real product, real payments, real users.',
        theme: {
            primary: '#7c3aed',
            secondary: '#1d4ed8',
        },
        tags: [
            { id: 1, name: 'Java', path: '/assets/file-java-color-green-icon.svg' },
            { id: 2, name: 'Spring Boot', path: '/assets/icons8-spring-boot.svg' },
            { id: 3, name: 'React', path: '/assets/react.svg' },
            { id: 4, name: 'MySQL', path: '/assets/mysql-icon.svg' },
            { id: 5, name: 'Razorpay' },
            { id: 6, name: 'Clerk' },
        ],
        images: [
            {
                id: 1,
                src: '/assets/Projects-Images/BG-Removal/img1.png',
                alt: 'Background removal SaaS dashboard screenshot',
            },
            {
                id: 2,
                src: '/assets/Projects-Images/BG-Removal/img2.png',
                alt: 'Background removal upload workflow screenshot',
            },
            {
                id: 3,
                src: '/assets/Projects-Images/BG-Removal/img3.png',
                alt: 'Background removal credits interface screenshot',
            },
            {
                id: 4,
                src: '/assets/Projects-Images/BG-Removal/img4.png',
                alt: 'Background removal account screen screenshot',
            },
        ],
    },
    {
        id: 6,
        title: 'Netflix Clone',
        mark: 'NF',
        category: 'Streaming UI clone',
        year: '2025',
        repoState: 'Public repo',
        repoUrl: 'https://github.com/Prahlad-07/Netflix-Clone',
        repoLabel: 'View Repository',
        summary:
            'Netflix UI clone. Learned React patterns by building something real.',
        description:
            'Movies, categories, player, auth. Built to practice React architecture and integrations.',
        impact: [
            'Category browsing, trailers, video player that actually works.',
            'Auth with Firebase. Protected routes. Responsive design.',
            'API integration with TMDB. Taught me how to build real frontend systems.',
        ],
        availabilityNote: 'Learning project that taught me React.',
        theme: {
            primary: '#b91c1c',
            secondary: '#111827',
        },
        tags: [
            { id: 1, name: 'React', path: '/assets/react.svg' },
            { id: 2, name: 'JavaScript', path: '/assets/javascript-programming-language-icon.svg' },
            { id: 3, name: 'Firebase' },
            { id: 4, name: 'TMDB API' },
            { id: 5, name: 'CSS' },
        ],
        images: [
            {
                id: 1,
                src: '/assets/Projects-Images/Netflix-Clone/1.png',
                alt: 'Netflix Clone homepage screenshot',
            },
            {
                id: 2,
                src: '/assets/Projects-Images/Netflix-Clone/2.png',
                alt: 'Netflix Clone browsing interface screenshot',
            },
            {
                id: 3,
                src: '/assets/Projects-Images/Netflix-Clone/3.png',
                alt: 'Netflix Clone player screen screenshot',
            },
            {
                id: 4,
                src: '/assets/Projects-Images/Netflix-Clone/4.png',
                alt: 'Netflix Clone authentication screen screenshot',
            },
        ],
    },
];

export const workExperiences = [
    {
        id: 1,
        name: 'Newton School',
        pos: 'Software Development Engineer (SDE + SME Intern)',
        duration: 'December 2025 - Present',
        summary:
            'Building compiler and runtime systems. Learning how code really executes.',
        highlights: [
            'Jack to VM compiler pipeline. Got real deep into how code compiles.',
            'Memory, screen, keyboard abstractions for OS-level work.',
            'Debugging compiler and runtime issues until they worked perfectly.',
        ],
        icon: '/assets/Newton-School.png',
        animation: 'victory',
    },
    {
        id: 2,
        name: 'MIDAS Lab',
        pos: 'Software Development Engineer Intern',
        duration: 'July 2024 - September 2024',
        summary:
            'Shipped real backend code. Learned how teams work together on production.',
        highlights: [
            'Built REST APIs and integrated them with mobile and backend teams.',
            'Code reviews, sprint work, shipping under pressure.',
            'Realized I love backend work and shipping reliable code.',
        ],
        icon: '/assets/MIDAS.png',
        animation: 'clapping',
    },
    {
        id: 3,
        name: 'TechCurators',
        pos: 'Problem Setter Intern',
        duration: 'May 2024 - July 2024',
        summary:
            'Created hard DSA problems for hiring. Made me think like an engineer.',
        highlights: [
            'Designed problems that hire strong engineers. Had to think deeply.',
            'Tested edge cases, constraints, validated solutions were actually optimal.',
            'This rigor stuck with me. It shows in the code I write now.',
        ],
        icon: '/assets/techcurators.png',
        animation: 'salute',
    },
];

export const clientReviews = [
    {
        id: 1,
        name: 'Satyendra Yadav',
        position: 'Principal Technical Program Manager, Perforce Software | Ex: Samsung R&D',
        img: '/assets/review2.png',
        review:
            'Prahlad stands out for his ability to move from concept to reliable implementation quickly. He combines strong DSA depth with practical backend engineering, and his execution style is disciplined enough for production-oriented teams.',
    },
    {
        id: 2,
        name: 'Dr. Rajiv Ratn Shah',
        position: 'Founder, MIDAS',
        img: '/assets/review3.png',
        review:
            'During his internship at MIDAS Lab, Prahlad worked closely with Android and backend teams and consistently delivered with ownership. His approach to API validation, debugging, and sprint collaboration reflected maturity beyond his experience level.',
    },
    {
        id: 3,
        name: 'Brijesh Shukla',
        position: 'Senior Electronic Engineer, Wabtec (United Kingdom)',
        img: '/assets/review4.png',
        review:
            'Prahlad is focused, technically curious, and dependable. He learns fast, asks the right engineering questions, and then turns that clarity into measurable output. His consistency and work ethic make him a strong long-term contributor.',
    },
    {
        id: 4,
        name: 'Satyendra Yadav',
        position: 'Integration Lead, IBM | Ex: Accenture United Kingdom',
        img: '/assets/review1.png',
        review:
            'I appreciate Prahlad\'s integration mindset. He understands how APIs, services, and system behavior connect end-to-end, and he communicates clearly while debugging issues under tight timelines. That combination is valuable in real delivery environments.',
    },
    {
        id: 5,
        name: 'Bhavya Garg',
        position: 'SDE, Newton School | Mentor of Prahlad',
        img: '/assets/review5.png',
        review:
            'As Prahlad\'s mentor, I\'ve seen him stay punctual, accountable, and highly coachable. He keeps team energy positive with his humor, but when it comes to delivery, he is serious and reliable. He has grown into a strong, execution-first engineer.',
    },
];
