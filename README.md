# Golden Ink Tattoo Studio — GitHub Pages website

## Live booking delivery setup (manual approval + email notifications)

The site is a static GitHub Pages frontend. The updated booking flow collects the appointment request and artist preference, then submits it to a Formspree endpoint. It does not confirm an appointment or automatically create a Google Calendar event. The studio should review each email, contact the customer, and add only approved appointments to Google Calendar.

### 1. Connect email delivery with Formspree

1. Sign in or create an account at https://formspree.io/.
2. Create a new form, for example **Golden Ink Appointment Requests**.
3. Set its notification recipient to **Bensonbett001@gmail.com** in the Formspree form settings.
4. Copy the actual form endpoint. It should look like `https://formspree.io/f/xxxxxxxx`.
5. `config.js` is already set to the endpoint supplied by the studio owner: `https://formspree.io/f/xzeeevvr`. Confirm it matches the form in your Formspree account. Do not add passwords, private API keys, or Google credentials to this public repository.
6. If Formspree requires email verification, complete it in the account.
7. Save and publish the updated files to the GitHub repository used by GitHub Pages.

The same endpoint is used for appointment requests and the contact inquiry form. Formspree notification settings should be checked to ensure only the requested studio inbox receives notifications.

### 2. Google Calendar workflow

Because the studio wants **manual approval**, this build does not embed a public Google Calendar appointment schedule that lets customers book available slots directly. After reviewing an incoming request and agreeing a date/time with the customer:

1. Open Google Calendar while signed into the studio's account.
2. Create an event for the confirmed appointment only.
3. Include the customer's name, approved artist, tattoo plan, agreed time, and deposit status as appropriate. Avoid storing unnecessary personal details in the event description.
4. Send the customer a separate confirmation email. The form submission itself is not a confirmation.

If you later decide to let customers book directly into available slots, Google Calendar Appointment Schedules can be created and shared/embedded from Google Calendar settings. That is a different workflow from manual approval and may depend on the Google account plan. Official instructions: https://support.google.com/calendar/answer/10733297

This frontend does **not** connect to Google Calendar's API, create events automatically, or sync calendar availability. That would require a secured backend or an appropriately secured automation. Do not put Google OAuth credentials in `config.js` or other public website files.

### 3. Test before calling it live

1. Configure the real Formspree endpoint and publish the site.
2. Open the public GitHub Pages URL and submit a clearly labelled test contact inquiry.
3. Confirm the submission appears in Formspree and a notification arrives at **Bensonbett001@gmail.com**. Check spam/junk folders and Formspree's verification/settings if it does not.
4. Submit a test booking using a future date and choose an artist preference.
5. Confirm the email includes design, placement, size, requested date/time, name, email, notes, and artist preference.
6. Confirm that no payment or appointment is implied by submission. Test the supplied PayPal links separately and verify amount, currency, and receiving account.
7. Delete or clearly mark test submissions and do not leave test appointments in the live calendar.

Until these steps pass, delivery is **not verified as live**. If the endpoint is blank, the site deliberately displays a warning and directs visitors to email the studio rather than pretending a request was delivered.

## Pages
- `index.html` — homepage
- `contacts.html` — inquiry form and email contact
- `portfolio.html` — filterable portfolio gallery
- `booking.html` — request details
- `artists.html` — artist preference and final request delivery
- `payment.html` — supplied PayPal hosted checkout links
- `config.js` — public integration configuration; contains the studio-supplied endpoint; test delivery before launch
- `script.js`, `styles.css`, `assets/` — frontend behavior, styles, images

## Accuracy and launch checklist

- Verify business identity, location, phone, hours, and any licensing details before publishing.
- Portfolio model images are AI-generated concept illustrations, not verified studio work. Replace with authentic tattoo photos the studio owns or has permission to use before representing work as completed studio work.
- Artist profiles are placeholders until verified names, bios, specialties, photos, and availability are supplied.
- Sample portfolio prices are illustrative and must be replaced with approved prices.
- The supplied PayPal links are retained in `payment.html`; verify amount, currency, business account, and payment description before launch:
  - $100: https://www.paypal.com/ncp/payment/J9VLBNPSSY5Y4
  - $250: https://www.paypal.com/ncp/payment/F6DE599LSZ446
  - $500: https://www.paypal.com/ncp/payment/RJTA47P9PVG68
- A PayPal payment does not automatically confirm a booking. No payment webhook or booking database is connected.
- Publish approved privacy, deposit/refund/rescheduling/cancellation, age/consent, and aftercare policies before collecting real customer data.

## GitHub Pages publishing

Upload/commit the contents of this folder to the repository and branch/folder configured in **Settings → Pages**. GitHub Pages serves static HTML, CSS, and JavaScript; it does not run server-side code. After publishing, test the exact public URL and form delivery as described above.
