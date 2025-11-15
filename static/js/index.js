window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

})

// Video Comparison Slider
// Video Comparison Slider - Multiple Comparisons with Autoplay
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize each comparison slider
  function initComparisonSlider(comparisonId) {
    const wrapper = document.querySelector(`#comparison-slider-${comparisonId}`).closest('.video-compare-wrapper');
    const videoLeft = document.getElementById(`video-left-${comparisonId}`);
    const videoRight = document.getElementById(`video-right-${comparisonId}`);
    const slider = document.getElementById(`comparison-slider-${comparisonId}`);
    const leftClip = wrapper.querySelector('.video-left');
    
    if (!wrapper || !videoLeft || !videoRight || !slider) return;
    videoLeft.play().catch(e => console.log('Autoplay prevented:', e));
    videoRight.play().catch(e => console.log('Autoplay prevented:', e));
    
    let isDragging = false;
    
    // Sync video playback
    function syncVideos() {
      videoRight.currentTime = videoLeft.currentTime;
    }
    
    videoLeft.addEventListener('timeupdate', syncVideos);
    
    // Update slider position
    function updateSlider(x) {
      const rect = wrapper.getBoundingClientRect();
      const position = Math.max(0, Math.min(x - rect.left, rect.width));
      const percentage = (position / rect.width) * 100;
      
      slider.style.left = percentage + '%';
      leftClip.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
    
    // Mouse events
    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Touch events for mobile
    wrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    });
    
    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        updateSlider(e.touches[0].clientX);
      }
    });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Click to update position
    wrapper.addEventListener('click', (e) => {
      if (!isDragging) {
        updateSlider(e.clientX);
      }
    });
  }
  
  // Initialize both comparison sliders
  initComparisonSlider(1);
  initComparisonSlider(2);
});
