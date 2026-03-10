export const personalInfo = {
    fullName: 'Prahlad Yadav',
    firstName: 'Prahlad',
    role: 'Software Engineer',
    email: 'prahlad.yadav.off@gmail.com',
    location: 'Delhi, India',
    resumeUrl: 'https://drive.google.com/file/d/1Igjw5KDPoXfMwAvsrA46lQSuS4cOE6WH/view?usp=drive_link',
    socialLinks: {
        linkedin: '#',
        github: 'https://github.com/Prahlad-07',
        instagram: '#',
    },
};

export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Projects',
        href: '#projects',
    },
    {
        id: 4,
        name: 'Experience',
        href: '#experience',
    },
    {
        id: 5,
        name: 'Coding Profiles',
        href: '#coding-profiles',
    },
    {
        id: 6,
        name: 'Highlights',
        href: '#testimonials',
    },
    {
        id: 7,
        name: 'Contact',
        href: '#contact',
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

export const codingProfiles = [
    {
        id: 1,
        platform: 'LeetCode',
        handle: 'Prahlad_07',
        url: 'https://leetcode.com/u/Prahlad_07/',
        highlight: 'Guardian badge with max rating 2150+.',
        badge: 'Max 2150+',
        color: '#f59e0b',
        icon: '/assets/codingProfiles/Leetcode.png',
    },
    {
        id: 5,
        platform: 'GitHub',
        handle: 'Prahlad-07',
        url: 'https://github.com/Prahlad-07',
        highlight: '2500+ commits in one year.',
        badge: '2500+ Commits',
        color: '#c4b5fd',
        icon: '/assets/codingProfiles/Github.png',
    },
    {
        id: 3,
        platform: 'Codeforces',
        handle: 'CenterNewHero',
        url: 'https://codeforces.com/profile/CenterNewHero',
        highlight: 'Expert with max rating 1610+.',
        badge: 'Expert',
        color: '#7dd3fc',
        icon: '/assets/codingProfiles/codforces.png',
    },
    {
        id: 6,
        platform: 'GeeksforGeeks',
        handle: 'prahlad_07',
        url: 'https://www.geeksforgeeks.org/profile/prahlad_07',
        highlight: '4-star coding profile.',
        badge: '4 Star',
        color: '#16a34a',
        icon: '/assets/codingProfiles/geekforgeeks.png',
    },
    {
        id: 2,
        platform: 'HackerRank',
        handle: 'Mr_Encrypt',
        url: 'https://www.hackerrank.com/profile/Mr_Encrypt',
        highlight: '6-star in Problem Solving.',
        badge: '6 Star',
        color: '#22c55e',
        icon: '/assets/codingProfiles/hackerrank.png',
    },
    {
        id: 4,
        platform: 'CodeChef',
        handle: 'mr_shyyy_07',
        url: 'https://www.codechef.com/users/mr_shyyy_07',
        highlight: '4-star on CodeChef.',
        badge: '4 Star',
        color: '#f97316',
        icon: '/assets/codingProfiles/codechef.png',
    },
];


export const myProjects = [
    {
        title: 'BookMySalon',
        desc: 'Scalable salon booking platform built with Spring Boot and React, featuring role-based access control and a production-ready service architecture.',
        subdesc: 'Integrated JWT-secured authentication, WebSocket/STOMP real-time communication with SockJS fallback, Stripe payments, and MSG91 OTP-based MFA. Deployed a containerized backend using Docker for high availability.',
        href: '#',
        texture: '/textures/project/project1.mp4',
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#2A1816',
            border: '0.2px solid #36201D',
            boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            {
                id: 1,
                name: 'Java',
                path: '/assets/file-java-color-green-icon.svg',
            },
            {
                id: 2,
                name: 'SpringBoot',
                path: '/assets/icons8-spring-boot.svg',
            },
            {
                id: 3,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 4,
                name: 'MySQL',
                path: '/assets/mysql-icon.svg',
            },
        ],
    },
    {
        title: 'Bg-Removal AI SaaS',
        desc: 'AI-powered background removal platform with secure authentication, payment integration, and a credit-based monetization model.',
        subdesc: 'Developed robust Spring Boot APIs with Feign Clients for Clipdrop integration, added Razorpay payments and Clerk identity management, and implemented layered architecture with global exception handling for maintainable production APIs.',
        href: '#',
        texture: '/textures/project/project2.mp4',
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'Java',
                path: '/assets/file-java-color-green-icon.svg',
            },
            {
                id: 2,
                name: 'SpringBoot',
                path: '/assets/icons8-spring-boot.svg',
            },
            {
                id: 3,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 4,
                name: 'MySQL',
                path: '/assets/mysql-icon.svg',
            },
        ],
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.069 : isMobile ? 0.076 : isTablet ? 0.071 : 0.065,
        deskPosition: isSmall ? [0.45, -5.2, 0] : isMobile ? [0.4, -5.65, 0] : isTablet ? [0.3, -5.2, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4.5, -4.6, 0] : isMobile ? [5.5, -4.8, 0] : isTablet ? [6, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4.6, 0] : isMobile ? [5, 4.8, 0] : isTablet ? [6, 4.5, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-4.5, 8, 0] : isMobile ? [-9, 10.5, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-4.5, -8.5, -10] : isMobile ? [-8.2, -9, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'Newton School',
        pos: 'Software Development Engineer (SDE + SME Intern)',
        duration: 'December 2025 - Present',
        title: 'Building the Jack compilation pipeline (.jack to .vm), implementing OS abstractions like memory, screen, and keyboard support, and debugging compiler plus VM execution flow for consistent runtime behavior.',
        icon: '/assets/Newton-School.png',
        animation: 'victory',
    },
    {
        id: 2,
        name: 'MIDAS Lab',
        pos: 'Software Development Engineer Intern',
        duration: 'July 2024 - September 2024',
        title: 'Collaborated with Android and backend teams to build scalable production modules, integrated REST APIs across services, and contributed to debugging, code reviews, and agile sprint delivery.',
        icon: '/assets/MIDAS.png',
        animation: 'clapping',
    },
    {
        id: 3,
        name: 'TechCurators',
        pos: 'Problem Setter Intern',
        duration: 'May 2024 - July 2024',
        title: 'Designed medium-to-hard DSA hiring problems and rigorously validated each for clarity, correctness, and optimized solutions.',
        icon: '/assets/techcurators.png',
        animation: 'salute',
    },
];
