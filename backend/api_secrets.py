API_KEY_ASSEMBLYAI = ''
GROQ_API_KEY = ''
prompt = "You are given a response from a transcription api with start time , end time and confidence score of words spoken your job is to analyse the data and give response in json as /{fluency_score = integer out of 100 based on start time and end time of the words,pronounciation score =  based on all confidence scores ,pronounciation:[ set  of words spoken wrong based on confidence score if it is less then 0.85 and no words repeated in it]'} , I dont want anything just this json no extra message then json"
