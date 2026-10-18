import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_hero_image():
    width = 1200
    height = 630

    # 1. High-tech Deep Navy/Charcoal Canvas (#090d1e -> #111827)
    img = Image.new("RGBA", (width, height), (9, 13, 30, 255))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        ratio = y / height
        r = int(9 + ratio * 8)
        g = int(13 + ratio * 11)
        b = int(30 + ratio * 15)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # 2. Subtle architectural grid lines
    grid_color = (255, 255, 255, 12)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # 3. Glowing Atmospheric Light Orbs
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Crimson/Amber regulatory alert aura on right
    glow_draw.ellipse([750, 120, 1180, 560], fill=(239, 68, 68, 34))
    # Deep Gold legal prestige ambient glow
    glow_draw.ellipse([450, 120, 850, 520], fill=(217, 119, 6, 26))
    # Emerald brand halo top left
    glow_draw.ellipse([-50, -50, 450, 350], fill=(62, 180, 137, 24))
    
    glow_blurred = glow.filter(ImageFilter.GaussianBlur(radius=40))
    img = Image.alpha_composite(img, glow_blurred)
    draw = ImageDraw.Draw(img)

    # 4. Fonts
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"

    font_badge = ImageFont.truetype(font_bold, 14)
    font_title = ImageFont.truetype(font_bold, 42)
    font_subtitle = ImageFont.truetype(font_reg, 19)
    font_card_head = ImageFont.truetype(font_bold, 17)
    font_card_text = ImageFont.truetype(font_reg, 14)
    font_small = ImageFont.truetype(font_reg, 12)
    font_status_pill = ImageFont.truetype(font_bold, 12)

    # 5. Top Pill Badge: "LEGAL SEO & MAPS COMPLIANCE ENFORCEMENT • 2026"
    badge_x = 70
    badge_y = 52
    badge_w = 480
    badge_h = 34
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
        radius=17,
        fill=(15, 23, 42, 220),
        outline=(239, 68, 68, 200), # Red alert border
        width=1
    )
    # Red pulsing status dot
    draw.ellipse([badge_x + 14, badge_y + 11, badge_x + 24, badge_y + 21], fill=(239, 68, 68, 255))
    draw.text((badge_x + 34, badge_y + 7), "GOOGLE MAPS LAW FIRM SUSPENSION WAVE", fill=(241, 245, 249), font=font_badge)

    # 6. Main Headline (Multi-line)
    draw.text((70, 108), "Google Maps Crackdown on Law Firm", fill=(255, 255, 255), font=font_title)
    draw.text((70, 160), "Virtual Offices & Co-Working Suites", fill=(255, 255, 255), font=font_title)

    # 7. Subtitle
    subtitle = "Live Video Verification, Regus/WeWork Purges, Signage Mandates & Ethical Reinstatement"
    draw.text((72, 228), subtitle, fill=(148, 163, 184), font=font_subtitle)

    # 8. Simulated Law Firm Verification & Suspension Card
    card_x = 70
    card_y = 280
    card_w = 1060
    card_h = 270

    # Glassmorphism container
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=16,
        fill=(15, 23, 42, 240),
        outline=(217, 119, 6, 180), # Amber legal accent border
        width=2
    )

    # Top Alert Strip inside the card
    alert_box_h = 56
    draw.rounded_rectangle(
        [card_x + 16, card_y + 16, card_x + card_w - 16, card_y + 16 + alert_box_h],
        radius=10,
        fill=(120, 53, 15, 210), # Deep amber warning
        outline=(245, 158, 11, 220),
        width=1
    )
    # Alert icon badge
    draw.ellipse([card_x + 32, card_y + 32, card_x + 52, card_y + 52], fill=(245, 158, 11), outline=(254, 243, 199), width=1)
    draw.text((card_x + 39, card_y + 32), "!", fill=(15, 23, 42), font=font_card_head)
    draw.text((card_x + 64, card_y + 32), "Action Required: Verify your practice location via mandatory live video walk-through", fill=(255, 255, 255), font=font_card_head)
    
    # Status Tag
    draw.rounded_rectangle(
        [card_x + card_w - 190, card_y + 26, card_x + card_w - 30, card_y + 58],
        radius=6,
        fill=(180, 83, 9, 255),
        outline=(251, 191, 36, 200),
        width=1
    )
    draw.text((card_x + card_w - 176, card_y + 35), "HARD SUSPENSION", fill=(255, 255, 255), font=font_status_pill)

    # Left Column: Enforcement Parameters
    col1_x = card_x + 36
    col1_y = card_y + 96

    draw.text((col1_x, col1_y), "Targeted Entities: Unstaffed Co-Working Spaces (Regus, WeWork, Premier)", fill=(226, 232, 240), font=font_card_head)
    draw.text((col1_x, col1_y + 30), "• Mandatory Permanent Signage: Must show permanent suite plaque and exterior lobby directory", fill=(248, 113, 113), font=font_card_text)
    draw.text((col1_x, col1_y + 56), "• Staffing Verification: Must prove dedicated, non-shared legal staff present during listed hours", fill=(203, 213, 225), font=font_card_text)
    draw.text((col1_x, col1_y + 82), "• Unbroken Video Walk-Through: Key entry, office lease, street sign, and license in single shot", fill=(148, 163, 184), font=font_card_text)
    draw.text((col1_x, col1_y + 108), "• Bar Compliance: Violations risk State Bar disciplinary action under ABA Model Rule 7.1", fill=(251, 191, 36), font=font_card_text)

    # Right Column: SearchPrex Legal Defense Blueprint
    col2_x = card_x + card_w - 340
    col2_y = card_y + 96
    draw.rounded_rectangle(
        [col2_x, col2_y, col2_x + 310, col2_y + 142],
        radius=12,
        fill=(19, 29, 61, 240),
        outline=(62, 180, 137, 180),
        width=1
    )
    draw.text((col2_x + 18, col2_y + 16), "SEARCHPREX LEGAL DEFENSE", fill=(52, 211, 153), font=font_status_pill)
    draw.text((col2_x + 18, col2_y + 38), "1. County Court Practice Silos", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 62), "2. Video Verification Scripting", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 86), "3. LegalService Schema Nesting", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 110), "4. Bar Association Citation Parity", fill=(148, 163, 184), font=font_small)

    # 9. Bottom Footer Strip
    draw.text((72, 582), "SEARCHPREX LAW FIRM SEO ADVISORY  •  GOOGLE MAP PACK INTEGRITY  •  OCTOBER 2026", fill=(100, 116, 139), font=font_small)
    draw.text((950, 582), "searchprex.com/services/law-firm-seo", fill=(217, 119, 6), font=font_small)

    # 10. Save WebP
    out_dir = r"c:\Users\Mubashar Shahzad\Desktop\searchprex-website\public\images\news"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "google-maps-law-firm-virtual-office-crackdown-video-verification.webp")

    rgb_img = img.convert("RGB")
    rgb_img.save(out_path, "WEBP", quality=88, method=6)

    size_kb = os.path.getsize(out_path) / 1024
    print(f"SUCCESS: Hero image generated at {out_path} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    create_hero_image()
