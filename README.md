# Uplooks Unisex Saloon

Multi-page salon website based on the supplied design board. Images in `public/images/` are temporary local placeholders and can be replaced without changing page layouts.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` for a production build.

## Before launch

- Replace the placeholder photographs with salon and customer photography using the same file names in `public/images/`.
- The supplied phone number, address, hours and logo are included in `src/main.jsx` and `public/images/uplooks-logo.png`.
- Verify the home page rating and customer count, marked as illustrative on the page.
- Connect the booking form to a real booking service. Its current confirmation is a local browser demo and does not send appointment requests.
- Replace the gallery and reviews placeholders with approved client work and feedback.
- Add official email or social links only when verified by the salon.

Stock image source IDs for the placeholders are listed in `scripts/download-placeholders.py`.
