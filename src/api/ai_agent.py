import traceback  # 👈 Asegúrate de tener esto arriba del archivo
import random
from huggingface_hub import InferenceClient
import os
import requests
import traceback

HUGGING_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")
RAWG_API_KEY = os.getenv("RAWG_API_KEY")
client = InferenceClient(token=HUGGING_TOKEN)


def set_type_question():
    question_types = [
        "release_year",
        "oldest_game",
        "screenshot",
        "platforms",
        "developer",
        "genre"
    ]
    return random.choice(question_types)


def get_question_from_rawg():
    max_pages = 1000
    page_num = random.randint(1, max_pages)

    url = f"https://api.rawg.io/api/games?key={RAWG_API_KEY}&page_size=3&page={page_num}"
    response = requests.get(url)
    response.raise_for_status()
    games = response.json()['results']

    if not games:
        return get_question_from_rawg()

    question_type = set_type_question()
    game = games[0]

    name = game['name']
    release_date = game.get('released', 'unknown')
    image = game.get('background_image', '')
    platforms = [p['platform']['name'] for p in game.get('platforms', [])]
    developers = [d['name'] for d in game.get('developers', [])]
    genres = [g['name'] for g in game.get('genres', [])]

    if question_type == "release_year":
        if release_date:
            question = f"In which year was the game '{name}' released?"
            correct_answer = release_date.split(
                "-")[0]
        else:
            return get_question_from_rawg()

    elif question_type == "oldest_game" and len(games) >= 2:
        game1 = games[0]
        game2 = games[1]
        name1 = game1['name']
        name2 = game2['name']
        year1 = int(game1.get('released', '9999').split('-')[0])
        year2 = int(game2.get('released', '9999').split('-')[0])
        oldest = name1 if year1 < year2 else name2
        question = f"Which of these games was released first? {name1} or {name2}"
        correct_answer = oldest

    elif question_type == "screenshot":
        if image:
            question = f"Which game does this screenshot belong to?"
            correct_answer = name
        else:
            return get_question_from_rawg()

    elif question_type == "platforms":
        if platforms:
            question = f"On which platform can you play '{name}'?"
            correct_answer = platforms[0]
        else:
            return get_question_from_rawg()

    elif question_type == "developer":
        if developers:
            question = f"Who developed the game '{name}'?"
            correct_answer = developers[0]
        else:
            return get_question_from_rawg()

    elif question_type == "genre":
        if genres:
            question = f"What genre does the game '{name}' belong to?"
            correct_answer = genres[0]
        else:
            return get_question_from_rawg()

    else:
        return get_question_from_rawg()

    return question, correct_answer, image


def generate_incorrect_answer(question):
    url = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
    headers = {"Authorization": f"Bearer {HUGGING_TOKEN}"}
    payload = {
        "inputs": f"Give a plausible but incorrect answer to this video game trivia question: {question}"}

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        generated_text = response.json()[0]["generated_text"]
        return generated_text.strip()
    except Exception as e:
        print("Exception en generate_incorrect_answer:")
        print(traceback.format_exc())
        return f"Error with HF API: {str(e)}"


def generate_question_and_answers():
    question, correct_answer, image_url = get_question_from_rawg()
    incorrect_answer = generate_incorrect_answer(question)
    return {
        "question": question,
        "correct_answer": correct_answer,
        "incorrect_answer": incorrect_answer,
        "image_url": image_url
    }
