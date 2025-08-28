import pyaudio
import wave

def record_audio(output_filename, stop_condition):
    """
    Record audio from the microphone and save it to a file.
    
    Parameters:
        output_filename (str): The name of the file where the recorded audio will be saved.
        stop_condition (function): A function that returns a boolean value. The recording 
                                   continues as long as this function returns True.

    The recording stops when `stop_condition()` returns False.
    """
    # Constants for audio recording
    CHUNK = 1024  # Number of audio frames per buffer
    FORMAT = pyaudio.paInt16  # Audio format (16-bit PCM)
    CHANNELS = 1  # Number of audio channels (1 for mono)
    RATE = 44100  # Sampling rate (samples per second)

    # Initialize PyAudio
    p = pyaudio.PyAudio()

    # Open a new audio stream for recording
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

    # List to store audio frames
    frames = []

    print("Recording started...")

    # Continuously read audio data while the stop condition is True
    while stop_condition():
        data = stream.read(CHUNK)  # Read a chunk of audio data
        frames.append(data)  # Append the chunk to the frames list

    # Stop and close the audio stream
    stream.stop_stream()
    stream.close()

    # Terminate the PyAudio object
    p.terminate()

    # Save the recorded audio to a WAV file
    wf = wave.open(output_filename, 'wb')  # Open the output file in write-binary mode
    wf.setnchannels(CHANNELS)  # Set the number of audio channels
    wf.setsampwidth(p.get_sample_size(FORMAT))  # Set the sample width
    wf.setframerate(RATE)  # Set the sampling rate
    wf.writeframes(b''.join(frames))  # Write the recorded audio frames to the file
    wf.close()  # Close the WAV file

    print(f"Audio saved as {output_filename}")
