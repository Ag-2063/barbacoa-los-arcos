# menu
# Barbacoa Los Arcos 

A responsive website for **Barbacoa Los Arcos**, a traditional Mexican restaurant. Customers can explore the menu, view prices, add products to their order, and send their order through WhatsApp.

## Features

* Responsive design for computers, tablets, and mobile phones.
* Traditional Mexican-inspired design.
* Menu organized by categories.
* Product prices and an interactive shopping cart.
* Automatic calculation of the estimated order total.
* WhatsApp integration to send orders directly to the restaurant.
* Optional notes for special requests.

## Technologies Used

* HTML5 — website structure.
* CSS3 — styling and responsive layout.
* JavaScript — shopping cart and order functionality.
* WhatsApp — order communication.

## Project Structure

```text
barbacoa-los-arcos/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

## How to Run the Website

1. Download or clone this repository.
2. Open `index.html` in your web browser.
3. Browse the menu and add products to your cart.
4. Click **Send Order via WhatsApp** to prepare your order message.

## How to Publish with GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder.
6. Click **Save**.
7. Wait for GitHub Pages to publish your website.

## Important Configuration

Before publishing, verify that the WhatsApp number in `script.js` is correct.

The number must use the international format without spaces, parentheses, or the `+` sign.

```javascript
const WHATSAPP_NUMBER = "525534075128";
```

Update the menu prices, products, contact details, and social media links as needed.

## Future Improvements

* Add restaurant photos.
* Add an online reservation form.
* Add an interactive location map.
* Improve menu filtering and search.
* Add more information about the restaurant.

---

Created for Barbacoa Los Arcos.
