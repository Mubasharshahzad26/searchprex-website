import requests
import os
from dotenv import load_dotenv
from urllib.parse import urlparse

load_dotenv()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")
HUNTER_API_KEY = os.getenv("HUNTER_API_KEY")

def extract_domain(url):
    """Extracts the base domain from a URL to feed into Hunter.io"""
    try:
        domain = urlparse(url).netloc
        if domain.startswith("www."):
            domain = domain[4:]
        return domain
    except:
        return None

def find_emails_for_domain(domain):
    """Uses Hunter.io to find emails associated with a business domain"""
    if not HUNTER_API_KEY:
        print("HUNTER_API_KEY not set, skipping email lookup.")
        return []
    
    url = f"https://api.hunter.io/v2/domain-search?domain={domain}&api_key={HUNTER_API_KEY}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            emails = data.get('data', {}).get('emails', [])
            return [e.get('value') for e in emails if e.get('value')]
    except Exception as e:
        print(f"Error calling Hunter.io for {domain}: {e}")
    return []

def find_leads_free_tier(niche, location, limit=5):
    """
    Finds leads using SerpApi (Google Local) to find business websites,
    and Hunter.io to find emails for those websites.
    """
    print(f"Searching for {niche} leads in {location} using SerpApi...")
    
    if not SERPAPI_KEY:
        print("Warning: SERPAPI_KEY not set. Please add it to your .env file.")
        print("Falling back to mock data for demonstration.")
        return [
            {"email": f"contact@{niche.replace(' ', '').lower()}example.com", "company_name": f"{niche} Alpha", "niche": niche},
        ][:limit]

    # 1. Search Google Local using SerpApi
    query = f"{niche} in {location}"
    url = f"https://serpapi.com/search.json?engine=google_local&q={query}&api_key={SERPAPI_KEY}"
    
    found_leads = []
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            results = response.json().get("local_results", [])
            for place in results:
                if len(found_leads) >= limit:
                    break
                    
                company_name = place.get("title")
                website = place.get("links", {}).get("website") or place.get("website")
                
                if website:
                    domain = extract_domain(website)
                    if domain:
                        print(f"Checking emails for {company_name} ({domain})...")
                        emails = find_emails_for_domain(domain)
                        
                        if emails:
                            # Take the first available email for this business
                            target_email = emails[0]
                            found_leads.append({
                                "email": target_email,
                                "company_name": company_name,
                                "niche": niche
                            })
                            print(f"-> Found email: {target_email}")
                        else:
                            print(f"-> No emails found on Hunter.io for {domain}")
    except Exception as e:
        print(f"Error fetching from SerpApi: {e}")
        
    return found_leads

if __name__ == "__main__":
    # Test run
    leads = find_leads_free_tier("Law Firm", "New York", 2)
    print("\n--- Final Leads Found ---")
    for lead in leads:
        print(lead)
