from PIL import Image
import sys
import os
import colorsys

def process_hand(input_path, output_path):
    print(f"Processing hand icon: {input_path}")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # The checkerboard is likely connecting to the edges.
    # Let's use a flood fill approach if possible, or just a smarter color keying.
    # The checkerboard is gray/white. The hand is skin/orange.
    # Let's target the exact colors of the checkerboard if they are consistent.
    # Typically they are (255, 255, 255) and (204, 204, 204) or similar.
    
    newData = []
    for item in datas:
        r, g, b, a = item
        
        # Checkerboard is gray/white (low saturation)
        # Skin is reddish (high saturation)
        
        # Calculate saturation
        # r,g,b are 0-255
        
        # Handle alpha
        if a == 0:
            newData.append((255, 255, 255, 0))
            continue
            
        # Convert to HSV (need 0-1 range)
        h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        
        # Saturation threshold
        # If saturation is low, it's gray/white/black.
        # Skin tone usually has saturation > 0.2 or 0.3
        # Let's say < 0.1 is definitely background.
        
        is_gray = s < 0.15
        
        # Also, check for "white" specifically which might have very low saturation
        is_bright_white = r > 240 and g > 240 and b > 240
        
        if is_gray or is_bright_white:
             newData.append((255, 255, 255, 0))
        else:
             newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved cleaned hand with saturation filter to {output_path}")

def process_corner(input_path, output_path):
    print(f"Processing corner image: {input_path}")
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Crop to just the top-left corner ornament
    crop_size = int(width * 0.6)
    img_cropped = img.crop((0, 0, crop_size, crop_size))
    img_cropped.save(output_path, "PNG")
    print(f"Saved single corner to {output_path}")

def process_floral_corner(input_path, output_path):
    print(f"Processing floral corner from: {input_path}")
    try:
        img = Image.open(input_path).convert("RGBA")
    except Exception as e:
        print(f"Error opening {input_path}: {e}")
        return

    # Crop the top-left corner (0,0 to 200,200 based on analysis)
    # The image is 538x1024, so 200x200 should capture the corner well.
    img_cropped = img.crop((0, 0, 200, 200))
    datas = img_cropped.getdata()
    
    newData = []
    for item in datas:
        r, g, b, a = item
        
        # Background is creamy beige ~ (251, 248, 243)
        # Gold is darker/yellowish.
        
        # Simple distance check from the background color
        bg_r, bg_g, bg_b = 251, 248, 243
        distance = ((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2) ** 0.5
        
        # Also remove white
        is_white = r > 240 and g > 240 and b > 240
        
        if distance < 30 or is_white:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img_cropped.putdata(newData)
    img_cropped.save(output_path, "PNG")
    print(f"Saved floral corner to {output_path}")

def process_positive_corner(input_path, output_path):
    print(f"Processing positive corner from: {input_path}")
    try:
        img = Image.open(input_path).convert("RGBA")
    except Exception as e:
        print(f"Error opening {input_path}: {e}")
        return

    # Crop to the design (based on inspection: 15, 18 to 960, 971)
    # Adding a small buffer
    img_cropped = img.crop((10, 10, 970, 980))
    datas = img_cropped.getdata()
    
    newData = []
    for item in datas:
        r, g, b, a = item
        
        # Background is white (255, 255, 255)
        # Gold is darker/yellowish.
        
        # Remove white and near-white
        # Threshold: > 240 on all channels is likely background
        if r > 240 and g > 240 and b > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img_cropped.putdata(newData)
    img_cropped.save(output_path, "PNG")
    print(f"Saved positive corner to {output_path}")

if __name__ == "__main__":
    base_dir = "/Users/latinittn/Desktop/invitation/public"
    artifacts_dir = "/Users/latinittn/.gemini/antigravity/brain/fbaf9cd1-a463-487b-a6ea-61dcb2168da9"
    
    # Hand processing (done)
    # Floral Corner processing (done)
    
    # Positive Corner processing
    # Source is in artifacts dir
    positive_in = os.path.join(artifacts_dir, "media__1770904457457.png")
    positive_out = os.path.join(base_dir, "gold-corner-positive.png")
    process_positive_corner(positive_in, positive_out)
