from PIL import Image
import sys

def remove_background_smart(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        
        # Checkerboard colors are often pure white (255) and light gray (e.g., 204 or 240)
        # Gold is yellowish (High R, Med G, Low B)
        # We want to keep ONLY the gold.
        
        # Gold Detection:
        # R should be significantly higher than B.
        # G should be higher than B.
        
        is_gold = (r > b + 20) and (g > b + 10)
        
        if is_gold:
            newData.append(item)
        else:
            # If it's not gold, it's background (white, gray, black, etc.)
            newData.append((255, 255, 255, 0))

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved cleaned image to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input_path> <output_path>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    remove_background_smart(input_file, output_file)
