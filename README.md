# UserTune

UserTune is a Google Chrome browser extension designed to enhance web accessibility for users with specific visual impairments, including those who are elderly, as well as individuals with dyslexia, color blindness, and low vision. The extension provides customizable features to help users tailor their browsing experience to their individual needs.

## Installation

### Step 1: Prepare Local Environment

#### a. Install Python  
1. Download the latest Python installer from [python.org](https://www.python.org/downloads/).  
2. Run the installer and check the box that says "Add Python to PATH" before proceeding.  
3. Click on "Install Now" to install Python with default settings.  
4. To check if the installation was successful, open the Command Prompt (cmd) and type:  
   ```bash
   python --version
   ```
   If it displays the Python version, the installation was successful.
#### b. Install Django
Run the following command in the Command Prompt to install Django:
   ```bash
   pip install django
   ```
### Step 2: Download the Plugin ZIP
1. Open your browser and navigate to the GitHub repository where the plugin is hosted: [UserTune GitHub Repository.](https://github.com/Shafiia/CTPI02)
2. Look for a green "Code" button and click on it.
   ![image](https://github.com/user-attachments/assets/bbc9efa6-f1bf-4d7c-8c2a-9eaf38f9d13c)

4. Select "Download ZIP" to download the entire repository as a ZIP file.
   ![image](https://github.com/user-attachments/assets/69fe7b44-68a0-4121-8c7c-114912aa5d3b)


### Step 3: Unzip the Plugin ZIP
1. Navigate to where the ZIP file was downloaded (usually in your Downloads folder).
2. Open the ZIP file and choose Extract. Select a location to unzip the folder.

### Step 4: Load the Extension in Chrome
1. Open Google Chrome.
2. Go to the Extensions page by typing chrome://extensions in the address bar.
3. Enable Developer mode in the top right corner of the Extensions page.
   ![image](https://github.com/user-attachments/assets/91719a63-9e88-4fc1-9b88-6032b59d390f)

4. Click on Load unpacked.
   ![image](https://github.com/user-attachments/assets/24f44162-e09f-40d1-9c1d-d1af008c71f5)

5. In the file browser, navigate to the final\plugin\src folder inside the extracted directory (e.g., C:\Users\User\Downloads\CTPI02-main\final\plugin\src) and select it. Chrome will load this folder as an unpacked extension.
   ![image](https://github.com/user-attachments/assets/88118601-c576-41ae-9239-825e3113b4be)


### Step 5: Setting up the Backend
1. Once the extension is installed, set up the database using the following commands:
2. Open Command Prompt (Windows).
3. Change to the /backend directory. Use the cd command to navigate there:
    ```bash
    cd path/to/project/backend
    ```
    ![image](https://github.com/user-attachments/assets/dae11c1c-c687-468a-8e8d-e2337141dae9)

4. Start the Django server with:
   ```bash
   python manage.py runserver
   ```
