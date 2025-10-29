👽 IT501A – AlienBot 
AlienBot is a web-based chatbot designed for students, baristas, and coffee lovers.
It provides interactive recipe assistance for drinks such as frappes, milkshakes, smoothies, and lattes — powered by OpenAI’s API via a secure proxy endpoint.

🧠 Overview
AlienBot acts as a coffee shop recipe expert that users can chat with.
It uses HTML, CSS, and JavaScript to create a responsive chat interface and handles AI responses dynamically through the OpenAI API proxy.

⚙️ Main Features
💬 Real-time AI chat for drink recipes and brewing techniques
🌗 Light/Dark mode switch with persistent storage
🧾 Settings page with app info and chat clearing
📱 Responsive Bootstrap 5 layout
🔒 Secure configuration (API key excluded via .gitignore)
🧩 Folder Structure
🧩 Folder & File Structure

The Chatbot project is organized into a simple and clear structure for easy navigation and maintenance.
index.html — This is the main entry point of the chatbot. It defines the page layout, chat interface, and structural elements that users interact with in the browser.
style.css — Contains all visual design and color theme settings. It handles both light and dark modes, typography, and overall interface styling to ensure a smooth and modern appearance.
script.js — The core logic of the chatbot resides here. It manages user input, message display, and communication with the OpenAI API proxy, as well as chat animations and dynamic responses.
config.js — Stores the local API key and essential configuration data for development use. This file is intentionally excluded from Git uploads to protect sensitive information.
.gitignore — Ensures that private and unnecessary files, such as config.js and node_modules/, are not uploaded to the repository. This keeps the project clean and secure.

⚙️ Properties (from _config)
The _config object stores all key settings that control how the chatbot connects and behaves. Each property plays a specific role in defining Brewly’s operation.
openAI_api — This property holds the secure proxy endpoint that the chatbot uses to communicate with the OpenAI API. It ensures that the connection is handled safely without exposing any sensitive keys directly in the code.
openAI_model — Specifies which AI model the chatbot will use. For example, it may use gpt-4o-mini to balance performance and cost while maintaining high-quality responses.
ai_instruction — Defines the system’s guiding message that sets the chatbot’s tone, knowledge, and behavior. It determines how Brewly responds to user queries (e.g., focusing on coffee recipes and friendly conversation).
response_id — Keeps track of the ongoing conversation by storing the response identifier. This helps maintain context between the user and the bot during multi-turn conversations.
api_key — Stores the user’s API key locally to authenticate requests. This file is excluded from the repository via .gitignore to keep it private and secure.

🧠 Methods (Core Functions)
addBotMessage(htmlContent)
Appends an AI-generated message to the chat area using styled HTML.
addUserMessage(text)
Displays the user’s input in the chat body with custom bubble styling.
sendOpenAIRequest(text)
Sends the user input to the OpenAI API proxy and retrieves the AI response.
sendMessage()

Main controller that:
Gets the user input
Displays it
Calls sendOpenAIRequest()
Displays the AI response
setDarkMode(enabled)

Toggles dark/light themes and stores preference in localStorage.
clearChatBtn (Event)
Resets the chat interface and restarts with the greeting message.

🧩 Usage Flow
User opens index.html
Chat interface loads with greeting message
User types a question (e.g., “How do I make a caramel frappe?”)
Bot replies with:
Ingredients list
Step-by-step brewing instructions
Optional serving tips
💻 Setup & Installation
Clone the repository
git clone https://github.com/Ray1Core/IT501A-Brewly-ChatBot.git

Create config.js
window.OPENAI_KEY = "your-actual-key-here";

Run locally
Just open index.html in a browser — no server setup required.
🎨 Interface Overview
Sidebar
Chat / Settings menu
Dark Mode switch
User profile section
Chat Window
Dynamic message bubbles
Scrollable chat body
Input and send button
Settings
Toggle dark mode
Clear chat button
App version and model info
🧾 .gitignore
config.js
node_modules/

☕ Credits
Developed by Ray1Core
For IT501A Project – Interactive Coffee Chatbot
Powered by OpenAI GPT-4o-mini via secure proxy.
