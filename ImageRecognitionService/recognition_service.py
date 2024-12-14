import requests
from PIL import Image
from transformers import CLIPProcessor, CLIPModel

def recognize_image():
    # URL of the image
    url = "https://i.ytimg.com/vi/TletqGR6Oxw/maxresdefault.jpg"
    image = Image.open(requests.get(url, stream=True).raw)
    # image_path = "MountainRiver.png"  # Replace with your image path
    # image = Image.open(image_path)

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
        "Cannot Determine"
    ]

    # Preprocess the inputs
    inputs = processor(text=labels, images=image, return_tensors="pt", padding=True)

    # Perform inference
    outputs = model(**inputs)

    # Compute similarity scores
    logits_per_image = outputs.logits_per_image  # Image-to-text similarity
    scores = logits_per_image.softmax(dim=1)  # Convert to probabilities

    # Get the best match
    best_match = labels[scores.argmax()]
    confidence = scores.max().item()

    print(f"Detected: {best_match} (Confidence: {confidence:.2f})")

if __name__ == "__main__":
    # Load the pre-trained model and processor
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    # Call the function
    recognize_image()
