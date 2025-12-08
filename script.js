// ========================================
// CONFIGURACIÓN - Editar estos valores según tus necesidades
// ========================================

// Información del restaurante
const restaurantInfo = {
    nombre: "Restaurante Demo",
    eslogan: "Sabores caseros todos los días",
    descripcion: "En Restaurante Demo nos especializamos en ofrecer comida típica de alta calidad con un ambiente familiar acogedor.",
    direccion: "Calle Ejemplo 123, Ciudad, País",
    telefono: "+507 6000-0000",
    // IMPORTANTE: Reemplaza este número con tu número de WhatsApp real en formato internacional
    // Formato: código de país + número (sin espacios, guiones ni signos +)
    // Ejemplo para Panamá: 50760000000
    whatsappNumero: "50760000000",
    horario: {
        semana: "Lunes a Viernes: 11:00 AM - 10:00 PM",
        finDeSemana: "Sábado y Domingo: 12:00 PM - 11:00 PM"
    }
};

// Menú de platos
const menuItems = [
    {
        id: 1,
        nombre: "Sancocho de Gallina",
        descripcion: "Tradicional sopa con gallina criolla, verduras frescas y culantro.",
        precio: "$8.50"
    },
    {
        id: 2,
        nombre: "Ceviche Mixto",
        descripcion: "Fresco ceviche de mariscos con limón, cebolla y cilantro.",
        precio: "$12.00"
    },
    {
        id: 3,
        nombre: "Bistec Encebollado",
        descripcion: "Jugoso bistec de res con cebollas caramelizadas, arroz y ensalada.",
        precio: "$10.50"
    },
    {
        id: 4,
        nombre: "Arroz con Pollo",
        descripcion: "Arroz amarillo con pollo tierno, vegetales y especias.",
        precio: "$9.00"
    },
    {
        id: 5,
        nombre: "Patacones con Carne",
        descripcion: "Crujientes patacones acompañados de carne desmechada.",
        precio: "$11.00"
    },
    {
        id: 6,
        nombre: "Pescado Frito",
        descripcion: "Pescado fresco frito con patacones y ensalada verde.",
        precio: "$13.50"
    },
    {
        id: 7,
        nombre: "Tamales Caseros",
        descripcion: "Tamales tradicionales envueltos en hoja de plátano.",
        precio: "$4.50"
    },
    {
        id: 8,
        nombre: "Tres Leches",
        descripcion: "Delicioso postre de tres leches con crema batida.",
        precio: "$5.00"
    }
];

// ========================================
// FUNCIONALIDAD PRINCIPAL
// ========================================

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeNavigation();
    initializeWhatsApp();
    initializeChatbot();
    updateContactInfo();
});

// Renderizar el menú dinámicamente
function initializeMenu() {
    const menuGrid = document.getElementById('menuGrid');
    
    if (!menuGrid) return;
    
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <div class="menu-item-header">
                <h3>${item.nombre}</h3>
                <span class="menu-item-price">${item.precio}</span>
            </div>
            <p>${item.descripcion}</p>
        `;
        menuGrid.appendChild(menuItemElement);
    });
}

// Navegación suave y menú móvil
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Scroll suave y cierre de menú móvil
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Cerrar menú móvil si está abierto
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
}

// Funcionalidad de WhatsApp
function initializeWhatsApp() {
    const heroWhatsAppBtn = document.getElementById('heroWhatsAppBtn');
    const contactWhatsAppBtn = document.getElementById('contactWhatsAppBtn');
    
    const whatsappClickHandler = (e) => {
        e.preventDefault();
        openWhatsApp();
    };
    
    if (heroWhatsAppBtn) {
        heroWhatsAppBtn.addEventListener('click', whatsappClickHandler);
    }
    
    if (contactWhatsAppBtn) {
        contactWhatsAppBtn.addEventListener('click', whatsappClickHandler);
    }
}

function openWhatsApp() {
    // Validar que el número esté configurado
    if (!restaurantInfo.whatsappNumero || restaurantInfo.whatsappNumero.trim() === "") {
        alert("Número de WhatsApp no configurado. Por favor, actualiza el número en script.js");
        return;
    }
    
    const mensaje = encodeURIComponent("Hola, quiero información sobre reservas");
    const url = `https://wa.me/${restaurantInfo.whatsappNumero}?text=${mensaje}`;
    
    window.open(url, '_blank');
}

// Actualizar información de contacto
function updateContactInfo() {
    const addressText = document.getElementById('addressText');
    const phoneText = document.getElementById('phoneText');
    
    if (addressText) {
        addressText.textContent = restaurantInfo.direccion;
    }
    
    if (phoneText) {
        phoneText.textContent = restaurantInfo.telefono;
    }
}

// ========================================
// CHATBOT
// ========================================

let chatMessages = [];

function initializeChatbot() {
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    
    // Abrir chatbot
    if (chatBubble) {
        chatBubble.addEventListener('click', openChatbot);
        chatBubble.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openChatbot();
            }
        });
    }
    
    // Cerrar chatbot
    if (chatClose) {
        chatClose.addEventListener('click', closeChatbot);
    }
    
    // Enviar mensaje
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    // Enviar mensaje con Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function openChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.add('active');
    chatWindow.setAttribute('aria-hidden', 'false');
    
    // Si es la primera vez, mostrar mensaje de bienvenida
    if (chatMessages.length === 0) {
        addBotMessage("Hola 👋, soy el asistente del Restaurante Demo. ¿En qué puedo ayudarte?");
    }
    
    // Focus en el input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        setTimeout(() => chatInput.focus(), 100);
    }
}

function closeChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.remove('active');
    chatWindow.setAttribute('aria-hidden', 'true');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    // Validar que el mensaje no esté vacío
    if (message === '') {
        return;
    }
    
    // Agregar mensaje del usuario
    addUserMessage(message);
    
    // Limpiar input
    chatInput.value = '';
    
    // Generar respuesta del bot
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addBotMessage(botResponse);
    }, 500);
}

function addUserMessage(message) {
    chatMessages.push({ type: 'user', text: message });
    renderMessage('user', message);
}

function addBotMessage(message) {
    chatMessages.push({ type: 'bot', text: message });
    renderMessage('bot', message);
}

function renderMessage(type, text) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    chatMessagesContainer.appendChild(messageDiv);
    
    // Scroll al último mensaje
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();
    
    // Respuesta para "menú"
    if (messageLower.includes('menu') || messageLower.includes('menú') || messageLower.includes('platos') || messageLower.includes('comida')) {
        return `Nuestro menú incluye: ${menuItems.slice(0, 4).map(item => item.nombre).join(', ')} y más. Puedes ver el menú completo en nuestra página. ¿Te gustaría reservar?`;
    }
    
    // Respuesta para "horario"
    if (messageLower.includes('horario') || messageLower.includes('hora') || messageLower.includes('abierto') || messageLower.includes('cuando')) {
        return `Nuestro horario es: ${restaurantInfo.horario.semana} y ${restaurantInfo.horario.finDeSemana}. ¡Te esperamos!`;
    }
    
    // Respuesta para "dirección"
    if (messageLower.includes('direccion') || messageLower.includes('dirección') || messageLower.includes('ubicacion') || messageLower.includes('ubicación') || messageLower.includes('donde')) {
        return `Nos encontramos en ${restaurantInfo.direccion}. Puedes ver el mapa en nuestra sección de contacto.`;
    }
    
    // Respuesta para "precio" o "costo"
    if (messageLower.includes('precio') || messageLower.includes('costo') || messageLower.includes('cuanto')) {
        return `Nuestros platos tienen precios desde $4.50 hasta $13.50. Puedes ver los precios completos en nuestro menú.`;
    }
    
    // Respuesta para "reserva"
    if (messageLower.includes('reserva') || messageLower.includes('reservar')) {
        return `Para hacer una reserva, puedes contactarnos por WhatsApp haciendo clic en el botón "Reservar por WhatsApp" en nuestra página.`;
    }
    
    // Respuesta genérica
    return "Gracias por escribirnos. En breve un asesor responderá a tu consulta. También puedes contactarnos directamente por WhatsApp.";
}

// Placeholder para futura integración con API de IA
// Descomenta y configura cuando tengas un endpoint de chatbot con IA
/*
async function fetchAIResponse(userMessage) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error al contactar con la IA:', error);
        return "Lo siento, no pude procesar tu mensaje. Intenta de nuevo.";
    }
}
*/
