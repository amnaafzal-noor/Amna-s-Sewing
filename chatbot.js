// Chatbot functionality for Amna Sewing
class AmnaSewingChatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            greetings: [
                "Hello! Welcome to Amna Sewing! 👋 How can I help you today?",
                "Hi there! I'm here to help you with all your sewing needs. What would you like to know?",
                "Welcome! I'm Amna's assistant. How can I assist you with our sewing services?"
            ],
            services: [
                "We offer custom clothing, thermal lined curtains, home decor items, and accessories. We also provide alterations, repairs, and design consultations. Which service interests you most?",
                "Our main services include:\n• Custom Design & Tailoring\n• Curtains & Home Decor\n• Clothing Alterations\n• Accessories & Bags\n• Design Consultations\n\nWhat would you like to know more about?"
            ],
            pricing: [
                "Pricing varies depending on the project complexity and materials. For a detailed quote, please contact us at hello@amnasewing.com or call +44 123 456 7890. We'd be happy to discuss your specific needs!",
                "Each project is unique! We provide personalized quotes based on your requirements. Feel free to reach out with your project details for an accurate estimate."
            ],
            contact: [
                "You can reach us at:\n📧 hello@amnasewing.com\n📞 +44 123 456 7890\n📍 Attleborough, England\n🕒 Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
                "We'd love to hear from you! Contact us via email at hello@amnasewing.com or call +44 123 456 7890. We're available Monday to Saturday!"
            ],
            curtains: [
                "Our thermal lined curtains are perfect for energy efficiency and style! They help keep your home warm in winter and cool in summer. We offer custom sizing and various fabric options. Would you like to discuss your specific requirements?",
                "Thermal curtains are one of our specialties! They're great for reducing energy bills and adding elegance to any room. We can customize them to fit any window size. What room are you looking to outfit?"
            ],
            clothing: [
                "We create custom clothing tailored to your exact measurements and style preferences. From formal wear to casual pieces, we ensure the perfect fit. What type of garment are you interested in?",
                "Custom clothing is our passion! We work with you to design pieces that reflect your personal style and fit perfectly. Tell me more about what you have in mind!"
            ],
            alterations: [
                "We provide professional alteration services for all types of garments - hemming, taking in or letting out, repairs, and more. Bring your favorite pieces back to life! What needs altering?",
                "Our alteration services can give new life to your wardrobe! From simple hems to complex resizing, we handle it all with care and precision."
            ],
            hours: [
                "We're open:\n🗓️ Monday - Friday: 9AM - 6PM\n🗓️ Saturday: 10AM - 4PM\n🗓️ Sunday: Closed\n\nFeel free to visit or call during these hours!"
            ],
            location: [
                "We're located in Attleborough, England. For exact directions or to schedule a visit, please give us a call at +44 123 456 7890!"
            ],
            thanks: [
                "You're very welcome! Is there anything else I can help you with today?",
                "Happy to help! Feel free to ask if you have any other questions about our sewing services.",
                "My pleasure! Don't hesitate to contact us if you need anything else. Have a wonderful day! ✨"
            ],
            default: [
                "That's a great question! For specific details, I'd recommend contacting Amna directly at hello@amnasewing.com or +44 123 456 7890. She'll be able to give you the most accurate information!",
                "I'd love to help with that! For detailed information, please reach out to us directly. You can email hello@amnasewing.com or call +44 123 456 7890.",
                "For the best answer to that question, I'd suggest speaking with Amna personally. You can contact us at hello@amnasewing.com or +44 123 456 7890. Is there anything else I can help with in the meantime?"
            ]
        };

        this.quickReplies = [
            { text: "Services", key: "services" },
            { text: "Pricing", key: "pricing" },
            { text: "Curtains", key: "curtains" },
            { text: "Contact Info", key: "contact" }
        ];

        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container" id="chatbotContainer">
                <button class="chatbot-toggle" id="chatbotToggle">
                    <i class="fas fa-comments"></i>
                </button>
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar">
                            <i class="fas fa-cut"></i>
                        </div>
                        <div class="chatbot-title">
                            <h4>Amna's Assistant</h4>
                            <p>Here to help with your sewing needs</p>
                        </div>
                    </div>
                    <div class="chatbot-messages" id="chatbotMessages">
                        <!-- Messages will be added here -->
                    </div>
                    <div class="chatbot-input">
                        <div class="input-group">
                            <input type="text" id="chatbotInput" placeholder="Type your message..." maxlength="500">
                            <button class="send-btn" id="sendBtn">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div class="quick-replies" id="quickReplies"></div>
                    </div>
                    <div class="chatbot-footer">
                        Powered by Amna Sewing ✨
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbotToggle');
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('sendBtn');

        toggle.addEventListener('click', () => this.toggleChatbot());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        sendBtn.addEventListener('click', () => this.sendMessage());
    }

    toggleChatbot() {
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
            toggle.innerHTML = '<i class="fas fa-times"></i>';
            this.showQuickReplies();
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
            toggle.innerHTML = '<i class="fas fa-comments"></i>';
        }
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage(this.getRandomResponse('greetings'));
        }, 500);
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();

        if (!message) return;

        this.addUserMessage(message);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and respond
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addBotMessage(response);
            this.showQuickReplies();
        }, 1000 + Math.random() * 1000); // Random delay for more natural feel
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageHTML = `
            <div class="message user">
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-bubble">${message}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageHTML = `
            <div class="message bot">
                <div class="message-avatar">
                    <i class="fas fa-cut"></i>
                </div>
                <div class="message-bubble">${message}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingHTML = `
            <div class="message bot" id="typingIndicator">
                <div class="message-avatar">
                    <i class="fas fa-cut"></i>
                </div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    showQuickReplies() {
        const container = document.getElementById('quickReplies');
        container.innerHTML = '';
        
        this.quickReplies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.textContent = reply.text;
            button.addEventListener('click', () => {
                this.handleQuickReply(reply.key, reply.text);
            });
            container.appendChild(button);
        });
    }

    handleQuickReply(key, text) {
        this.addUserMessage(text);
        
        setTimeout(() => {
            const response = this.getRandomResponse(key);
            this.addBotMessage(response);
            this.showQuickReplies();
        }, 800);
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Keywords mapping
        const keywords = {
            greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
            services: ['services', 'what do you do', 'what can you make', 'offerings'],
            pricing: ['price', 'cost', 'how much', 'expensive', 'cheap', 'quote', 'estimate'],
            contact: ['contact', 'phone', 'email', 'address', 'reach', 'call'],
            curtains: ['curtain', 'thermal', 'window', 'drape', 'blind'],
            clothing: ['clothing', 'clothes', 'dress', 'shirt', 'pants', 'custom wear', 'tailoring'],
            alterations: ['alter', 'fix', 'repair', 'hem', 'resize', 'adjustment'],
            hours: ['hours', 'open', 'when', 'time', 'closed', 'schedule'],
            location: ['where', 'location', 'address', 'find you', 'directions'],
            thanks: ['thank', 'thanks', 'appreciate', 'grateful']
        };

        // Find matching category
        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => lowerMessage.includes(word))) {
                return this.getRandomResponse(category);
            }
        }

        // Default response
        return this.getRandomResponse('default');
    }

    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new AmnaSewingChatbot();
});
