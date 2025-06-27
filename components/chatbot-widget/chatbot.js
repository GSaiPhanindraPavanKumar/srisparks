/**
 * Sri Sparks Chatbot - Interactive customer assistance widget
 */
(function() {
  // Initialize when document is ready
  document.addEventListener('DOMContentLoaded', initChatbot);

  function initChatbot() {
    // Inject styles
    injectStyles();
    
    // Create and append HTML structure
    createChatbotElements();
    
    // Get DOM references
    const elements = {
      toggleBtn: document.getElementById('sri-chatbot-toggle'),
      chatWindow: document.getElementById('sri-chatbot-window'),
      chatContent: document.getElementById('sri-chatbot-content'),
      closeBtn: document.getElementById('sri-chatbot-close')
    };
    
    // Initialize chat flow
    const chatManager = createChatManager(elements.chatContent);
    
    // Set up event listeners
    setupEventListeners(elements, chatManager);
  }
  
  function setupEventListeners(elements, chatManager) {
    // Chat toggle button - open chat
    elements.toggleBtn.addEventListener('click', () => {
      elements.chatWindow.style.display = 'flex';
      elements.chatWindow.classList.add('chatbot-show');
      
      // Initialize chat if it's empty
      if (elements.chatContent.innerHTML.trim() === '') {
        chatManager.startConversation();
      }
    });
    
    // Close button - hide chat
    elements.closeBtn.addEventListener('click', () => {
      elements.chatWindow.classList.remove('chatbot-show');
      setTimeout(() => {
        elements.chatWindow.style.display = 'none';
      }, 300); // Match animation duration
    });
  }
  
  function createChatManager(chatContainer) {
    // Define conversation flows
    const chatFlows = {
      start: {
        message: "👋 Hi! I'm your assistant from SRI Sparks. Looking to save on your electricity bills?",
        options: ["Yes, I'm interested", "Just browsing"],
        nextStep: "menu"
      },
      menu: {
        message: "How can I help you today?",
        options: [
          "🏷️ Subsidy Information",
          "🔎 Learn About Solar",
          "📞 Contact Information"
        ],
        nextMap: {
          "🏷️ Subsidy Information": "subsidy",
          "🔎 Learn About Solar": "learn",
          "📞 Contact Information": "contact"
        }
      },
      subsidy: {
        message: `<div class="subsidy-info">
          <h3>💰 Current Solar Subsidy Rates:</h3>
          <div class="subsidy-table">
            <div class="subsidy-row">
              <div class="subsidy-cell">1kW System</div>
              <div class="subsidy-cell subsidy-amount">₹30,000</div>
            </div>
            <div class="subsidy-row">
              <div class="subsidy-cell">2kW System</div>
              <div class="subsidy-cell subsidy-amount">₹60,000</div>
            </div>
            <div class="subsidy-row">
              <div class="subsidy-cell">3kW+ System</div>
              <div class="subsidy-cell subsidy-amount">₹78,000</div>
            </div>
          </div>
          <p>Would you like to learn how to apply for subsidies?</p>
        </div>`,
        options: ["Yes, tell me more", "Return to Menu"],
        nextMap: {
          "Yes, tell me more": "subsidyProcess", 
          "Return to Menu": "menu"
        }
      },
      subsidyProcess: {
        message: "To apply for solar subsidies:\n\n1. Register on the PM Surya Ghar portal\n2. Complete the online application\n3. Get your roof assessed\n4. Choose an approved vendor like us\n5. Installation and inspection\n6. Receive your subsidy\n\nWe can guide you through the entire process!",
        options: ["Return to Menu"],
        nextStep: "menu"
      },
      learn: {
        message: "Solar knowledge center! What would you like to learn about?",
        options: [
          "☀️ How Solar Works",
          "📈 Return on Investment",
          "📐 Space Requirements",
          "🔌 Net Metering",
          "Return to Menu"
        ],
        nextMap: {
          "☀️ How Solar Works": "solarBasics",
          "📈 Return on Investment": "roi",
          "📐 Space Requirements": "space",
          "🔌 Net Metering": "netMetering",
          "Return to Menu": "menu"
        }
      },
      solarBasics: {
        message: "Solar panels convert sunlight into electricity through the photovoltaic effect. This clean energy reduces your dependence on the grid and lowers your carbon footprint. Modern systems are durable, with 25+ years of lifespan and minimal maintenance.",
        options: ["Learn More", "Return to Menu"],
        nextMap: {
          "Learn More": "learn",
          "Return to Menu": "menu"
        }
      },
      roi: {
        message: "A typical solar system pays for itself in 3-5 years. With rising electricity costs, your savings increase over time. Plus, government subsidies can reduce your initial investment by up to 40%!",
        options: ["Learn More", "Return to Menu"],
        nextMap: {
          "Learn More": "learn",
          "Return to Menu": "menu"
        }
      },
      space: {
        message: "As a general rule:\n• 1kW system needs ~100 sq.ft. of shadow-free area\n• A typical 3kW home system requires ~300 sq.ft.\n• We'll conduct a detailed assessment to maximize your space efficiency",
        options: ["Learn More", "Return to Menu"],
        nextMap: {
          "Learn More": "learn",
          "Return to Menu": "menu"
        }
      },
      netMetering: {
        message: "Net metering allows you to feed excess solar energy back to the grid, earning you credits on your electricity bill. Your meter tracks energy flow in both directions, and you only pay for the net usage. This maximizes your solar investment!",
        options: ["Learn More", "Return to Menu"],
        nextMap: {
          "Learn More": "learn",
          "Return to Menu": "menu"
        }
      },
      contact: {
        message: "📱 <b>Phone:</b> +91-93985 33188\n\n📧 <b>Email:</b> info@srisparks.in\n\n📍 <b>Address:</b> Door No: 7-184/3, 2nd Floor, New Building Colony, Palangi, Tanuku - 534216\n\n🗺️ <a href='https://maps.google.com/?q=SriSparks+Infra+Private+Limited+Palangi+Tanuku' target='_blank'>View on Google Maps</a>",
        options: ["Return to Menu", "End Chat"],
        nextMap: {
          "Return to Menu": "menu",
          "End Chat": "bye"
        }
      },
      bye: {
        message: "Thank you for chatting with Sri Sparks! Have a wonderful day. ☀️",
        options: []
      }
    };
    
    let currentStep = null;
    
    // Display typing indicator for more natural conversation
    const showTypingIndicator = () => {
      const typing = document.createElement('div');
      typing.className = 'typing-indicator';
      typing.innerHTML = '<span></span><span></span><span></span>';
      chatContainer.appendChild(typing);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      return typing;
    };
    
    // Advance to a specific step in the conversation
    const goToStep = (stepId, userResponse = null) => {
      const step = chatFlows[stepId];
      if (!step) return;
      
      // Add user's response bubble if provided
      if (userResponse) {
        chatContainer.innerHTML += `
          <div class="user-message-container">
            <div class="chatbot-bubble-user">${userResponse}</div>
          </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
      
      // Show typing indicator to simulate bot thinking
      const typingIndicator = showTypingIndicator();
      
      // Process bot response after a short delay
      setTimeout(() => {
        // Remove typing indicator
        if (typingIndicator && typingIndicator.parentNode) {
          typingIndicator.parentNode.removeChild(typingIndicator);
        }
        
        // Add bot message
        chatContainer.innerHTML += `
          <div class="bot-message-container">
            <div class="chatbot-bubble-bot">${step.message}</div>
          </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Add response options after a short delay
        setTimeout(() => {
          if (step.options && step.options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'chatbot-options-container';
            
            step.options.forEach(option => {
              const button = document.createElement('button');
              button.className = 'chatbot-option-btn';
              button.textContent = option;
              button.addEventListener('click', () => {
                // Determine next step based on mapping or default
                const nextStep = step.nextMap ? 
                  step.nextMap[option] : 
                  step.nextStep;
                  
                goToStep(nextStep, option);
              });
              
              optionsContainer.appendChild(button);
            });
            
            chatContainer.appendChild(optionsContainer);
          }
          
          currentStep = stepId;
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 300);
      }, 1200);
    };
    
    // Return public API
    return {
      startConversation: () => goToStep('start'),
      getCurrentStep: () => currentStep
    };
  }
  
  function createChatbotElements() {
    // Create main chatbot structure
    const chatbotHTML = `
      <div id="sri-chatbot-toggle" class="sri-chatbot-toggle-btn">
        <button>
          <span class="chat-pulse">💬</span>
          <span>Chat with Us</span>
        </button>
      </div>
      
      <div id="sri-chatbot-window" class="sri-chatbot-window">
        <div class="sri-chatbot-header">
          <div class="sri-chatbot-header-content">
            <div class="sri-chatbot-avatar">
              <img src="/images/logo/logo1.png" alt="SriSparks Logo" width="28" height="28">
            </div>
            <div>SRI Sparks Assistant</div>
          </div>
          <button id="sri-chatbot-close" class="sri-chatbot-close" aria-label="Close">✖</button>
        </div>
        <div id="sri-chatbot-content" class="sri-chatbot-content"></div>
      </div>
    `;
    
    // Insert into DOM
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'sri-chatbot-container';
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer);
  }
  
  function injectStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      /* Main container */
      .sri-chatbot-container {
        font-family: 'Segoe UI', Arial, sans-serif;
        --primary-color: #0056b3;
        --primary-light: #0088ff;
        --primary-dark: #003a7a;
        --accent-color: #ffa500;
        --light-bg: #f5f8fb;
        --white: #ffffff;
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
        --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
        --border-radius-sm: 8px;
        --border-radius-md: 16px;
        --border-radius-lg: 30px;
        --transition-fast: 0.2s ease;
        --transition-normal: 0.3s ease;
      }
      
      /* Toggle button */
      .sri-chatbot-toggle-btn {
        position: fixed;
        bottom: 32px;
        left: 32px; /* Changed from right to left */
        z-index: 9998;
      }
      
      .sri-chatbot-toggle-btn button {
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: var(--white);
        padding: 14px 24px;
        border-radius: var(--border-radius-lg);
        border: none;
        cursor: pointer;
        font-size: 17px;
        font-weight: 600;
        box-shadow: var(--shadow-md);
        transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .sri-chatbot-toggle-btn button:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
      }
      
      /* Chat window */
      .sri-chatbot-window {
        position: fixed;
        bottom: 100px;
        left: 32px; /* Changed from right to left */
        width: 380px;
        height: 520px;
        background: var(--white);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        overflow: hidden;
        display: none;
        flex-direction: column;
        opacity: 0;
        transform: scale(0.9);
        transform-origin: bottom left; /* Changed from bottom right */
        transition: opacity var(--transition-normal), transform var(--transition-normal);
      }
      
      .sri-chatbot-window.chatbot-show {
        opacity: 1;
        transform: scale(1);
      }
      
      /* Header */
      .sri-chatbot-header {
        background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
        color: var(--white);
        padding: 16px 20px;
        font-weight: 600;
        font-size: 1.15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .sri-chatbot-header-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .sri-chatbot-avatar {
        display: inline-flex;
        background: var(--white);
        border-radius: 50%;
        width: 36px;
        height: 36px;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-sm);
      }
      
      .sri-chatbot-avatar img {
        border-radius: 50%;
        object-fit: cover;
        width: 28px;
        height: 28px;
      }
      
      .sri-chatbot-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: var(--white);
        font-size: 16px;
        cursor: pointer;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
      }
      
      .sri-chatbot-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: rotate(90deg);
      }
      
      /* Chat content area */
      .sri-chatbot-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px 16px;
        background-color: var(--light-bg);
        background-image: radial-gradient(circle at 50% 50%, rgba(0, 136, 255, 0.03) 0%, transparent 70%);
      }
      
      /* Message bubbles */
      .bot-message-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 16px;
      }
      
      .user-message-container {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
      }
      
      .chatbot-bubble-bot {
        background: linear-gradient(135deg, #e1f5fe, #bbdefb);
        color: var(--primary-dark);
        border-radius: 16px 16px 16px 4px;
        padding: 12px 18px;
        max-width: 85%;
        box-shadow: var(--shadow-sm);
        animation: fadeInLeft 0.4s ease;
        border-left: 3px solid var(--primary-light);
        line-height: 1.5;
      }
      
      .chatbot-bubble-user {
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: var(--white);
        border-radius: 16px 16px 4px 16px;
        padding: 12px 18px;
        max-width: 85%;
        box-shadow: var(--shadow-sm);
        animation: fadeInRight 0.4s ease;
        border-right: 3px solid var(--primary-dark);
      }
      
      /* Options container */
      .chatbot-options-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 8px 0 16px 0;
        animation: fadeIn 0.6s ease;
      }
      
      .chatbot-option-btn {
        background: linear-gradient(to bottom, #ffffff, #f0f8ff);
        color: var(--primary-color);
        border: 1px solid #bbdefb;
        border-radius: 50px;
        padding: 8px 16px;
        font-size: 14px;
        cursor: pointer;
        font-weight: 500;
        transition: all var(--transition-fast);
        box-shadow: var(--shadow-sm);
        white-space: nowrap;
      }
      
      .chatbot-option-btn:hover {
        background: linear-gradient(to bottom, #e1f5fe, #bbdefb);
        color: var(--primary-dark);
        border-color: var(--primary-light);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }
      
      /* Typing indicator */
      .typing-indicator {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        background: rgba(225, 245, 254, 0.5);
        border-radius: 10px;
        margin: 8px 0;
        width: 60px;
      }
      
      .typing-indicator span {
        height: 8px;
        width: 8px;
        margin: 0 2px;
        background-color: var(--primary-light);
        display: block;
        border-radius: 50%;
        opacity: 0.4;
      }
      
      .typing-indicator span:nth-of-type(1) {
        animation: blink 1s 0.3s infinite;
      }
      
      .typing-indicator span:nth-of-type(2) {
        animation: blink 1s 0.5s infinite;
      }
      
      .typing-indicator span:nth-of-type(3) {
        animation: blink 1s 0.7s infinite;
      }
      
      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes blink {
        50% { opacity: 1; }
      }
      
      .chat-pulse {
        display: inline-block;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      
      /* Subsidy information styling */
      .subsidy-info h3 {
        margin: 0 0 12px 0;
        color: var(--primary-dark);
        font-size: 16px;
      }
      
      .subsidy-table {
        margin: 0 0 15px 0;
        border-left: 3px solid #0088ff;
        padding-left: 10px;
      }
      
      .subsidy-row {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
      }
      
      .subsidy-cell {
        padding: 2px 0;
      }
      
      .subsidy-amount {
        font-weight: bold;
        color: #0056b3;
      }
      
      .subsidy-info p {
        margin: 10px 0 0 0;
        font-weight: 500;
      }
      
      /* Responsive styles */
      @media (max-width: 600px) {
        .sri-chatbot-toggle-btn {
          left: 16px; /* Changed from right to left */
          bottom: 20px;
        }
        
        .sri-chatbot-toggle-btn button {
          padding: 12px 20px;
          font-size: 15px;
        }
        
        .sri-chatbot-window {
          left: 2vw; /* Changed from right to left */
          width: 96vw;
          min-width: 0;
          border-radius: 12px;
          bottom: 80px;
          height: 65vh;
          max-height: 500px;
        }
      }
    `;
    
    document.head.appendChild(styleSheet);
  }
})();
