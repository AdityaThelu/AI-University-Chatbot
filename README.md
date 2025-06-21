# Amrita University Chatbot

## Project Overview

This project is an AI-powered chatbot designed for Amrita Vishwa Vidyapeetham University.  It aims to provide users with information about the university, its campuses, programs, and other relevant resources. The chatbot utilizes a web interface and incorporates various media elements to enhance the user experience.


## Features

* **Web-based Interface:**  The chatbot is accessible through a web browser (`amritachatbot/Chatbot/new_bot.html`).
* **AI-powered Conversational Interaction:**  The chatbot uses an AI model to understand and respond to user queries. (`amritachatbot/Chatbot/app.py`, `amritachatbot/Chatbot/lang_bot.py`, `amritachatbot/Chatbot/script.js`)
* **Multimedia Integration:**  The chatbot incorporates videos and images related to Amrita University for a richer, more engaging experience (`amritachatbot/amrita2.mp4`, `amritachatbot/images/*`).
* **Responsive Design:** The CSS files suggest a focus on responsive design across various screen sizes (`amritachatbot/css/*`).


## Installation

This project uses Python and requires the packages listed in `requirements.txt`.  Install them using pip:

```bash
pip install -r amritachatbot/files/requirements.txt
```

Alternatively, if you have a virtual environment manager like `venv`, create and activate a virtual environment before installing:

```bash
python3 -m venv .venv
source .venv/bin/activate  # On Linux/macOS
.venv\Scripts\activate  # On Windows
pip install -r amritachatbot/files/requirements.txt
```

After installing the dependencies, you will need to install any required Javascript libraries.  The project structure suggests the use of several Javascript libraries within `amritachatbot/js/` that can be integrated into a suitable build process (though no explicit package management file is provided).

## Usage

1. **Run the chatbot server:** Navigate to the `amritachatbot/Chatbot` directory and run the Python application. The specific command will depend on how `app.py` is designed (e.g., `python app.py` or using a framework-specific command like `flask run`).

2. **Access the web interface:** Open `amritachatbot/Chatbot/new_bot.html` in your web browser.

3. **Interact with the chatbot:** Type your questions or queries in the chat interface.


**Note:** This README is based on the provided directory structure and file names.  Specific instructions for running the chatbot server might require examination of the `app.py` file itself.  Additional setup might be needed to correctly integrate all Javascript components and assets.
