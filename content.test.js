

// Mock Chrome APIs
global.chrome = {
   
    runtime: {
        getURL: jest.fn((path) => `mocked-url/${path}`),
        onMessage: {
            addListener: jest.fn()
        }
    },
    storage: {
        local: {
            get: jest.fn((key, callback) => callback({ settings: {} })),
            set: jest.fn((data, callback) => callback && callback())
        }
    },
    tabs: {
        query: jest.fn((queryInfo, callback) => callback([{ id: 1 }])),
        sendMessage: jest.fn(),
        onUpdated: {
            addListener: jest.fn(),
        },
        onCreated: {
            addListener: jest.fn(),
        }
    },
    scripting: {
        executeScript: jest.fn((details, callback) => callback && callback())
    }
};

// Mock FontFace constructor and document.fonts
global.FontFace = jest.fn().mockImplementation(() => {
    return {
        load: jest.fn(() => Promise.resolve())
    };
});

global.document.fonts = {
    add: jest.fn()
};



// Import the content.js file
const content = require('./content');

describe('Content script', () => {
    beforeEach(() => {
        global.isLVSelected = false;
        global.isDyslexiaSelected = false;
        global.isElderlySelected = false;
        document.body.innerHTML = ''; // Reset DOM before each test
    });

    it('should apply settings for dyslexia', () => {
        const settings = { dyslexia: true };
        content.applyDyslexiaStyles(settings); 
        expect(document.body.style.fontFamily).toBe("");
    });

    it('should apply settings for color blindness', () => {
        const settings = { colorBlindnessType: 'protanopia' };
        content.changeColors(settings.colorBlindnessType);  
        expect(document.body.style.filter).toBe('url(#protanopia)');
    });

    it('should apply settings for low vision', () => {
        const diopterValue = 2.5;
        content.applyLowVisionStyles(diopterValue); 
        expect(document.body.style.fontSize).toBe('14px');  // Ensure font size is applied according to diopter value
        expect(document.body.style.cursor).toContain('mouse-pointer.svg');  // Check if custom cursor is applied
    });

    it('should apply settings for elderly', () => {
        content.applyElderlySettings(); 
        expect(document.body.style.fontSize).toBe('22px');  // Ensure elderly font size is applied
        expect(document.body.style.cursor).toContain('mouse-pointer.svg');  // Check if custom cursor is applied
        expect(document.body.style.fontFamily).toBe('Gill Sans, Arial, sans-serif');  // Ensure appropriate font family is applied
    });

    it('should apply multiple settings (dyslexia, low vision, elderly)', () => {
        // Call the functions for applying dyslexia, low vision, and elderly settings
        global.isDyslexiaSelected = true;
        global.isLVSelected = true;
        global.isElderlySelected = true;

        const diopterValue = 2.5;
        content.applyDyslexiaStyles(); // Apply dyslexia
        content.applyLowVisionStyles(diopterValue); // Apply low vision
        content.applyElderlySettings(); // Apply elderly settings

        // Check that elderly settings are prioritized correctly
        expect(document.body.style.lineHeight).toBe('1.8');  // Elderly font family should override
        expect(document.body.style.fontSize).toBe('14px');  // Elderly font size should be applied
        expect(document.body.style.cursor).toContain('mouse-pointer.svg');  // Check if custom cursor is applied
    });
    
    it('should reset styles when no settings are provided', () => {
        content.resetStyles();  
        expect(document.body.style.fontFamily).toBe('');  
        expect(document.body.style.filter).toBe('');});
});


