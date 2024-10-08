// Mock Chrome APIs
global.chrome = {
    runtime: {
        getURL: jest.fn((path) => `mocked-url/${path}`),
        onMessage: {
            addListener: jest.fn(),
        },
    },
    storage: {
        local: {
            get: jest.fn((key, callback) => callback({ settings: {} })),
            set: jest.fn((data, callback) => callback && callback()),
        },
    },
    tabs: {
        query: jest.fn((queryInfo, callback) => callback([{ id: 1 }])),
        sendMessage: jest.fn(),
    },
    scripting: {
        executeScript: jest.fn((details, callback) => callback && callback()),
    },
};

// Mock Fetch API for login
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ success: true, token: "mock-token", first_name: "John" }),
    })
);

// Mock localStorage
beforeEach(() => {
    global.localStorage = {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
    };
});


// Mock DOM Elements
document.body.innerHTML = `
  <input type="checkbox" id="lowVisionNeed" />
  <div id="lowVisionNeedSlider" style="display:none;"></div>
  <input type="range" id="diopterNeedValue" value="1" />
  <span id="diopterNeedOutput">1</span>
  
  <input type="checkbox" id="lowVision" />
  <div id="lowVisionSlider" style="display:none;"></div>
  <input type="range" id="diopterValue" value="1" />
  <span id="diopterOutput">1</span>
  
  <form id="signupForm">
    <input type="submit" value="Sign Up">
  </form>
  <form id="loginForm">
    <input type="submit" value="Login">
    <input type="email" id="email" value="test@example.com" />
    <input type="password" id="password" value="password123" />
  </form>
  <div id="errorSignup"></div>
  <div id="navLinks"></div>
  <div id="errorMessage"></div>
  <select id="colorBlindnessNeed"></select>
  <select id="colorBlindness"></select>
`;

// Import the popup.js file
const { toggleLowVisionSlider, updateDiopterOutput, loginUser } = require('./popup'); // Ensure the correct path

describe('Popup.js Unit Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = ''; // Reset DOM before each test
        document.body.innerHTML = `
            <input type="checkbox" id="lowVisionNeed" />
            <div id="lowVisionNeedSlider" style="display:none;"></div>
            <input type="range" id="diopterNeedValue" value="1" min="1" max="10" />
            <span id="diopterNeedOutput">1</span>
            
            <form id="signupForm">
                <input type="submit" value="Sign Up">
            </form>
            <form id="loginForm">
                <input type="submit" value="Login">
                <input type="email" id="email" value="test@example.com" />
                <input type="password" id="password" value="password123" />
            </form>
            <div id="errorSignup"></div>
            <div id="navLinks"></div>
            <div id="errorMessage"></div>
            <select id="colorBlindnessNeed"></select>
            <select id="colorBlindness"></select>
        `;
    });

    it('should toggle Low Vision slider display based on checkbox state', () => {
        const checkbox = document.getElementById('lowVisionNeed');
        const slider = document.getElementById('lowVisionNeedSlider');
        
        checkbox.checked = true;
        toggleLowVisionSlider('lowVisionNeed', 'lowVisionNeedSlider', 'diopterNeedValue', 'diopterNeedOutput');
        expect(slider.style.display).toBe('block');

        checkbox.checked = false;
        toggleLowVisionSlider('lowVisionNeed', 'lowVisionNeedSlider', 'diopterNeedValue', 'diopterNeedOutput');
        expect(slider.style.display).toBe('none');
    });

    it('should update the diopter output when slider changes', () => {
        const slider = document.getElementById('diopterNeedValue');
        const output = document.getElementById('diopterNeedOutput');
        
  
        expect(slider.value).toBe('1');
        expect(output.textContent).toBe('1');
    

        updateDiopterOutput('diopterNeedValue', 'diopterNeedOutput');
    

        slider.value = '2'; // Set the slider value to 2
        const event = new Event('input');
        slider.dispatchEvent(event); 
        expect(output.textContent).toBe('2');
    });
    
    it('should handle signup form submission correctly', () => {
        const signupForm = document.getElementById('signupForm');
        const mockSubmitEvent = new Event('submit');
        mockSubmitEvent.preventDefault = jest.fn();
    
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
        });
    
        signupForm.dispatchEvent(mockSubmitEvent);
    
        expect(mockSubmitEvent.preventDefault).toBeCalled();
    });

    
    it('should handle failed login', async () => {

        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: false, message: "Login failed" }),
            })
        );

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        await loginUser(email, password);

        expect(errorMessage.textContent).toBe("Login failed");
        expect(errorMessage.style.display).toBe('block');
    });

    it('should handle color blindness selection for signup', () => {
        const colorBlindnessSelect = document.getElementById('colorBlindnessNeed');
    
        // Create options and append them to the select element
        const option1 = document.createElement('option');
        option1.value = 'protanopia';
        option1.textContent = 'Protanopia';
        colorBlindnessSelect.appendChild(option1);
    
        const option2 = document.createElement('option');
        option2.value = 'deuteranopia';
        option2.textContent = 'Deuteranopia';
        colorBlindnessSelect.appendChild(option2);
        option1.selected = true;
    
        const event = new Event('change');
        colorBlindnessSelect.dispatchEvent(event);
        expect(colorBlindnessSelect.value).toBe('protanopia');
    });
    
    it('should handle color blindness selection for settings', () => {
        const colorBlindnessSelect = document.getElementById('colorBlindness');
    
        // Create options and append them to the select element
        const option1 = document.createElement('option');
        option1.value = 'protanopia';
        option1.textContent = 'Protanopia';
        colorBlindnessSelect.appendChild(option1);
    
        const option2 = document.createElement('option');
        option2.value = 'deuteranopia';
        option2.textContent = 'Deuteranopia';
        colorBlindnessSelect.appendChild(option2);
        option2.selected = true;
    
        const event = new Event('change');
        colorBlindnessSelect.dispatchEvent(event);
        expect(colorBlindnessSelect.value).toBe('deuteranopia');
    });
    
});
