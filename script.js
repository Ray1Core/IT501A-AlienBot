// ===============================
// Configuration for OpenAI API
// ===============================
let _config = {
    openAI_api: "https://alcuino-chatbot.azurewebsites.net/api/OpenAIProxy",
    openAI_model: "gpt-4o-mini",
    ai_instruction:
        "You are a friendly coffee shop barista expert who specializes in creating recipes for coffee shop drinks like milkshakes, frappes, lattes, smoothies, and other beverages. Provide detailed recipes with ingredients and step-by-step instructions. Be enthusiastic and helpful. Always format your responses in clean HTML with proper tags like <strong>, <ul>, <li>, <br>, etc. No markdown format. Answer directly without extra formatting.",
    response_id: "",
    api_key: window.OPENAI_KEY || ""

};

// ===============================
// DOM Interaction
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    // --- Chat Elements ---
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const chatBody = document.getElementById("chatBody");

    // --- Sidebar / Settings Elements ---
    const chatBtn = document.getElementById("chatBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const chatContainer = document.getElementById("chatContainer");
    const settingsContainer = document.getElementById("settingsContainer");
    const themeSwitch = document.getElementById("themeSwitch");
    const themeSwitch2 = document.getElementById("themeSwitch2");
    const clearChatBtn = document.getElementById("clearChatBtn");

    // --- Initial Bot Message ---
    chatBody.innerHTML = "";
    addBotMessage(
        "👽 Hello! I'm your coffee shop recipe expert! Ask me about any drink recipe — milkshakes, frappes, lattes, smoothies, and more!"
    );

    // ===============================
    // Utility: Chat Messages
    // ===============================
    function addBotMessage(htmlContent) {
        const botMsg = document.createElement("div");
        botMsg.classList.add("message", "bot");
        botMsg.innerHTML = htmlContent;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addUserMessage(text) {
        const userMsg = document.createElement("div");
        userMsg.classList.add("message", "user");
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addLoadingMessage() {
        const loadingMsg = document.createElement("div");
        loadingMsg.classList.add("message", "bot", "loading");
        loadingMsg.innerHTML = "👽 Preparing your recipe...";
        loadingMsg.id = "loadingMsg";
        chatBody.appendChild(loadingMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
        return loadingMsg;
    }

    function removeLoadingMessage() {
        const loadingMsg = document.getElementById("loadingMsg");
        if (loadingMsg) loadingMsg.remove();
    }

    // ===============================
    // OpenAI API Request
    // ===============================
    async function sendOpenAIRequest(text) {
        let requestBody = {
            model: _config.openAI_model,
            input: text,
            instructions: _config.ai_instruction,
        };

        if (_config.response_id.length > 0) {
            requestBody.previous_response_id = _config.response_id;
        }

        try {
            const response = await fetch(_config.openAI_api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${_config.api_key}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            let output = data.output[0].content[0].text;
            _config.response_id = data.id;

            return output;
        } catch (error) {
            console.error("Error calling OpenAI API:", error);
            return "Sorry, I encountered an error. Please try again! ☕";
        }
    }

    // ===============================
    // Send Message
    // ===============================
    async function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === "") return;

        addUserMessage(messageText);
        userInput.value = "";

        const loadingMsg = addLoadingMessage();

        try {
            const botReply = await sendOpenAIRequest(messageText);
            removeLoadingMessage();
            addBotMessage("👽 " + botReply);
        } catch (error) {
            removeLoadingMessage();
            addBotMessage("👽 Oops! Something went wrong. Please try again!");
        }
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });

    // ===============================
    // Chat / Settings Toggle
    // ===============================
    if (chatBtn && settingsBtn && chatContainer && settingsContainer) {
        chatBtn.addEventListener("click", () => {
            chatContainer.classList.add("active");
            settingsContainer.classList.remove("active");
            chatBtn.classList.add("active");
            settingsBtn.classList.remove("active");
        });

        settingsBtn.addEventListener("click", () => {
            settingsContainer.classList.add("active");
            chatContainer.classList.remove("active");
            settingsBtn.classList.add("active");
            chatBtn.classList.remove("active");
        });
    }

    // ===============================
    // Dark Mode Toggle
    // ===============================
    function setDarkMode(enabled) {
        document.body.classList.toggle("dark-theme", enabled);
        document.body.classList.toggle("light-theme", !enabled);
        if (themeSwitch) themeSwitch.checked = enabled;
        if (themeSwitch2) themeSwitch2.checked = enabled;
        localStorage.setItem("darkMode", enabled);
    }

    if (themeSwitch)
        themeSwitch.addEventListener("change", () =>
            setDarkMode(themeSwitch.checked)
        );
    if (themeSwitch2)
        themeSwitch2.addEventListener("change", () =>
            setDarkMode(themeSwitch2.checked)
        );

    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);

    // ===============================
    // Clear Chat
    // ===============================
    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", () => {
            chatBody.innerHTML = "";
            addBotMessage("👽 Chat cleared! Let's start fresh ☕");
        });
    }
});
