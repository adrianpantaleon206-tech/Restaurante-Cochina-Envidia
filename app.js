// Sistema de Pestañas
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Función principal de Promesas y setTimeout para pedidos
function orderItem(itemName, itemPrice, itemImg, itemType) {
    const consoleLogs = document.getElementById('console-logs');
    const statusBadge = document.getElementById('kitchen-status-badge');
    const resultBox = document.getElementById('order-result-box');
    const resultImg = document.getElementById('result-img');
    const resultTitle = document.getElementById('result-title');
    const resultTicketNum = document.getElementById('result-ticket-num');

    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(btn => btn.disabled = true);

    consoleLogs.innerHTML = '';
    resultBox.classList.remove('visible');
    statusBadge.textContent = 'En Cocina';
    statusBadge.className = 'status-active';

    addLog(`Iniciando solicitud para: "${itemName}" ($${itemPrice})...`);

    // Creación de la Promesa simulando tiempos de espera asíncronos con setTimeout
    const prepararPedido = new Promise((resolve, reject) => {
        
        setTimeout(() => {
            addLog(`Orden recibida en el sistema POS. Validando inventario...`);
        }, 1000);

        setTimeout(() => {
            if (itemType === 'comida') {
                addLog(`Cocinando ${itemName} al grill/horno con ingredientes frescos...`);
            } else {
                addLog(`Preparando licor y coctelería fina en la barra de Cochina Envidia...`);
            }
        }, 2500);

        setTimeout(() => {
            addLog(`Realizando control de calidad y presentación del producto...`);
        }, 4000);

        setTimeout(() => {
            // Generar número aleatorio del 1 al 16 para retirar orden
            const randomTicket = Math.floor(Math.random() * 16) + 1;
            resolve({
                name: itemName,
                img: itemImg,
                ticket: randomTicket
            });
        }, 5500);
    });

    // Consumir la Promesa mediante Async / Await
    async function ejecutarProceso() {
        try {
            const resultado = await prepararPedido;

            addLog(`¡Éxito! El pedido está completamente listo.`);
            statusBadge.textContent = 'Completado';
            statusBadge.className = 'status-idle';

            resultImg.src = resultado.img;
            resultTitle.textContent = resultado.name;
            resultTicketNum.textContent = resultado.ticket < 10 ? `0${resultado.ticket}` : resultado.ticket;
            resultBox.classList.add('visible');

            orderButtons.forEach(btn => btn.disabled = false);

        } catch (error) {
            addLog(`Error al procesar el pedido: ${error}`);
            statusBadge.textContent = 'Error';
            statusBadge.className = 'status-idle';
            orderButtons.forEach(btn => btn.disabled = false);
        }
    }

    ejecutarProceso();
}

// Función auxiliar para mostrar logs con marcas de tiempo en la terminal de cocina
function addLog(message) {
    const consoleLogs = document.getElementById('console-logs');
    
    if (consoleLogs.querySelector('.log-placeholder')) {
        consoleLogs.innerHTML = '';
    }

    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    logItem.innerHTML = `
        <span class="log-time">[${timeString}]</span>
        <span class="log-text">> ${message}</span>
    `;
    
    consoleLogs.appendChild(logItem);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}