import google.generativeai as palm
import os
import sys
from dotenv import load_dotenv

load_dotenv()
palm_api_key = "AIzaSyCyT7c9U1GUKv_gCxv6BUJYh13-zUCliEg"

if not palm_api_key:
    print("API key not found. Please check your .env file.")
    exit()

palm.configure(api_key=palm_api_key)
model = palm.GenerativeModel(model_name="gemini-1.0-pro-latest")

def generate_itinerary(prompt):
    response = model.generate_content(prompt)
    if response:
        print(f"Generated text: {response.text}")
    else:
        print("No response from the API.")


if __name__ == "__main__":
    prompt = sys.argv[1] if len(sys.argv) > 1 else "Default prompt"
    generated_text = generate_itinerary(prompt)
    print(generated_text)
