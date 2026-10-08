let currentUserPhone = '';
let codigoGeneradoFicticio = '';
let cart = [];

// Generar código instantáneamente en la misma pantalla sin depender de redirecciones o APIs externas
function generarCodigoInstantaneo(event) {
    event.preventDefault();

    const phone = document.getElementById('user-phone').value.trim();

    if (!phone || phone.length < 7) {
        alert("Por favor ingresa un número de teléfono válido.");
        return;
    }

    currentUserPhone = phone;

    // Generar número aleatorio de 4 dígitos (ej: 4892)
    codigoGeneradoFicticio = Math.floor(1000 + Math.random() * 9000).toString();

    // Mostrar el código claramente en la interfaz
    document.getElementById('display-code-box').textContent = codigoGeneradoFicticio;

    // Ocultar campo de teléfono y mostrar la sección con el código listo
    document.getElementById('auth-form').style.display = 'none';
    document.getElementById('verify-section').style.display = 'block';
}

function reiniciarRegistro() {
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('verify-section').style.display = 'none';
    document.getElementById('verification-code').value = '';
}

function validarCodigoInstantaneo() {
    const codigoIngresado = document.getElementById('verification-code').value.trim();

    if (codigoIngresado !== codigoGeneradoFicticio) {
        alert("El código introducido no coincide. Por favor revísalo arriba en la caja verde.");
        return;
    }

    // Quitar la pantalla de bloqueo y permitir operar
    document.getElementById('auth-overlay').style.display = 'none';
}

// Controlar campos de pago
function cambiarMetodoPagoUI() {
    const metodo = document.getElementById('payment-method-select').value;
    
    document.getElementById('fields-pago-movil').classList.remove('active');
    document.getElementById('fields-zelle').classList.remove('active');
    document.getElementById('fields-binance').classList.remove('active');
    document.getElementById('fields-divisa').classList.remove('active');

    if (metodo === 'Pago Movil') {
        document.getElementById('fields-pago-movil').classList.add('active');
    } else if (metodo === 'Zelle') {
        document.getElementById('fields-zelle').classList.add('active');
    } else if (metodo === 'Binance') {
        document.getElementById('fields-binance').classList.add('active');
    } else if (metodo === 'Divisa Efectivo') {
        document.getElementById('fields-divisa').classList.add('active');
    }
}

// Sistema de pestañas
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

function toggleCartSection() {
    const cartSection = document.getElementById('cart-section');
    if (cartSection.style.display === 'none') {
        cartSection.style.display = 'block';
    } else {
        cartSection.style.display = 'none';
    }
}

function addToCart(itemName, itemPrice, itemType) {
    cart.push({ name: itemName, price: itemPrice, type: itemType });
    updateCartUI();
    document.getElementById('cart-section').style.display = 'block';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    if (cartCount) cartCount.textContent = cart.length;
    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p class="log-placeholder">Tu carrito está vacío actualmente...</p>`;
        if (cartTotalPrice) cartTotalPrice.textContent = '€0.00';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <li class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">€${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">Eliminar</button>
            </li>
        `;
    });

    cartItemsList.innerHTML = html;
    if (cartTotalPrice) cartTotalPrice.textContent = `€${total.toFixed(2)}`;
}

// Envío a cocina
function enviarPedidoACocina() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const metodoPago = document.getElementById('payment-method-select').value;
    const notasAlergias = document.getElementById('order-notes').value.trim();
    
    let infoPagoAdicional = metodoPago;
    if (metodoPago === 'Pago Movil') {
        const ref = document.getElementById('pm-ref').value;
        const enseñarLocal = document.getElementById('pm-enseñar-local').checked;
        if (enseñarLocal) {
            infoPagoAdicional = `Pago Móvil (Enseña comprobante en el local)`;
        } else if (ref) {
            infoPagoAdicional = `Pago Móvil (Ref: ${ref})`;
        } else {
            alert("Por favor ingresa la referencia o marca la casilla para enseñarlo en el local.");
            return;
        }
    } else if (metodoPago === 'Zelle') {
        const zelleHolder = document.getElementById('zelle-holder').value;
        if (!zelleHolder) {
            alert("Indica el nombre del titular de Zelle.");
            return;
        }
        infoPagoAdicional = `Zelle (Titular: ${zelleHolder})`;
    } else if (metodoPago === 'Binance') {
        const binanceTx = document.getElementById('binance-tx').value;
        if (!binanceTx) {
            alert("Ingresa el ID de transacción de Binance.");
            return;
        }
        infoPagoAdicional = `Binance (TX: ${binanceTx})`;
    }

    switchTabDirect('menu');

    const consoleLogs = document.getElementById('console-logs');
    const statusBadge = document.getElementById('kitchen-status-badge');
    const orderButtons = document.querySelectorAll('.order-btn, .checkout-kitchen-btn');
    
    orderButtons.forEach(btn => btn.disabled = true);

    if (consoleLogs) consoleLogs.innerHTML = '';
    if (statusBadge) {
        statusBadge.textContent = 'En Cocina';
        statusBadge.className = 'status-active';
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    addLog(`=== NUEVO PEDIDO LOCAL [TASA EURO] ===`);
    addLog(`Cliente: ${currentUserPhone}`);
    addLog(`Pago: ${infoPagoAdicional}`);
    if (notasAlergias) {
        addLog(`>> ⚠️ NOTAS / ALERGIAS: "${notasAlergias}"`);
    }
    addLog(`Monto total: €${total.toFixed(2)}`);

    const procesarOrdenCocina = new Promise((resolve) => {
        setTimeout(() => { addLog(`[POS] Orden recibida. Validando pago y notas...`); }, 1000);
        setTimeout(() => {
            addLog(`Asignando productos a estaciones de preparación...`);
            cart.forEach((item) => {
                if (item.type === 'comida') {
                    addLog(` -> [COCINA] Preparando ${item.name}`);
                } else {
                    addLog(` -> [BARRA] Sirviendo ${item.name}`);
                }
            });
        }, 2500);
        setTimeout(() => {
            addLog(`Control de calidad y empaque finalizados.`);
        }, 4000);
        setTimeout(() => {
            const randomTicket = Math.floor(Math.random() * 20) + 1;
            resolve({
                ticket: randomTicket,
                totalAmount: total,
                paymentInfo: infoPagoAdicional,
                notes: notasAlergias
            });
        }, 5000);
    });

    async function ejecutarFlujoCocina() {
        try {
            const resultado = await procesarOrdenCocina;

            addLog(` ¡PEDIDO COMPLETADO EN COCINA!`);
            addLog(`>> Número de Ticket Asignado: #${resultado.ticket < 10 ? '0' + resultado.ticket : resultado.ticket}`);
            addLog(`⏱️ TIEMPO ESTIMADO DE ENTREGA / RETIRO: ~20 MINUTOS`);
            
            if (statusBadge) {
                statusBadge.textContent = 'Completado';
                statusBadge.className = 'status-idle';
            }

            let enviarWp = confirm(`¡Pedido procesado con éxito!\n\nTicket #${resultado.ticket}\nTiempo: ~20 minutos.\n\n¿Deseas enviar el resumen al WhatsApp del local (${'04221454341'})?`);
            
            if (enviarWp) {
                enviarAWhatsAppDirecto(resultado.ticket, resultado.totalAmount, resultado.paymentInfo, resultado.notes);
            }

            cart = [];
            document.getElementById('order-notes').value = '';
            updateCartUI();
            document.getElementById('cart-section').style.display = 'none';
            orderButtons.forEach(btn => btn.disabled = false);

        } catch (error) {
            addLog(`Error en cocina: ${error}`);
            if (statusBadge) {
                statusBadge.textContent = 'Error';
                statusBadge.className = 'status-idle';
            }
            orderButtons.forEach(btn => btn.disabled = false);
        }
    }

    ejecutarFlujoCocina();
}

function enviarAWhatsAppDirecto(ticketNum, total, paymentInfo, notes) {
    let message = `Hola Cochina Envidia, hice un pedido desde la web:\n\n`;
    message += `*Ticket:* #${ticketNum < 10 ? '0' + ticketNum : ticketNum}\n`;
    message += `*Cliente:* ${currentUserPhone}\n`;
    message += `*Método de Pago:* ${paymentInfo}\n`;
    if (notes) {
        message += `*Notas / Alergias:* ${notes}\n`;
    }
    message += `\n*Detalle:* \n`;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - €${item.price.toFixed(2)}\n`;
    });
    message += `\n*Total:* €${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/584221454341?text=${encodedMessage}`, '_blank');
}

function switchTabDirect(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');
}

function addLog(message) {
    const consoleLogs = document.getElementById('console-logs');
    if (!consoleLogs) return;
    if (consoleLogs.querySelector('.log-placeholder')) {
        consoleLogs.innerHTML = '';
    }
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    logItem.innerHTML = `<span class="log-time">[${timeString}]</span><span class="log-text">> ${message}</span>`;
    consoleLogs.appendChild(logItem);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}
