import streamlit as st
from lang_bot import chat_with_bot

# Title
st.title('Amrita University Chatbot')
st.title('_Streamlit_ is :blue[cool] :sunglasses:')

# List of Amrita-related keywords
amrita_keywords = [
    "Amrita University", "Amrita School of Engineering", 
    "Amrita Vishwa Vidyapeetham", "courses", "admissions", 
    "campus", "faculty", "student life", "exams", "aums"
]

# Function to check if response is Amrita-related
def is_amrita_related(response):
    return any(keyword.lower() in response.lower() for keyword in amrita_keywords)

# Input chat
text_input = st.text_input("ad", placeholder="Ask something about Amrita University", label_visibility='collapsed')
st.write(text_input)

# Chat submit button
st.button("Submit", type="primary")

if text_input:
    model_text_output = chat_with_bot(query=text_input)
    
    # Check if the response is Amrita-related
    if is_amrita_related(model_text_output):
        llama2_out = st.text_area(
            "Llama2",
            model_text_output
        )
    else:
        llama2_out = st.text_area(
            "Llama2",
            "Please ask questions related to Amrita University or Amrita School of Engineering."
        )

