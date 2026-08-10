import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "onboarding@resend.dev") # Replace with your verified domain email
REPLY_TO = os.getenv("REPLY_TO_EMAIL", SENDER_EMAIL)

def generate_email_content(company_name, niche):
    """
    Generates dynamic email content based on the target niche.
    """
    subject = ""
    body = ""
    
    if niche.lower() == 'law firm':
        subject = f"SEO & Growth Strategies for {company_name or 'your Law Firm'}"
        body = f"""
        <p>Hi there,</p>
        <p>We help law firms dominate local search results and acquire more high-value clients.</p>
        <p>At <strong>Searchprex</strong>, in collaboration with <strong>codeloci</strong>, we provide both organic growth (Local SEO) and tailored software solutions under one platform.</p>
        <p>Would you be open to a quick 5-minute chat to see how we can scale {company_name or 'your practice'}?</p>
        <p>Best regards,<br>The Searchprex Team</p>
        """
    elif niche.lower() == 'e-commerce':
        subject = f"Scaling Sales for {company_name or 'your E-commerce Store'}"
        body = f"""
        <p>Hi there,</p>
        <p>Are you looking to increase organic traffic and conversions for your e-commerce store?</p>
        <p>At <strong>Searchprex</strong> (partnered with <strong>codeloci</strong>), we specialize in E-commerce SEO and custom SaaS integrations to streamline your operations and boost sales.</p>
        <p>Let me know if you'd like to see a quick audit of your current store.</p>
        <p>Best regards,<br>The Searchprex Team</p>
        """
    else:
        # Default / Small to Mid-size Businesses
        subject = f"Software & SEO Solutions for {company_name or 'your business'}"
        body = f"""
        <p>Hi there,</p>
        <p>We help local businesses scale by combining powerful SEO strategies with custom software solutions.</p>
        <p>At <strong>Searchprex</strong> and <strong>codeloci</strong>, we bring organic growth and operational software under one roof.</p>
        <p>Are you currently looking for ways to improve your online presence or automate your workflows?</p>
        <p>Best regards,<br>The Searchprex Team</p>
        """
        
    return subject, body

def send_outreach_email(to_email, company_name, niche):
    """
    Sends an automated email using Resend API.
    """
    subject, html_body = generate_email_content(company_name, niche)
    
    try:
        params = {
            "from": f"Searchprex Team <{SENDER_EMAIL}>",
            "to": [to_email],
            "reply_to": REPLY_TO,
            "subject": subject,
            "html": html_body,
        }
        
        email = resend.Emails.send(params)
        print(f"Email sent successfully to {to_email}. ID: {email['id']}")
        return True
    except Exception as e:
        print(f"Failed to send email to {to_email}: {str(e)}")
        return False
