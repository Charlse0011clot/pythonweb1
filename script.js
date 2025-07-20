document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    const responseElement = document.getElementById('responseMessage');
    responseElement.textContent = '';
    responseElement.style.color = 'inherit';

    try {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            inquiry: document.getElementById('inquiry').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Send to Telegram bot
        const telegramResponse = await sendToTelegram(formData);
        
        if (telegramResponse.ok) {
            responseElement.textContent = 'Thank you! Your message has been sent.';
            responseElement.style.color = 'green';
            e.target.reset();
        } else {
            throw new Error('Failed to send to Telegram');
        }
    } catch (error) {
        console.error('Error:', error);
        responseElement.textContent = 'Error sending your message. Please try again later.';
        responseElement.style.color = 'red';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
});

async function sendToTelegram(data) {
    // Replace with your actual bot token and chat ID
    const BOT_TOKEN = '7752513605:AAGxPVVb7k-IiLYwtLOB3c76j-MVCu34unE';
    const CHAT_ID = '6654939361';
    
    const text = `New Bank Inquiry:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Inquiry Type: ${data.inquiry}
Message: ${data.message}
Timestamp: ${data.timestamp}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'HTML'
        })
    });

    return response.json();
}