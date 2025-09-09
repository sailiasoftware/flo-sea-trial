# Sailia Sea Trail
  
Hey there! 👋 We're super happy you've made it this far into the process, and very excited for you to tackle this final challenge.  
  
## The challenge  
  
Tack & Co. is a busy sailing school that runs daily courses, lessons, and hires — all currently tracked with paper forms, sticky notes, and occasional guesswork.  
  
They want to build their own internal booking and resource system, and you've just joined as their first in-house engineer.  
  
This is your challenge: help them take the first step. Tack & Co is counting on you to come up with a basic booking system + a resourcing tool.  
  
This is primarily a test of your ability to ship stuff. We're looking to be impressed! Any calculations over the data should be correct, and while we're cool with you using AI, we're not impressed by AI slop.  
  
At the end of the day, please send us a few lines in your Sea Trial group chat with:  
- how you approached this task and whether you'd do things differently now  
- what you thought of this exercise  
- how you would carry on building this if you had another 2 weeks  
  
Keep a git repository up to date as your solution develops (just as you would in the real world) and post in the group chat any instructions necessary for someone to get it up and running themselves. We should be able to run it on our own machines without too much labor. Please also share a screencast / Loom of you demoing what you've built.  
  
We encourage you to ask any questions you might have in the group chat, especially if you get stuck or are unsure of how to proceed.  
  
Also, please keep this test to yourself and don't share it with anyone else.  
  
Good luck!  
  
## The implementation  
  
It's all up to you! Feel free to build this using whatever frameworks/languages you like!  
  
Your task is to prototype a booking system that automatically assigns resources to activities as the bookings come in. It should be possible to make bookings and view availability on the frontend. It would be great to see how far you can take this in terms of editing availability/resources/activities that are running on the frontend too. 
  
### Business Rules  
  
It should be possible to easily add resources to the system e.g. the Tack & Co company might own 5 boats, 3 single-person kayaks, 2 two-person kayaks,  6 paddles, and 25 lifejackets.

The system can have different types of activities available for clients to book. Each type of activity will have different resource requirements per booking. Below are some examples of potential activities with different resource requirements:
| Activity name | Resource requirements (per booking) |
|--|--|
| 3 person boat hire | 1 boat, 3 lifejackets |
| 2 person boat hire | 1 boat, 2 lifejackets |
| 1 person boat hire | 1 boat, 1 lifejacket |
| Single-person kayak | 1 single-person kayak, 1 paddle, 1 lifejacket |
| Double-person kayak | 1 two-person kayak, 2 paddles, 2 lifejackets |
  
### The system should
  
Automatically assign resources when bookings are made (and only show the activity as available if resources are available). Different activities use different amount of resources per booking.  
  
The quantity of resources available should be able to vary at any time on specific days (e.g. if they are broken, decommissioned etc.).

Multiple bookings can overlap, so your logic should ensure no resource is double-booked.

## Example

Tack & Co has these resources:
- 5 boats
- 3 single-person kayaks
- 2 two-person kayaks
- 6 paddles
- 25 lifejackets
    
#### Bookings on June 1st
- **10:00 – 12:00**
    - Booking A: 3-person boat hire → 1 boat, 3 lifejackets
    - Booking B: Double-person kayak → 1 two-person kayak, 2 paddles, 2 lifejackets
    - ✅ Both fit, no conflict
- **10:30 – 11:30**
    - Booking C: 2-person boat hire → 1 boat, 2 lifejackets
    - ✅ Still fine (2 boats in use, 5 available)
- **11:00 – 13:00**
    - Booking D: 3x single-person kayaks → 3 kayaks, 3 paddles, 3 lifejackets
    -   ✅ All 3 kayaks and paddles are free, so this works
- **11:30 – 12:30**
    - Potential Booking E: Double-person kayak → 1 two-person kayak, 2 paddles, 2 lifejackets
    - ❌ This booking cannot be made
    - This booking would overlap with bookings A, B, D all at the same time. Booking B and D use 5 paddles collectively. Adding Booking E would bring the maximum paddle usage up to 7. Tack & Co only own 6 paddles which means that this booking is not possible
