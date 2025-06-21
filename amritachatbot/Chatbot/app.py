from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = 'AIzaSyDQf2iDdSoWmAvYS1A4bN5oEeuV2arsWYo'
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Scrape the website and store the data
def scrape_amrita_engineering():
    url = "https://www.amrita.edu/academics/?interest=engineering"
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Debugging log for scraping
        print(f"Scraping website: {url}")
        
        data = {}
        # Adjust the selector according to the actual website structure
        branch_blocks = soup.find_all('div', class_='branch-details')  # Change 'branch-details' to actual class used on the site
        for branch in branch_blocks:
            branch_name = branch.find('h3').get_text(strip=True)  # Adjust to match the structure
            curriculum_link = branch.find('a', href=True)['href']
            data[branch_name.lower()] = curriculum_link
            print(f"Extracted: {branch_name} -> {curriculum_link}")

        return data
    except Exception as e:
        print(f"Error during scraping: {e}")
        return {}

# Load engineering data at the start
engineering_data = scrape_amrita_engineering()

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt', '').strip()

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    # Check for "AUMS" or "aums"
    if prompt.lower() == 'aums':
        return jsonify({'response': 'https://www.amrita.edu/aums/'})

    # Handle curriculum-specific queries
    for branch_name, curriculum_link in engineering_data.items():
        if branch_name in prompt.lower():
            return jsonify({
                'response': f"Here is the curriculum for {branch_name.title()}: {curriculum_link}\n\nFor further information: Click Below\nhttps://www.amrita.edu/academics/?interest=engineering"
            })

    # Fallback for irrelevant queries
    keywords = ['Amrita', 'Vishwa', 'University', 'amrita', 'Admission', 'contact', 'engineering']
    if not any(keyword in prompt for keyword in keywords):
        return jsonify({'response': 'The question asked is irrelevant'}), 400

    # Use AI model for other relevant queries
    response = model.generate_content(prompt + " make it short as possible, don't exceed more than 1 line, Data should be only related to Amrita Vishwa")
    return jsonify({'response': response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
