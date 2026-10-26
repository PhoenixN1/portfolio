const projectsData = {
      frontend: [
        {
          id: 1,
          title: "Le Délice Café",
          shortDesc: "Un site Web moderne construit avec HTML, CSS et JavaScript. Le Délice vous invite à découvrir l'authenticité de la cuisine méditerranéenne...",
          fullDesc: "Le Délice Café est un site web élégant qui présente un restaurant méditerranéen authentique à Casablanca. Le site offre une expérience utilisateur immersive avec des animations fluides, une galerie de plats, un système de réservation en ligne et une présentation détaillée du menu. L'interface responsive garantit une navigation optimale sur tous les appareils.",
          images: ["src/le delice cafe.png"],
          technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Animations CSS"],
          tags: ["Restaurant", "Web Design", "Frontend"],
          link: "https://ledilicecafe.netlify.app/"
        },
        {
          id: 2,
          title: "Café Andalous",
          shortDesc: "Café Andalous à Meknès vous invite à découvrir l'authenticité marocaine à travers ses cafés parfumés, ses thés à la menthe...",
          fullDesc: "Café Andalous est un site vitrine pour un café traditionnel marocain établi depuis 1985 à Meknès. Le projet combine tradition et modernité avec une interface élégante qui met en valeur l'art de l'hospitalité marocaine. Le site inclut une galerie photo, un menu interactif, l'historique du café et une section réservation.",
          images: ["src/andalos.png"],
          technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"],
          tags: ["Café", "Tradition", "Morocco"],
          link: "https://andalous-mellouki.netlify.app/"
        },
        {
          id: 3,
          title: "HERRY WATCH",
          shortDesc: "HERRY WATCH allie savoir-faire artisanal et design moderne pour créer des montres élégantes et précises...",
          fullDesc: "HERRY WATCH est une boutique en ligne de montres de luxe qui combine élégance et fonctionnalité. Le site présente une collection exclusive de montres avec des fiches produits détaillées, un système de filtrage avancé, un panier d'achat interactif et des animations 3D pour visualiser les produits sous tous les angles.",
          images: ["src/herrywatch.png"],
          technologies: ["HTML5", "CSS3", "JavaScript", "Animation 3D", "E-commerce"],
          tags: ["E-commerce", "Luxury", "Watches"],
          link: "https://herry-wacth-mellouki.netlify.app/"
        },
        {
          id: 4,
          title: "Riad Noir d'Ivoire",
          shortDesc: "Riad Noir d'Ivoire à Marrakech vous invite à vivre l'authenticité marocaine à travers son architecture traditionnelle...",
          fullDesc: "Riad Noir d'Ivoire est un site web sophistiqué pour un riad de luxe situé dans la médina de Marrakech. Le projet met en avant l'architecture traditionnelle marocaine, les chambres luxueuses, le spa et les expériences authentiques offertes aux visiteurs. Le site intègre un système de réservation en ligne et une visite virtuelle 360°.",
          images: ["src/riadnoir.png"],
          technologies: ["HTML5", "CSS3", "JavaScript", "Virtual Tour", "Booking System"],
          tags: ["Hotel", "Luxury", "Tourism"],
          link: "https://riad-noir-d-ivoire.netlify.app/"
        },
        {
          id: 5,
          title: "Mini Design Gallery",
          shortDesc: "Un site Web moderne construit avec HTML, CSS et JavaScript pour télécharger des photos.",
          fullDesc: "Mini Design Gallery est une application web minimaliste permettant de parcourir et télécharger des images haute qualité. Le projet propose une interface épurée avec un système de recherche, des filtres par catégorie, une prévisualisation en lightbox et un téléchargement optimisé des images.",
          images: ["src/mini-design.png",],
          technologies: ["HTML5", "CSS3", "JavaScript", "API Integration", "Download Manager"],
          tags: ["Gallery", "Images", "Download"],
          link: "https://mini-downloadimage.netlify.app/"
        }
      ],
      backend: [
        {
          id: 6,
          title: "Site E-Commerce",
          shortDesc: "Une API RESTful complète pour une plateforme e-commerce avec gestion des utilisateurs, produits et commandes...",
          fullDesc: "API RESTful robuste développée pour gérer l'ensemble des opérations d'une plateforme e-commerce. Inclut l'authentification JWT, la gestion des rôles, le traitement des paiements via Stripe, la gestion du stock en temps réel et un système de notifications email automatisé. Architecture scalable avec Redis pour le cache et MySQL pour la base de données.",
          images: ["src/pheo-1.png", "src/pheo-2.png", "src/pheo-3.png"],
          technologies: ["html", "JavaScript", "Css", "php", "MySQL"],
          tags: ["Backend", "E-commerce"],
          link: "#"
        },
        {
          id: 7,
          title: "Twidor - Réseau Social",
          shortDesc: "Une plateforme sociale complète pour publier, liker, commenter et interagir avec des amis en temps réel...",
          fullDesc: "Twidor est un réseau social développé pour permettre aux utilisateurs de partager des posts, images et vidéos, d’envoyer des messages privés, de gérer des amis et de sauvegarder leurs publications préférées. Le back-end utilise PHP et MySQL avec gestion sécurisée des utilisateurs, notifications en temps réel et un système de likes et commentaires. L’interface est responsive et interactive, offrant une expérience utilisateur fluide.",
          images: ["src/twidor-4.png", "src/twidor-1.png", "src/twidor-2.png", "src/twidor-3.png", "src/twidor-5.png", "src/twidor-6.png"],
          technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
          tags: ["Backend", "Réseau Social", "Web App"],
          link: "#"
        },


      ]
    };

    let currentSlide = 0;
    let currentProject = null;

    function renderProjects() {
      const frontendContainer = document.getElementById('frontend-projects');
      const backendContainer = document.getElementById('backend-projects');

      projectsData.frontend.forEach(project => {
        const card = createProjectCard(project);
        frontendContainer.appendChild(card);
      });

      projectsData.backend.forEach(project => {
        const card = createProjectCard(project);
        backendContainer.appendChild(card);
      });
    }

    function createProjectCard(project) {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <img src="${project.images[0]}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.shortDesc}</p>
        <a href="javascript:void(0)" class="view-details" onclick="openModal(${project.id})">Voir les détails</a>
      `;
      return card;
    }

    function openModal(projectId) {
      const allProjects = [...projectsData.frontend, ...projectsData.backend];
      currentProject = allProjects.find(p => p.id === projectId);

      if (!currentProject) return;

      document.getElementById('modalTitle').textContent = currentProject.title;
      document.getElementById('modalDescription').textContent = currentProject.fullDesc;
      document.getElementById('modalLink').href = currentProject.link;

      const tagsContainer = document.getElementById('modalTags');
      tagsContainer.innerHTML = currentProject.tags.map(tag =>
        `<span class="modal-tag">${tag}</span>`
      ).join('');

      const techContainer = document.getElementById('modalTechnologies');
      techContainer.innerHTML = currentProject.technologies.map(tech =>
        `<span class="tech-item"><i class="fas fa-check-circle" style="color: var(--primary-color); margin-right: 5px;"></i>${tech}</span>`
      ).join('');

      const galleryContainer = document.getElementById('galleryImages');
      galleryContainer.innerHTML = currentProject.images.map(img =>
        `<img src="${img}" alt="${currentProject.title}">`
      ).join('');

      const indicatorsContainer = document.getElementById('galleryIndicators');
      indicatorsContainer.innerHTML = currentProject.images.map((_, index) =>
        `<span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>`
      ).join('');

      currentSlide = 0;
      updateGallery();

      const modal = document.getElementById('projectModal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      const modal = document.getElementById('projectModal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function changeSlide(direction) {
      currentSlide += direction;
      if (currentSlide >= currentProject.images.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = currentProject.images.length - 1;
      updateGallery();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateGallery();
    }

    function updateGallery() {
      const gallery = document.getElementById('galleryImages');
      gallery.style.transform = `translateX(-${currentSlide * 100}%)`;

      const indicators = document.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }

    window.addEventListener('click', (e) => {
      const modal = document.getElementById('projectModal');
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('projectModal');
      if (modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
      }
    });

    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      header.classList.toggle('scrolled', window.scrollY > 50);
    });

    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 50);
    });

    if (window.innerWidth <= 768) {
      cursor.style.display = 'none';
      cursorFollower.style.display = 'none';
    }

    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.background = 'rgba(139, 92, 246, 0.8)';
      });

      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'rgba(139, 92, 246, 0.5)';
      });
    });

    renderProjects();