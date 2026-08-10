import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'leads.db')

def get_connection():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    # Create leads table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            company_name TEXT,
            niche TEXT,
            status TEXT DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_contacted_at TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def add_lead(email, company_name, niche):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            'INSERT INTO leads (email, company_name, niche) VALUES (?, ?, ?)',
            (email, company_name, niche)
        )
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        # Email already exists
        return False
    finally:
        conn.close()

def get_pending_leads(limit=10):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, email, company_name, niche FROM leads WHERE status = 'new' LIMIT ?", (limit,))
    leads = cursor.fetchall()
    conn.close()
    return [{'id': row[0], 'email': row[1], 'company_name': row[2], 'niche': row[3]} for row in leads]

def update_lead_status(lead_id, status):
    conn = get_connection()
    cursor = conn.cursor()
    if status == 'contacted':
        cursor.execute("UPDATE leads SET status = ?, last_contacted_at = ? WHERE id = ?", 
                       (status, datetime.now(), lead_id))
    else:
        cursor.execute("UPDATE leads SET status = ? WHERE id = ?", (status, lead_id))
    conn.commit()
    conn.close()

def get_lead_by_email(email):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, status FROM leads WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {'id': row[0], 'status': row[1]}
    return None

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully.")
