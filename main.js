// 导航栏响应式处理
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 聊天功能
const chatForm = document.getElementById('chatForm');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

console.log('Chat elements:', { chatForm, chatMessages, userInput }); // 调试日志

// 聊天表单提交处理
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userMessage = userInput.value.trim();
    if (!userMessage) return;
    
    console.log('Sending message:', userMessage); // 调试日志

    // 禁用输入框和按钮
    const submitButton = chatForm.querySelector('button');
    userInput.disabled = true;
    submitButton.disabled = true;

    // 添加用户消息
    addMessage('user', userMessage);
    userInput.value = '';

    // 添加加载消息
    const loadingMessage = addMessage('ai', '正在思考...');
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        loadingMessage.remove();
        
        if (data.cached) {
            console.log('Using cached response');
        }
        
        addMessage('ai', data.reply);

    } catch (error) {
        console.error('Error:', error);
        loadingMessage.remove();
        
        let errorMessage = '抱歉，发生了错误。';
        if (error.name === 'AbortError') {
            errorMessage = '请求超时，请稍后重试。';
        } else if (error.message.includes('429')) {
            errorMessage = '请求过于频繁，请稍后再试。';
        }
        
        addMessage('ai', errorMessage);
    } finally {
        userInput.disabled = false;
        submitButton.disabled = false;
        userInput.focus();
    }
});

// 添加回车发送功能
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

// 添加消息到聊天界面
function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const text = document.createElement('p');
    text.textContent = content;
    
    messageContent.appendChild(text);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // 滚动到最新消息
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

// 联系表单处理
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('消息已发送，感谢您的留言！');
    contactForm.reset();
});
    