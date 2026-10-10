// Wedding Date
const weddingDate = new Date('2027-07-27T14:00:00');

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const difference = weddingDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.querySelector('.countdown-wrapper').innerHTML = '<p style="font-size: 2rem; color: var(--primary);">Сегодня наш день!</p>';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Calendar Functions
function generateGoogleCalendarLink() {
    const title = encodeURIComponent('Свадьба Эльвины и Руслана');
    const details = encodeURIComponent('Свадебное торжество в парке Урал Батыр, село Аскарово');
    const location = encodeURIComponent('Парк Урал Батыр, село Аскарово');
    const startDate = '20270727T140000';
    const endDate = '20270727T230000';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
}

function generateICS() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding-invitation
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:20270727T140000
DTEND:20270727T230000
SUMMARY:Свадьба Эльвины и Руслана
DESCRIPTION:Свадебное торжество в парке Урал Батыр, село Аскарово
LOCATION:Парк Урал Батыр, село Аскарово
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: Свадьба Эльвины и Руслана завтра
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding-elvina-ruslan.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Calendar Button Events
document.getElementById('google-calendar').addEventListener('click', function(e) {
    e.preventDefault();
    window.open(generateGoogleCalendarLink(), '_blank');
});

document.getElementById('ical-download').addEventListener('click', function(e) {
    e.preventDefault();
    generateICS();
});

// RSVP Form Handling
document.getElementById('rsvp-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        guests: document.getElementById('guests').value,
        attending: document.querySelector('input[name="attending"]:checked').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage (for demo purposes)
    const existingResponses = JSON.parse(localStorage.getItem('weddingRSVP') || '[]');
    existingResponses.push(formData);
    localStorage.setItem('weddingRSVP', JSON.stringify(existingResponses));

    // For production, you can send to a backend endpoint:
    // await fetch('YOUR_ENDPOINT_URL', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });

    // Or use Formspree:
    // Just change the form action to: https://formspree.io/f/YOUR_FORM_ID

    // Show success message
    document.getElementById('rsvp-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';

    // Smooth scroll to success message
    document.getElementById('success-message').scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Optional: Send notification email (if configured)
    console.log('RSVP submitted:', formData);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax effect on scroll (optional enhancement)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.countdown, .details, .calendar-section, .rsvp').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
