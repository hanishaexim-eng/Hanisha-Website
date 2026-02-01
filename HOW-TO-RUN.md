# How to Run the Contact Form (Both Servers)

You need **TWO terminals** running at the same time:

## Terminal 1: Backend (Start First)

Open PowerShell/Terminal and run:

```powershell
cd "d:\New folder\server"
npm install
npm start
```

Wait until you see:
```
Server running on http://localhost:3000
Gmail SMTP ready – contact form emails will be sent from hanishexim@gmail.com
```

**Leave this terminal running.** Don't close it.

---

## Terminal 2: Frontend (Start Second)

Open a **NEW** PowerShell/Terminal window and run:

```powershell
cd "d:\New folder\angular-app"
npm start
```

Wait until you see:
```
➜  Local:   http://localhost:4200/
```

Now open http://localhost:4200 and try the contact form.

---

## What's happening now

Right now you only have the **frontend** running (Terminal 2).  
The contact form fails because there's no **backend** to send the email (Terminal 1 is missing).

Start Terminal 1 (backend server) and keep it running, then try the form again.
