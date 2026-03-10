async function sendPrompt() {

    let input = document.getElementById("promptInput");
    let chatWindow = document.getElementById("chatWindow");

    let prompt = input.value.trim();

    if (prompt === "") {
        return;
    }

    // Show user message
    chatWindow.innerHTML += `<div class="message user">${prompt}</div>`;

    // Clear input box
    input.value = "";

    // Show loading message
    chatWindow.innerHTML += `<div class="message bot" id="loading">AI is typing...</div>`;

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {

        let response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: prompt })
        });

        let data = await response.json();

        // Remove loading message
        let loadingMsg = document.getElementById("loading");
        if (loadingMsg) {
            loadingMsg.remove();
        }

        // Show Normal Prompt response
        chatWindow.innerHTML += `
        <div class="message bot">
        <b>Normal Prompt:</b><br>
        ${data.normal}
        </div>
        `;

        // Show Engineered Prompt response
        chatWindow.innerHTML += `
        <div class="message bot">
        <b>Engineered Prompt:</b><br>
        ${data.engineered}
        </div>
        `;

        // Scroll to latest message
        chatWindow.scrollTop = chatWindow.scrollHeight;

    } catch (error) {

        console.error("Error:", error);

        chatWindow.innerHTML += `
        <div class="message bot">
        Error connecting to AI server.
        </div>
        `;

    }
}