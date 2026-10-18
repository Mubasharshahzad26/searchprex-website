import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_hero_image():
    width = 1200
    height = 630

    # 1. High-tech Deep Slate Canvas (#080c1d -> #0f172a)
    img = Image.new("RGBA", (width, height), (8, 12, 29, 255))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        ratio = y / height
        r = int(8 + ratio * 8)
        g = int(12 + ratio * 12)
        b = int(29 + ratio * 20)
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
    
    # OpenAI Emerald / Teal glow on right (#10a37f OpenAI brand teal)
    glow_draw.ellipse([750, 100, 1180, 520], fill=(16, 163, 127, 36))
    # Purple AI ambient center
    glow_draw.ellipse([450, 150, 850, 550], fill=(108, 60, 255, 28))
    # Electric blue top-left
    glow_draw.ellipse([-50, -50, 450, 350], fill=(59, 130, 246, 26))
    
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

    # 5. Top Pill Badge: "AI SEARCH & GEO BREAKTHROUGH • 2026"
    badge_x = 70
    badge_y = 52
    badge_w = 450
    badge_h = 34
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h],
        radius=17,
        fill=(15, 23, 42, 220),
        outline=(16, 163, 127, 220), # OpenAI teal border
        width=1
    )
    # Teal pulsing status dot
    draw.ellipse([badge_x + 14, badge_y + 11, badge_x + 24, badge_y + 21], fill=(16, 163, 127, 255))
    draw.text((badge_x + 34, badge_y + 7), "OPENAI CHATGPT SEARCH OFFICIAL LAUNCH", fill=(241, 245, 249), font=font_badge)

    # 6. Main Headline (Multi-line)
    draw.text((70, 108), "OpenAI Launches ChatGPT Search:", fill=(255, 255, 255), font=font_title)
    draw.text((70, 160), "The Complete GEO & OAI-SearchBot Playbook", fill=(255, 255, 255), font=font_title)

    # 7. Subtitle
    subtitle = "Live Web Indexing, Inline Citations, Information Gain & Generative Engine Optimization"
    draw.text((72, 228), subtitle, fill=(148, 163, 184), font=font_subtitle)

    # 8. Simulated ChatGPT Search Interface & Crawler Anatomy Card
    card_x = 70
    card_y = 280
    card_w = 1060
    card_h = 270

    # Glassmorphism container
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=16,
        fill=(15, 23, 42, 240),
        outline=(16, 163, 127, 160), # Teal border
        width=2
    )

    # Top search query bar inside card
    q_box_h = 54
    draw.rounded_rectangle(
        [card_x + 16, card_y + 16, card_x + card_w - 16, card_y + 16 + q_box_h],
        radius=10,
        fill=(30, 41, 59, 230),
        outline=(51, 65, 85, 255),
        width=1
    )
    # Search icon simulation & prompt text
    draw.text((card_x + 36, card_y + 32), "Q", fill=(16, 163, 127), font=font_card_head)
    draw.text((card_x + 62, card_y + 32), 'chatgpt.com/search  "What are the top enterprise law firms in Texas for IP litigation?"', fill=(241, 245, 249), font=font_card_text)
    
    # "SEARCH ACTIVE" badge
    draw.rounded_rectangle(
        [card_x + card_w - 170, card_y + 26, card_x + card_w - 30, card_y + 58],
        radius=6,
        fill=(16, 163, 127, 240),
        outline=(52, 211, 153, 255),
        width=1
    )
    draw.text((card_x + card_w - 158, card_y + 34), "LIVE WEB INDEX", fill=(255, 255, 255), font=font_code)

    # Left Column: OAI-SearchBot Crawling Rules & Citation Architecture
    col1_x = card_x + 36
    col1_y = card_y + 96

    draw.text((col1_x, col1_y), "OpenAI Web Crawling Hierarchy (User-Agent: OAI-SearchBot)", fill=(226, 232, 240), font=font_card_head)
    
    draw.text((col1_x, col1_y + 30), "• OAI-SearchBot (Search Indexing): Must be allowed in robots.txt for search visibility", fill=(16, 185, 129), font=font_card_text)
    draw.text((col1_x, col1_y + 56), "• GPTBot (Model Training): Independent crawler — can be blocked without hurting search", fill=(203, 213, 225), font=font_card_text)
    draw.text((col1_x, col1_y + 82), "• Inline Citation Mechanics: Extracts entity definitions, schema nodes, and primary stats", fill=(148, 163, 184), font=font_card_text)
    draw.text((col1_x, col1_y + 108), "• Traffic Dynamics: Highly qualified referrals with up to 4x higher session engagement", fill=(241, 245, 249), font=font_card_text)

    # Right Column: SearchPrex GEO Framework
    col2_x = card_x + card_w - 340
    col2_y = card_y + 96
    draw.rounded_rectangle(
        [col2_x, col2_y, col2_x + 310, col2_y + 142],
        radius=12,
        fill=(17, 24, 39, 240),
        outline=(108, 60, 255, 180),
        width=1
    )
    draw.text((col2_x + 18, col2_y + 16), "SEARCHPREX GEO STACK", fill=(167, 139, 250), font=font_code)
    draw.text((col2_x + 18, col2_y + 38), "1. Allow OAI-SearchBot", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 62), "2. Deploy /llms.txt Manifest", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 86), "3. Structured Answer Capsules", fill=(241, 245, 249), font=font_card_text)
    draw.text((col2_x + 18, col2_y + 110), "4. High Authority Co-Citation", fill=(148, 163, 184), font=font_small)

    # 9. Bottom Footer Strip
    draw.text((72, 582), "SEARCHPREX AI VISIBILITY ADVISORY  •  GENERATIVE ENGINE OPTIMIZATION  •  OCTOBER 2026", fill=(100, 116, 139), font=font_small)
    draw.text((950, 582), "searchprex.com/resources/news", fill=(16, 163, 127), font=font_small)

    # 10. Save WebP
    out_dir = r"c:\Users\Mubashar Shahzad\Desktop\searchprex-website\public\images\news"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "openai-chatgpt-search-official-launch-geo-oai-searchbot-guide.webp")

    rgb_img = img.convert("RGB")
    rgb_img.save(out_path, "WEBP", quality=88, method=6)

    size_kb = os.path.getsize(out_path) / 1024
    print(f"SUCCESS: Hero image generated at {out_path} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    create_hero_image()
