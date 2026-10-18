import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def draw_star(draw, cx, cy, r_outer, r_inner, fill_color):
    points = []
    angle_offset = -math.pi / 2
    for i in range(10):
        r = r_outer if i % 2 == 0 else r_inner
        angle = angle_offset + i * (math.pi / 5)
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill_color)

def create_hero_image():
    width = 1200
    height = 630

    # 1. High-tech Deep Navy Canvas (#070b1e -> #0d1536)
    img = Image.new("RGBA", (width, height), (7, 11, 30, 255))
    draw = ImageDraw.Draw(img)

    # Rich radial/linear dark gradient background
    for y in range(height):
        ratio = y / height
        r = int(7 + ratio * 8)
        g = int(11 + ratio * 14)
        b = int(30 + ratio * 32)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # 2. Subtle architectural grid lines (engineering / tech look)
    grid_color = (255, 255, 255, 12)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # 3. Glowing Atmospheric Light Orbs
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Red / Amber alert atmospheric aura on right
    glow_draw.ellipse([750, 150, 1180, 580], fill=(239, 68, 68, 32))
    # Emerald brand halo on top left
    glow_draw.ellipse([-50, -50, 450, 350], fill=(62, 180, 137, 28))
    # Deep purple ambient center
    glow_draw.ellipse([450, 100, 850, 500], fill=(108, 60, 255, 24))
    
    glow_blurred = glow.filter(ImageFilter.GaussianBlur(radius=40))
    img = Image.alpha_composite(img, glow_blurred)
    draw = ImageDraw.Draw(img)

    # 4. Fonts
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"

    font_badge = ImageFont.truetype(font_bold, 14)
    font_title = ImageFont.truetype(font_bold, 42)
    font_subtitle = ImageFont.truetype(font_reg, 19)
    font_card_alert = ImageFont.truetype(font_bold, 18)
    font_card_head = ImageFont.truetype(font_bold, 16)
    font_card_text = ImageFont.truetype(font_reg, 14)
    font_small = ImageFont.truetype(font_reg, 12)
    font_status_pill = ImageFont.truetype(font_bold, 12)

    # 5. Top Pill Badge: "GOOGLE BUSINESS PROFILE POLICY UPDATE"
    badge_x = 70
    badge_y = 52
    badge_w = 460
    badge_h = 34
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
        radius=17,
        fill=(15, 23, 42, 220),
        outline=(62, 180, 137, 200),
        width=1
    )
    # Emerald pulsing status dot
    draw.ellipse([badge_x + 14, badge_y + 11, badge_x + 24, badge_y + 21], fill=(62, 180, 137, 255))
    draw.text((badge_x + 34, badge_y + 7), "GOOGLE BUSINESS PROFILE POLICY UPDATE", fill=(241, 245, 249), font=font_badge)

    # 6. Main Headline (Multi-line)
    draw.text((70, 108), "Google Rolls Out Fake Review Warning", fill=(255, 255, 255), font=font_title)
    draw.text((70, 160), "Banners & Profile Review Freezes", fill=(255, 255, 255), font=font_title)

    # 7. Subtitle
    subtitle = "Gemini-Driven Review Moderation, Velocity Audits & Local SEO Defense for SMBs & Law Firms"
    draw.text((72, 228), subtitle, fill=(148, 163, 184), font=font_subtitle)

    # 8. Simulated Google Business Profile Alert & Freeze Interface Card
    card_x = 70
    card_y = 280
    card_w = 1060
    card_h = 270

    # Glassmorphism container
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=16,
        fill=(13, 20, 42, 235),
        outline=(239, 68, 68, 160), # Red alert border
        width=2
    )

    # Alert Strip at top of card (Matches Google's exact warning notice)
    alert_box_h = 58
    draw.rounded_rectangle(
        [card_x + 16, card_y + 16, card_x + card_w - 16, card_y + 16 + alert_box_h],
        radius=10,
        fill=(153, 27, 27, 210), # Crimson warning
        outline=(248, 113, 113, 220),
        width=1
    )
    # Warning exclamation icon badge
    draw.ellipse([card_x + 32, card_y + 32, card_x + 52, card_y + 52], fill=(239, 68, 68), outline=(254, 202, 202), width=1)
    draw.text((card_x + 39, card_y + 32), "!", fill=(255, 255, 255), font=font_card_alert)
    draw.text((card_x + 64, card_y + 32), "Suspected fake reviews were removed from this profile", fill=(255, 255, 255), font=font_card_alert)
    
    # Official tag
    draw.rounded_rectangle(
        [card_x + card_w - 180, card_y + 26, card_x + card_w - 30, card_y + 60],
        radius=6,
        fill=(185, 28, 28, 255),
        outline=(252, 165, 165, 180),
        width=1
    )
    draw.text((card_x + card_w - 166, card_y + 35), "GOOGLE POLICY", fill=(255, 255, 255), font=font_status_pill)

    # Left Column: Listing Stats & Freeze Notice
    col1_x = card_x + 36
    col1_y = card_y + 96

    draw.text((col1_x, col1_y), "Local Enterprise Profile  •  Apex Legal & Services Group", fill=(226, 232, 240), font=font_card_head)
    
    # Draw 5 crisp golden vector stars
    star_y = col1_y + 38
    for s_idx in range(5):
        sx = col1_x + 10 + s_idx * 22
        fill = (251, 191, 36) if s_idx < 4 else (100, 116, 139) # 4 gold, 1 gray
        draw_star(draw, sx, star_y, 9, 4, fill)
    
    draw.text((col1_x + 125, col1_y + 28), "4.3  (218 Google Reviews)", fill=(251, 191, 36), font=font_card_head)
    
    # Status badges
    draw.text((col1_x, col1_y + 60), "Review Intake Status:  PAUSED (30-Day Velocity Audit Window)", fill=(248, 113, 113), font=font_card_text)
    draw.text((col1_x, col1_y + 86), "Enforcement Trigger:  Unusual surge in 5-star submissions detected within 48-hour window", fill=(148, 163, 184), font=font_card_text)
    draw.text((col1_x, col1_y + 110), "Consumer Visibility:  Public badge displayed in Google Maps, Local 3-Pack & Knowledge Panel", fill=(203, 213, 225), font=font_card_text)

    # Right Column: SearchPrex Advisory Card
    col2_x = card_x + card_w - 340
    col2_y = card_y + 96
    draw.rounded_rectangle(
        [col2_x, col2_y, col2_x + 310, col2_y + 142],
        radius=12,
        fill=(19, 29, 61, 240),
        outline=(62, 180, 137, 180),
        width=1
    )
    draw.text((col2_x + 18, col2_y + 16), "SEARCHPREX PROTOCOL", fill=(52, 211, 153), font=font_status_pill)
    draw.text((col2_x + 18, col2_y + 38), "1. Immediate Transaction Audit", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 62), "2. Redressal Red-Team Appeal", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 86), "3. Multi-Platform Citation Shield", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 110), "4. Authority & Trust Calibration", fill=(148, 163, 184), font=font_small)

    # 9. Bottom Footer Strip
    draw.text((72, 582), "SEARCHPREX LOCAL SEO ADVISORY  •  ALGORITHM MONITORING  •  OCTOBER 2026", fill=(100, 116, 139), font=font_small)
    draw.text((950, 582), "searchprex.com/resources/news", fill=(62, 180, 137), font=font_small)

    # 10. Save WebP
    out_dir = r"c:\Users\Mubashar Shahzad\Desktop\searchprex-website\public\images\news"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "google-business-profile-fake-review-warnings-review-pauses-local-seo.webp")

    rgb_img = img.convert("RGB")
    rgb_img.save(out_path, "WEBP", quality=88, method=6)

    size_kb = os.path.getsize(out_path) / 1024
    print(f"SUCCESS: Hero image generated at {out_path} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    create_hero_image()
