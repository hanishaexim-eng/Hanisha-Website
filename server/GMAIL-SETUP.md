# Get Gmail App Password for Contact Form

Your website sends contact form emails using **hanishexim@gmail.com**. Gmail requires an **App Password** (not your normal Gmail password) for apps like this.

---

## Step 1: Turn on 2-Step Verification

1. Open: **https://myaccount.google.com/security**
2. Sign in with **hanishexim@gmail.com** if asked.
3. Find **"How you sign in to Google"**.
4. Click **"2-Step Verification"**.
5. If it says **Off**, click it and follow the steps to turn it **On** (phone number, code, etc.).
6. If it’s already **On**, go to Step 2.

---

## Step 2: Create an App Password

1. Open: **https://myaccount.google.com/apppasswords**  
   (If you don’t see it, go to Security → 2-Step Verification → scroll down to "App passwords".)
2. You may need to sign in again.
3. Under **"Select app"** choose **Mail**.
4. Under **"Select device"** choose **Other** and type e.g. **Hanisha EXIM Website**.
5. Click **Generate**.
6. Google shows a **16-character password** (e.g. `abcd efgh ijkl mnop`).
7. **Copy it** (you won’t see it again).

---

## Step 3: Put the App Password in Your Project

1. Open the **server** folder in your project.
2. If there is no **.env** file:
   - Copy **.env.example** and rename the copy to **.env**.
3. Open **.env** in a text editor.
4. Set these two lines (use your real App Password, no quotes, spaces optional):

   ```
   GMAIL_USER=hanishexim@gmail.com
   GMAIL_APP_PASSWORD=paste_the_16_character_password_here
   ```

   Example (fake password):

   ```
   GMAIL_USER=hanishexim@gmail.com
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   ```

5. Save the file.
6. **Do not** commit `.env` to Git or share it. It’s already in `.gitignore`.

---

## Step 4: Restart the Server

1. In the terminal where the server is running, press **Ctrl+C** to stop it.
2. Start it again:

   ```bash
   cd server
   npm start
   ```

3. You should see: **Gmail SMTP ready – contact form emails will be sent from hanishexim@gmail.com**
4. Submit the contact form on your website again; the email should send.

---

## Quick Links

| What | Link |
|------|------|
| Google Account Security | https://myaccount.google.com/security |
| App Passwords | https://myaccount.google.com/apppasswords |

---

## Troubleshooting

- **"App Passwords" option is missing**  
  Turn on 2-Step Verification first (Step 1).

- **"Invalid login" or 500 error**  
  Make sure you used the **App Password** from Step 2, not your normal Gmail password. No spaces are required in `.env`, but spaces are OK.

- **Still not working**  
  Check the server terminal when you submit the form; it logs the exact Gmail error.
