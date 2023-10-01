import requests
import json
import os

def main():
    try: 
        pos = ["happy", "calm", "neutral"]
        neut = ["neutral", "surprised"]
        neg = ["angry", "disgust", "fearful", "sad"]

        API_URL = "https://api-inference.huggingface.co/models/ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"
        headers = {"Authorization": "Bearer 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"}

        # data_folder = "../data"
        data_folder = "audios/"

        ### GETTING ALL THE INPUTS ###
        inputs = []

        for audio in os.listdir(data_folder):
            inputs.append(audio)
            # inputs = ["03-01-01-01-01-01-01.wav", "03-01-01-01-01-02-01.wav"]

        for i in range(len(inputs)):
            inputs[i] = data_folder + inputs[i]

        ### RESETTING OUTPUTS FOLDER ###
        if os.path.exists("output"):
            for filename in os.listdir("output"):
                file_path = os.path.join("output", filename)
                os.remove(file_path)
            os.rmdir("output")
        os.mkdir('output')

        ### GETTING OUTPUTS READ ###
        def query(filename):
            with open(filename, "rb") as f:
                data = f.read()
            response = requests.post(API_URL, headers=headers, data=data)
            return response.json()

        output_list = []
        emotion_scores = {}

        # making emotion scores for each input
        for filename in inputs:
            pos_score = 0
            neut_score = 0
            neg_score = 0

            # getting the output
            # file_path = os.path.join("audios/", filename)
            output = query(filename)

            for emotion in output:
                emote = emotion["label"]
                score = emotion["score"]
                if emote in pos:
                    pos_score += score
                if emote in neut:
                    neut_score += score
                if emote in neg:
                    neg_score += score

            emotion_scores = [pos_score, neut_score, neg_score]

            json_ret_dict = {
                "option": filename,
                "emotion_scores": emotion_scores,
                "scores": output
            }
                
            output_list.append(json_ret_dict)

        # sorting the output in order of greatest to smallest pos_score
        new_output_list = sorted(output_list, key=lambda d: d['emotion_scores'][0], reverse=True) 

        # data = new_output_list
        data = "option " + new_output_list[0]["option"][-5] + " is your best option!"

        # dumping it into a json file
        with open("output/output.json", "w") as final:
            json.dump(new_output_list, final)
    
    except Exception as e:
        data = {
            "message": f"An error occurred: {str(e)}",
            "status": "error"
        }

    # Convert the data dictionary to a JSON string and print it
    json_data = json.dumps(data)
    print(json_data)

if __name__ == "__main__":
    main()
