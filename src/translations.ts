export const BIRTH_DATE = "2000-05-15";

export function calculateAge(birthDateString: string): number {
  const parts = birthDateString.split(/[-/]/);
  let birthYear: number;
  let birthMonth: number;
  let birthDay: number;

  if (parts.length >= 3) {
    birthYear = parseInt(parts[0], 10);
    birthMonth = parseInt(parts[1], 10) - 1;
    birthDay = parseInt(parts[2], 10);
  } else {
    const d = new Date(birthDateString);
    birthYear = d.getFullYear();
    birthMonth = d.getMonth();
    birthDay = d.getDate();
  }

  const today = new Date();
  let age = today.getFullYear() - birthYear;
  const monthDiff = today.getMonth() - birthMonth;

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
    age--;
  }

  return age;
}

const siteName = "Portfolio";

export const translations = {
  en: {
    siteTitle: siteName,
    nav: {
      about: "About Me",
      experience: "Experiences",
      skills: "Skills",
    },
    hero: {
      name: "First Name Surname",
      title: "UI/UX Designer",
      birthDate: BIRTH_DATE,
      get age(): string {
        return `${calculateAge(this.birthDate)} years old`;
      },
      description: "Passionate graphic designer with 5 years of experience in creating visual identities and communication materials. Specialized in branding and digital design. This solid base of skills is crowned by a Master's degree in Graphic Design completed in 2017, holding a Bachelor's degree in Nature and Life Sciences (2012).",
    },
    contact: {
      title: "Contact Information",
      email: "testEmail@gmail.com",
      phone: "+213 787663356",
      order: "Order your version of this website",
    },
    experience: {
      title: "Experiences",
      items: [
        {
          year: "2021 - 2023",
          company: "Creative Studio X",
          role: "Lead UI/UX Designer",
          description: "Led the design team in creating high-fidelity prototypes and user-centric interfaces for international clients. Focused on accessibility and modern aesthetics.",
          tasks: [
            "Leading visual design systems development",
            "Managing cross-functional design teams",
            "Implementing accessibility standards (WCAG)",
            "Collaborating with developers on component libraries",
            "Presenting design solutions to global stakeholders"
          ],
          hasGallery: true,
          galleryTitle: "View Project Gallery",
          galleryImages: [
            "/images/project-1.svg",
            "/images/project-2.svg",
            "/images/project-3.svg"
          ]
        },
        {
          year: "2023 - 2024",
          company: "Digital Horizon",
          role: "Full Stack Developer",
          description: "Responsible for developing and maintaining complex web architectures and internal tools.",
          tasks: [
            "Architecting scalable backend services with Node.js",
            "Building responsive front-end dashboard with React",
            "Database optimization and query tuning",
            "Implementing real-time data synchronization",
            "Mentoring junior developers on coding standards"
          ],
          hasGallery: true,
          galleryTitle: "Local Project Gallery",
          galleryImages: [
            "/images/project-1.svg",
            "/images/project-2.svg",
            "/images/project-3.svg"
          ]
        },
        {
          year: "2018 - Present",
          company: "Freelance Designer",
          role: "Graphic Designer & Web Developer",
          description: "Working with various clients to build brands and digital experiences.",
        },
      ]
    },
    skills: {
      title: "Skills",
      categories: [
        { name: "Design", items: ["Figma", "UI/UX", "Canva"] },
        { name: "Development", items: ["html5", "css3"] },
      ]
    }
  },
  fr: {
    siteTitle: siteName,
    nav: {
      about: "À propos",
      experience: "Expériences",
      skills: "Compétences",
    },
    hero: {
      name: "Prénom Nom",
      title: "Développeur Web et Applications",
      birthDate: BIRTH_DATE,
      get age(): string {
        return `${calculateAge(this.birthDate)} ans`;
      },
      description: "Designer graphique passionné avec 5 ans d'expérience dans la création d'identités visuelles et de supports de communication. Spécialisé dans le branding et le design numérique. Cette base solide de compétences est couronnée par un Master en Design Graphique obtenu en 2017, après un Baccalauréat en Sciences de la Nature et de la Vie (2012).",
    },
    contact: {
      title: "Informations de Contact",
      email: "khodjasmail16@gmail.com",
      phone: "+213 799 00 99 81",
      order: "Commandez votre version de ce site",
    },
    experience: {
      title: "Expériences",
      items: [
        {
          year: "2021 - 2023",
          company: "Creative Studio X",
          role: "Lead UI/UX Designer",
          description: "A dirigé l'équipe de design dans la création de prototypes haute fidélité et d'interfaces centrées sur l'utilisateur pour des clients internationaux. Accent mis sur l'accessibilité et l'esthétique moderne.",
          tasks: [
            "Direction du développement des systèmes de design visuel",
            "Gestion d'équipes de design multidisciplinaires",
            "Mise en œuvre des normes d'accessibilité (WCAG)",
            "Collaboration avec les développeurs sur les bibliothèques de composants",
            "Présentation des solutions de design aux parties prenantes mondiales"
          ],
          hasGallery: true,
          galleryTitle: "Voir la Galerie du Projet",
          galleryImages: [
            "https://picsum.photos/seed/design1/1200/800",
            "https://picsum.photos/seed/design2/1200/800",
            "https://picsum.photos/seed/design3/1200/800"
          ]
        },
        {
          year: "2023 - 2024",
          company: "Digital Horizon",
          role: "Développeur Full Stack",
          description: "Responsable du développement et de la maintenance d'architectures web complexes et d'outils internes.",
          tasks: [
            "Architecture de services backend évolutifs avec Node.js",
            "Construction de tableaux de bord front-end réactifs avec React",
            "Optimisation des bases de données et réglage des requêtes",
            "Mise en œuvre de la synchronisation des données en temps réel",
            "Encadrement des développeurs juniors sur les standards de codage"
          ],
          hasGallery: true,
          galleryTitle: "Galerie du Projet Local",
          galleryImages: [
            "/images/project-1.svg",
            "/images/project-2.svg",
            "/images/project-3.svg"
          ]
        },
        {
          year: "2018 - Présent",
          company: "Designer Freelance",
          role: "Graphiste & Développeur Web",
          description: "Travail avec divers clients pour construire des marques et des expériences numériques.",
        },
      ]
    },
    skills: {
      title: "Compétences",
      categories: [
        { name: "Design", items: ["Branding", "UI/UX", "Design Graphique"] },
        { name: "Développement", items: ["Développement Web", "Apps Multi-plateformes"] },
      ]
    }
  }
};
