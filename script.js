const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://kaiz-apis.gleeze.com/api/humanizer?q=";

sendBtn.onclick = function () {
  if (messageBar.value.length > 0) {
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";

    let message = `
    <div class="chat message">
      <img src="img/user.jpg">
      <span>
        ${UserTypedMessage}
      </span>
    </div>`;

    let response = `
    <div class="chat response">
      <img src="img/chatbot.jpg">
      <span class="new">...</span>
    </div>`;

    messageBox.insertAdjacentHTML("beforeend", message);

    setTimeout(() => {
      messageBox.insertAdjacentHTML("beforeend", response);

      axios.get(API_URL + encodeURIComponent(UserTypedMessage))
        .then(res => {
          const ChatBotResponse = document.querySelector(".response .new");
          ChatBotResponse.innerHTML = res.data.response;
          ChatBotResponse.classList.remove("new");
        })
        .catch(error => {
          const ChatBotResponse = document.querySelector(".response .new");
          ChatBotResponse.innerHTML = "Oops! An error occurred. Please try again.";
          ChatBotResponse.classList.remove("new");
          console.error("API Error:", error);
        });
    }, 100);
  }
};