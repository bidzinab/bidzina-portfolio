// Portfolio JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Resume Download Counter
  let downloadCount = localStorage.getItem('resumeDownloads') || 0;
  document.getElementById('resumeCount').textContent = downloadCount;
  document.getElementById('resumeCountBadge').textContent = downloadCount;
  
  // Track resume downloads
  window.trackResumeDownload = function() {
    downloadCount++;
    localStorage.setItem('resumeDownloads', downloadCount);
    document.getElementById('resumeCount').textContent = downloadCount;
    document.getElementById('resumeCountBadge').textContent = downloadCount;
    
    // Send analytics (optional)
    console.log('Resume downloaded', downloadCount, 'times');
  };
  
  // Animate numbers counting up
  function animateNumbers() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };
      
      // Start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  }
  
  // Initialize number animation
  animateNumbers();
  
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Copy email to clipboard
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const email = this.getAttribute('data-clipboard-text') || 'Bidmosia@gmail.com';
      
      navigator.clipboard.writeText(email).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
  
  // AI Assistant Functionality
  const aiAssistant = document.getElementById('ai-assistant');
  const toggleAI = document.getElementById('toggle-ai');
  const closeAI = document.getElementById('close-ai');
  const aiSend = document.getElementById('ai-send');
  const aiQuestion = document.getElementById('ai-question');
  const aiChat = document.getElementById('ai-chat');
  
  // Toggle AI Assistant
  if (toggleAI) {
    toggleAI.addEventListener('click', () => {
      aiAssistant.classList.toggle('active');
    });
  }
  
  // Close AI Assistant
  if (closeAI) {
    closeAI.addEventListener('click', () => {
      aiAssistant.classList.remove('active');
    });
  }
  
  // AI Response Database
  const aiKnowledge = {
    'stock market': {
      response: "🏆 <strong>Bissett Stock Market Competition Winner 2020</strong><br>Bidzina achieved the highest trading record in Mount Royal University's history with a 78% gain, breaking the previous record of 25% set in 2009. This demonstrates exceptional analytical skills and strategic decision-making abilities.",
      tags: ['achievement', 'analytical', 'finance']
    },
    'ai research': {
      response: "🤖 <strong>AI Education Research Assistant</strong><br>From August to December 2025, Bidzina supported faculty-led research on AI-enhanced learning at Mount Royal University. He helped design AI-driven role-play simulations and co-presented findings at two national conferences (SoTL Symposium and Innovations in Education Conference).",
      tags: ['research', 'AI', 'education']
    },
    'marketing': {
      response: "📈 <strong>Marketing Analytics Results</strong><br>As Marketing Intern at PayTickr (2023-2025), Bidzina managed Google Ads campaigns that generated 56 qualified monthly sign-ups, expanded the website user base by 48,000+, and maintained a bounce rate under 40% with engagement above 60%. He also designed 3D-printed promotional materials.",
      tags: ['analytics', 'campaigns', 'results']
    },
    'beekeeping': {
      response: "🐝 <strong>Beekeeping Initiatives</strong><br>Bidzina is deeply involved in beekeeping community:<br>• Director of Communications for Calgary Beekeepers Association (400+ members)<br>• Founder of 1,000 Beehives Project (5-year plan to address Alberta's beekeeper gap)<br>• Podcast host of 'About Bees, Culture & Curiosity'<br>• Beekeeping Advisor for BeeSafe BioTech",
      tags: ['community', 'sustainability', 'leadership']
    },
    'education': {
      response: "🎓 <strong>Education Background</strong><br>• BBA in Marketing at Mount Royal University (Graduating April 2025)<br>• Entrepreneurship & Innovation program at University of Porto, Portugal (2023)<br>• Winner of multiple competitions including Birchcliff Energy Case Competition (2nd place)",
      tags: ['education', 'entrepreneurship']
    },
    'skills': {
      response: "🛠️ <strong>Core Skills</strong><br><strong>Marketing:</strong> Google Ads, SEO, UX Optimization, Analytics<br><strong>Design:</strong> Adobe Creative Suite, WordPress, 3D Printing<br><strong>Leadership:</strong> Team Management, Public Speaking, Project Coordination<br><strong>Tools:</strong> Microsoft Office, Google Workspace, Canva, Slack",
      tags: ['skills', 'tools', 'expertise']
    },
    'projects': {
      response: "🚀 <strong>Current Projects</strong><br>1. <strong>1,000 Beehives Project:</strong> Addressing Alberta's beekeeper gap by 2030<br>2. <strong>Beekeeping Podcast:</strong> Monthly episodes on bee culture and sustainability<br>3. <strong>Fuse Collective:</strong> Marketing Director for university student club<br>4. <strong>AI Education Research:</strong> Developing role-play simulations for classrooms",
      tags: ['projects', 'initiatives', 'entrepreneurship']
    }
  };
  
  // Quick question buttons
  document.querySelectorAll('.ai-quick-questions button').forEach(button => {
    button.addEventListener('click', function() {
      const question = this.getAttribute('data-question');
      aiQuestion.value = question;
      sendAIMessage();
    });
  });
  
  // Send AI message
  function sendAIMessage() {
    const question = aiQuestion.value.toLowerCase().trim();
    if (!question) return;
    
    // Add user message to chat
    addMessageToChat(question, 'user');
    aiQuestion.value = '';
    
    // Find best matching response
    let bestMatch = null;
    let highestScore = 0;
    
    Object.keys(aiKnowledge).forEach(key => {
      const score = calculateMatchScore(question, key, aiKnowledge[key].tags);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = aiKnowledge[key];
      }
    });
    
    // Default response if no good match
    const response = bestMatch ? bestMatch.response : 
      "I'm not sure about that specific detail. You can ask me about:<br>" +
      "• Bidzina's stock market competition win<br>" +
      "• AI education research<br>" + 
      "• Marketing internship results<br>" +
      "• Beekeeping projects<br>" +
      "• Education background<br>" +
      "• Skills and expertise";
    
    // Add AI response with delay
    setTimeout(() => {
      addMessageToChat(response, 'ai');
    }, 500);
  }
  
  // Calculate match score between question and knowledge base
  function calculateMatchScore(question, key, tags) {
    let score = 0;
    
    // Check for exact keyword matches
    if (question.includes(key)) score += 10;
    
    // Check for tag matches
    tags.forEach(tag => {
      if (question.includes(tag)) score += 5;
    });
    
    // Check for related terms
    const relatedTerms = {
      'stock market': ['competition', 'win', 'record', 'trading', 'bissett'],
      'ai research': ['artificial intelligence', 'education', 'simulation', 'conference'],
      'marketing': ['google ads', 'seo', 'analytics', 'campaign', 'paytickr'],
      'beekeeping': ['bees', 'honey', 'pollinator', 'apiary', 'colony'],
      'education': ['university', 'degree', 'mru', 'porto', 'bachelor'],
      'skills': ['adobe', 'wordpress', 'leadership', 'tools', 'expertise'],
      'projects': ['initiative', 'current', 'ongoing', 'developing', 'founder']
    };
    
    if (relatedTerms[key]) {
      relatedTerms[key].forEach(term => {
        if (question.includes(term)) score += 3;
      });
    }
    
    return score;
  }
  
  // Add message to chat
  function addMessageToChat(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender === 'user' ? 'ai-user' : 'ai-response'}`;
    messageDiv.innerHTML = `<p>${content}</p>`;
    aiChat.appendChild(messageDiv);
    aiChat.scrollTop = aiChat.scrollHeight;
  }
  
  // Send message on button click
  if (aiSend) {
    aiSend.addEventListener('click', sendAIMessage);
  }
  
  // Send message on Enter key
  if (aiQuestion) {
    aiQuestion.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendAIMessage();
    });
  }
  
  // Add scroll effects for navigation
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    const backToTop = document.getElementById('back-to-top');
    
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      if (backToTop) backToTop.style.display = 'block';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      if (backToTop) backToTop.style.display = 'none';
    }
    
    // Update active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Initialize tooltips
  const tooltips = document.querySelectorAll('[title]');
  tooltips.forEach(element => {
    element.addEventListener('mouseenter', function(e) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.title;
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
    });
  });
  
  // Add floating shapes animation
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 2}s`;
  });
  
  console.log('Portfolio loaded successfully! 🚀');
});

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  display: none;
  z-index: 999;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease;
`;
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
backToTop.addEventListener('mouseenter', () => {
  backToTop.style.transform = 'scale(1.1)';
});
backToTop.addEventListener('mouseleave', () => {
  backToTop.style.transform = 'scale(1)';
});
document.body.appendChild(backToTop);
