import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_hero_image():
    width = 1200
    height = 630

    # 1. High-tech Deep Navy/Violet Canvas (#070a1c -> #12102b)
    img = Image.new("RGBA", (width, height), (7, 10, 28, 255))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        ratio = y / height
        r = int(7 + ratio * 11)
        g = int(10 + ratio * 6)
        b = int(28 + ratio * 20)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # 2. Architectural grid lines
    grid_color = (255, 255, 255, 12)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # 3. Glowing Atmospheric Light Orbs
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Google Blue / Indigo shopping aura on right
    glow_draw.ellipse([750, 100, 1180, 540], fill=(59, 130, 246, 32))
    # Electric Emerald trust glow
    glow_draw.ellipse([450, 150, 850, 550], fill=(16, 185, 129, 26))
    # Deep Purple top-left
    glow_draw.ellipse([-50, -50, 450, 350], fill=(139, 92, 246, 26))
    
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
    font_code = ImageFont.truetype(font_bold, 13)

    # 5. Top Pill Badge: "ECOMMERCE SEO & MERCHANT COMPLIANCE • 2026"
    badge_x = 70
    badge_y = 52
    badge_w = 490
    badge_h = 34
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
        radius=17,
        fill=(15, 23, 42, 220),
        outline=(59, 130, 246, 200), # Blue shopping border
        width=1
    )
    # Blue pulsing status dot
    draw.ellipse([badge_x + 14, badge_y + 11, badge_x + 24, badge_y + 21], fill=(59, 130, 246, 255))
    draw.text((badge_x + 34, badge_y + 7), "GOOGLE MERCHANT CENTER MANDATE UPDATE", fill=(241, 245, 249), font=font_badge)

    # 6. Main Headline (Multi-line)
    draw.text((70, 108), "Google Merchant Center Mandates", fill=(255, 255, 255), font=font_title)
    draw.text((70, 160), "Sitewide Return Policy Schema Markup", fill=(255, 255, 255), font=font_title)

    # 7. Subtitle
    subtitle = "hasMerchantReturnPolicy Schema, Feed Discrepancy Audits & Product De-listing Defense"
    draw.text((72, 228), subtitle, fill=(148, 163, 184), font=font_subtitle)

    # 8. Simulated Merchant Center Audit & Schema Card
    card_x = 70
    card_y = 280
    card_w = 1060
    card_h = 270

    # Glassmorphism container
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=16,
        fill=(15, 23, 42, 240),
        outline=(59, 130, 246, 170), # Blue border
        width=2
    )

    # Top Alert Strip inside the card (Google Merchant Center Header)
    alert_box_h = 56
    draw.rounded_rectangle(
        [card_x + 16, card_y + 16, card_x + card_w - 16, card_y + 16 + alert_box_h],
        radius=10,
        fill=(30, 58, 138, 190), # Deep blue GMC header
        outline=(96, 165, 250, 220),
        width=1
    )
    # Checkmark/Notice badge
    draw.ellipse([card_x + 32, card_y + 32, card_x + 52, card_y + 52], fill=(59, 130, 246), outline=(191, 219, 254), width=1)
    draw.text((card_x + 38, card_y + 32), "i", fill=(255, 255, 255), font=font_card_head)
    draw.text((card_x + 64, card_y + 32), "Merchant Center Policy: hasMerchantReturnPolicy JSON-LD validation required for free listings", fill=(255, 255, 255), font=font_card_head)
    
    # Status Tag
    draw.rounded_rectangle(
        [card_x + card_w - 180, card_y + 26, card_x + card_w - 30, card_y + 58],
        radius=6,
        fill=(37, 99, 235, 255),
        outline=(147, 197, 253, 200),
        width=1
    )
    draw.text((card_x + card_w - 166, card_y + 35), "GMC COMPLIANCE", fill=(255, 255, 255), font=font_code)

    # Left Column: Code Structure & Enforcement Points
    col1_x = card_x + 36
    col1_y = card_y + 96

    draw.text((col1_x, col1_y), "Schema.org Structure: Organization > hasMerchantReturnPolicy", fill=(226, 232, 240), font=font_card_head)
    draw.text((col1_x, col1_y + 30), "• Mandatory Properties: merchantReturnDays (e.g. 30), returnFees (FreeReturn), applicableCountry", fill=(52, 211, 153), font=font_card_text)
    draw.text((col1_x, col1_y + 56), "• Feed Mismatch Penalty: Differences between GMC dashboard & on-page schema trigger silent de-listing", fill=(248, 113, 113), font=font_card_text)
    draw.text((col1_x, col1_y + 82), "• Sitewide Implementation: Nesting under Organization eliminates repetitive per-product bloat", fill=(203, 213, 225), font=font_card_text)
    draw.text((col1_x, col1_y + 108), "• AI Shopping Rich Results: Powers Free 30-Day Returns badges in Google Search & AI Overviews", fill=(241, 245, 249), font=font_card_text)

    # Right Column: SearchPrex Ecommerce Stack
    col2_x = card_x + card_w - 340
    col2_y = card_y + 96
    draw.rounded_rectangle(
        [col2_x, col2_y, col2_x + 310, col2_y + 142],
        radius=12,
        fill=(19, 29, 61, 240),
        outline=(59, 130, 246, 180),
        width=1
    )
    draw.text((col2_x + 18, col2_y + 16), "SEARCHPREX ECOM STACK", fill=(147, 197, 253), font=font_code)
    draw.text((col2_x + 18, col2_y + 38), "1. Root Organization Nesting", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 62), "2. GMC Dashboard Parity Sync", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 86), "3. OfferShippingDetails Markup", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 110), "4. Shopify / Woo Feed Audit", fill=(148, 163, 184), font=font_small)

    # 9. Bottom Footer Strip
    draw.text((72, 582), "SEARCHPREX ECOMMERCE SEO ADVISORY  •  GOOGLE SHOPPING GRAPH  •  OCTOBER 2026", fill=(100, 116, 139), font=font_small)
    draw.text((950, 582), "searchprex.com/services/ecommerce-seo", fill=(59, 130, 246), font=font_small)

    # 10. Save WebP
    out_dir = r"c:\Users\Mubashar Shahzad\Desktop\searchprex-website\public\images\news"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "google-merchant-center-sitewide-return-policy-schema-mandate.webp")

    rgb_img = img.convert("RGB")
    rgb_img.save(out_path, "WEBP", quality=88, method=6)

    size_kb = os.path.getsize(out_path) / 1024
    print(f"SUCCESS: Hero image generated at {out_path} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    create_hero_image()
