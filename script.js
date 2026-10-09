// Número de WhatsApp en formato internacional, sin +, espacios ni guiones.
const WHATSAPP_NUMBER = "5534075128";

const cart = new Map();

const money = amount =>
  "$" + amount.toLocaleString("es-MX") + " MXN";

function addItem(name, price) {
  const item = cart.get(name) || {
    name,
    price,
    qty: 0
  };

  item.qty += 1;
  cart.set(name, item);
  renderCart();
}

function changeQty(name, delta) {
  const item = cart.get(name);

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart.delete(name);
  }

  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const sendButton = document.getElementById("send-order");

  const items = [...cart.values()];

  if (!items.length) {
    container.innerHTML = `
      <p class="empty-cart">
        Todavía no agregas productos. Elige algo del menú para comenzar.
      </p>
    `;
  } else {
    container.replaceChildren();

    items.forEach(item => {
      const row = document.createElement("div");
      row.className = "cart-item";

      const details = document.createElement("div");

      const name = document.createElement("div");
      name.className = "cart-item-name";
      name.textContent = item.name;

      const sub = document.createElement("div");
      sub.className = "cart-item-sub";
      sub.textContent = `${money(item.price)} por unidad`;

      details.append(name, sub);

      const controls = document.createElement("div");
      controls.className = "qty-controls";

      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute(
        "aria-label",
        `Quitar uno de ${item.name}`
      );
      minus.addEventListener("click", () => {
        changeQty(item.name, -1);
      });

      const qty = document.createElement("span");
      qty.textContent = item.qty;

      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.setAttribute(
        "aria-label",
        `Agregar uno de ${item.name}`
      );
      plus.addEventListener("click", () => {
        changeQty(item.name, 1);
      });

      controls.append(minus, qty, plus);

      const subtotal = document.createElement("strong");
      subtotal.className = "cart-item-total";
      subtotal.textContent = money(item.price * item.qty);

      row.append(details, controls, subtotal);
      container.append(row);
    });
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  totalEl.textContent = money(total);
  sendButton.disabled = items.length === 0;
}

// Botones para agregar productos al carrito.
document.querySelectorAll("[data-name][data-price]").forEach(button => {
  button.addEventListener("click", () => {
    addItem(
      button.dataset.name,
      Number(button.dataset.price)
    );

    const originalText = button.textContent;
    button.textContent = "¡Agregado!";

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 900);
  });
});

// Enviar el pedido por WhatsApp.
document.getElementById("send-order").addEventListener("click", () => {
  if (!cart.size) return;

  const items = [...cart.values()];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const lines = items.map(item =>
    `• ${item.qty} x ${item.name} — ${money(item.price * item.qty)}`
  );

  const notes = document
    .getElementById("order-notes")
    .value
    .trim();

  const message = [
    "¡Hola, Barbacoa Los Arcos! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total estimado: ${money(total)}`,
    notes ? `Notas: ${notes}` : "",
    "",
    "¿Me ayudan a confirmar disponibilidad y hora de entrega/recogida?"
  ]
    .filter(Boolean)
    .join("\n");

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});
