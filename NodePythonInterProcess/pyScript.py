import sys
import json
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import requests

def recognize_image(image_url):
    # Load the pre-trained model and processor
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    # Open the image
    image = Image.open(requests.get(image_url, stream=True).raw)

    # Define labels/descriptions for recognition
    labels = [
        "Nature",
        "Sun",
        "Car", 
        "Red car", 
        "Human Brain", 
        "Human Heart", 
        "Tree", 
        "Building", 
        "Bottle", 
        "DNA sequence",
        "Text",
        "Cannot Determine"
    ]

    # Preprocess the inputs
    inputs = processor(text=labels, images=image, return_tensors="pt", padding=True)

    # Perform inference
    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image
    scores = logits_per_image.softmax(dim=1)

    # Get the best match
    best_match = labels[scores.argmax()]
    confidence = scores.max().item()

    return {"label": best_match, "confidence": confidence}

if __name__ == "__main__":
    # Get the image URL from the Node.js process
    image_url = sys.argv[1]  # First argument passed to the script
    result = recognize_image(image_url)
    # Return the result as JSON
    print(json.dumps(result))
