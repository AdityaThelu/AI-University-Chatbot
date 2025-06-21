// Variable to track if greeting is displayed
var isGreetingDisplayed = false;

// Toggle chatbot visibility
function toggleChatbot() {
  var chatbotContainer = document.getElementById('chatbot-container');
  var chatIcon = document.getElementById('chat-icon');
  if (chatbotContainer.style.display === 'block') {
    chatbotContainer.style.display = 'none';
    chatIcon.style.display = 'block'; // Show the chat icon when chatbot is closed
    // Remove event listener when chatbot is closed
    document.removeEventListener('click', closeChatbotOutsideClick);
  } else {
    chatbotContainer.style.display = 'block';
    chatIcon.style.display = 'none'; // Hide the chat icon when chatbot is opened
    // Attach event listener to hide chatbot when clicked outside the container
    document.addEventListener('click', closeChatbotOutsideClick);
    // Check if greeting is already displayed
    if (!isGreetingDisplayed) {
      // Send greeting message
      displayChatbotMessage('Hi, How can I help you?', true);
      // Mark the greeting as displayed
      isGreetingDisplayed = true;
    }
  }
}

// Function to close chatbot when clicked outside the container
function closeChatbotOutsideClick(event) {
  var chatbotContainer = document.getElementById('chatbot-container');
  var chatIcon = document.getElementById('chat-icon');
  if (!chatbotContainer.contains(event.target) && event.target !== chatIcon) {
    chatbotContainer.style.display = 'none';
    chatIcon.style.display = 'block'; // Show the chat icon when chatbot is closed
    // Remove event listener when chatbot is closed
    document.removeEventListener('click', closeChatbotOutsideClick);
  }
}

// Function to handle key press events in the input field
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    sendMessage(); // Call sendMessage function if Enter key is pressed
  }
}

// Function to send a message to the chatbot and receive a response
function sendMessage() {
  var messageInput = document.querySelector('.chatbot-input input[type="text"]');
  var message = messageInput.value.trim();
  if (message !== '') {
    // displayChatbotMessage('You: ' + message);
    displayChatbotMessage(message);

    messageInput.value = '';
    // You need to implement this function based on your chatbot API
    // sendMessageToChatbot(message);
  }
}

// Function to display chatbot's message in the UI
function displayChatbotMessage(message, isBot = false) {
  var messagesContainer = document.querySelector('.chatbot-messages');
  var messageElement = document.createElement('div');
  if (isBot) {
    messageElement.classList.add('bot-reply');
    var botIcon = document.createElement('span');
    botIcon.textContent = '🤖';
    botIcon.style.marginRight = '5px';
    messageElement.appendChild(botIcon);
  } else {
    messageElement.classList.add('user-input');
    var profileIcon = document.createElement('span');
    profileIcon.textContent = '👤';
    profileIcon.style.marginRight = '5px';
    messageElement.appendChild(profileIcon);
  }
  var messageText = document.createElement('span');
  messageText.textContent = message;
  messageElement.appendChild(messageText);
  messagesContainer.appendChild(messageElement);
}
