import traceback
import random
import os
import requests
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

HUGGING_TOKEN = os.environ.get("HUGGINGFACEHUB_API_TOKEN")
RAWG_API_KEY = os.environ.get("RAWG_API_KEY")
TOGETHER_API_KEY = os.environ.get("TOGETHER_AI_API_KEY", "")


client = OpenAI(api_key=TOGETHER_API_KEY)


def set_type_question():
    question_types = [
        "release_year",
        "oldest_game",
        "screenshot",
        "developer",
        "genre"
    ]
    return random.choice(question_types)


def get_question_from_rawg():
    max_pages = 1000
    page_num = random.randint(1, max_pages)

    url = f"https://api.rawg.io/api/games?key={RAWG_API_KEY}&page_size=3&page={page_num}"
    try:
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
        developers = [d['name'] for d in game.get('developers', [])]
        genres = [g['name'] for g in game.get('genres', [])]

        if question_type == "release_year":
            if release_date and release_date != 'unknown':
                question = f"In which year was the game '{name}' released?"
                correct_answer = release_date.split("-")[0]
            else:
                return get_question_from_rawg()

        elif question_type == "oldest_game" and len(games) >= 2:
            game1 = games[0]
            game2 = games[1]
            if game1.get('released') and game2.get('released'):
                name1 = game1['name']
                name2 = game2['name']
                year1 = int(game1.get('released').split('-')[0])
                year2 = int(game2.get('released').split('-')[0])
                oldest = name1 if year1 < year2 else name2
                question = f"Which of these games was released first? {name1} or {name2}"
                correct_answer = oldest
            else:
                return get_question_from_rawg()

        elif question_type == "screenshot":
            if image:
                question = f"Which game does this screenshot belong to?"
                correct_answer = name
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

        return question, correct_answer, image, question_type
    except requests.exceptions.RequestException as e:
        print(f"Error al conectar con la API de RAWG: {e}")
        raise ValueError(
            f"No se pudo obtener un juego de la API de RAWG debido a un error de conexión: {e}")
    except Exception as e:
        print(f"Error inesperado en get_question_from_rawg: {e}")
        print(traceback.format_exc())
        return get_question_from_rawg()


def get_prompt(question, correct_answer, question_type):
    if question_type == "release_year":
        return (
            f"The correct release year of the game is {correct_answer}.\n"
            f"Return ONLY one plausible but incorrect year, close to it (e.g., +/- 3 years). No explanations. Format: YYYY."
        )

    elif question_type == "oldest_game":
        return (
            f"The correct answer to the question is '{correct_answer}'.\n"
            f"Return ONLY the name of the other game in the question, with no context or explanation."
        )

    elif question_type == "screenshot":
        return (
            f"The image is a screenshot from the game '{correct_answer}'.\n"
            f"Return ONLY the name of a different game with similar art style or genre. No extra text."
        )

    elif question_type == "developer":
        return (
            f"The correct developer of the game is '{correct_answer}'.\n"
            f"Return ONLY the name of another well-known video game developer. No explanation."
        )

    elif question_type == "genre":
        return (
            f"The correct genre of the game is '{correct_answer}'.\n"
            f"Return ONLY another game genre that could confuse someone. No other text."
        )

    else:
        return (
            f"Given the question: '{question}', return a single plausible but incorrect answer.\n"
            f"Just one word or phrase, with no explanations or context."
        )


def clean_generated_answer(text, correct_answer):
    prefixes = [
        "example:", "incorrect:", "answer:", "the answer is:",
        "solution:", "possible answer:", "trivia question:", "genre:"
    ]
    text = text.strip()
    text_lower = text.lower()
    for prefix in prefixes:
        if text_lower.startswith(prefix):
            text = text[len(prefix):].strip(" :-—.'\"")
    text = text.strip(' "\'“”‘’')
    import re
    text = re.sub(r"^[^a-zA-Z0-9]+", "", text)
    text = re.sub(r"[^a-zA-Z0-9]+$", "", text)

    if (
        not text
        or correct_answer.lower() in text.lower()
        or text.lower() == correct_answer.lower()
        or len(text.split()) > 3
    ):
        return None

    return text


def generate_incorrect_answer(question, correct_answer, question_type):
    prompt = get_prompt(question, correct_answer, question_type)

    try:
        url = "https://api.together.xyz/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {os.getenv('TOGETHER_AI_API_KEY')}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "mistralai/Mistral-7B-Instruct-v0.2",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 8,
            "temperature": 0.9,
            "top_p": 0.95
        }

        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()

        raw_answer = result["choices"][0]["message"]["content"].strip()
        clean_answer = clean_generated_answer(raw_answer, correct_answer)

        if not clean_answer:
            return "N/A"
        return clean_answer

    except requests.exceptions.RequestException as e:
        print(f"Error al conectar con la API de Together.ai: {e}")
        print(traceback.format_exc())
        return "N/A"
    except Exception as e:
        print(f"Error inesperado con Together API: {e}")
        print(traceback.format_exc())
        return "N/A"


def generate_question_and_answers():
    question, correct_answer, image_url, question_type = get_question_from_rawg()

    if question_type == "oldest_game":
        import re
        games_in_question = re.findall(r"\? (.+) or (.+)", question)
        if games_in_question:
            game1, game2 = games_in_question[0]
            incorrect_answer = game2 if correct_answer == game1 else game1
        else:
            incorrect_answer = generate_incorrect_answer(
                question, correct_answer, question_type)
    else:
        incorrect_answer = generate_incorrect_answer(
            question, correct_answer, question_type)

    return {
        "question": question,
        "correct_answer": correct_answer,
        "incorrect_answer": incorrect_answer,
        "image_url": image_url
    }
