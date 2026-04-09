# Float Plan

A web app for creating a boating float plan — a safety document you fill out before heading out on the water and leave with a trusted person ashore.

## What is a Float Plan?

A float plan tells someone on shore where you're going, who is on board, what vessel you're using, and when you expect to return. If you don't check in or return by the expected time, the person holding the plan knows how to reach you, who to contact, and what actions to take.

## Features

- **Vessel Information** — name, registration, type, hull color, engine, fuel capacity, VHF call sign
- **Trip Details** — departure location, destination, planned route, departure and return times, plan left-with contact
- **Persons on Board** — add/remove crew members with name, DOB, phone, address, and medical notes
- **Safety Equipment** — checklist of 16 items (life jackets, flares, EPIRB, VHF radio, etc.)
- **Tow Vehicle / Trailer** — vehicle info and where it's parked at the boat ramp
- **Emergency Contact** — contact details and instructions for what to do if overdue
- **Save Draft** — form data is saved locally in your browser so you can return to it
- **Print / Save as PDF** — generates a clean, printer-friendly float plan to leave with someone ashore

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
npm run preview
```
