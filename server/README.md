# Contact Form API (Hanisha EXIM)

Sends contact form submissions from the website to your Gmail.

## Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Gmail App Password**
   - Use a Gmail account (e.g. `hanishaexim@gmail.com`).
   - Turn on 2-Step Verification: [Google Account Security](https://myaccount.google.com/security).
   - Create an App Password: [App Passwords](https://myaccount.google.com/apppasswords) (choose "Mail" and your device).

3. **Create `.env`**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `GMAIL_USER` = your Gmail address
   - `GMAIL_APP_PASSWORD` = the 16-character app password (spaces optional)

## Run

**You must run the server first**, then the Angular app. Otherwise the contact form will get "connection refused".

**Terminal 1 – start the API (run this first):**
```bash
cd server
npm install
npm start
```
Leave this running. You should see: `Server running on http://localhost:3000` and `Gmail SMTP ready...`.

**Terminal 2 – start the website:**
```bash
cd angular-app
npm start
```
Open http://localhost:4200 and submit the contact form. The Angular app sends requests to `/api/send`, which the dev server proxies to `http://localhost:3000/send`.

## 500 error when submitting the form?

**Yes, this setup (website → your server → Gmail SMTP) is the correct way to send mail from a website.** A 500 usually means Gmail rejected the send. Check the **terminal where the server is running** – it will log the real error.

**Common causes:**

1. **No `.env` or wrong values**  
   In the `server` folder you must have a file named `.env` (copy from `.env.example`) with:
   - `GMAIL_USER=hanishaexim@gmail.com`
   - `GMAIL_APP_PASSWORD=` **your 16-character Gmail App Password** (not your normal Gmail password)

2. **Using your normal Gmail password**  
   Gmail blocks that for apps. You must use an **App Password**:
   - Turn on [2-Step Verification](https://myaccount.google.com/security)
   - Go to [App Passwords](https://myaccount.google.com/apppasswords) → create one for “Mail”
   - Put that 16-character password in `GMAIL_APP_PASSWORD` in `.env`

3. **Restart the server after editing `.env`**  
   Stop it (Ctrl+C) and run `npm start` again.

4. **Check the server terminal**  
   When you submit the form, the server logs the exact error (e.g. “Invalid login”, “Username and Password not accepted”). Use that to fix the Gmail setup.

## Production

- Deploy this server (e.g. Railway, Render, VPS).
- In the Angular app, change `API_URL` in `app.component.ts` to your deployed API URL (e.g. `https://your-api.railway.app`).
- Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` in your host’s environment variables.
