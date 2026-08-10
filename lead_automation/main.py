import time
import os
from dotenv import load_dotenv
from database import init_db, add_lead, get_pending_leads, update_lead_status
from lead_scraper import find_leads_free_tier
from email_sender import send_outreach_email
from inbox_monitor import check_inbox

load_dotenv()

def run_automation_cycle():
    print("=== Starting Searchprex Lead Automation Cycle ===")
    
    # 1. Ensure DB is initialized
    init_db()
    
    # 2. Scrape/Find New Leads
    # In a real system, you'd loop through different niches and locations
    print("\n[Step 1] Finding new leads...")
    new_leads = find_leads_free_tier("Law Firm", "New York", limit=3)
    
    # Save new leads to the database
    for lead in new_leads:
        added = add_lead(lead['email'], lead['company_name'], lead['niche'])
        if added:
            print(f"Added new lead to database: {lead['email']}")
        else:
            print(f"Lead already exists: {lead['email']}")
            
    # 3. Send Outreach Emails to Pending Leads
    print("\n[Step 2] Sending outreach emails...")
    pending_leads = get_pending_leads(limit=5)
    
    if not pending_leads:
        print("No pending leads to contact.")
    else:
        for lead in pending_leads:
            print(f"Sending email to {lead['email']} (Niche: {lead['niche']})...")
            success = send_outreach_email(lead['email'], lead['company_name'], lead['niche'])
            if success:
                update_lead_status(lead['id'], 'contacted')
                # Add a small delay to avoid hitting rate limits on the email API
                time.sleep(1)
            else:
                print(f"Failed to reach {lead['email']}")
                
    # 4. Check Inbox for Replies and handle them via AI
    print("\n[Step 3] Checking inbox for replies...")
    check_inbox()
    
    print("\n=== Automation Cycle Complete ===")

if __name__ == "__main__":
    # You can set this up as a cron job or a while loop with time.sleep(3600) for hourly execution
    run_automation_cycle()
